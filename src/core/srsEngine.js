// ─── SRS ENGINE (Pure — no DOM, no browser API) ─────────────────────
// Anki-style SM-2 variant: learning steps → graduated review → mastery.
// All functions take settings + timestamp as parameters and return
// computed results without side effects.

function daysToMs(d) { return d * 86400000; }

function clampEase(e, minEase) { return Math.max(minEase, e); }

function fuzzInterval(days, fuzzEnabled) {
  if (!fuzzEnabled || days <= 1) return days;
  const delta = Math.max(1, Math.round(days * 0.05));
  return days + Math.floor(Math.random() * (delta * 2 + 1)) - delta;
}

function stepMs(stepIdx, learnSteps) {
  const idx = Math.max(0, Math.min(stepIdx, learnSteps.length - 1));
  return learnSteps[idx] * 60000;
}

export function fmtDur(ms) {
  const min = Math.round(ms / 60000);
  if (min < 60) return min + 'm';
  if (min < 1440) return Math.round(min / 60) + 'h';
  return Math.round(min / 1440) + 'd';
}

/**
 * Core SRS computation. Returns { srs, label }.
 *   card     — card object (card.srs is read, not mutated when preview=true)
 *   grade    — 0=Again, 1=Hard, 2=Good, 3=Easy
 *   settings — { learnSteps, graduateInterval, easyInterval, minEase,
 *                easyBonus, masteryDays, fuzz }
 *   now      — current timestamp (ms)
 *   preview  — if true, deep-clones srs before mutating
 */
export function computeSRS(card, grade, settings, now, preview) {
  const srs = preview ? JSON.parse(JSON.stringify(card.srs)) : card.srs;
  const steps = settings.learnSteps;
  let label = '';

  if (srs.state === 'new' || srs.state === 'learning') {
    srs.state = 'learning';
    if (grade === 0) {
      srs.stepIndex = 0;
      srs.ease = clampEase(srs.ease - 0.20, settings.minEase);
      srs.due = now + stepMs(0, steps);
      label = fmtDur(stepMs(0, steps));
    } else if (grade === 1) {
      srs.stepIndex = Math.min(srs.stepIndex, steps.length - 1);
      let hardMs;
      if (srs.stepIndex === 0 && steps.length > 1) {
        hardMs = (stepMs(0, steps) + stepMs(1, steps)) / 2;
      } else {
        hardMs = stepMs(srs.stepIndex, steps);
      }
      srs.due = now + hardMs;
      label = fmtDur(hardMs);
    } else if (grade === 2) {
      srs.stepIndex++;
      if (srs.stepIndex >= steps.length) {
        srs.state = 'review';
        srs.stepIndex = 0;
        const iv = fuzzInterval(settings.graduateInterval, settings.fuzz);
        srs.intervalDays = iv;
        srs.due = now + daysToMs(iv);
        srs.reps++;
        label = fmtDur(daysToMs(iv));
      } else {
        srs.due = now + stepMs(srs.stepIndex, steps);
        label = fmtDur(stepMs(srs.stepIndex, steps));
      }
    } else {
      srs.state = 'review';
      srs.stepIndex = 0;
      srs.ease = clampEase(srs.ease + 0.15, settings.minEase);
      const iv = fuzzInterval(settings.easyInterval, settings.fuzz);
      srs.intervalDays = iv;
      srs.due = now + daysToMs(iv);
      srs.reps++;
      label = fmtDur(daysToMs(iv));
    }
  } else {
    if (grade === 0) {
      srs.lapses++;
      srs.ease = clampEase(srs.ease - 0.20, settings.minEase);
      srs.state = 'learning';
      srs.stepIndex = 0;
      srs.intervalDays = 0;
      srs.due = now + stepMs(0, steps);
      if (srs.mastered) srs.mastered = false;
      label = fmtDur(stepMs(0, steps));
    } else if (grade === 1) {
      srs.ease = clampEase(srs.ease - 0.15, settings.minEase);
      const iv = fuzzInterval(Math.round(srs.intervalDays * 1.2), settings.fuzz);
      srs.intervalDays = Math.max(1, iv);
      srs.due = now + daysToMs(srs.intervalDays);
      srs.reps++;
      label = fmtDur(daysToMs(srs.intervalDays));
    } else if (grade === 2) {
      const iv = fuzzInterval(Math.round(srs.intervalDays * srs.ease), settings.fuzz);
      srs.intervalDays = Math.max(1, iv);
      srs.due = now + daysToMs(srs.intervalDays);
      srs.reps++;
      label = fmtDur(daysToMs(srs.intervalDays));
    } else {
      srs.ease = clampEase(srs.ease + 0.15, settings.minEase);
      const iv = fuzzInterval(Math.round(srs.intervalDays * srs.ease * settings.easyBonus), settings.fuzz);
      srs.intervalDays = Math.max(1, iv);
      srs.due = now + daysToMs(srs.intervalDays);
      srs.reps++;
      label = fmtDur(daysToMs(srs.intervalDays));
    }
    if (srs.intervalDays >= settings.masteryDays) {
      srs.mastered = true;
    }
  }

  return { srs, label };
}

/**
 * Preview what the next interval label would be for each grade.
 * Returns { srs, label } without mutating the card.
 */
export function previewSRS(card, grade, settings, now) {
  return computeSRS(card, grade, settings, now, true);
}

/**
 * Apply the SRS grade to the card (mutates card.srs in place).
 * Returns the card for chaining.
 */
export function applySRS(card, grade, settings, now) {
  const result = computeSRS(card, grade, settings, now, false);
  card.srs = result.srs;
  return card;
}

/**
 * Build the study queue from a flat array of cards.
 *   cards       — array of card objects
 *   masteredOnly — if true, only include mastered cards
 *   now         — current timestamp (ms)
 *   dailyLimit  — max new cards per day (0 = unlimited)
 *   newToday    — how many new cards were already introduced today
 */
export function buildQueueFromCards(cards, masteredOnly, now, dailyLimit, newToday) {
  let learning = [], review = [], newCards = [];

  for (const card of cards) {
    if (masteredOnly && !card.srs.mastered) continue;
    if (!masteredOnly && card.srs.mastered) {
      if (card.srs.state === 'review' && card.srs.due <= now) review.push(card);
      continue;
    }
    if (card.srs.state === 'new') {
      if (dailyLimit === 0 || newToday < dailyLimit) newCards.push(card);
    } else if (card.srs.state === 'learning') {
      if (card.srs.due <= now) learning.push(card);
    } else if (card.srs.state === 'review') {
      if (card.srs.due <= now) review.push(card);
    }
  }
  return [...learning, ...review, ...newCards];
}

/**
 * Create a fresh SRS data block for a new card.
 */
export function createSrsData(defaultEase) {
  return {
    state: 'new',
    stepIndex: 0,
    ease: defaultEase,
    intervalDays: 0,
    due: 0,
    reps: 0,
    lapses: 0,
    mastered: false,
  };
}
