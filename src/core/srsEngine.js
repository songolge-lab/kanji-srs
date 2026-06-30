// ─── SRS ENGINE (Pure — no DOM, no browser API) ─────────────────────
// FSRS (Free Spaced Repetition Scheduler, v4.5-equivalent) for graduated
// review scheduling, layered over Anki-style intraday learning steps.
//
// Design (per upgrade directive):
//   • 'new' / 'learning' / 'relearning' → short-term steps (minutes), exactly
//     as before. The FSRS math is NOT invoked while a card is cycling steps.
//   • A card only enters the FSRS day-scale scheduler once it GRADUATES
//     (>= 1 day). On graduation we seed Difficulty/Stability (computeInitialDS),
//     and every subsequent 'review' answer runs the full FSRS update
//     (computeNextDS), producing the next due date from Stability.
//
// All functions take settings + timestamp as parameters and return computed
// results without side effects (computeSRS mutates only when preview=false).

function daysToMs(d) { return d * 86400000; }

function fuzzInterval(days, fuzzEnabled) {
  if (!fuzzEnabled || days <= 1) return days;
  const delta = Math.max(1, Math.round(days * 0.05));
  return days + Math.floor(Math.random() * (delta * 2 + 1)) - delta;
}

function stepMs(stepIdx, learnSteps) {
  const idx = Math.max(0, Math.min(stepIdx, learnSteps.length - 1));
  return learnSteps[idx] * 60000;
}

function round4(n) { return Number(n.toFixed(4)); }

// ─── FSRS WEIGHTS & CORE MATH (v4.5-equivalent) ──────────────────────
export const FSRS_W = [
  // w[0]-w[3]: Initial Stability for Again, Hard, Good, Easy
  0.4, 0.6, 2.4, 5.8,
  // w[4]-w[7]: Initial Difficulty tuning & Mean Reversion
  4.93, 0.94, 0.86, 0.01,
  // w[8]-w[10]: Next Stability for Success
  1.49, 0.14, 0.94,
  // w[11]-w[14]: Next Stability for Lapse
  2.18, 0.05, 0.34, 1.26,
  // w[15]-w[16]: Hard Penalty & Easy Bonus
  0.29, 2.61,
];

/**
 * Current Retrievability (probability of recall). At t === s, R === 0.9.
 *   t — elapsed days since last review
 *   s — current memory stability (days)
 */
export function getRetrievability(t, s) {
  return Math.pow(0.9, t / Math.max(s, 0.1));
}

/**
 * Initial Difficulty & Stability for a card graduating for the first time.
 *   grade — FSRS grade (1=Again, 2=Hard, 3=Good, 4=Easy)
 */
export function computeInitialDS(grade) {
  const w = FSRS_W;
  const S = w[grade - 1]; // w[0]..w[3]
  let D = w[4] - Math.exp(w[5] * (grade - 1)) + 1;
  D = Math.max(1, Math.min(10, D));
  return { D, S };
}

/**
 * Next Difficulty & Stability after a review answer.
 *   D — current difficulty (1-10)
 *   S — current stability (days)
 *   R — current retrievability (0..1)
 *   grade — FSRS grade (1=Again, 2=Hard, 3=Good, 4=Easy)
 */
export function computeNextDS(D, S, R, grade) {
  const w = FSRS_W;

  // 1. Next Difficulty (linear update + mean reversion toward default).
  let nextD = D - w[6] * (grade - 3);
  nextD = w[7] * w[4] + (1 - w[7]) * nextD;
  nextD = Math.max(1, Math.min(10, nextD));

  // 2. Next Stability.
  let nextS;
  if (grade === 1) { // Lapse (Again)
    nextS = w[11] * Math.pow(D, -w[12]) *
            (Math.pow(S + 1, w[13]) - 1) *
            Math.exp(w[14] * (1 - R));
    nextS = Math.min(Math.max(nextS, 0.1), S); // a lapse must not raise stability
  } else { // Success (Hard, Good, Easy)
    const hardPenalty = (grade === 2) ? w[15] : 1;
    const easyBonus = (grade === 4) ? w[16] : 1;
    nextS = S * (1 + Math.exp(w[8]) *
            (11 - D) *
            Math.pow(S, -w[9]) *
            (Math.exp(w[10] * (1 - R)) - 1) *
            hardPenalty * easyBonus);
    nextS = Math.max(nextS, 0.1);
  }

  return { nextD, nextS };
}

export function fmtDur(ms) {
  const min = Math.round(ms / 60000);
  if (min < 60) return min + 'm';
  if (min < 1440) return Math.round(min / 60) + 'h';
  const days = Math.round(min / 1440);
  if (days < 30) return days + 'd';
  if (days < 365) return Math.round(days / 30) + 'mo';
  const years = days / 365;
  return (years < 10 ? years.toFixed(1) : String(Math.round(years))) + 'y';
}

// ─── GRADUATION (steps → FSRS review) ────────────────────────────────
// Moves a card out of the step phase into the day-scale FSRS scheduler.
//   • From new/learning: seed D/S from computeInitialDS (first-ever exposure).
//   • From relearning: keep the post-lapse S/D already banked at lapse time
//     (a true relearned stability), unless it's somehow invalid.
function graduate(srs, fsrsGrade, relearning, now, settings) {
  if (!relearning || !(srs.S > 0)) {
    const init = computeInitialDS(fsrsGrade);
    srs.D = round4(init.D);
    srs.S = round4(init.S);
  } else if (fsrsGrade === 4) {
    // Relearning graduation fix: "Easy" should reward the user with higher stability
    // than "Good", rather than defaulting to the identical banked post-lapse stability.
    srs.S = round4(srs.S * (settings.easyBonus || 1.3));
  }
  srs.state = 'review';
  srs.stepIndex = 0;
  const ivDays = Math.max(1, fuzzInterval(Math.round(srs.S), settings.fuzz));
  srs.intervalDays = ivDays; // legacy mirror (kept for old-client sync compat)
  srs.due = now + daysToMs(ivDays);
  srs.last_review = now;
  srs.reps++;
  if (srs.S >= settings.masteryDays) srs.mastered = true;
}

/**
 * Core SRS computation. Returns { srs, label }.
 *   card     — card object (card.srs is read, deep-cloned when preview=true)
 *   grade    — 0=Again, 1=Hard, 2=Good, 3=Easy  (→ FSRS 1,2,3,4)
 *   settings — { learnSteps, masteryDays, fuzz, ... }
 *   now      — current timestamp (ms)
 *   preview  — if true, deep-clones srs before mutating
 */
export function computeSRS(card, grade, settings, now, preview) {
  const srs = preview ? JSON.parse(JSON.stringify(card.srs)) : card.srs;
  const steps = settings.learnSteps;
  const fsrsGrade = grade + 1;
  let label = '';

  if (srs.state === 'new' || srs.state === 'learning' || srs.state === 'relearning') {
    // ── INTRADAY STEP PHASE (minutes) ──
    const relearning = srs.state === 'relearning';
    const stepState = relearning ? 'relearning' : 'learning';
    srs.stepIndex = srs.stepIndex || 0;

    if (grade === 0) { // Again → restart steps
      srs.state = stepState;
      srs.stepIndex = 0;
      srs.due = now + stepMs(0, steps);
      label = fmtDur(stepMs(0, steps));
    } else if (grade === 1) { // Hard → repeat current step (or avg of first two)
      srs.state = stepState;
      srs.stepIndex = Math.min(srs.stepIndex, steps.length - 1);
      let hardMs;
      if (srs.stepIndex === 0 && steps.length > 1) {
        hardMs = (stepMs(0, steps) + stepMs(1, steps)) / 2;
      } else {
        hardMs = stepMs(srs.stepIndex, steps);
      }
      srs.due = now + hardMs;
      label = fmtDur(hardMs);
    } else if (grade === 2) { // Good → advance a step, graduate if past the last
      srs.stepIndex++;
      if (srs.stepIndex >= steps.length) {
        graduate(srs, fsrsGrade, relearning, now, settings);
        label = fmtDur(srs.due - now);
      } else {
        srs.state = stepState;
        srs.due = now + stepMs(srs.stepIndex, steps);
        label = fmtDur(stepMs(srs.stepIndex, steps));
      }
    } else { // Easy → graduate immediately
      graduate(srs, fsrsGrade, relearning, now, settings);
      label = fmtDur(srs.due - now);
    }
  } else {
    // ── FSRS REVIEW PHASE (days) ──
    const lastR = srs.last_review || (now - daysToMs(srs.S || 1));
    const elapsedDays = Math.max(0, (now - lastR) / 86400000);
    const R = getRetrievability(elapsedDays, srs.S || 0.1);

    if (grade === 0) { // Lapse → relearning steps; bank post-lapse S/D
      srs.lapses++;
      const next = computeNextDS(srs.D, srs.S, R, fsrsGrade);
      srs.D = round4(next.nextD);
      srs.S = round4(next.nextS);
      srs.state = 'relearning';
      srs.stepIndex = 0;
      srs.intervalDays = 0; // legacy mirror
      srs.last_review = now;
      srs.due = now + stepMs(0, steps);
      if (srs.mastered) srs.mastered = false;
      label = fmtDur(stepMs(0, steps));
    } else { // Success → full FSRS stability update
      const next = computeNextDS(srs.D, srs.S, R, fsrsGrade);
      srs.D = round4(next.nextD);
      srs.S = round4(next.nextS);
      const ivDays = Math.max(1, fuzzInterval(Math.round(next.nextS), settings.fuzz));
      srs.intervalDays = ivDays; // legacy mirror
      srs.due = now + daysToMs(ivDays);
      srs.last_review = now;
      srs.reps++;
      if (next.nextS >= settings.masteryDays) srs.mastered = true;
      label = fmtDur(daysToMs(ivDays));
    }
  }

  return { srs, label };
}

/**
 * Preview the next interval label for a grade without mutating the card.
 */
export function previewSRS(card, grade, settings, now) {
  return computeSRS(card, grade, settings, now, true);
}

/**
 * Apply the SRS grade to the card (mutates card.srs in place).
 */
export function applySRS(card, grade, settings, now) {
  const result = computeSRS(card, grade, settings, now, false);
  card.srs = result.srs;
  return card;
}

/**
 * Build the study queue from a flat array of cards.
 *   cards        — array of card objects
 *   masteredOnly — if true, only include mastered cards
 *   now          — current timestamp (ms)
 *   dailyLimit   — max new cards per day (0 = unlimited)
 *   newToday     — how many new cards were already introduced today
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
    } else if (card.srs.state === 'learning' || card.srs.state === 'relearning') {
      if (card.srs.due <= now) learning.push(card);
    } else if (card.srs.state === 'review') {
      if (card.srs.due <= now) review.push(card);
    }
  }
  return [...learning, ...review, ...newCards];
}

/**
 * Create a fresh SRS data block for a new card.
 * Carries both the FSRS fields (D/S/last_review) and the legacy SM-2 mirror
 * fields (ease/intervalDays) — the latter keep older synced clients functional.
 */
export function createSrsData(defaultEase) {
  return {
    state: 'new',
    stepIndex: 0,
    D: 0,
    S: 0,
    last_review: null,
    due: 0,
    reps: 0,
    lapses: 0,
    mastered: false,
    // legacy SM-2 mirror (sync forward-compat with pre-2.0 clients)
    ease: defaultEase,
    intervalDays: 0,
  };
}
