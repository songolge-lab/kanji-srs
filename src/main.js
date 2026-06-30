import { CONFIG, saveState, loadState, testStorage, getPersistedSyncCode, persistSyncCode, removePersistedSyncCode, createInitialState, migrateSettings, migrateStats, migrateDecks, migrateCustomTests, migrateCardsToFSRS } from './store/appState.js';
import { syncConfigured, cloudPull, cloudPush, pickNewerState, generateSyncCode, publishDeckToCommunity } from './services/dbService.js';
import { buildQueueFromCards, createSrsData } from './core/srsEngine.js';
import { esc, uid, today, nowMs, daysToMs, shuffle } from './utils.js';
import * as Analytics from './components/Analytics.js';
import * as CardView from './components/CardView.js';
import * as DeckList from './components/DeckList.js';
import * as Settings from './components/Settings.js';
import * as TestManager from './components/TestManager.js';
import * as TestEditor from './components/TestEditor.js';
import * as TestView from './components/TestView.js';
import * as TestResults from './components/TestResults.js';
import * as KanjiModal from './components/KanjiModal.js';
import * as WordModal from './components/WordModal.js';
import * as CommunityHub from './components/CommunityHub.js';
import * as Search from './components/Search.js';
import * as KanjiDict from './services/kanjiDictService.js';
import { generateFuriganaMap } from './utils/furiganaParser.js';

/* =====================================================================
   KANJI SRS — ANA ORKESTRASYON
   ===================================================================== */

const APP_VERSION = '2.4.0';

// ─── İKON SETİ ─────────────────────────────────────────────────────────
const ICONS = {
  back:   '<path d="M19 12H5M12 5l-7 7 7 7"/>',
  plus:   '<path d="M12 5v14M5 12h14"/>',
  edit:   '<path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.83-2.83L5 17.2 4 20Z"/><path d="M13.5 7l3 3"/>',
  trash:  '<path d="M4 7h16"/><path d="M9 7V5.2A1.7 1.7 0 0 1 10.7 3.5h2.6A1.7 1.7 0 0 1 15 5.2V7"/><path d="M6.2 7l.9 12.4A1.7 1.7 0 0 0 8.8 21h6.4a1.7 1.7 0 0 0 1.7-1.6L17.8 7"/><path d="M10 11v6M14 11v6"/>',
  eye:    '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  play:   '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/>',
  star:   '<path d="m12 3.5 2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L12 3.5Z"/>',
  sync:   '<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4h-4"/>',
  check:  '<path d="M5 12.5l4.5 4.5L19 7"/>',
  alert:  '<path d="M12 4.5 2.8 20a1.2 1.2 0 0 0 1 1.8h16.4a1.2 1.2 0 0 0 1-1.8L12 4.5Z"/><path d="M12 10v4.5"/><path d="M12 17.8h.01"/>',
  spark:  '<path d="M12 4v5M12 15v5M4 12h5M15 12h5"/><path d="M7.6 7.6l2 2M14.4 14.4l2 2M16.4 7.6l-2 2M9.6 14.4l-2 2"/>',
  info:   '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.8h.01"/>',
  flame:  '<path d="M12 3.5c.6 2.4 2.1 3.4 3.2 4.9A6 6 0 1 1 6.5 11c.8 1 1.8 1.3 2.5 1.1C8.3 9.5 9.7 6.5 12 3.5Z"/>',
  inbox:  '<path d="M3 12h5l1.5 2.5h5L21 12"/><path d="M4.8 6.4 3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6l-1.8-5.6A2 2 0 0 0 17.3 5H6.7a2 2 0 0 0-1.9 1.4Z"/>',
  done:   '<circle cx="12" cy="12" r="9"/><path d="M8.3 12.4l2.6 2.6 4.8-5.4"/>',
  chevL:  '<path d="M15 5l-7 7 7 7"/>',
  chevR:  '<path d="M9 5l7 7-7 7"/>',
  chevron_down:  '<path d="M6 9l6 6 6-6"/>',
  chevron_right: '<path d="M9 6l6 6-6 6"/>',
  dot:    '<circle cx="12" cy="12" r="4.5"/>',
  download: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>',
  close:  '<path d="M6 6l12 12M18 6L6 18"/>',
  shield: '<path d="M12 3 4.5 6v6c0 5 3.4 7.6 7.5 9 4.1-1.4 7.5-4 7.5-9V6L12 3Z"/>',
  lock:   '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.3a1.5 1.5 0 0 1 1.2.6L11.5 8H19.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/>',
  community: '<path d="M16 17v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V17"/><circle cx="9.5" cy="7.5" r="3"/><path d="M16.5 11.2a3 3 0 0 0 0-5.9"/><path d="M21 17v-1.4a3 3 0 0 0-2.3-2.9"/>',
  publish: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16"/>',
  move:    '<path d="M5 9l-3 3 3 3"/><path d="M9 5l3-3 3 3"/><path d="M15 19l3-3-3-3"/><path d="M19 9l-3-3-3 3"/><path d="M2 12h20M12 2v20"/>',
};
function icon(name, cls) {
  return `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// ─── i18n ──────────────────────────────────────────────────────────────
const LANG = {
en: {
nav_decks:'Decks',nav_add:'Add card',nav_settings:'Settings',back:'Back',update_available:'Update available',new_deck:'New deck',
my_decks:'My Decks',total_cards:'Total cards',mastered_label:'Mastered',today_label:'Today',
no_decks:'No decks yet.\nTap + above to create one.',
deck_meta:'{total} cards · {mastered} mastered',sub_decks_count:'{count} sub-decks',collapse_decks:'Collapse sub-decks',expand_decks:'Expand sub-decks',card_preview_title:'Card Preview',
study_btn:'Study ({count})',no_cards_to_study:'No cards to study right now',detail:'Detail',
badge_new:'{count} new',badge_learning:'{count} learning',badge_review:'{count} review',
sub_decks_section:'Sub-decks ({count})',add_sub_deck:'Add sub-deck',
stat_new:'New',stat_learning:'Learning',stat_due:'Due today',stat_total:'Total',stat_total_all:'Total (all)',stat_mastered:'Mastered',stat_queue:'In queue',
start_study:'Start studying ({count})',start_study_all:'Start studying ({count}) — all',
add_card:'Add Card',delete_btn:'Delete',review_btn:'Browse',
mastered_banner:'Well Known',cards_mastered:'{count} cards mastered',list_btn:'List',
cards_section:'Cards ({count})',no_cards_in_deck:'No cards in this deck yet.',
state_new:'New',state_learning:'Learning',state_review:'Review',
show_answer:'Show answer',grade_again:'Again',grade_hard:'Hard',grade_good:'Good',grade_easy:'Easy',
session_complete:'Session complete',cards_studied:'{count} cards studied. Remaining today: 0.',back_to_deck:'Back to deck',
review_title:'Browse — Choose Scope',
review_info:"In this mode you just browse cards; your answers won't affect progress or review schedule.",
normal_cards:'Normal cards ({count})',mastered_cards:'Well Known ({count})',all_cards:'All cards ({count})',
incl_subdecks:' (incl. sub-decks)',cancel:'Cancel',close:'Close',back:'Back',kanji_detail:'Kanji Detail',kanji_onyomi:'On\'yomi',kanji_kunyomi:'Kun\'yomi',kanji_not_found:'No detail available for this character yet.',kanji_meaning_en:'Meaning (En)',msg_ai_key_missing:'Please configure your Gemini API Key in Settings first.',msg_ai_loading:'Thinking...',word_detail_title:'Word Detail',word_ai_meaning:'🧠 Contextual Meaning',word_kanji_breakdown:'Kanji Breakdown',btn_ai_deck:'✨ AI Deck',modal_ai_deck_title:'Generate AI Deck',ai_deck_placeholder:'e.g., JLPT N4 Travel Verbs',ai_generating:'Generating...',toast_ai_deck_success:'AI deck created with {count} cards! ✨',no_cards_scope:'No cards in this scope',
browse_badge:'Browsing',prev_card:'Previous',next_card:'Next',no_cards_to_show:'No cards to show.',
nav_search:'Search',search_placeholder:'Search across all decks…',search_filter_all:'All Fields',search_filter_kanji:'Kanji / Word',search_filter_meaning:'Meaning',search_filter_example:'Examples',search_no_results:'No cards found.',search_empty_state:'Type to search across all decks…',search_found:'Found {count} cards',
add_card_title:'Add card',target_deck:'Target deck',
kanji_label:'Kanji / Word',kanji_placeholder:'e.g. 漢字',
furigana_label:'Furigana (reading)',furigana_placeholder:'e.g. かんじ',furigana_auto_placeholder:'Leave blank for auto-generation',
meaning_label:'Meaning',meaning_placeholder:'e.g. kanji, Chinese character',
example_jp_label:'Example sentence (Japanese)',example_jp_placeholder:'e.g. 毎日漢字を勉強します。',
mark_words_btn:'Mark words (add furigana)',
example_tr_label:'Example translation (optional)',example_tr_placeholder:'e.g. I study kanji every day.',
save:'Save',bulk_import_title:'Bulk import',card_list:'Card list',
bulk_format:'Format: Word | Meaning | Example JP (opt) | Example TR (opt)',
import_btn:'Import',create_deck_first:'Create a deck first',
settings_lang:'Language',settings_theme:'Appearance',
settings_sync:'Cross-device Sync',settings_srs:'SRS settings',settings_backup:'Backup',
backup_desc:'Download or upload all data (decks, cards, SRS state) as JSON.',
export_btn:'Export',import_data_btn:'Import',
storage_warning_title:'Data is not persistent in this session',
storage_warning_text:'localStorage is not accessible. Download the app as .html and open it in a local browser for persistent storage.',
danger_zone:'Danger zone',reset_all:'Reset all data',
follow_system:'Follow system theme',follow_system_desc:'If device dark mode is on, Sumi is auto-selected',
on:'On',off:'Off',
srs_steps:'Learning steps (min)',srs_steps_hint:'Comma-separated, e.g. 1, 10',
srs_grad:'Graduation interval (days)',srs_grad_hint:'Graduate with Good',
srs_easy_iv:'Easy interval (days)',srs_easy_iv_hint:'Graduate with Easy',
srs_ease:'Default ease',srs_ease_hint:'1.3–5.0',
srs_easy_bonus:'Easy bonus',srs_easy_bonus_hint:'Interval multiplier',
srs_mastery:'Mastery threshold (days)',srs_mastery_hint:'Cards get ⭐ at this interval',
srs_daily:'Daily new card limit',srs_daily_hint:'0 = unlimited',
srs_fuzz:'Random fuzz',srs_fuzz_hint:'±5% to intervals',
srs_shield:'Auto use shield',srs_shield_hint:'Protects streak on missed day',
save_settings:'Save settings',
info_steps:'When a new card is first studied, it is shown in this order (minutes). Example "1, 10": if you say Again, it shows after 1 minute; if you say Good, it moves to the next step (10 min). When all steps are passed with Good, the card "graduates" to normal review mode.',
info_grad:'When a card passes the last learning step with Good, this determines how many days until the next review. Anki default is 1 day.',
info_easy_iv:'If you press Easy on a new card, it skips learning steps and is scheduled this many days out.',
info_ease:'The multiplier that determines how much the interval grows on each correct review. Higher ease means the card spaces out faster. Anki default is 2.5 (250%).',
info_easy_bonus:'When you press Easy on a card in review mode, this multiplier is applied on top of the normal Good interval. 1.3 means 30% longer than Good.',
info_mastery:"When a card's interval reaches this many days, it is automatically moved to Well Known. Lower it to make cards qualify as mastered sooner.",
info_daily:'Limits how many NEW cards enter the study queue per day. Set to 0 for no limit.',
info_fuzz:'When on, adds small randomness (±5%) to calculated intervals so cards added the same day don\'t all pile up on the same future date.',
info_shield:'If you miss a day entirely and have shields, when on, a shield is auto-used to protect your streak. Turn off to keep shields but let missed days break the streak.',
streak_days:'{count} day streak',shields_have:'{count} shields available',
streak_msg_blaze:'Legendary streak! 🔥',streak_msg_hot:'Flame is growing, keep going!',
streak_msg_warm:"Nice tempo you've got",streak_msg_cold:'Study a bit every day, grow the flame',
day_unit:'days',shield_text:'shields — auto-protects your streak if you miss a day.',
prev_month:'Previous month',next_month:'Next month',
legend_studied:'Studied',legend_shielded:'Shield used',
months:'January,February,March,April,May,June,July,August,September,October,November,December',
weekdays_short:'Mon,Tue,Wed,Thu,Fri,Sat,Sun',weekdays_cal:'M,T,W,T,F,S,S',
months_short:'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
daily_cards_studied:'Cards studied',daily_time_spent:'Minutes today',
cal_cards_studied:'Cards studied: {count}',cal_time_spent:'Time spent: {count} min',cal_decks_studied:'Decks studied: {decks}',cal_no_activity:'No activity on this day',
heatmap_title:'Activity',heatmap_longest:'Longest streak: {count}',heatmap_year_total:'{count} reviews in the last year',
heatmap_tooltip:'{count} reviews · {date}',heatmap_none:'No reviews · {date}',heatmap_less:'Less',heatmap_more:'More',
forecast_title:'7-Day Review Forecast',
sync_not_configured:'Cloud sync is not set up yet.',
sync_dev_note:'Developer note: fill in SUPABASE_URL and SUPABASE_ANON_KEY in index.html (see KURULUM.md).',
sync_connected:'Connected code:',sync_share_hint:'Enter the same code on another device to see these cards there too.',
sync_now:'Sync now',sync_disconnect:'Disconnect',
sync_create_hint:'Create a code to auto-sync between devices, then enter the same code on the other device.',
sync_create:'Create new code',sync_or_enter:'Or enter an existing code',
sync_code_placeholder:'e.g. 482913',sync_connect:'Connect with this code',
modal_rename:'Rename deck',modal_new_name:'New name',modal_deck_name:'Deck name',
modal_deck_placeholder:'e.g. JLPT N3 Kanji',modal_create_deck:'Create new deck',
modal_parent_deck:'Parent deck (optional)',modal_independent:'— Independent (top level) —',
modal_add_subdeck:'{name} — Add sub-deck',modal_subdeck_name:'Sub-deck name',modal_subdeck_placeholder:'e.g. Foods',
create:'Create',modal_edit_card:'Edit card',edit_label:'Edit',
toast_card_added:'✓ Card added: {kanji}',toast_cards_imported:'✓ {added} cards imported{skipped}',
toast_skipped:', {count} lines skipped',toast_deck_created:'✓ Deck created: {name}',
toast_deck_renamed:'✓ Deck name updated',toast_card_updated:'✓ Card updated',
toast_deck_deleted:'🗑 Deck deleted',toast_card_deleted:'🗑 Card deleted',
toast_settings_saved:'✓ Settings saved',toast_exported:'✓ Data exported',
toast_imported:'✓ Data imported: {count} decks',toast_reset:'✓ All data reset',
toast_synced:'✓ Synced',toast_sync_code:'✓ Code created: {code}',
toast_sync_connected:'✓ Connected and synced',toast_disconnected:'Disconnected',
toast_mastered:'⭐ {kanji} → Well Known!',
toast_shield_used:'🛡 {count} shield(s) used, streak protected',
toast_shield_earned:'🛡 Completed a full week, +1 shield!',
toast_storage_warning:'⚠ Data is not persistent in this session',
warn_required:'⚠ Word and meaning are required',warn_deck_not_found:'⚠ Deck not found',
warn_name_empty:'⚠ Name cannot be empty',warn_invalid_steps:'⚠ Invalid step values',
warn_invalid_code:'⚠ Enter a valid code (4-8 digits)',
warn_sync_not_configured:'⚠ Cloud sync not configured (see KURULUM.md)',
warn_sync_error:'⚠ Sync error: {msg}',warn_import_error:'⚠ Import error: {msg}',warn_error:'⚠ Error: {msg}',
confirm_delete_deck:'Delete "{name}" and all its cards ({count})? Are you sure?',
confirm_delete_deck_nested:'"{name}" and {sub} sub-decks (total {count} cards) will be deleted. Are you sure?',
confirm_delete_card:'Are you sure you want to delete this card?',
confirm_disconnect:'Disconnect from this sync code? Data stays local but auto-sync stops.',
confirm_reset:'ALL data (decks, cards, statistics) will be deleted. Are you sure?',
update_new:'New update available',update_version:'Version {version}',update_download:'Download',
update_downloading:'Downloading…',update_ready:'Update ready',
update_downloaded:'Version {version} downloaded',update_install:'Restart and Install',
preview_front:'Front',preview_back:'Back',flip_hint:'Drag to flip',
keep_stacking:'Keep stacking.',version_tag:'Stacks · v{version}',
study_screen_title:'読む',review_screen_title:'Browse',streak_screen_title:'Study Calendar',
nav_tests:'Exams',custom_tests_title:'Custom Tests',test_editor_title:'Test Editor',
no_custom_tests:'No custom tests yet.',create_test:'Create New Test',untitled_test:'Untitled Test',
question_count:'{count} questions',play_test:'Play',confirm_delete_test:'Delete this test? Are you sure?',
toast_test_deleted:'🗑 Test deleted',toast_test_created:'✓ Test created',toast_test_updated:'✓ Test updated',
test_title_label:'Test Title',test_title_placeholder:'e.g. JLPT N3 Practice',questions_section:'Questions',
add_question:'Add Question',question_n:'Question {n}',question_type:'Type',question_prompt:'Prompt',
prompt_placeholder:'e.g. What does 漢字 mean?',question_image:'Image (optional)',remove_image:'Remove',
options_label:'Options (select correct)',option_placeholder:'Option {n}',add_option:'Add option',
correct_answer:'Correct answer',true_label:'True',false_label:'False',
fill_answer_placeholder:'Type the correct answer',
qtype_multiple_choice:'Multiple Choice',qtype_true_false:'True / False',qtype_fill_blank:'Fill in the Blank',
test_question_of:'{current} / {total}',test_submit:'Submit',test_no_questions:'This test has no questions.',
test_score:'You scored {score}/{total}',test_your_answer:'Your answer',test_answers_section:'Answers',
test_return_manager:'Return to Tests',export_test:'Export',import_test:'Import JSON',
toast_test_exported:'✓ Test exported',toast_test_imported:'✓ Test imported: {title}',warn_invalid_test_file:'⚠ Invalid test file',
nav_community:'Community',community_title:'Community Decks',community_subtitle:'Browse and download decks shared by other learners.',
community_refresh:'Refresh',community_loading:'Loading community decks…',community_empty:'No community decks yet. Be the first to publish one!',
community_error:'Could not load community decks. Check your connection and try again.',community_download:'Download',community_by:'by {author}',
community_publish:'Publish',community_publish_title:'Publish "{name}"',community_publish_hint:'This deck ({count} cards) will be shared publicly. SRS progress is not included.',
community_desc_label:'Description',community_desc_ph:'What is this deck about?',community_tags_label:'Tags',community_tags_ph:'e.g. JLPT, N3, vocabulary',
community_tags_hint:'Separate tags with commas (max 8).',community_publish_btn:'Publish to Community',
toast_community_published:'✓ Deck published to community',toast_community_downloaded:'✓ Downloaded: {name}',
warn_community_publish:'⚠ Publish failed: {msg}',warn_community_fetch:'⚠ Download failed: {msg}',warn_community_no_cards:'⚠ This deck has no cards to publish',
settings_ai:'AI Teacher',ai_section_desc:'Connect a Gemini API key to generate AI-powered mnemonics for your kanji cards.',ai_api_key:'Gemini API Key',ai_api_key_placeholder:'Enter your API key',ai_model:'AI Model',
move_deck:'Move Deck',move_to_label:'Move this deck to:',move_top_level:'— Top level (no parent) —',toast_deck_moved:'✓ Deck moved',warn_move_cycle:'⚠ Cannot move a deck into its own descendant',
},
tr: {
nav_decks:'Desteler',nav_add:'Kart ekle',nav_settings:'Ayarlar',back:'Geri',update_available:'Güncelleme mevcut',new_deck:'Yeni deste',
my_decks:'Destelerim',total_cards:'Toplam kart',mastered_label:'Ustalaşılan',today_label:'Bugün',
no_decks:'Henüz bir deste yok.\nSağ üstteki + ile yeni deste ekle.',
deck_meta:'{total} kart · {mastered} ustalaşıldı',sub_decks_count:'{count} alt deste',collapse_decks:'Alt desteleri gizle',expand_decks:'Alt desteleri göster',card_preview_title:'Kart Önizleme',
study_btn:'Çalış ({count})',no_cards_to_study:'Şimdilik çalışılacak kart yok',detail:'Detay',
badge_new:'{count} yeni',badge_learning:'{count} öğreniliyor',badge_review:'{count} tekrar',
sub_decks_section:'Alt desteler ({count})',add_sub_deck:'Alt deste ekle',
stat_new:'Yeni',stat_learning:'Öğreniliyor',stat_due:'Bugün tekrar',stat_total:'Toplam',stat_total_all:'Toplam (tümü)',stat_mastered:'Ustalaşıldı',stat_queue:'Kuyrukta',
start_study:'Çalışmaya başla ({count})',start_study_all:'Çalışmaya başla ({count}) — tümü',
add_card:'Kart Ekle',delete_btn:'Sil',review_btn:'Gözden Geçir',
mastered_banner:'İyi Bildiklerim',cards_mastered:'{count} kart ustalaşıldı',list_btn:'Listele',
cards_section:'Kartlar ({count})',no_cards_in_deck:'Bu destede henüz kart yok.',
state_new:'Yeni',state_learning:'Öğreniliyor',state_review:'Tekrar',
show_answer:'Cevabı göster',grade_again:'Tekrar',grade_hard:'Zor',grade_good:'İyi',grade_easy:'Kolay',
session_complete:'Oturum tamamlandı',cards_studied:'{count} kart çalışıldı. Bugün için kalan: 0.',back_to_deck:'Desteye dön',
review_title:'Gözden Geçir — Kapsam Seç',review_info:'Bu modda kartlara sadece göz atarsın; cevapların ilerlemeni veya tekrar planını etkilemez.',
normal_cards:'Normal kartlar ({count})',mastered_cards:'İyi Bildiklerim ({count})',all_cards:'Tüm kartlar ({count})',
incl_subdecks:' (alt desteler dahil)',cancel:'İptal',close:'Kapat',back:'Geri',kanji_detail:'Kanji Detayı',kanji_onyomi:'On\'yomi',kanji_kunyomi:'Kun\'yomi',kanji_not_found:'Bu karakter için henüz detay yok.',kanji_meaning_en:'Anlam (En)',msg_ai_key_missing:'Lütfen önce Ayarlar\'dan Gemini API Anahtarınızı yapılandırın.',msg_ai_loading:'Düşünüyor...',word_detail_title:'Kelime Detayı',word_ai_meaning:'🧠 Bağlamsal Anlam',word_kanji_breakdown:'Kanji Ayrıntısı',btn_ai_deck:'✨ Yapay Zekâ Destesi',modal_ai_deck_title:'Yapay Zekâ Destesi Oluştur',ai_deck_placeholder:'ör. JLPT N4 Seyahat Fiilleri',ai_generating:'Oluşturuluyor...',toast_ai_deck_success:'{count} kartlık yapay zekâ destesi oluşturuldu! ✨',no_cards_scope:'Bu kapsamda kart yok',
browse_badge:'Göz at',prev_card:'Önceki',next_card:'Sonraki',no_cards_to_show:'Gösterilecek kart yok.',
nav_search:'Arama',search_placeholder:'Tüm destelerde ara…',search_filter_all:'Tüm Alanlar',search_filter_kanji:'Kanji / Kelime',search_filter_meaning:'Anlam',search_filter_example:'Örnekler',search_no_results:'Kart bulunamadı.',search_empty_state:'Tüm destelerde aramak için yaz…',search_found:'{count} kart bulundu',
add_card_title:'Kart ekle',target_deck:'Hedef deste',
kanji_label:'Kanji / Kelime',kanji_placeholder:'例: 漢字',furigana_label:'Furigana (okunuş)',furigana_placeholder:'例: かんじ',furigana_auto_placeholder:'Otomatik oluşturmak için boş bırakın',
meaning_label:'Türkçe anlam',meaning_placeholder:'例: kanji, Çince karakter',
example_jp_label:'Örnek cümle (Japonca)',example_jp_placeholder:'例: 毎日漢字を勉強します。',mark_words_btn:'Kelimeleri işaretle (furigana ekle)',
example_tr_label:'Örnek çeviri (Türkçe, opsiyonel)',example_tr_placeholder:'例: Her gün kanji çalışıyorum.',
save:'Kaydet',bulk_import_title:'Toplu içe aktar',card_list:'Kart listesi',
bulk_format:'Format: Kelime | Anlam | Örnek JP (ops) | Örnek TR (ops)',
import_btn:'İçe aktar',create_deck_first:'Önce bir deste oluştur',
settings_lang:'Dil',settings_theme:'Görünüm',settings_sync:'Cihazlar Arası Senkron',settings_srs:'SRS ayarları',settings_backup:'Yedekleme',
backup_desc:'Tüm veriyi (desteler, kartlar, SRS durumu) JSON olarak indir veya yükle.',
export_btn:'Dışa aktar',import_data_btn:'İçe aktar',
storage_warning_title:'Veriler bu oturumda kalıcı değil',storage_warning_text:'localStorage erişilemiyor. Uygulamayı .html olarak indirip yerel tarayıcıda açarsan veriler kalıcı saklanır.',
danger_zone:'Tehlikeli bölge',reset_all:'Tüm veriyi sıfırla',
follow_system:'Sistem temasını takip et',follow_system_desc:'Cihazın karanlık modu açıksa Sumi otomatik seçilir',on:'Açık',off:'Kapalı',
srs_steps:'Öğrenme adımları (dk)',srs_steps_hint:'Virgülle ayır, ör: 1, 10',srs_grad:'Mezun olma aralığı (gün)',srs_grad_hint:'İyi ile mezun',
srs_easy_iv:'Kolay aralık (gün)',srs_easy_iv_hint:'Kolay ile mezun',srs_ease:'Varsayılan ease',srs_ease_hint:'1.3–5.0',
srs_easy_bonus:'Kolay bonusu',srs_easy_bonus_hint:'Aralık çarpanı',srs_mastery:'Ustalaşma eşiği (gün)',srs_mastery_hint:'Bu aralığa ulaşınca ⭐',
srs_daily:'Günlük yeni kart limiti',srs_daily_hint:'0 = sınırsız',srs_fuzz:'Rastgele fuzz',srs_fuzz_hint:'Aralıklara ±%5',
srs_shield:'Otomatik kalkan kullanımı',srs_shield_hint:'Gün kaçırınca seriyi korur',save_settings:'Ayarları kaydet',
info_steps:'Yeni bir kart ilk kez çalışıldığında bu sırayla gösterilir (dakika). Örnek "1, 10": Tekrar dersen 1 dakika sonra, İyi dersen sıradaki adıma (10 dakika) geçer. Tüm adımlar İyi ile geçildiğinde kart "mezun olur" ve normal tekrar moduna girer.',
info_grad:'Bir kart son öğrenme adımını İyi ile geçtiğinde, bir sonraki tekrara kaç gün bekleneceğini belirler. Anki varsayılanı 1 gündür.',
info_easy_iv:'Yeni bir kart için doğrudan Kolay dersen, öğrenme adımlarını atlayıp kaç gün sonraya planlanacağını belirler.',
info_ease:'Her doğru tekrarda aralığın kaç katına çıkacağını belirleyen çarpan. Yüksek ease, kartın daha hızlı seyrekleşmesi anlamına gelir. Anki varsayılanı 2.5 (yani %250) dir.',
info_easy_bonus:'Tekrar modundaki bir kart için Kolay dediğinde, normal İyi aralığına ek olarak uygulanan çarpan. 1.3 demek, İyi den %30 daha uzun bir aralık demektir.',
info_mastery:'Bir kartın aralığı bu gün sayısına ulaştığında otomatik olarak "İyi Bildiklerim" alt destesine taşınır. Düşürürsen kartlar daha çabuk "ustalaşılmış" sayılır.',
info_daily:'Bir günde en fazla kaç YENİ kartın çalışma kuyruğuna gireceğini sınırlar. 0 yaparsan sınır olmaz, tüm yeni kartlar aynı gün gösterilebilir.',
info_fuzz:'Açıkken, hesaplanan aralıklara küçük bir rastgelelik (±%5) eklenir; böylece aynı gün eklenen kartlar hep aynı günde üst üste binmez. Kapatırsan aralıklar tam hesaplanan sayıya sabitlenir.',
info_shield:'Bir günü tamamen kaçırırsan ve kalkanın varsa, açıkken o gün otomatik olarak kalkan harcanıp serin korunur. Kapatırsan kalkanın olsa da kaçırdığın gün serini bozar; kalkanlar yine de kazanılmaya devam eder.',
streak_days:'{count} günlük seri',shields_have:'{count} kalkanın var',
streak_msg_blaze:'Efsanevi seri! 🔥',streak_msg_hot:'Alev büyüyor, devam!',streak_msg_warm:'Güzel bir tempo tuttun',streak_msg_cold:'Her gün biraz çalış, alev büyüsün',
day_unit:'gün',shield_text:'kalkanın var — bir gün kaçırırsan serini otomatik korur.',
prev_month:'Önceki ay',next_month:'Sonraki ay',legend_studied:'Çalışıldı',legend_shielded:'Kalkanla korundu',
months:'Ocak,Şubat,Mart,Nisan,Mayıs,Haziran,Temmuz,Ağustos,Eylül,Ekim,Kasım,Aralık',
weekdays_short:'Pzt,Sal,Çar,Prş,Cum,Cmt,Paz',weekdays_cal:'P,S,Ç,P,C,C,P',
months_short:'Oca,Şub,Mar,Nis,May,Haz,Tem,Ağu,Eyl,Eki,Kas,Ara',
daily_cards_studied:'Çalışılan kart',daily_time_spent:'Bugün (dk)',
cal_cards_studied:'Çalışılan kart: {count}',cal_time_spent:'Geçen süre: {count} dk',cal_decks_studied:'Çalışılan desteler: {decks}',cal_no_activity:'Bu günde etkinlik yok',
heatmap_title:'Etkinlik',heatmap_longest:'En uzun seri: {count}',heatmap_year_total:'Son bir yılda {count} tekrar',
heatmap_tooltip:'{count} tekrar · {date}',heatmap_none:'Tekrar yok · {date}',heatmap_less:'Az',heatmap_more:'Çok',
forecast_title:'7 Günlük Tekrar Tahmini',
sync_not_configured:'Bulut senkron henüz kurulmadı.',sync_dev_note:'Geliştirici notu: index.html içinde SUPABASE_URL ve SUPABASE_ANON_KEY değerlerini doldurman gerekiyor (bkz. KURULUM.md).',
sync_connected:'Bağlı giriş kodu:',sync_share_hint:'Diğer cihazda (telefon/PC) aynı kodu girerek bu kartları orada da görebilirsin.',
sync_now:'Şimdi senkronize et',sync_disconnect:'Bağlantıyı kes',
sync_create_hint:'Telefon ve bilgisayarın otomatik senkronize olması için bir giriş kodu oluştur, diğer cihazda da aynı kodu gir.',
sync_create:'Yeni kod oluştur',sync_or_enter:'Veya var olan bir kodu gir',
sync_code_placeholder:'ör: 482913',sync_connect:'Bu kodla bağlan',
modal_rename:'Desteyi yeniden adlandır',modal_new_name:'Yeni isim',modal_deck_name:'Deste adı',
modal_deck_placeholder:'ör: JLPT N3 Kanji',modal_create_deck:'Yeni deste oluştur',
modal_parent_deck:'Üst deste (opsiyonel)',modal_independent:'— Bağımsız (en üst düzey) —',
modal_add_subdeck:'{name} — Alt deste ekle',modal_subdeck_name:'Alt deste adı',modal_subdeck_placeholder:'ör: Yiyecekler',
create:'Oluştur',modal_edit_card:'Kartı düzenle',edit_label:'Düzenle',
toast_card_added:'✓ Kart eklendi: {kanji}',toast_cards_imported:'✓ {added} kart eklendi{skipped}',
toast_skipped:', {count} satır atlandı',toast_deck_created:'✓ Deste oluşturuldu: {name}',
toast_deck_renamed:'✓ Deste adı güncellendi',toast_card_updated:'✓ Kart güncellendi',
toast_deck_deleted:'🗑 Deste silindi',toast_card_deleted:'🗑 Kart silindi',
toast_settings_saved:'✓ Ayarlar kaydedildi',toast_exported:'✓ Veriler dışa aktarıldı',
toast_imported:'✓ Veriler içe aktarıldı: {count} deste',toast_reset:'✓ Tüm veri sıfırlandı',
toast_synced:'✓ Senkronize edildi',toast_sync_code:'✓ Kod oluşturuldu: {code}',
toast_sync_connected:'✓ Bağlandı ve senkronize edildi',toast_disconnected:'Bağlantı kesildi',
toast_mastered:'⭐ {kanji} → İyi Bildiklerim!',
toast_shield_used:'🛡 {count} kalkan kullanıldı, streak korundu',toast_shield_earned:'🛡 Bir haftayı kesintisiz tamamladın, +1 kalkan!',
toast_storage_warning:'⚠ Veriler bu oturumda kalıcı değil',
warn_required:'⚠ Kelime ve anlam zorunlu',warn_deck_not_found:'⚠ Deste bulunamadı',
warn_name_empty:'⚠ İsim boş olamaz',warn_invalid_steps:'⚠ Geçersiz adım değerleri',
warn_invalid_code:'⚠ Geçerli bir kod gir (4-8 hane)',warn_sync_not_configured:'⚠ Bulut senkron henüz yapılandırılmadı (KURULUM.md\'ye bak)',
warn_sync_error:'⚠ Senkron hatası: {msg}',warn_import_error:'⚠ İçe aktarma hatası: {msg}',warn_error:'⚠ Hata: {msg}',
confirm_delete_deck:'"{name}" destesini ve tüm kartlarını ({count}) silmek istediğine emin misin?',
confirm_delete_deck_nested:'"{name}" ve {sub} alt destesi (toplam {count} kart) silinecek. Emin misin?',
confirm_delete_card:'Bu kartı silmek istediğine emin misin?',
confirm_disconnect:'Bu cihazı senkron koddan ayırmak istediğine emin misin? Veriler bu cihazda yerel olarak kalır, ama otomatik senkron durur.',
confirm_reset:'TÜM veri (desteler, kartlar, istatistik) silinecek. Emin misin?',
update_new:'Yeni güncelleme mevcut',update_version:'Sürüm {version}',update_download:'İndir',
update_downloading:'İndiriliyor…',update_ready:'Güncelleme hazır',update_downloaded:'Sürüm {version} indirildi',update_install:'Yeniden Başlat ve Kur',
preview_front:'Ön yüz',preview_back:'Arka yüz',flip_hint:'Kartı çevirmek için sürükle',
keep_stacking:'Keep stacking.',version_tag:'Stacks · v{version}',
study_screen_title:'読む',review_screen_title:'Gözden Geçir',streak_screen_title:'Çalışma Takvimi',
nav_tests:'Sınavlar',custom_tests_title:'Özel Testler',test_editor_title:'Test Düzenleyici',
no_custom_tests:'Henüz özel test yok.',create_test:'Yeni Test Oluştur',untitled_test:'İsimsiz Test',
question_count:'{count} soru',play_test:'Başlat',confirm_delete_test:'Bu testi silmek istediğine emin misin?',
toast_test_deleted:'🗑 Test silindi',toast_test_created:'✓ Test oluşturuldu',toast_test_updated:'✓ Test güncellendi',
test_title_label:'Test Başlığı',test_title_placeholder:'ör: JLPT N3 Pratik',questions_section:'Sorular',
add_question:'Soru Ekle',question_n:'{n}. Soru',question_type:'Tür',question_prompt:'Soru metni',
prompt_placeholder:'ör: 漢字 ne anlama gelir?',question_image:'Görsel (opsiyonel)',remove_image:'Kaldır',
options_label:'Seçenekler (doğruyu işaretle)',option_placeholder:'{n}. seçenek',add_option:'Seçenek ekle',
correct_answer:'Doğru cevap',true_label:'Doğru',false_label:'Yanlış',
fill_answer_placeholder:'Doğru cevabı yaz',
qtype_multiple_choice:'Çoktan Seçmeli',qtype_true_false:'Doğru / Yanlış',qtype_fill_blank:'Boşluk Doldurma',
test_question_of:'{current} / {total}',test_submit:'Gönder',test_no_questions:'Bu testte soru yok.',
test_score:'{score}/{total} doğru',test_your_answer:'Senin cevabın',test_answers_section:'Cevaplar',
test_return_manager:'Testlere Dön',export_test:'Dışa Aktar',import_test:'JSON İçe Aktar',
toast_test_exported:'✓ Test dışa aktarıldı',toast_test_imported:'✓ Test içe aktarıldı: {title}',warn_invalid_test_file:'⚠ Geçersiz test dosyası',
nav_community:'Topluluk',community_title:'Topluluk Desteleri',community_subtitle:'Diğer öğrencilerin paylaştığı desteleri keşfet ve indir.',
community_refresh:'Yenile',community_loading:'Topluluk desteleri yükleniyor…',community_empty:'Henüz topluluk destesi yok. İlk paylaşan sen ol!',
community_error:'Topluluk desteleri yüklenemedi. Bağlantını kontrol edip tekrar dene.',community_download:'İndir',community_by:'paylaşan: {author}',
community_publish:'Paylaş',community_publish_title:'"{name}" destesini paylaş',community_publish_hint:'Bu deste ({count} kart) herkese açık paylaşılacak. SRS ilerlemesi dahil edilmez.',
community_desc_label:'Açıklama',community_desc_ph:'Bu deste ne hakkında?',community_tags_label:'Etiketler',community_tags_ph:'ör: JLPT, N3, kelime',
community_tags_hint:'Etiketleri virgülle ayır (en fazla 8).',community_publish_btn:'Topluluğa Paylaş',
toast_community_published:'✓ Deste toplulukta paylaşıldı',toast_community_downloaded:'✓ İndirildi: {name}',
warn_community_publish:'⚠ Paylaşma başarısız: {msg}',warn_community_fetch:'⚠ İndirme başarısız: {msg}',warn_community_no_cards:'⚠ Bu destede paylaşılacak kart yok',
settings_ai:'AI Öğretmen',ai_section_desc:'Kanji kartlarınız için yapay zeka destekli anımsatıcılar üretmek üzere bir Gemini API anahtarı bağlayın.',ai_api_key:'Gemini API Anahtarı',ai_api_key_placeholder:'API anahtarınızı girin',ai_model:'AI Modeli',
move_deck:'Desteyi Taşı',move_to_label:'Bu desteyi taşı:',move_top_level:'— En üst düzey (üst deste yok) —',toast_deck_moved:'✓ Deste taşındı',warn_move_cycle:'⚠ Bir deste kendi alt destesine taşınamaz',
},
ko: {nav_decks:'덱',nav_add:'카드 추가',nav_settings:'설정',back:'뒤로',update_available:'업데이트 가능',new_deck:'새 덱',my_decks:'내 덱',total_cards:'전체 카드',mastered_label:'마스터',today_label:'오늘',no_decks:'아직 덱이 없습니다.\n위의 +를 눌러 만드세요.',deck_meta:'{total}장 · {mastered} 마스터',sub_decks_count:'{count}개 하위 덱',collapse_decks:'하위 덱 접기',expand_decks:'하위 덱 펼치기',card_preview_title:'카드 미리보기',study_btn:'학습 ({count})',no_cards_to_study:'지금 학습할 카드가 없습니다',detail:'상세',badge_new:'{count} 신규',badge_learning:'{count} 학습 중',badge_review:'{count} 복습',sub_decks_section:'하위 덱 ({count})',add_sub_deck:'하위 덱 추가',stat_new:'신규',stat_learning:'학습 중',stat_due:'오늘 복습',stat_total:'전체',stat_total_all:'전체 (모두)',stat_mastered:'마스터',stat_queue:'대기열',start_study:'학습 시작 ({count})',start_study_all:'학습 시작 ({count}) — 전체',add_card:'카드 추가',delete_btn:'삭제',review_btn:'훑어보기',mastered_banner:'잘 아는 카드',cards_mastered:'{count}장 마스터',list_btn:'목록',cards_section:'카드 ({count})',no_cards_in_deck:'이 덱에 아직 카드가 없습니다.',state_new:'신규',state_learning:'학습 중',state_review:'복습',show_answer:'정답 보기',grade_again:'다시',grade_hard:'어려움',grade_good:'좋음',grade_easy:'쉬움',session_complete:'세션 완료',cards_studied:'{count}장 학습 완료. 오늘 남은: 0.',back_to_deck:'덱으로 돌아가기',review_title:'훑어보기 — 범위 선택',review_info:'이 모드에서는 카드를 훑어보기만 합니다. 답변이 진도나 복습 일정에 영향을 주지 않습니다.',normal_cards:'일반 카드 ({count})',mastered_cards:'잘 아는 카드 ({count})',all_cards:'전체 카드 ({count})',incl_subdecks:' (하위 덱 포함)',cancel:'취소',close:'닫기',back:'뒤로',kanji_detail:'한자 상세',kanji_onyomi:'음독 (On\'yomi)',kanji_kunyomi:'훈독 (Kun\'yomi)',kanji_not_found:'이 문자에 대한 상세 정보가 아직 없습니다.',kanji_meaning_en:'의미 (En)',msg_ai_key_missing:'먼저 설정에서 Gemini API 키를 설정하세요.',msg_ai_loading:'생각 중...',word_detail_title:'단어 상세',word_ai_meaning:'🧠 문맥적 의미',word_kanji_breakdown:'한자 분석',btn_ai_deck:'✨ AI 덱',modal_ai_deck_title:'AI 덱 생성',ai_deck_placeholder:'예: JLPT N4 여행 동사',ai_generating:'생성 중...',toast_ai_deck_success:'{count}장의 카드로 AI 덱을 만들었습니다! ✨',no_cards_scope:'이 범위에 카드가 없습니다',browse_badge:'훑어보기',prev_card:'이전',next_card:'다음',no_cards_to_show:'표시할 카드가 없습니다.',add_card_title:'카드 추가',target_deck:'대상 덱',kanji_label:'한자 / 단어',kanji_placeholder:'예: 漢字',furigana_label:'후리가나 (읽기)',furigana_placeholder:'예: かんじ',furigana_auto_placeholder:'자동 생성하려면 비워 두세요',meaning_label:'의미',meaning_placeholder:'예: 한자, 중국 문자',example_jp_label:'예문 (일본어)',example_jp_placeholder:'예: 毎日漢字を勉強します。',mark_words_btn:'단어 표시 (후리가나 추가)',example_tr_label:'예문 번역 (선택사항)',example_tr_placeholder:'예: 매일 한자를 공부합니다.',save:'저장',bulk_import_title:'일괄 가져오기',card_list:'카드 목록',bulk_format:'형식: 단어 | 의미 | 예문 JP (선택) | 예문 번역 (선택)',import_btn:'가져오기',create_deck_first:'먼저 덱을 만드세요',settings_lang:'언어',settings_theme:'테마',settings_sync:'기기 간 동기화',settings_srs:'SRS 설정',settings_backup:'백업',backup_desc:'모든 데이터(덱, 카드, SRS 상태)를 JSON으로 다운로드하거나 업로드합니다.',export_btn:'내보내기',import_data_btn:'가져오기',storage_warning_title:'이 세션에서 데이터가 유지되지 않습니다',storage_warning_text:'localStorage에 접근할 수 없습니다. 앱을 .html로 다운로드하여 로컬 브라우저에서 열면 데이터가 유지됩니다.',danger_zone:'위험 구역',reset_all:'모든 데이터 초기화',follow_system:'시스템 테마 따르기',follow_system_desc:'기기 다크 모드가 켜져 있으면 Sumi가 자동 선택됩니다',on:'켜기',off:'끄기',srs_steps:'학습 단계 (분)',srs_steps_hint:'쉼표로 구분, 예: 1, 10',srs_grad:'졸업 간격 (일)',srs_grad_hint:'좋음으로 졸업',srs_easy_iv:'쉬움 간격 (일)',srs_easy_iv_hint:'쉬움으로 졸업',srs_ease:'기본 ease',srs_ease_hint:'1.3–5.0',srs_easy_bonus:'쉬움 보너스',srs_easy_bonus_hint:'간격 배수',srs_mastery:'마스터 기준 (일)',srs_mastery_hint:'이 간격에서 ⭐',srs_daily:'일일 신규 카드 제한',srs_daily_hint:'0 = 무제한',srs_fuzz:'랜덤 퍼지',srs_fuzz_hint:'간격에 ±5%',srs_shield:'자동 방패 사용',srs_shield_hint:'놓친 날 연속 기록 보호',save_settings:'설정 저장',info_steps:'새 카드를 처음 학습할 때 이 순서로 표시됩니다(분). 예: "1, 10": 다시를 누르면 1분 후, 좋음을 누르면 다음 단계(10분)로 이동합니다.',info_grad:'카드가 좋음으로 마지막 학습 단계를 통과하면 다음 복습까지의 일수를 결정합니다. Anki 기본값은 1일입니다.',info_easy_iv:'새 카드에서 쉬움을 누르면 학습 단계를 건너뛰고 이 일수만큼 예약됩니다.',info_ease:'각 정답 복습에서 간격이 얼마나 늘어나는지 결정하는 배수입니다. Anki 기본값은 2.5(250%)입니다.',info_easy_bonus:'복습 모드에서 쉬움을 누르면 좋음 간격에 이 배수가 적용됩니다. 1.3은 좋음보다 30% 더 긴 간격입니다.',info_mastery:'카드의 간격이 이 일수에 도달하면 자동으로 "잘 아는 카드"로 이동합니다.',info_daily:'하루에 학습 대기열에 들어가는 신규 카드 수를 제한합니다. 0은 무제한입니다.',info_fuzz:'켜면 계산된 간격에 작은 무작위성(±5%)을 추가하여 같은 날 추가된 카드가 모두 같은 날에 몰리지 않게 합니다.',info_shield:'하루를 완전히 놓치고 방패가 있으면 켜져 있을 때 자동으로 방패를 사용하여 연속 기록을 보호합니다.',streak_days:'{count}일 연속',shields_have:'방패 {count}개',streak_msg_blaze:'전설적인 연속! 🔥',streak_msg_hot:'불꽃이 커지고 있어요!',streak_msg_warm:'좋은 템포를 유지하고 있어요',streak_msg_cold:'매일 조금씩 공부하면 불꽃이 커져요',day_unit:'일',shield_text:'개의 방패 — 하루를 놓치면 자동으로 연속 기록을 보호합니다.',prev_month:'이전 달',next_month:'다음 달',legend_studied:'학습함',legend_shielded:'방패 사용',months:'1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월',weekdays_short:'월,화,수,목,금,토,일',weekdays_cal:'월,화,수,목,금,토,일',months_short:'1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월',daily_cards_studied:'학습한 카드',daily_time_spent:'오늘 (분)',cal_cards_studied:'학습한 카드: {count}',cal_time_spent:'사용 시간: {count}분',cal_decks_studied:'학습한 덱: {decks}',cal_no_activity:'이 날에는 활동이 없습니다',
heatmap_title:'활동',heatmap_longest:'최장 연속: {count}',heatmap_year_total:'지난 1년간 {count}회 복습',heatmap_tooltip:'{count}회 복습 · {date}',heatmap_none:'복습 없음 · {date}',heatmap_less:'적음',heatmap_more:'많음',forecast_title:'7일 복습 예측',sync_not_configured:'클라우드 동기화가 아직 설정되지 않았습니다.',sync_dev_note:'개발자 참고: index.html에서 SUPABASE_URL과 SUPABASE_ANON_KEY를 입력하세요.',sync_connected:'연결된 코드:',sync_share_hint:'다른 기기에서 같은 코드를 입력하면 카드를 볼 수 있습니다.',sync_now:'지금 동기화',sync_disconnect:'연결 해제',sync_create_hint:'기기 간 자동 동기화를 위한 코드를 만들고 다른 기기에서도 같은 코드를 입력하세요.',sync_create:'새 코드 만들기',sync_or_enter:'또는 기존 코드 입력',sync_code_placeholder:'예: 482913',sync_connect:'이 코드로 연결',modal_rename:'덱 이름 변경',modal_new_name:'새 이름',modal_deck_name:'덱 이름',modal_deck_placeholder:'예: JLPT N3 한자',modal_create_deck:'새 덱 만들기',modal_parent_deck:'상위 덱 (선택사항)',modal_independent:'— 독립 (최상위) —',modal_add_subdeck:'{name} — 하위 덱 추가',modal_subdeck_name:'하위 덱 이름',modal_subdeck_placeholder:'예: 음식',create:'만들기',modal_edit_card:'카드 편집',edit_label:'편집',toast_card_added:'✓ 카드 추가됨: {kanji}',toast_cards_imported:'✓ {added}장 가져옴{skipped}',toast_skipped:', {count}줄 건너뜀',toast_deck_created:'✓ 덱 생성됨: {name}',toast_deck_renamed:'✓ 덱 이름 업데이트됨',toast_card_updated:'✓ 카드 업데이트됨',toast_deck_deleted:'🗑 덱 삭제됨',toast_card_deleted:'🗑 카드 삭제됨',toast_settings_saved:'✓ 설정 저장됨',toast_exported:'✓ 데이터 내보내기 완료',toast_imported:'✓ 데이터 가져옴: {count}개 덱',toast_reset:'✓ 모든 데이터 초기화됨',toast_synced:'✓ 동기화됨',toast_sync_code:'✓ 코드 생성됨: {code}',toast_sync_connected:'✓ 연결 및 동기화됨',toast_disconnected:'연결 해제됨',toast_mastered:'⭐ {kanji} → 잘 아는 카드!',toast_shield_used:'🛡 방패 {count}개 사용, 연속 기록 보호됨',toast_shield_earned:'🛡 1주일 완주, +1 방패!',toast_storage_warning:'⚠ 이 세션에서 데이터가 유지되지 않습니다',warn_required:'⚠ 단어와 의미는 필수입니다',warn_deck_not_found:'⚠ 덱을 찾을 수 없습니다',warn_name_empty:'⚠ 이름을 입력하세요',warn_invalid_steps:'⚠ 잘못된 단계 값',warn_invalid_code:'⚠ 유효한 코드를 입력하세요 (4-8자리)',warn_sync_not_configured:'⚠ 클라우드 동기화 미설정',warn_sync_error:'⚠ 동기화 오류: {msg}',warn_import_error:'⚠ 가져오기 오류: {msg}',warn_error:'⚠ 오류: {msg}',confirm_delete_deck:'"{name}"과 모든 카드({count})를 삭제하시겠습니까?',confirm_delete_deck_nested:'"{name}"과 {sub}개 하위 덱 (총 {count}장)이 삭제됩니다. 확인하시겠습니까?',confirm_delete_card:'이 카드를 삭제하시겠습니까?',confirm_disconnect:'이 동기화 코드에서 연결을 해제하시겠습니까? 데이터는 로컬에 유지되지만 자동 동기화가 중지됩니다.',confirm_reset:'모든 데이터(덱, 카드, 통계)가 삭제됩니다. 확인하시겠습니까?',update_new:'새 업데이트 가능',update_version:'버전 {version}',update_download:'다운로드',update_downloading:'다운로드 중…',update_ready:'업데이트 준비 완료',update_downloaded:'버전 {version} 다운로드됨',update_install:'재시작 및 설치',preview_front:'앞면',preview_back:'뒷면',flip_hint:'드래그하여 뒤집기',keep_stacking:'Keep stacking.',version_tag:'Stacks · v{version}',study_screen_title:'読む',review_screen_title:'훑어보기',streak_screen_title:'학습 캘린더',
nav_search:'검색',search_placeholder:'모든 덱에서 검색…',search_filter_all:'전체',search_filter_kanji:'한자 / 단어',search_filter_meaning:'의미',search_filter_example:'예문',search_no_results:'카드를 찾을 수 없습니다.',search_empty_state:'모든 덱에서 검색하려면 입력하세요…',search_found:'{count}장 발견',
nav_tests:'시험',custom_tests_title:'맞춤 테스트',test_editor_title:'테스트 편집기',
no_custom_tests:'맞춤 테스트가 아직 없습니다.',create_test:'새 테스트 만들기',untitled_test:'제목 없는 테스트',
question_count:'{count}개 질문',play_test:'시작',confirm_delete_test:'이 테스트를 삭제하시겠습니까?',
toast_test_deleted:'🗑 테스트 삭제됨',toast_test_created:'✓ 테스트 생성됨',toast_test_updated:'✓ 테스트 업데이트됨',
test_title_label:'테스트 제목',test_title_placeholder:'예: JLPT N3 연습',questions_section:'질문',
add_question:'질문 추가',question_n:'{n}번 질문',question_type:'유형',question_prompt:'질문 내용',
prompt_placeholder:'예: 漢字의 뜻은?',question_image:'이미지 (선택)',remove_image:'삭제',
options_label:'선택지 (정답 선택)',option_placeholder:'{n}번 선택지',add_option:'선택지 추가',
correct_answer:'정답',true_label:'참',false_label:'거짓',
fill_answer_placeholder:'정답을 입력하세요',
qtype_multiple_choice:'객관식',qtype_true_false:'참 / 거짓',qtype_fill_blank:'빈칸 채우기',
test_question_of:'{current} / {total}',test_submit:'제출',test_no_questions:'이 테스트에 질문이 없습니다.',
test_score:'{score}/{total} 정답',test_your_answer:'내 답변',test_answers_section:'답변',
test_return_manager:'테스트 목록으로',export_test:'내보내기',import_test:'JSON 가져오기',
toast_test_exported:'✓ 테스트 내보내기 완료',toast_test_imported:'✓ 테스트 가져옴: {title}',warn_invalid_test_file:'⚠ 잘못된 테스트 파일',
nav_community:'커뮤니티',community_title:'커뮤니티 덱',community_subtitle:'다른 학습자가 공유한 덱을 둘러보고 다운로드하세요.',
community_refresh:'새로고침',community_loading:'커뮤니티 덱을 불러오는 중…',community_empty:'아직 커뮤니티 덱이 없습니다. 처음으로 공유해 보세요!',
community_error:'커뮤니티 덱을 불러올 수 없습니다. 연결을 확인하고 다시 시도하세요.',community_download:'다운로드',community_by:'{author} 제공',
community_publish:'공유',community_publish_title:'"{name}" 공유',community_publish_hint:'이 덱({count}장)이 공개적으로 공유됩니다. SRS 진행 상황은 포함되지 않습니다.',
community_desc_label:'설명',community_desc_ph:'이 덱은 어떤 내용인가요?',community_tags_label:'태그',community_tags_ph:'예: JLPT, N3, 어휘',
community_tags_hint:'태그는 쉼표로 구분하세요 (최대 8개).',community_publish_btn:'커뮤니티에 공유',
toast_community_published:'✓ 덱이 커뮤니티에 공유되었습니다',toast_community_downloaded:'✓ 다운로드됨: {name}',
warn_community_publish:'⚠ 공유 실패: {msg}',warn_community_fetch:'⚠ 다운로드 실패: {msg}',warn_community_no_cards:'⚠ 이 덱에는 공유할 카드가 없습니다',
settings_ai:'AI 선생님',ai_section_desc:'한자 카드에 AI 기반 기억술을 생성하려면 Gemini API 키를 연결하세요.',ai_api_key:'Gemini API 키',ai_api_key_placeholder:'API 키를 입력하세요',ai_model:'AI 모델',
move_deck:'덱 이동',move_to_label:'이 덱을 이동할 위치:',move_top_level:'— 최상위 (상위 덱 없음) —',toast_deck_moved:'✓ 덱 이동됨',warn_move_cycle:'⚠ 덱을 자신의 하위 덱으로 이동할 수 없습니다',
},
mn: {nav_decks:'Багцууд',nav_add:'Карт нэмэх',nav_settings:'Тохиргоо',back:'Буцах',update_available:'Шинэчлэл бий',new_deck:'Шинэ багц',my_decks:'Миний багцууд',total_cards:'Нийт карт',mastered_label:'Эзэмшсэн',today_label:'Өнөөдөр',no_decks:'Багц алга.\nДээрх + товч дарж үүсгэнэ үү.',deck_meta:'{total} карт · {mastered} эзэмшсэн',sub_decks_count:'{count} дэд багц',collapse_decks:'Дэд багц хураах',expand_decks:'Дэд багц дэлгэх',card_preview_title:'Картын урьдчилсан харагдац',study_btn:'Сурах ({count})',no_cards_to_study:'Одоогоор суралцах карт алга',detail:'Дэлгэрэнгүй',badge_new:'{count} шинэ',badge_learning:'{count} суралцаж буй',badge_review:'{count} давталт',sub_decks_section:'Дэд багцууд ({count})',add_sub_deck:'Дэд багц нэмэх',stat_new:'Шинэ',stat_learning:'Суралцаж буй',stat_due:'Өнөөдөр давтах',stat_total:'Нийт',stat_total_all:'Нийт (бүгд)',stat_mastered:'Эзэмшсэн',stat_queue:'Дараалалд',start_study:'Суралцаж эхлэх ({count})',start_study_all:'Суралцаж эхлэх ({count}) — бүгд',add_card:'Карт нэмэх',delete_btn:'Устгах',review_btn:'Тойм',mastered_banner:'Сайн мэдэх',cards_mastered:'{count} карт эзэмшсэн',list_btn:'Жагсаалт',cards_section:'Картууд ({count})',no_cards_in_deck:'Энэ багцад карт алга.',state_new:'Шинэ',state_learning:'Суралцаж буй',state_review:'Давталт',show_answer:'Хариултыг харуулах',grade_again:'Дахин',grade_hard:'Хэцүү',grade_good:'Сайн',grade_easy:'Амархан',session_complete:'Хичээл дууслаа',cards_studied:'{count} карт судалсан. Өнөөдөр үлдсэн: 0.',back_to_deck:'Багц руу буцах',review_title:'Тойм — Хүрээ сонгох',review_info:'Энэ горимд зөвхөн картуудыг тойм харна; таны хариулт явцад нөлөөлөхгүй.',normal_cards:'Энгийн карт ({count})',mastered_cards:'Сайн мэдэх ({count})',all_cards:'Бүх карт ({count})',incl_subdecks:' (дэд багц орсон)',cancel:'Цуцлах',close:'Хаах',back:'Буцах',kanji_detail:'Ханзны дэлгэрэнгүй',kanji_onyomi:'Онёми (On\'yomi)',kanji_kunyomi:'Кунёми (Kun\'yomi)',kanji_not_found:'Энэ тэмдэгтийн мэдээлэл одоогоор алга.',kanji_meaning_en:'Утга (En)',msg_ai_key_missing:'Эхлээд Тохиргооноос Gemini API түлхүүрээ тохируулна уу.',msg_ai_loading:'Бодож байна...',word_detail_title:'Үгийн дэлгэрэнгүй',word_ai_meaning:'🧠 Контекст утга',word_kanji_breakdown:'Ханз задаргаа',btn_ai_deck:'✨ AI Багц',modal_ai_deck_title:'AI Багц Үүсгэх',ai_deck_placeholder:'жишээ нь: JLPT N4 Аялалын үйл үг',ai_generating:'Үүсгэж байна...',toast_ai_deck_success:'{count} карттай AI багц үүслээ! ✨',no_cards_scope:'Энэ хүрээнд карт алга',browse_badge:'Тойм',prev_card:'Өмнөх',next_card:'Дараах',no_cards_to_show:'Харуулах карт алга.',add_card_title:'Карт нэмэх',target_deck:'Зорилтот багц',kanji_label:'Ханз / Үг',kanji_placeholder:'ж.нь: 漢字',furigana_label:'Фуригана (уншлага)',furigana_placeholder:'ж.нь: かんじ',furigana_auto_placeholder:'Автоматаар үүсгэхийн тулд хоосон үлдээнэ үү',meaning_label:'Утга',meaning_placeholder:'ж.нь: ханз, хятад тэмдэгт',example_jp_label:'Жишээ өгүүлбэр (Япон)',example_jp_placeholder:'ж.нь: 毎日漢字を勉強します。',mark_words_btn:'Үг тэмдэглэх (фуригана нэмэх)',example_tr_label:'Жишээ орчуулга (сонголттой)',example_tr_placeholder:'ж.нь: Өдөр бүр ханз сурдаг.',save:'Хадгалах',bulk_import_title:'Бөөнөөр оруулах',card_list:'Картын жагсаалт',bulk_format:'Формат: Үг | Утга | Жишээ JP (сонголт) | Орчуулга (сонголт)',import_btn:'Оруулах',create_deck_first:'Эхлээд багц үүсгэнэ үү',settings_lang:'Хэл',settings_theme:'Харагдах байдал',settings_sync:'Төхөөрөмж хоорондын синк',settings_srs:'SRS тохиргоо',settings_backup:'Нөөцлөл',backup_desc:'Бүх өгөгдлийг (багц, карт, SRS төлөв) JSON хэлбэрээр татах эсвэл ачаалах.',export_btn:'Экспорт',import_data_btn:'Импорт',storage_warning_title:'Өгөгдөл энэ сессэд хадгалагдахгүй',storage_warning_text:'localStorage руу хандах боломжгүй. Аппыг .html байдлаар татаж локал браузерт нээвэл өгөгдөл хадгалагдана.',danger_zone:'Аюултай бүс',reset_all:'Бүх өгөгдлийг арилгах',follow_system:'Системийн загвар дагах',follow_system_desc:'Төхөөрөмжийн харанхуй горим асвал Sumi автоматаар сонгогдоно',on:'Асаах',off:'Унтраах',srs_steps:'Суралцах алхам (мин)',srs_steps_hint:'Таслалаар тусгаарла, ж.нь: 1, 10',srs_grad:'Төгсөлтийн интервал (өдөр)',srs_grad_hint:'Сайн-аар төгсөх',srs_easy_iv:'Амархан интервал (өдөр)',srs_easy_iv_hint:'Амархан-аар төгсөх',srs_ease:'Үндсэн ease',srs_ease_hint:'1.3–5.0',srs_easy_bonus:'Амархан бонус',srs_easy_bonus_hint:'Интервал үржвэр',srs_mastery:'Эзэмшлийн босго (өдөр)',srs_mastery_hint:'Энэ интервалд ⭐',srs_daily:'Өдрийн шинэ карт хязгаар',srs_daily_hint:'0 = хязгааргүй',srs_fuzz:'Санамсаргүй fuzz',srs_fuzz_hint:'Интервалд ±5%',srs_shield:'Автомат бамбай хэрэглэх',srs_shield_hint:'Өдөр алгасахад цувааг хамгаална',save_settings:'Тохиргоо хадгалах',info_steps:'Шинэ картыг анх суралцахад энэ дарааллаар харуулна (минут). Жишээ "1, 10": Дахин гэвэл 1 минутын дараа, Сайн гэвэл дараагийн алхам руу шилжинэ.',info_grad:'Карт сүүлийн алхамыг Сайн-аар давахад дараагийн давталт хүртэл хэдэн өдөр хүлээхийг тодорхойлно. Anki анхдагч: 1 өдөр.',info_easy_iv:'Шинэ картад Амархан дарвал суралцах алхмуудыг алгасаж энэ хэдэн өдрийн дараа товлогдоно.',info_ease:'Зөв давталт бүрт интервал хэр өснийг тодорхойлох үржвэр. Anki анхдагч: 2.5 (250%).',info_easy_bonus:'Давталт горимд Амархан дарахад Сайн интервал дээр нэмэгдэх үржвэр. 1.3 гэвэл Сайн-аас 30% урт.',info_mastery:'Картын интервал энэ өдрийн тоонд хүрэхэд автоматаар "Сайн мэдэх" руу шилжинэ.',info_daily:'Өдөрт суралцах дараалалд нэвтрэх ШИНЭ картын тоог хязгаарлана. 0 = хязгааргүй.',info_fuzz:'Асвал тооцоолсон интервалд жижиг санамсаргүй байдал (±5%) нэмнэ.',info_shield:'Өдөр бүтнээрээ алгасч бамбай байвал асаалттай үед бамбай автоматаар хэрэглэгдэж цуваа хамгаалагдана.',streak_days:'{count} өдрийн цуваа',shields_have:'{count} бамбай бий',streak_msg_blaze:'Домогт цуваа! 🔥',streak_msg_hot:'Гал томорч байна, үргэлжлүүл!',streak_msg_warm:'Сайн хурдаар явж байна',streak_msg_cold:'Өдөр бүр бага зэрэг сур, галыг өсгө',day_unit:'өдөр',shield_text:'бамбай — өдөр алгасвал цувааг автоматаар хамгаална.',prev_month:'Өмнөх сар',next_month:'Дараа сар',legend_studied:'Суралцсан',legend_shielded:'Бамбай хэрэглэсэн',months:'1-р сар,2-р сар,3-р сар,4-р сар,5-р сар,6-р сар,7-р сар,8-р сар,9-р сар,10-р сар,11-р сар,12-р сар',weekdays_short:'Да,Мя,Лх,Пү,Ба,Бя,Ня',weekdays_cal:'Да,Мя,Лх,Пү,Ба,Бя,Ня',months_short:'1,2,3,4,5,6,7,8,9,10,11,12',daily_cards_studied:'Судалсан карт',daily_time_spent:'Өнөөдөр (мин)',cal_cards_studied:'Судалсан карт: {count}',cal_time_spent:'Зарцуулсан хугацаа: {count} мин',cal_decks_studied:'Судалсан багц: {decks}',cal_no_activity:'Энэ өдөр идэвхгүй',
heatmap_title:'Идэвх',heatmap_longest:'Хамгийн урт цуваа: {count}',heatmap_year_total:'Сүүлийн нэг жилд {count} давталт',heatmap_tooltip:'{count} давталт · {date}',heatmap_none:'Давталт алга · {date}',heatmap_less:'Бага',heatmap_more:'Их',forecast_title:'7 хоногийн давталтын урьдчилсан таамаг',sync_not_configured:'Клоуд синк тохируулагдаагүй.',sync_dev_note:'Хөгжүүлэгчийн тэмдэглэл: index.html-д SUPABASE_URL болон SUPABASE_ANON_KEY оруулна уу.',sync_connected:'Холбогдсон код:',sync_share_hint:'Өөр төхөөрөмжид ижил кодыг оруулж картуудаа харах боломжтой.',sync_now:'Одоо синк хийх',sync_disconnect:'Салгах',sync_create_hint:'Төхөөрөмж хооронд автомат синк хийх код үүсгэж нөгөө төхөөрөмжид ижил кодыг оруулна уу.',sync_create:'Шинэ код үүсгэх',sync_or_enter:'Эсвэл байгаа код оруулах',sync_code_placeholder:'ж.нь: 482913',sync_connect:'Энэ кодоор холбогдох',modal_rename:'Багцыг нэрлэх',modal_new_name:'Шинэ нэр',modal_deck_name:'Багцын нэр',modal_deck_placeholder:'ж.нь: JLPT N3 Ханз',modal_create_deck:'Шинэ багц үүсгэх',modal_parent_deck:'Эх багц (сонголттой)',modal_independent:'— Бие даасан (дээд түвшин) —',modal_add_subdeck:'{name} — Дэд багц нэмэх',modal_subdeck_name:'Дэд багцын нэр',modal_subdeck_placeholder:'ж.нь: Хүнс',create:'Үүсгэх',modal_edit_card:'Карт засах',edit_label:'Засах',toast_card_added:'✓ Карт нэмэгдлээ: {kanji}',toast_cards_imported:'✓ {added} карт оруулсан{skipped}',toast_skipped:', {count} мөр алгассан',toast_deck_created:'✓ Багц үүсгэлээ: {name}',toast_deck_renamed:'✓ Багцын нэр шинэчлэгдлээ',toast_card_updated:'✓ Карт шинэчлэгдлээ',toast_deck_deleted:'🗑 Багц устгагдлаа',toast_card_deleted:'🗑 Карт устгагдлаа',toast_settings_saved:'✓ Тохиргоо хадгалагдлаа',toast_exported:'✓ Өгөгдөл экспортлогдлоо',toast_imported:'✓ Өгөгдөл оруулсан: {count} багц',toast_reset:'✓ Бүх өгөгдөл арилгагдлаа',toast_synced:'✓ Синк хийгдлээ',toast_sync_code:'✓ Код үүсгэлээ: {code}',toast_sync_connected:'✓ Холбогдож синк хийгдлээ',toast_disconnected:'Салгагдлаа',toast_mastered:'⭐ {kanji} → Сайн мэдэх!',toast_shield_used:'🛡 {count} бамбай хэрэглэгдлээ, цуваа хамгаалагдлаа',toast_shield_earned:'🛡 Бүтэн 7 хоног дууслаа, +1 бамбай!',toast_storage_warning:'⚠ Өгөгдөл энэ сессэд хадгалагдахгүй',warn_required:'⚠ Үг болон утга заавал шаардлагатай',warn_deck_not_found:'⚠ Багц олдсонгүй',warn_name_empty:'⚠ Нэр хоосон байж болохгүй',warn_invalid_steps:'⚠ Алхамын утга буруу',warn_invalid_code:'⚠ Зөв код оруулна уу (4-8 оронтой)',warn_sync_not_configured:'⚠ Клоуд синк тохируулагдаагүй',warn_sync_error:'⚠ Синк алдаа: {msg}',warn_import_error:'⚠ Импорт алдаа: {msg}',warn_error:'⚠ Алдаа: {msg}',confirm_delete_deck:'"{name}" багц болон бүх картуудыг ({count}) устгах уу?',confirm_delete_deck_nested:'"{name}" болон {sub} дэд багц (нийт {count} карт) устгагдана. Итгэлтэй байна уу?',confirm_delete_card:'Энэ картыг устгах уу?',confirm_disconnect:'Энэ синк кодоос салгах уу? Өгөгдөл локалд үлдэнэ, гэхдээ автомат синк зогсоно.',confirm_reset:'БҮХ өгөгдөл (багц, карт, статистик) устгагдана. Итгэлтэй байна уу?',update_new:'Шинэ шинэчлэл бий',update_version:'Хувилбар {version}',update_download:'Татах',update_downloading:'Татаж байна…',update_ready:'Шинэчлэл бэлэн',update_downloaded:'Хувилбар {version} татагдлаа',update_install:'Дахин эхлүүлж суулгах',preview_front:'Урд тал',preview_back:'Ар тал',flip_hint:'Чирж эргүүлэх',keep_stacking:'Keep stacking.',version_tag:'Stacks · v{version}',study_screen_title:'読む',review_screen_title:'Тойм',streak_screen_title:'Суралцах хуанли',
nav_search:'Хайлт',search_placeholder:'Бүх багцаас хайх…',search_filter_all:'Бүх талбар',search_filter_kanji:'Ханз / Үг',search_filter_meaning:'Утга',search_filter_example:'Жишээ',search_no_results:'Карт олдсонгүй.',search_empty_state:'Бүх багцаас хайхын тулд бичнэ үү…',search_found:'{count} карт олдлоо',
nav_tests:'Шалгалт',custom_tests_title:'Тест',test_editor_title:'Тест засварлагч',
no_custom_tests:'Тест алга.',create_test:'Шинэ тест үүсгэх',untitled_test:'Нэргүй тест',
question_count:'{count} асуулт',play_test:'Эхлэх',confirm_delete_test:'Энэ тестийг устгах уу?',
toast_test_deleted:'🗑 Тест устгагдлаа',toast_test_created:'✓ Тест үүсгэлээ',toast_test_updated:'✓ Тест шинэчлэгдлээ',
test_title_label:'Тестийн нэр',test_title_placeholder:'ж.нь: JLPT N3 дасгал',questions_section:'Асуултууд',
add_question:'Асуулт нэмэх',question_n:'{n}-р асуулт',question_type:'Төрөл',question_prompt:'Асуултын текст',
prompt_placeholder:'ж.нь: 漢字 гэдэг юу вэ?',question_image:'Зураг (сонголттой)',remove_image:'Хасах',
options_label:'Сонголтууд (зөвийг сонго)',option_placeholder:'{n}-р сонголт',add_option:'Сонголт нэмэх',
correct_answer:'Зөв хариулт',true_label:'Үнэн',false_label:'Худал',
fill_answer_placeholder:'Зөв хариултыг бичнэ үү',
qtype_multiple_choice:'Олон сонголттой',qtype_true_false:'Үнэн / Худал',qtype_fill_blank:'Хоосон нөхөх',
test_question_of:'{current} / {total}',test_submit:'Илгээх',test_no_questions:'Энэ тестэд асуулт алга.',
test_score:'{score}/{total} зөв',test_your_answer:'Таны хариулт',test_answers_section:'Хариултууд',
test_return_manager:'Тест рүү буцах',export_test:'Экспорт',import_test:'JSON импорт',
toast_test_exported:'✓ Тест экспортлогдлоо',toast_test_imported:'✓ Тест импортлогдлоо: {title}',warn_invalid_test_file:'⚠ Буруу тест файл',
nav_community:'Нийгэмлэг',community_title:'Нийгэмлэгийн багцууд',community_subtitle:'Бусад суралцагчдын хуваалцсан багцуудыг үзэж татаж аваарай.',
community_refresh:'Сэргээх',community_loading:'Нийгэмлэгийн багцуудыг ачаалж байна…',community_empty:'Одоогоор нийгэмлэгийн багц алга. Хамгийн түрүүнд хуваалцаарай!',
community_error:'Нийгэмлэгийн багцуудыг ачаалж чадсангүй. Холболтоо шалгаад дахин оролдоно уу.',community_download:'Татах',community_by:'{author} хуваалцсан',
community_publish:'Хуваалцах',community_publish_title:'"{name}"-ийг хуваалцах',community_publish_hint:'Энэ багц ({count} карт) нийтэд хуваалцагдана. SRS явц орохгүй.',
community_desc_label:'Тайлбар',community_desc_ph:'Энэ багц юуны тухай вэ?',community_tags_label:'Шошго',community_tags_ph:'ж.нь: JLPT, N3, үгсийн сан',
community_tags_hint:'Шошгыг таслалаар тусгаарла (дээд тал нь 8).',community_publish_btn:'Нийгэмлэгт хуваалцах',
toast_community_published:'✓ Багц нийгэмлэгт хуваалцагдлаа',toast_community_downloaded:'✓ Татагдлаа: {name}',
warn_community_publish:'⚠ Хуваалцаж чадсангүй: {msg}',warn_community_fetch:'⚠ Татаж чадсангүй: {msg}',warn_community_no_cards:'⚠ Энэ багцад хуваалцах карт алга',
settings_ai:'AI Багш',ai_section_desc:'Ханзны картуудад AI тусламжтай санах аргуудыг үүсгэхийн тулд Gemini API түлхүүрээ холбоно уу.',ai_api_key:'Gemini API түлхүүр',ai_api_key_placeholder:'API түлхүүрээ оруулна уу',ai_model:'AI Модель',
move_deck:'Багц зөөх',move_to_label:'Энэ багцыг зөөх:',move_top_level:'— Дээд түвшин (эх багцгүй) —',toast_deck_moved:'✓ Багц зөөгдлөө',warn_move_cycle:'⚠ Багцыг өөрийн дэд багц руу зөөх боломжгүй',
},
};

const EXAMPLE_DECKS = {
en:{name:'JLPT N3 Kanji (Sample)',cards:[{kanji:'漢字',furigana:'かんじ',meaning:'kanji, Chinese character',exJp:'毎日漢字を勉強します。',exTr:'I study kanji every day.'},{kanji:'水',furigana:'みず',meaning:'water',exJp:'水を飲みます。',exTr:'I drink water.'},{kanji:'食べる',furigana:'たべる',meaning:'to eat',exJp:'パンを食べる。',exTr:'I eat bread.'},{kanji:'学校',furigana:'がっこう',meaning:'school',exJp:'学校に行きます。',exTr:'I go to school.'},{kanji:'友達',furigana:'ともだち',meaning:'friend',exJp:'友達と遊びます。',exTr:'I play with my friend.'},{kanji:'電車',furigana:'でんしゃ',meaning:'train',exJp:'電車で来ました。',exTr:'I came by train.'},{kanji:'仕事',furigana:'しごと',meaning:'work, job',exJp:'仕事が終わりました。',exTr:'Work is done.'},{kanji:'勉強',furigana:'べんきょう',meaning:'study',exJp:'毎日勉強しています。',exTr:'I study every day.'},]},
tr:{name:'JLPT N3 Kanji (Örnek)',cards:[{kanji:'漢字',furigana:'かんじ',meaning:'kanji, Çince karakter',exJp:'毎日漢字を勉強します。',exTr:'Her gün kanji çalışıyorum.'},{kanji:'水',furigana:'みず',meaning:'su',exJp:'水を飲みます。',exTr:'Su içiyorum.'},{kanji:'食べる',furigana:'たべる',meaning:'yemek (fiil)',exJp:'パンを食べる。',exTr:'Ekmek yerim.'},{kanji:'学校',furigana:'がっこう',meaning:'okul',exJp:'学校に行きます。',exTr:'Okula gidiyorum.'},{kanji:'友達',furigana:'ともだち',meaning:'arkadaş',exJp:'友達と遊びます。',exTr:'Arkadaşımla oynuyorum.'},{kanji:'電車',furigana:'でんしゃ',meaning:'tren',exJp:'電車で来ました。',exTr:'Trenle geldim.'},{kanji:'仕事',furigana:'しごと',meaning:'iş',exJp:'仕事が終わりました。',exTr:'İş bitti.'},{kanji:'勉強',furigana:'べんきょう',meaning:'çalışmak',exJp:'毎日勉強しています。',exTr:'Her gün ders çalışıyorum.'},]},
ko:{name:'JLPT N3 한자 (샘플)',cards:[{kanji:'漢字',furigana:'かんじ',meaning:'한자, 중국 문자',exJp:'毎日漢字を勉強します。',exTr:'매일 한자를 공부합니다.'},{kanji:'水',furigana:'みず',meaning:'물',exJp:'水を飲みます。',exTr:'물을 마십니다.'},{kanji:'食べる',furigana:'たべる',meaning:'먹다',exJp:'パンを食べる。',exTr:'빵을 먹습니다.'},{kanji:'学校',furigana:'がっこう',meaning:'학교',exJp:'学校に行きます。',exTr:'학교에 갑니다.'},{kanji:'友達',furigana:'ともだち',meaning:'친구',exJp:'友達と遊びます。',exTr:'친구와 놀아요.'},{kanji:'電車',furigana:'でんしゃ',meaning:'전철',exJp:'電車で来ました。',exTr:'전철로 왔습니다.'},{kanji:'仕事',furigana:'しごと',meaning:'일, 직업',exJp:'仕事が終わりました。',exTr:'일이 끝났습니다.'},{kanji:'勉強',furigana:'べんきょう',meaning:'공부',exJp:'毎日勉強しています。',exTr:'매일 공부하고 있습니다.'},]},
mn:{name:'JLPT N3 Ханз (Жишээ)',cards:[{kanji:'漢字',furigana:'かんじ',meaning:'ханз, хятад тэмдэгт',exJp:'毎日漢字を勉強します。',exTr:'Өдөр бүр ханз сурдаг.'},{kanji:'水',furigana:'みず',meaning:'ус',exJp:'水を飲みます。',exTr:'Ус уудаг.'},{kanji:'食べる',furigana:'たべる',meaning:'идэх',exJp:'パンを食べる。',exTr:'Талх иднэ.'},{kanji:'学校',furigana:'がっこう',meaning:'сургууль',exJp:'学校に行きます。',exTr:'Сургууль руу явна.'},{kanji:'友達',furigana:'ともだち',meaning:'найз',exJp:'友達と遊びます。',exTr:'Найзтайгаа тоглоно.'},{kanji:'電車',furigana:'でんしゃ',meaning:'галт тэрэг',exJp:'電車で来ました。',exTr:'Галт тэрэгээр ирсэн.'},{kanji:'仕事',furigana:'しごと',meaning:'ажил',exJp:'仕事が終わりました。',exTr:'Ажил дууссан.'},{kanji:'勉強',furigana:'べんきょう',meaning:'суралцах',exJp:'毎日勉強しています。',exTr:'Өдөр бүр хичээл хийдэг.'},]},
};

let currentLang = localStorage.getItem('stacks-lang') || 'en';
document.documentElement.lang = currentLang;
function t(key, params) {
  const str = (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key;
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => params[k] != null ? params[k] : '');
}
function setLang(lang) { currentLang = lang; localStorage.setItem('stacks-lang', lang); document.documentElement.lang = lang; KanjiDict.setLanguage(lang); updateExampleDeck(); updateStaticTexts(); showView(currentView); Analytics.renderGlobalStats(); }
function updateExampleDeck() {
  const exDeck = state.decks.find(d => d.isExample);
  if (!exDeck) return;
  const ex = EXAMPLE_DECKS[currentLang] || EXAMPLE_DECKS.en;
  exDeck.name = ex.name;
  for (const card of exDeck.cards) { const match = ex.cards.find(c => c.kanji === card.kanji); if (match) { card.meaningTr = match.meaning; card.exampleTr = match.exTr || ''; } }
  save();
}
function updateStaticTexts() {
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  document.querySelectorAll('[data-pt]').forEach(el => el.placeholder = t(el.dataset.pt));
}

// ─── SYNC CORE ───────────────────────────────────────────────────────
let syncCode = null;
let syncEnabled = false;
let syncStatus = 'idle';

function setSyncCode(code) { syncCode = code; persistSyncCode(code); }
function clearSyncCode() { syncCode = null; removePersistedSyncCode(); }

// Community author identity. Uses the active sync code (cross-device identity)
// when present; otherwise falls back to a persistent anonymous id so publishing
// works even without sync set up. Name is a short, non-PII label.
function getCommunityAuthor() {
  let code = syncCode;
  if (!code) {
    code = _tryLocal(() => localStorage.getItem('kanji_srs_community_author'));
    if (!code) {
      code = 'anon-' + Math.random().toString(36).slice(2, 10);
      _tryLocal(() => localStorage.setItem('kanji_srs_community_author', code));
    }
  }
  return { code, name: 'User-' + code.slice(-4) };
}
function _tryLocal(fn) { try { return fn(); } catch { return null; } }

let _pushTimer = null;
function scheduleCloudPush() {
  if (!syncEnabled || !syncCode) return;
  clearTimeout(_pushTimer);
  syncStatus = 'syncing'; renderSyncBadge();
  _pushTimer = setTimeout(async () => {
    try { await cloudPush(syncCode, state); syncStatus = 'synced'; } catch { syncStatus = 'error'; }
    renderSyncBadge();
  }, 1200);
}

async function connectSyncCode(code) {
  if (!syncConfigured()) { showToast(t('warn_sync_not_configured'), 4000); return false; }
  syncStatus = 'syncing'; renderSyncBadge();
  try {
    const remote = await cloudPull(code);
    state = pickNewerState(state, remote ? remote.state : null);
    state.settings = migrateSettings({ ...CONFIG, ...state.settings });
    state.decks = migrateDecks(state.decks || [], EXAMPLE_DECK_NAMES);
    migrateCustomTests(state);
    migrateCardsToFSRS(state);
    setSyncCode(code); syncEnabled = true;
    save(); await cloudPush(code, state);
    syncStatus = 'synced'; renderSyncBadge(); return true;
  } catch (e) { syncStatus = 'error'; renderSyncBadge(); showToast(t('warn_sync_error', {msg: e.message}), 3500); return false; }
}

function disconnectSync() { clearSyncCode(); syncEnabled = false; syncStatus = 'idle'; renderSyncBadge(); }

function renderSyncBadge() {
  const el = document.getElementById('sync-badge');
  if (!el) return;
  if (!syncEnabled) { el.innerHTML = ''; return; }
  const map = { idle:['dot','var(--ink-soft)',false], syncing:['sync','var(--sky)',true], synced:['check','var(--jade)',false], error:['alert','var(--hanko)',false], offline:['dot','var(--ink-soft)',false] };
  const [name, color, spin] = map[syncStatus] || map.idle;
  el.innerHTML = `<span class="${spin ? 'spin' : ''}" style="color:${color};display:inline-flex">${icon(name, name === 'dot' ? 'ic-fill' : '')}</span>`;
}

async function createAndConnectCode() { const code = generateSyncCode(); if (await connectSyncCode(code)) { Settings.renderSettings(); showToast(t('toast_sync_code', {code}), 3500); } }
async function enterSyncCode() {
  const input = document.getElementById('sync-code-input');
  const code = input.value.trim();
  if (!/^[0-9]{4,8}$/.test(code)) { showToast(t('warn_invalid_code')); return; }
  if (await connectSyncCode(code)) { Settings.renderSettings(); showToast(t('toast_sync_connected')); }
}
async function manualSync() {
  if (!syncCode) return;
  syncStatus = 'syncing'; renderSyncBadge();
  try {
    const remote = await cloudPull(syncCode);
    state = pickNewerState(state, remote ? remote.state : null);
    state.settings = migrateSettings({ ...CONFIG, ...state.settings });
    state.decks = migrateDecks(state.decks || [], EXAMPLE_DECK_NAMES);
    migrateCustomTests(state);
    migrateCardsToFSRS(state);
    saveState(state); await cloudPush(syncCode, state);
    syncStatus = 'synced'; showToast(t('toast_synced'));
    DeckList.renderDeckList(); Analytics.renderGlobalStats();
  } catch (e) { syncStatus = 'error'; showToast(t('warn_sync_error', {msg: e.message})); }
  renderSyncBadge();
}
function confirmDisconnectSync() { if (!confirm(t('confirm_disconnect'))) return; disconnectSync(); Settings.renderSettings(); showToast(t('toast_disconnected')); }

// ─── STATE ───────────────────────────────────────────────────────────
let state = createInitialState();
const EXAMPLE_DECK_NAMES = new Set(Object.values(EXAMPLE_DECKS).map(e => e.name));
let currentView = 'decks';
let currentDeckId = null;
let studyMastered = false;

const cfg = () => state.settings;
function save() { saveState(state); scheduleCloudPush(); }
function findDeck(id) { return state.decks.find(d => d.id === id); }
function createDeck(name, parentId = null) { const d = { id: uid(), name, parentId, createdAt: Date.now(), cards: [] }; state.decks.push(d); save(); return d; }
function getChildDecks(parentId) { return state.decks.filter(d => d.parentId === parentId); }
function getDescendantDecks(deckId) { const visited = new Set(), result = []; function walk(pid) { for (const d of state.decks) { if (d.parentId === pid && !visited.has(d.id)) { visited.add(d.id); result.push(d); walk(d.id); } } } walk(deckId); return result; }
function getAllCardsForDeck(deckId) { const deck = findDeck(deckId); if (!deck) return []; let cards = [...deck.cards]; for (const desc of getDescendantDecks(deckId)) cards = cards.concat(desc.cards); return cards; }
function getDecksInTreeOrder() { const result = []; function walk(parentId, depth) { for (const d of state.decks) { if ((d.parentId || null) === parentId) { result.push({ deck: d, depth }); walk(d.id, depth + 1); } } } walk(null, 0); return result; }
function getDeckPath(deckId) { const path = []; let cur = findDeck(deckId); while (cur) { path.unshift(cur); cur = cur.parentId ? findDeck(cur.parentId) : null; } return path; }
function makeCard(kanji, furigana, meaningTr, exampleJp, exampleTr, exampleFuriganaMap) { return { id: uid(), kanji, furigana, meaningTr, exampleJp: exampleJp || '', exampleTr: exampleTr || '', exampleFuriganaMap: exampleFuriganaMap || {}, srs: createSrsData(cfg().defaultEase) }; }

function _buildQueue(cards, masteredOnly = false) {
  const now = nowMs();
  const todayStr = today();
  const newToday = state.stats.reviewsByDate[todayStr + '_new'] || 0;
  return buildQueueFromCards(cards, masteredOnly, now, cfg().dailyNewLimit, newToday);
}
function buildQueue(deck, masteredOnly = false) { return _buildQueue(deck.cards, masteredOnly); }

function migrateAndSave() {
  state.settings = migrateSettings({ ...CONFIG, ...state.settings });
  state.decks = migrateDecks(state.decks || [], EXAMPLE_DECK_NAMES);
  migrateCustomTests(state);
  migrateCardsToFSRS(state);
  save();
}

async function loadApp() {
  if (window.electronAPI?.isElectron) document.body.classList.add('is-electron');
  const saved = loadState();
  if (saved) { state = saved; state.settings = migrateSettings({ ...CONFIG, ...state.settings }); state.stats = migrateStats(state.stats); state.decks = migrateDecks(state.decks || [], EXAMPLE_DECK_NAMES); migrateCustomTests(state); migrateCardsToFSRS(state); }
  if (!testStorage()) { document.getElementById('storage-warning').style.display = 'block'; showToast(t('toast_storage_warning'), 4000); }
  const existingCode = getPersistedSyncCode();
  if (existingCode && syncConfigured()) {
    syncCode = existingCode; syncEnabled = true; syncStatus = 'syncing';
    try { const remote = await cloudPull(existingCode); state = pickNewerState(state, remote ? remote.state : null); state.settings = migrateSettings({ ...CONFIG, ...state.settings }); state.decks = migrateDecks(state.decks || [], EXAMPLE_DECK_NAMES); migrateCustomTests(state); migrateCardsToFSRS(state); save(); syncStatus = 'synced'; }
    catch { syncStatus = 'offline'; }
    renderSyncBadge();
  }
}

// ─── MODAL ───────────────────────────────────────────────────────────
function openModal(title, bodyHTML) { document.getElementById('modal-title').textContent = title; document.getElementById('modal-body').innerHTML = bodyHTML; document.getElementById('modal-bg').classList.add('show'); setTimeout(() => { const el = document.querySelector('#modal-body input, #modal-body textarea'); if (el) el.focus(); }, 280); }
function closeModal() { document.getElementById('modal-bg').classList.remove('show'); }

// ─── TOAST ───────────────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, dur=2000) {
  const el = document.getElementById('toast');
  const TOAST_ICONS = { '✓':'check', '⚠':'alert', '🗑':'trash', '⭐':'star' };
  let _name = '';
  const _first = [...msg][0];
  if (TOAST_ICONS[_first]) { _name = TOAST_ICONS[_first]; msg = msg.slice(_first.length).replace(/^\s+/, ''); }
  el.innerHTML = (_name ? icon(_name) : '') + '<span>' + esc(msg) + '</span>';
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), dur);
}

// ─── ROUTER ──────────────────────────────────────────────────────────
function showView(name) {
  if (currentView === 'study' && name !== 'study') Analytics.stopSessionTimer();
  // Native his: çalışma ekranında body scroll'unu kilitle (mobilde kart sürüklerken
  // elastik viewport zıplamasını önler). Başka bir view'a geçince otomatik kalkar.
  document.body.classList.toggle('study-mode-active', name === 'study');
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-view="${name}"]`);
  if (navBtn) navBtn.classList.add('active');
  const backBtn = document.getElementById('btn-back');
  const addBtn = document.getElementById('btn-add-deck');
  const title = document.getElementById('topbar-title');
  backBtn.style.display = 'none'; addBtn.style.display = 'flex'; title.innerHTML = 'Stacks';
  currentView = name; window.scrollTo(0, 0);
  if (name === 'decks') { DeckList.renderDeckList(); Analytics.renderGlobalStats(); }
  else if (name === 'deck') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; DeckList.renderDeckDetail(); }
  else if (name === 'study') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; title.textContent = t('study_screen_title'); CardView.renderStudy(); }
  else if (name === 'review') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; title.textContent = t('review_screen_title'); CardView.renderReview(); }
  else if (name === 'streak') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; title.textContent = t('streak_screen_title'); Analytics.renderStreakScreen(); }
  else if (name === 'tests') { addBtn.style.display = 'none'; TestManager.render(); }
  else if (name === 'community') { addBtn.style.display = 'none'; CommunityHub.render(); }
  else if (name === 'test-editor') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; }
  else if (name === 'test-play') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; }
  else if (name === 'test-results') { backBtn.style.display = 'flex'; addBtn.style.display = 'none'; TestResults.render(); }
  else if (name === 'add') { addBtn.style.display = 'none'; DeckList.renderAddForm(); }
  else if (name === 'settings') { addBtn.style.display = 'none'; Settings.renderSettings(); }
  else if (name === 'search') { addBtn.style.display = 'none'; Search.renderView(); }
  updateStaticTexts();
}

// ─── APP CONTEXT (bileşenler arası paylaşım) ─────────────────────────
const app = {
  APP_VERSION, cfg, save, t, icon, showToast, showView, openModal, closeModal,
  findDeck, createDeck, getChildDecks, getDescendantDecks, getAllCardsForDeck,
  getDecksInTreeOrder, getDeckPath, makeCard, _buildQueue, buildQueue,
  updateStaticTexts, migrateAndSave,
  syncConfigured,
  get state() { return state; },
  set state(v) { state = v; },
  get currentView() { return currentView; },
  get currentDeckId() { return currentDeckId; },
  set currentDeckId(v) { currentDeckId = v; },
  get studyMastered() { return studyMastered; },
  set studyMastered(v) { studyMastered = v; },
  get syncCode() { return syncCode; },
  get syncEnabled() { return syncEnabled; },
  get currentLang() { return currentLang; },
};

// Init components
Analytics.init(app);
CardView.init(app);
DeckList.init(app);
Settings.init(app);
TestManager.init(app);
TestEditor.init(app);
TestView.init(app);
TestResults.init(app);
KanjiModal.init(app);
WordModal.init(app);
CommunityHub.init(app);
Search.init(app);

// Cross-component references (bileşenler init'ten sonra erişilebilir)
app.renderGlobalStats = Analytics.renderGlobalStats;
app.renderDeckList = DeckList.renderDeckList;
app.renderDeckDetail = DeckList.renderDeckDetail;
app.recordReview = Analytics.recordReview;
app.deckStats = Analytics.deckStats;
app.aggregateDeckStats = Analytics.aggregateDeckStats;
app.updatePreview = CardView.updatePreview;
app.attachPreviewListeners = CardView.attachPreviewListeners;
app.lastTestResults = null;
app.showTestPlay = (id) => { TestView.render(id); showView('test-play'); };
app.openKanjiModal = KanjiModal.open;
app.openWordModal = WordModal.open;
app.publishDeckToCommunity = publishDeckToCommunity;
app.getCommunityAuthor = getCommunityAuthor;

// ─── EVENT BINDINGS ──────────────────────────────────────────────────
document.getElementById('btn-add-deck').addEventListener('click', DeckList.showAddDeckModal);
document.getElementById('btn-back').addEventListener('click', () => {
  // Topbar geri tuşu = çalışma ekranından AÇIK çıkış → oturumu temizle (alt nav
  // gezintisi temizlemez, böylece sekme değişiminde oturum korunur).
  if (currentView === 'study') CardView.clearStudySession();
  if (currentView === 'test-editor' || currentView === 'test-play' || currentView === 'test-results') showView('tests');
  else if (currentView === 'study' || currentView === 'review' || currentView === 'deck') showView(currentView === 'deck' ? 'decks' : 'deck');
  else showView('decks');
});
document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));
document.getElementById('btn-save-card').addEventListener('click', DeckList.saveCard);
document.getElementById('btn-bulk-import').addEventListener('click', DeckList.bulkImport);
document.getElementById('btn-ai-deck').addEventListener('click', DeckList.showAiDeckModal);
document.getElementById('btn-export').addEventListener('click', Settings.exportData);
document.getElementById('btn-import-trigger').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', e => { if (e.target.files[0]) Settings.importData(e.target.files[0]); e.target.value = ''; });
document.getElementById('btn-reset-all').addEventListener('click', () => { if (!confirm(t('confirm_reset'))) return; state = createInitialState(); save(); showView('decks'); showToast(t('toast_reset')); });
document.getElementById('modal-bg').addEventListener('click', e => { if (e.target === document.getElementById('modal-bg')) closeModal(); });
['add-kanji','add-meaning','add-example-jp','add-example-tr'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') DeckList.saveCard(); });
});
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (currentView === 'study') CardView.handleStudyKey(e);
  else if (currentView === 'review') CardView.handleReviewKey(e);
});

// ─── BOOT ────────────────────────────────────────────────────────────
async function backfillFuriganaMaps() {
  let dirty = false;
  for (const deck of state.decks) {
    for (const card of deck.cards) {
      if (card.exampleJp && (!card.exampleFuriganaMap || !Object.keys(card.exampleFuriganaMap).length)) {
        try {
          card.exampleFuriganaMap = await generateFuriganaMap(card.exampleJp);
          dirty = true;
        } catch { /* tokenizer not ready yet — skip */ }
      }
    }
  }
  if (dirty) save();
}

async function boot() {
  await loadApp();
  await KanjiDict.init(currentLang);
  showView('decks');
  if (!state.decks.length) {
    const ex = EXAMPLE_DECKS[currentLang] || EXAMPLE_DECKS.en;
    const exDeck = createDeck(ex.name);
    exDeck.isExample = true;
    for (const c of ex.cards) exDeck.cards.push(makeCard(c.kanji, c.furigana, c.meaning, c.exJp, c.exTr));
    save(); DeckList.renderDeckList(); Analytics.renderGlobalStats();
  }
  backfillFuriganaMaps();
}
boot();

setTimeout(() => { const splash = document.getElementById('boot-splash'); if (splash) { splash.classList.add('is-hidden'); setTimeout(() => splash.remove(), 400); } }, 450);

if ('serviceWorker' in navigator && !window.electronAPI?.isElectron) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
  });
}

// ─── ELECTRON AUTO UPDATE UI ─────────────────────────────────────────
(function setupAutoUpdateUI() {
  const api = window.electronAPI;
  if (!api || !api.isElectron) return;
  const wrap = document.getElementById('update-wrap');
  const btn = document.getElementById('btn-update');
  const popover = document.getElementById('update-popover');
  let currentInfo = null, currentState = 'none';
  function renderPopover() {
    if (currentState === 'available') { popover.innerHTML = `<div class="update-pop-head"><span class="update-pop-title">${t('update_new')}</span><button class="update-pop-close tap" id="up-close">${icon('close')}</button></div><div class="update-pop-version">${t('update_version', {version: esc(currentInfo.version)})}</div>${currentInfo.releaseNotes ? `<div class="update-pop-notes">${esc(currentInfo.releaseNotes)}</div>` : ''}<button class="btn btn-primary btn-block tap" id="up-download">${icon('download')} ${t('update_download')}</button>`; document.getElementById('up-download').addEventListener('click', () => { currentState = 'downloading'; renderPopover(); api.downloadUpdate().catch(() => { currentState = 'available'; renderPopover(); }); }); }
    else if (currentState === 'downloading') { popover.innerHTML = `<div class="update-pop-head"><span class="update-pop-title">${t('update_downloading')}</span></div><div class="update-pop-progress"><div class="update-pop-progress-fill" id="up-progress-fill" style="width:0%"></div></div><div class="update-pop-version">${t('update_version', {version: esc(currentInfo.version)})}</div>`; }
    else if (currentState === 'downloaded') { popover.innerHTML = `<div class="update-pop-head"><span class="update-pop-title">${t('update_ready')}</span><button class="update-pop-close tap" id="up-close">${icon('close')}</button></div><div class="update-pop-version">${t('update_downloaded', {version: esc(currentInfo.version)})}</div><button class="btn btn-primary btn-block tap" id="up-install">${t('update_install')}</button>`; document.getElementById('up-install').addEventListener('click', () => { api.installUpdate().catch(() => { currentState = 'available'; renderPopover(); }); }); }
    const closeBtn = document.getElementById('up-close'); if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closePopover(); });
  }
  function openPopover() { renderPopover(); popover.style.display = 'block'; }
  function closePopover() { popover.style.display = 'none'; }
  btn.addEventListener('click', (e) => { e.stopPropagation(); popover.style.display === 'block' ? closePopover() : openPopover(); });
  document.addEventListener('click', (e) => { if (wrap.style.display !== 'none' && !wrap.contains(e.target)) closePopover(); });

  if (window._updateTeardowns) window._updateTeardowns.forEach(fn => fn());
  window._updateTeardowns = [
    api.onUpdateAvailable((info) => { currentInfo = info; currentState = 'available'; wrap.style.display = 'block'; }),
    api.onDownloadProgress((p) => { const fill = document.getElementById('up-progress-fill'); if (fill) fill.style.width = p.percent + '%'; }),
    api.onUpdateDownloaded((info) => { currentInfo = { ...currentInfo, version: info.version }; currentState = 'downloaded'; openPopover(); }),
    // Ağ kopması/indirme hatası 'update:error' kanalıyla gelir (downloadUpdate
    // promise'i hemen resolve olduğu için .catch ile yakalanmaz). İndirme
    // ekranında takılı kalmamak için state'i 'available'a geri çevir.
    api.onUpdateError(() => { if (currentState === 'downloading') { currentState = 'available'; renderPopover(); } })
  ];

  api.getPendingUpdate().then((pending) => { if (pending.state !== 'none') { currentInfo = pending.info; currentState = pending.state; wrap.style.display = 'block'; } }).catch(() => {});
})();

// ─── WINDOW EXPOSURE (inline onclick handler'lar için) ────────────────
Object.assign(window, {
  showView, setLang, closeModal,
  setTheme: Settings.setTheme, setFollowSystemTheme: Settings.setFollowSystemTheme,
  manualSync, confirmDisconnectSync, createAndConnectCode, enterSyncCode,
  changeCalendarMonth: Analytics.changeCalendarMonth, selectCalendarDay: Analytics.selectCalendarDay,
  openDeck: DeckList.openDeck, startStudy: CardView.startStudy, startReview: CardView.startReview,
  showRenameModal: DeckList.showRenameModal, showAddSubDeckModal: DeckList.showAddSubDeckModal,
  showAddCardModal: DeckList.showAddCardModal, showReviewPickModal: CardView.showReviewPickModal,
  deleteDeck: DeckList.deleteDeck, deleteCard: DeckList.deleteCard,
  toggleMasteredList: DeckList.toggleMasteredList,
  toggleDeckCollapse: DeckList.toggleDeckCollapse, showCardPreview: DeckList.showCardPreview,
  showEditModal: DeckList.showEditModal, saveEditCard: DeckList.saveEditCard,
  saveCardFromModal: DeckList.saveCardFromModal, renameDeck: DeckList.renameDeck,
  publishDeckModal: DeckList.publishDeckModal, submitPublishDeck: DeckList.submitPublishDeck,
  showAiDeckModal: DeckList.showAiDeckModal, submitAiDeck: DeckList.submitAiDeck,
  showMoveDeckModal: DeckList.showMoveDeckModal, moveDeck: DeckList.moveDeck,
  communityDownload: CommunityHub.downloadDeck, communityRefresh: CommunityHub.refresh, communityPublishPicker: CommunityHub.showPublishPicker,
  flipCardToggle: CardView.flipCardToggle, reviewPrev: CardView.reviewPrev,
  reviewNext: CardView.reviewNext, showBack: CardView.showBack, gradeCard: CardView.gradeCard,
  toggleSettingInfo: Settings.toggleSettingInfo, saveSettings: Settings.saveSettings, saveAiSettings: Settings.saveAiSettings,
  addDeck: DeckList.addDeck,
  showTestEditor: (id) => { TestEditor.render(id); showView('test-editor'); },
  deleteTest: TestManager.handleDelete,
  playTest: TestManager.handlePlay,
  exportTest: TestManager.handleExport,
  triggerTestImport: TestManager.triggerImport,
  tvSelectOption: TestView.selectOption,
  tvSelectTF: TestView.selectTF,
  tvSubmitFill: TestView.submitFill,
  teSaveTest: TestEditor.saveTest,
  teCancelEditor: TestEditor.cancelEditor,
  teAddQuestion: TestEditor.addQuestion,
  teRemoveQuestion: TestEditor.removeQuestion,
  teAddOption: TestEditor.addOption,
  refreshSearch: Search.refreshSearch,
});

// Hook app.save to refresh search if active
const originalSave = save;
save = function() {
  originalSave();
  if (currentView === 'search') {
    window.refreshSearch && window.refreshSearch();
  }
}
app.save = save;
