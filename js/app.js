// BhaktiLahari - Divine Devotional Lyrics & Stotras Portal
// Core Application Controller with Multi-Language Support (English, Tamil, Telugu)
// and Synchronized LRC Playback Engine

import { GODS } from './data/gods.js';
import { SONGS } from './data/songs.js';
import { spiritualAudio } from './audio.js';

// Unicode transliterator from Tamil script to Telugu script
export function transliterateTamilToTelugu(text) {
  if (!text) return '';
  const map = {
    0x0B82: 0x0C02, // Anusvara
    0x0B83: 0x0C03, // Visarga
    0x0B85: 0x0C05, // A
    0x0B86: 0x0C06, // AA
    0x0B87: 0x0C07, // I
    0x0B88: 0x0C08, // II
    0x0B89: 0x0C09, // U
    0x0B8A: 0x0C0A, // UU
    0x0B8E: 0x0C0E, // E
    0x0B8F: 0x0C0F, // EE
    0x0B90: 0x0C10, // AI
    0x0B92: 0x0C12, // O
    0x0B93: 0x0C13, // OO
    0x0B94: 0x0C14, // AU
    0x0B95: 0x0C15, // KA
    0x0B99: 0x0C19, // NGA
    0x0B9A: 0x0C1A, // CA
    0x0B9C: 0x0C1C, // JA
    0x0B9E: 0x0C1E, // NYA
    0x0B9F: 0x0C1F, // TTA
    0x0BA3: 0x0C23, // NNA
    0x0BA4: 0x0C24, // TA
    0x0BA8: 0x0C28, // NA
    0x0BA9: 0x0C28, // NNNA -> NA
    0x0BAA: 0x0C2A, // PA
    0x0BAE: 0x0C2E, // MA
    0x0BAF: 0x0C2F, // YA
    0x0BB0: 0x0C30, // RA
    0x0BB1: 0x0C31, // RRA
    0x0BB2: 0x0C32, // LA
    0x0BB3: 0x0C33, // LLA
    0x0BB4: 0x0C33, // ZHA -> LLA
    0x0BB5: 0x0C35, // VA
    0x0BB7: 0x0C37, // SSA
    0x0BB8: 0x0C38, // SA
    0x0BB9: 0x0C39, // HA
    0x0BBE: 0x0C3E, // Sign AA
    0x0BBF: 0x0C3F, // Sign I
    0x0BC0: 0x0C40, // Sign II
    0x0BC1: 0x0C41, // Sign U
    0x0BC2: 0x0C42, // Sign UU
    0x0BC6: 0x0C46, // Sign E
    0x0BC7: 0x0C47, // Sign EE
    0x0BC8: 0x0C48, // Sign AI
    0x0BCA: 0x0C4A, // Sign O
    0x0BCB: 0x0C4B, // Sign OO
    0x0BCC: 0x0C4C, // Sign AU
    0x0BCD: 0x0C4D  // Virama (Pulli)
  };
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    out += map[code] ? String.fromCharCode(map[code]) : text[i];
  }
  return out;
}

// Telugu titles for popular songs
export const TELUGU_SONG_TITLES = {
  "skanda-guru-kavacham": "స్కంద గురు కవచం",
  "kandha-sashti-kavasam": "కంద షష్ఠి కవచం",
  "kandar-anubhuti": "కందర్ అనుభూతి",
  "vel-maral": "వేల్ మారల్ మహా మంత్రం",
  "subrahmanya-bhujangam": "శ్రీ సుబ్రహ్మణ్య భుజంగం",
  "thavam-irundhalum": "తవమిరుందాలుం వేల్ వరుం",
  "viral-maral": "విరల్ మారల్ మంత్రం",
  "ganesha-kavacham": "వినాయక కవచం (గణేశ కవచం)",
  "sri-ganapathi-stavam": "శ్రీ గణపతి స్తవం",
  "ganesha-bhujangam": "శ్రీ గణేశ భుజంగం",
  "vinayagar-agaval": "వినాయగర్ అగవల్",
  "gayiye-ganapathi": "గాయియే గణపతి జగవందన",
  "sankata-nashana-ganesha-stotram": "సంకట నాశన గణేశ స్తోత్రం",
  "ganesha-108-potri": "వినాయకర్ 108 పోట్రి",
  "vishwanatha-ashtakam": "శ్రీ కాశీ విశ్వనాథాష్టకం",
  "thodakashtakam": "శ్రీ తోటకాష్టకం",
  "shiva-tandava-stotram": "శివ తాండవ స్తోత్రం",
  "lingashtakam": "లింగాష్టకం",
  "sivapuranam": "శివపురాణం (తిరువాచకం)",
  "vishnu-sahasranamam-complete": "శ్రీ విష్ణు సహస్రనామ స్తోత్రం (సంపూర్ణం)",
  "dasachi-sampathi": "దశాచి సంపత్తి",
  "hari-narayana": "హరి నారాయణ (పెరియాళ్వార్)",
  "lalitha-sahasranamam": "శ్రీ లలితా సహస్రనామ స్తోత్రం",
  "abirami-anthadhi": "అభిరామి అంతాది",
  "soundarya-lahari": "శ్రీ సౌందర్య లహరి (100 శ్లోకాలు)",
  "navaratna-malika-stotram": "నవరత్న మాలికా స్తోత్రం",
  "kanakadhara-stotram": "కనకధారా స్తోత్రం",
  "sri-stavam": "శ్రీ స్తవం (కూర్తాళ్వాన్)",
  "mahalakshmi-ashtakam": "శ్రీ మహాలక్ష్మ్యష్టకం",
  "achyutashtakam": "శ్రీ అచ్యుతాష్టకం",
  "madhurashtakam": "శ్రీ మధురాష్టకం",
  "narasimha-ashtakam": "శ్రీ నరసింహాష్టకం",
  "karavalamba-stotram": "శ్రీ లక్ష్మీ నరసింహ కరావలంబ స్తోత్రం",
  "kalabhairava-ashtakam": "శ్రీ కాలభైరవాష్టకం",
  "saraswati-dwadasa-nama": "శ్రీ సరస్వతీ ద్వాదశ నామ స్తోత్రం",
  "hanuman-chalisa": "హనుమాన్ చాలీసా",
  "maruthi-stotram": "మారుతి స్తోత్రం",
  "venkateswara-suprabhatam": "శ్రీ వేంకటేశ్వర సుప్రభాతం",
  "mahishasuramardini-stotram": "మహిషాసురమర్దిని స్తోత్రం (అయి గిరి నందిని)",
  "harivarasanam": "హరివరాసనం"
};

// Comprehensive Localization Dictionary
export const TRANSLATIONS = {
  ta: {
    brandSubtitle: "பக்தி பாடல் வரிகள் தளம்",
    searchPlaceholder: "தெய்வம் அல்லது பாடல் தேடுக (எ.கா: விநாயகர், கவசம், Shiva)...",
    searchGods: "தெய்வங்கள்",
    searchSongs: "பாடல்கள் & LRC",
    noResults: "தேடலுக்குப் பொருத்தமான முடிவுகள் இல்லை",
    bellTitle: "கோவில் மணி ஒலிக்க (Temple Bell)",
    favTitle: "விருப்பமான பாடல்கள் (Favorites)",
    themeTitle: "தீம் மாற்ற (Change Theme)",
    langTitle: "மொழி மாற்ற / Change Language",
    heroBadge: "அனைத்து தெய்வங்களின் புனித பாடல் வரிகள் & LRC தளம்",
    heroTitleLine1: "திவ்ய ஸ்தோத்திரங்கள் &",
    heroTitleLine2: "டைம்-சின்க் பாடல் வரிகள்",
    heroSubtitle: "50+ கவசங்கள், அஷ்டோத்திரங்கள், லலிதா & விஷ்ணு சஹஸ்ரநாமம், அபிராமி அந்தாதி, சௌந்தர்ய லஹரி மற்றும் 40+ சின்க்ரோனைஸ்டு LRC கோப்புகளுடன் கூடிய ஆன்மீக நுழைவாயில்.",
    heroLrcBtn: "⏱️ LRC சின்க் பாடல்கள்",
    heroExploreBtn: "தெய்வங்கள் காண்க",
    dailySpecial: "இன்றைய சிறப்பு பாராயணம்",
    chantNow: "பாராயணம் செய்க",
    godsTag: "Pantheon of Gods",
    godsTitle: "Deities & Gods Catalog",
    godsSubtitle: "அனைத்து தெய்வங்களின் திருப்பட்டியல்",
    filterAll: "அனைத்தும்",
    filterLrc: "⏱️ LRC சின்க்",
    filterShiva: "சிவ குடும்பம்",
    filterVishnu: "பெருமாள் & ராமர்",
    filterDevi: "அம்மன் & தேவியர்",
    filterNama: "நாம சங்கீர்த்தனம்",
    songsTag: "Sacred Hymns",
    songsTitle: "Devotional Songs & LRC Chants",
    songsSubtitle: "பாராயண ஸ்தோத்திரங்கள் & கவசங்கள்",
    filterHasLrc: "⏱️ LRC உள்ளவை",
    readLyrics: "வரிகள்",
    songsCountSuffix: "பாடல்கள்",
    popularPrefix: "சிறப்பு:",
    breadcrumbHome: "முகப்பு",
    authorPrefix: "அருளியவர்:",
    durationPrefix: "நேரம்:",
    benefitsTitle: "பாராயண பலன் & மகிமை:",
    tabTamil: "தமிழ் (Tamil)",
    tabEnglish: "English (Transliteration)",
    tabTelugu: "తెలుగు (Telugu)",
    tabMeaning: "பொருள் / Meaning",
    tabLrc: "⏱️ LRC சின்க் (Synced Chanting)",
    autoScroll: "சுருள்",
    stopScroll: "நிறுத்து",
    poojaMode: "🪔 பூஜை",
    japamCounter: "📿 ஜபம்",
    copyLyrics: "பாடல் வரிகளை நகலெடு",
    shareWhatsapp: "வாட்ஸ்அப் பகிர்வு",
    exitPooja: "← திரும்பு (Exit Pooja Mode)",
    bellButton: "கோவில் மணி ஒலிக்க",
    omButton: "ஓம் நாதம் (432Hz)",
    godHymns: "திருப்பாடல்கள்",
    japamTitle: "📿 108 ஜப மாலை (Japam Bead Counter)",
    japamTotalSuffix: "/ 108 மணி",
    japamInstruction: "வட்டத்தைத் தொடவும் அல்லது <strong>Spacebar</strong> அழுத்தவும்.",
    japamComplete: "🎉 108 முறை ஜபம் நிறைவடைந்தது! மங்களம் உண்டாகுக.",
    favTag: "Saved Chants",
    favHeading: "My Favorite Stotras & LRC Chants",
    favSub: "விருப்பமான பக்திப் பாடல்கள்",
    favEmpty: "விருப்பப் பட்டியல் காலியாக உள்ளது",
    favEmptyDesc: "நீங்கள் தினமும் பாராயணம் செய்யும் ஸ்தோத்திரங்களை ❤️ குறியீட்டை அழுத்தி இங்கு சேர்க்கலாம்.",
    browseSongs: "பாடல்களைப் பார்க்க →",
    footerDesc: "அனைத்து பக்தர்களுக்கும் தூய பக்தி, ஞானம், மற்றும் ஆன்மீக அமைதியை நல்கும் திவ்ய ஸ்தோத்திரங்கள் மற்றும் பாடல் வரிகள் தளம்.",
    footerMantra: "“லோகா: சமஸ்தா: சுகினோ பவந்து” • ஓம் சாந்தி: சாந்தி: சாந்தி:",
    footerGodsHead: "தெய்வங்கள்",
    footerSongsHead: "முக்கிய பாடல்கள்",
    footerCopyright: "© 2026 BhaktiLahari Devotional Portal. Created with Divine Devotion & Love.",
    langChangedToast: "🌐 மொழி மாற்றப்பட்டது",
    bellRangToast: "🔔 கோவில் மணி ஒலித்தது!",
    omPlayingToast: "🕉️ ஓம் நாதம் பின்னணியில் ஒலிக்கிறது (432Hz)",
    omStoppedToast: "ஓம் நாதம் நிறுத்தப்பட்டது",
    favAddedToast: "❤️ விருப்பப் பட்டியலில் சேர்க்கப்பட்டது",
    favRemovedToast: "விருப்பப் பட்டியலிலிருந்து நீக்கப்பட்டது",
    copiedLyricsToast: "📋 பாடல் வரிகள் வெற்றிகரமாக நகலெடுக்கப்பட்டது!",
    autoScrollRunningToast: "📜 தானியங்கி சுருள் இயக்கத்தில் உள்ளது",
    lrcFinishedToast: "🪔 பாராயணம் நிறைவடைந்தது! மங்களம் உண்டாகுக.",
    lrcStartBtn: "பாராயணம் சின்க் தொடங்கு",
    lrcPauseBtn: "இடைநிறுத்து (Pause)",
    lrcResetBtn: "⏮️ ஆரம்பம்",
    lrcSpeedLabel: "வேகம்:",
    lrcCopyBtn: "📋 LRC கோப்பு வரிகளை நகலெடு",
    lrcDownloadBtn: "📥 .lrc கோப்பு பதிவிறக்கு",
    lrcBellBtn: "🔔 மணி ஒலி"
  },
  en: {
    brandSubtitle: "Devotional Hymns & Lyrics Portal",
    searchPlaceholder: "Search deity or hymn (e.g. Ganesha, Shiva, Kavacham)...",
    searchGods: "Deities",
    searchSongs: "Hymns & LRC",
    noResults: "No matching results found",
    bellTitle: "Ring Temple Bell",
    favTitle: "Favorite Hymns",
    themeTitle: "Change Theme",
    langTitle: "Change Language",
    heroBadge: "Sacred Devotional Hymns & Synchronized LRC Lyrics Portal",
    heroTitleLine1: "Divine Stotras &",
    heroTitleLine2: "Time-Synced Lyrics",
    heroSubtitle: "Spiritual gateway featuring 50+ Kavachams, Ashtottarams, Sahasranamams, Soundarya Lahari, and 40+ synchronized LRC chanting files.",
    heroLrcBtn: "⏱️ LRC Synced Chants",
    heroExploreBtn: "Explore Deities",
    dailySpecial: "Today's Sacred Chant",
    chantNow: "Chant Now",
    godsTag: "Pantheon of Gods",
    godsTitle: "Deities & Gods Catalog",
    godsSubtitle: "Comprehensive Catalog of All Deities",
    filterAll: "All",
    filterLrc: "⏱️ LRC Synced",
    filterShiva: "Shiva Family",
    filterVishnu: "Vishnu & Rama",
    filterDevi: "Devi & Amman",
    filterNama: "Nama Sangeerthanam",
    songsTag: "Sacred Hymns",
    songsTitle: "Devotional Songs & LRC Chants",
    songsSubtitle: "Chanting Stotras & Kavachams",
    filterHasLrc: "⏱️ Has LRC",
    readLyrics: "Lyrics",
    songsCountSuffix: "Songs",
    popularPrefix: "Popular:",
    breadcrumbHome: "Home",
    authorPrefix: "Composed by:",
    durationPrefix: "Duration:",
    benefitsTitle: "Benefits & Significance:",
    tabTamil: "தமிழ் (Tamil)",
    tabEnglish: "English (Transliteration)",
    tabTelugu: "తెలుగు (Telugu)",
    tabMeaning: "Meaning / Explanation",
    tabLrc: "⏱️ LRC Synced Chanting",
    autoScroll: "Scroll",
    stopScroll: "Pause",
    poojaMode: "🪔 Pooja",
    japamCounter: "📿 Japam",
    copyLyrics: "Copy Lyrics",
    shareWhatsapp: "Share on WhatsApp",
    exitPooja: "← Exit Pooja Mode",
    bellButton: "Ring Temple Bell",
    omButton: "Om Drone (432Hz)",
    godHymns: "Devotional Chants",
    japamTitle: "📿 108 Japam Beads Counter",
    japamTotalSuffix: "/ 108 Beads",
    japamInstruction: "Tap the circle or press <strong>Spacebar</strong> to count.",
    japamComplete: "🎉 108 Japam recitations completed! May auspiciousness be with you.",
    favTag: "Saved Chants",
    favHeading: "My Favorite Stotras & LRC Chants",
    favSub: "Favorite Devotional Hymns",
    favEmpty: "Your Favorites list is empty",
    favEmptyDesc: "Tap the ❤️ icon on any hymn to add it to your daily chanting list.",
    browseSongs: "Browse Chants →",
    footerDesc: "A divine devotional portal providing authentic sacred hymns, stotras, and lyrics for spiritual peace and wisdom.",
    footerMantra: "“Lokah Samastah Sukhino Bhavantu” • Om Shanti Shanti Shanti",
    footerGodsHead: "Deities",
    footerSongsHead: "Popular Hymns",
    footerCopyright: "© 2026 BhaktiLahari Devotional Portal. Created with Divine Devotion & Love.",
    langChangedToast: "🌐 Language changed",
    bellRangToast: "🔔 Temple bell sounded!",
    omPlayingToast: "🕉️ Om drone chanting in background (432Hz)",
    omStoppedToast: "Om drone stopped",
    favAddedToast: "❤️ Added to Favorites",
    favRemovedToast: "Removed from Favorites",
    copiedLyricsToast: "📋 Hymn lyrics copied to clipboard!",
    autoScrollRunningToast: "📜 Auto-scroll is active",
    lrcFinishedToast: "🪔 Chanting completed! Auspicious blessings.",
    lrcStartBtn: "Start Synced Chanting",
    lrcPauseBtn: "Pause Chanting",
    lrcResetBtn: "⏮️ Reset to Start",
    lrcSpeedLabel: "Speed:",
    lrcCopyBtn: "📋 Copy Raw LRC Timestamps",
    lrcDownloadBtn: "📥 Download .lrc File",
    lrcBellBtn: "🔔 Temple Bell"
  },
  te: {
    brandSubtitle: "భక్తి గీతాలు & స్తోత్రాల నిలయం",
    searchPlaceholder: "దేవుడు లేదా స్తోత్రం వెతకండి (ఉదా: వినాయక, శివ, కవచం)...",
    searchGods: "దేవతలు",
    searchSongs: "స్తోత్రాలు & LRC",
    noResults: "సరిపోలే ఫలితాలు కనుగొనబడలేదు",
    bellTitle: "దేవాలయ గంట మోగించండి (Temple Bell)",
    favTitle: "ఇష్టమైన స్తోత్రాలు (Favorites)",
    themeTitle: "థీమ్ మార్చండి (Change Theme)",
    langTitle: "భాష మార్చండి / Change Language",
    heroBadge: "సర్వ దేవతల పవిత్ర స్తోత్రాలు & LRC లిరిక్స్ నిలయం",
    heroTitleLine1: "దివ్య స్తోత్రాలు &",
    heroTitleLine2: "టైమ్-సింక్ స్తోత్ర సాహిత్యం",
    heroSubtitle: "50+ కవచాలు, అష్టోత్తరాలు, లలితా & విష్ణు సహస్రనామాలు, సౌందర్య లహరి మరియు 40+ సింక్రొనైజ్డ్ LRC కీర్తనలతో కూడిన ఆధ్యాత్మిక వేదిక.",
    heroLrcBtn: "⏱️ LRC సింక్ స్తోత్రాలు",
    heroExploreBtn: "దేవతలను దర్శించండి",
    dailySpecial: "నేటి ప్రత్యేక పారాయణం",
    chantNow: "పారాయణం చేయండి",
    godsTag: "సర్వ దేవతా సమూహం",
    godsTitle: "దేవతల దర్శన సూచిక",
    godsSubtitle: "అన్ని దేవతల దివ్య దర్శనం",
    filterAll: "అన్నీ",
    filterLrc: "⏱️ LRC సింక్",
    filterShiva: "శివ పరివారం",
    filterVishnu: "విష్ణువు & రాముడు",
    filterDevi: "దేవీ & అమ్మవారు",
    filterNama: "నామ సంకీర్తనం",
    songsTag: "దివ్య స్తోత్రాలు",
    songsTitle: "భక్తి గీతాలు & LRC స్తోత్రాలు",
    songsSubtitle: "నిత్య పారాయణ స్తోత్రాలు & కవచాలు",
    filterHasLrc: "⏱️ LRC ఉన్నవి",
    readLyrics: "సాహిత్యం",
    songsCountSuffix: "స్తోత్రాలు",
    popularPrefix: "ప్రసిద్ధ:",
    breadcrumbHome: "హోమ్",
    authorPrefix: "రచన:",
    durationPrefix: "సమయం:",
    benefitsTitle: "పారాయణ ఫలితం & మహిమ:",
    tabTamil: "தமிழ் (Tamil)",
    tabEnglish: "English (Transliteration)",
    tabTelugu: "తెలుగు (Telugu)",
    tabMeaning: "తాత్పర్యం / Meaning",
    tabLrc: "⏱️ LRC సింక్ పారాయణం",
    autoScroll: "స్క్రోల్",
    stopScroll: "ఆపు",
    poojaMode: "🪔 పూజ",
    japamCounter: "📿 జపం",
    copyLyrics: "సాహిత్యం కాపీ చేయండి",
    shareWhatsapp: "వాట్సాప్ లో పంచుకోండి",
    exitPooja: "← పూజ ముగించు (Exit)",
    bellButton: "దేవాలయ గంట మోగించండి",
    omButton: "ఓం నాదం (432Hz)",
    godHymns: "దివ్య స్తోత్రాలు",
    japamTitle: "📿 108 జపమాల కౌంటర్",
    japamTotalSuffix: "/ 108 పూసలు",
    japamInstruction: "వృత్తాన్ని తాకండి లేదా <strong>Spacebar</strong> నొక్కండి.",
    japamComplete: "🎉 108 సార్లు జపం పూర్తయింది! సర్వ మంగళాలు కలుగుగాక.",
    favTag: "సేవ్ చేసిన స్తోత్రాలు",
    favHeading: "నా ఇష్టమైన స్తోత్రాలు & LRC గీతాలు",
    favSub: "ఇష్టమైన భక్తి స్తోత్రాలు",
    favEmpty: "మీ ఇష్టాల జాబితా ఖాళీగా ఉంది",
    favEmptyDesc: "మీరు రోజూ పారాయణం చేసే స్తోత్రాలను ❤️ గుర్తు నొక్కి ఇక్కడ చేర్చవచ్చు.",
    browseSongs: "స్తోత్రాలను చూడండి →",
    footerDesc: "సమస్త భక్తులకు స్వచ్ఛమైన భక్తి, జ్ఞానం మరియు ప్రశాంతతను అందించే దివ్య స్తోత్రాల నిలయం.",
    footerMantra: "“లోకాః సమస్తాః సుఖినో భవంతు” • ఓం శాంతిః శాంతిః శాంతిః",
    footerGodsHead: "దేవతలు",
    footerSongsHead: "ముఖ్య స్తోత్రాలు",
    footerCopyright: "© 2026 భక్తిలహరి డివోషనల్ పోర్టల్. పరమ భక్తితో సమర్పితం.",
    langChangedToast: "🌐 భాష మార్చబడింది",
    bellRangToast: "🔔 దేవాలయ గంట మోగింది!",
    omPlayingToast: "🕉️ ఓం నాదం ధ్వనిస్తోంది (432Hz)",
    omStoppedToast: "ఓం నాదం ఆపబడింది",
    favAddedToast: "❤️ ఇష్టమైన జాబితాలో చేర్చబడింది",
    favRemovedToast: "ఇష్టమైన జాబితా నుండి తొలగించబడింది",
    copiedLyricsToast: "📋 స్తోత్ర సాహిత్యం కాపీ చేయబడింది!",
    autoScrollRunningToast: "📜 ఆటో స్క్రోల్ నడుస్తోంది",
    lrcFinishedToast: "🪔 పారాయణం పూర్తయింది! శుభం భూయాత్.",
    lrcStartBtn: "సింక్ పారాయణం ప్రారంభించండి",
    lrcPauseBtn: "విరామం (Pause)",
    lrcResetBtn: "⏮️ మొదటికి",
    lrcSpeedLabel: "వేగం:",
    lrcCopyBtn: "📋 LRC టైమ్‌స్టాంప్స్ కాపీ",
    lrcDownloadBtn: "📥 .lrc ఫైల్ డౌన్‌లోడ్",
    lrcBellBtn: "🔔 గంట మోగించండి"
  }
};

class BhaktiApp {
  constructor() {
    this.gods = GODS;
    this.songs = SONGS;
    this.favorites = new Set(JSON.parse(localStorage.getItem('bhakti_favs') || '[]'));
    this.theme = localStorage.getItem('bhakti_theme') || 'gold';
    this.fontSize = localStorage.getItem('bhakti_font_size') || 'md';
    this.lang = localStorage.getItem('bhakti_lang') || 'ta';
    
    // Default active lyrics tab based on language
    this.currentScript = this.lang === 'te' ? 'telugu' : (this.lang === 'en' ? 'english' : 'tamil');
    
    // Auto Scroll State
    this.autoScrollTimer = null;
    this.autoScrollSpeed = 1;
    
    // LRC Playback Engine State
    this.lrcTimer = null;
    this.lrcCurrentMs = 0;
    this.lrcSpeed = 1.0;
    this.lrcPlaying = false;
    this.lrcParsedLines = [];
    this.lrcActiveIndex = -1;
    this.lrcTotalDurationMs = 0;

    // Japam counter state
    this.japamCount = 0;
    this.currentSong = null;

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.updateLanguageUI(this.lang);
    this.setupEventListeners();
    this.handleRoute();
  }

  // --- Translation Helper ---
  t(key) {
    return TRANSLATIONS[this.lang]?.[key] || TRANSLATIONS['ta']?.[key] || key;
  }

  // --- Language Controller ---
  setLanguage(newLang) {
    if (!['ta', 'en', 'te'].includes(newLang)) return;
    this.lang = newLang;
    localStorage.setItem('bhakti_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);

    // Update active state in navbar dropdown
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === newLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update default script
    if (newLang === 'te') {
      this.currentScript = 'telugu';
    } else if (newLang === 'en') {
      this.currentScript = 'english';
    } else {
      this.currentScript = 'tamil';
    }

    // Refresh static DOM UI
    this.updateLanguageUI(newLang);

    // Re-render current view with the new language
    this.handleRoute();

    const names = { ta: 'தமிழ்', en: 'English', te: 'తెలుగు' };
    this.showToast(`${this.t('langChangedToast')}: ${names[newLang]}`);
  }

  updateLanguageUI(lang) {
    document.documentElement.setAttribute('lang', lang);

    // Navbar static text
    const navSub = document.getElementById('nav-brand-subtitle');
    if (navSub) navSub.textContent = this.t('brandSubtitle');

    const navSearch = document.getElementById('nav-search');
    if (navSearch) navSearch.placeholder = this.t('searchPlaceholder');

    const navLangBtn = document.getElementById('nav-lang-btn');
    if (navLangBtn) navLangBtn.title = this.t('langTitle');

    const navBellBtn = document.getElementById('nav-bell-btn');
    if (navBellBtn) navBellBtn.title = this.t('bellTitle');

    const navFavBtn = document.getElementById('nav-fav-btn');
    if (navFavBtn) navFavBtn.title = this.t('favTitle');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) themeToggleBtn.title = this.t('themeTitle');

    // Footer static text
    const footerDesc = document.getElementById('footer-desc');
    if (footerDesc) footerDesc.textContent = this.t('footerDesc');

    const footerMantra = document.getElementById('footer-mantra');
    if (footerMantra) footerMantra.textContent = this.t('footerMantra');

    const footerGodsHead = document.getElementById('footer-gods-head');
    if (footerGodsHead) footerGodsHead.textContent = this.t('footerGodsHead');

    const footerSongsHead = document.getElementById('footer-songs-head');
    if (footerSongsHead) footerSongsHead.textContent = this.t('footerSongsHead');

    const footerCopy = document.getElementById('footer-bottom-copy');
    if (footerCopy) footerCopy.textContent = this.t('footerCopyright');

    // Dropdown items check indicator
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- Display Names & Helpers ---
  getGodDisplayName(god) {
    if (!god) return '';
    if (this.lang === 'en') return god.name;
    if (this.lang === 'te') return god.teluguName || god.name;
    return god.tamilName;
  }

  getGodDisplaySubtitle(god) {
    if (!god) return '';
    if (this.lang === 'en') return god.subtitle;
    if (this.lang === 'te') return god.teluguSubtitle || god.subtitle;
    return god.tamilSubtitle;
  }

  getGodDisplayMantra(god) {
    if (!god) return '';
    if (this.lang === 'en') return god.mantraEnglish;
    if (this.lang === 'te') return god.teluguMantra || god.mantra;
    return god.mantra;
  }

  getGodDisplayDesc(god) {
    if (!god) return '';
    if (this.lang === 'en') return god.description;
    if (this.lang === 'te') return god.teluguDescription || god.description;
    return god.description;
  }

  getGodDisplayDay(god) {
    if (!god) return '';
    if (this.lang === 'en') {
      const dayMap = {
        "ganesha": "Sankatahara Chaturthi / Friday",
        "murugan": "Tuesday / Sashti / Krithika",
        "shiva": "Monday / Pradosham / Maha Shivaratri",
        "vishnu": "Saturday / Ekadashi / Wednesday",
        "lalitha": "Friday / Purnima / Navaratri",
        "lakshmi": "Friday / Varalakshmi Vratam / Diwali",
        "krishna": "Wednesday / Rohini / Janmashtami",
        "narasimha": "Tuesday / Swati Nakshatra",
        "bhairava": "Krishna Ashtami / Sunday",
        "saraswathi": "Wednesday / Saraswati Pooja",
        "hanuman": "Saturday / Thursday / Hanuman Jayanti",
        "balaji": "Saturday / Ekadashi",
        "durga": "Tuesday / Rahu Kalam / Friday",
        "ayyappan": "Saturday / Mandala Season",
        "nama-sangeerthanam": "Daily / Ekadashi"
      };
      return dayMap[god.id] || god.day;
    }
    if (this.lang === 'te') return god.teluguDay || god.day;
    return god.day;
  }

  getGodDisplayPopularSong(god) {
    if (!god) return '';
    if (this.lang === 'en') return god.popularSong.split('/')[0].trim();
    if (this.lang === 'te') return god.teluguPopularSong || god.popularSong;
    return god.popularSong;
  }

  getSongDisplayTitle(song) {
    if (!song) return '';
    if (this.lang === 'en') return song.title;
    if (this.lang === 'te') {
      return TELUGU_SONG_TITLES[song.id] || transliterateTamilToTelugu(song.tamilTitle);
    }
    return song.tamilTitle;
  }

  getSongDisplaySubTitle(song, god) {
    if (!song) return '';
    const godName = this.getGodDisplayName(god);
    if (this.lang === 'en') return `${song.tamilTitle} • ${godName}`;
    if (this.lang === 'te') return `${song.title} • ${godName}`;
    return `${song.title} (${godName})`;
  }

  getSongCategoryLabel(song) {
    if (!song) return '';
    if (this.lang === 'en') {
      const catMap = {
        kavacham: 'Kavacham (Armor)',
        ashtakam: 'Ashtakam (8 Verses)',
        stotram: 'Stotram (Hymn)',
        sahasranamam: 'Sahasranamam (1000 Names)',
        bhajan: 'Bhajan & Kirtan',
        anthadhi: 'Anthadhi & Prabandham'
      };
      return catMap[song.category] || song.categoryLabel;
    }
    if (this.lang === 'te') {
      const catMap = {
        kavacham: 'కవచం / Kavacham',
        ashtakam: 'అష్టకం / Ashtakam',
        stotram: 'స్తోత్రం / Stotram',
        sahasranamam: 'సహస్రనామం / 1000 పేర్లు',
        bhajan: 'భజన & కీర్తన',
        anthadhi: 'అంతాది & ప్రబంధం'
      };
      return catMap[song.category] || transliterateTamilToTelugu(song.categoryLabel);
    }
    return song.categoryLabel;
  }

  // --- Theme Controller ---
  applyTheme(themeName) {
    this.theme = themeName;
    localStorage.setItem('bhakti_theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
  }

  cycleTheme() {
    const themes = ['gold', 'saffron', 'midnight'];
    const nextIdx = (themes.indexOf(this.theme) + 1) % themes.length;
    this.applyTheme(themes[nextIdx]);
    const names = { gold: 'Temple Gold', saffron: 'Saffron Sunrise', midnight: 'Divine Midnight' };
    this.showToast(`✨ தீம் மாற்றப்பட்டது: ${names[themes[nextIdx]]}`);
  }

  // --- Router ---
  handleRoute() {
    this.stopAutoScroll();
    this.stopLrcPlayback();

    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    const view = parts[0];
    const param = parts[1];

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'god' && param) {
      this.renderGodDetail(param);
    } else if (view === 'song' && param) {
      this.renderSongDetail(param);
    } else if (view === 'favorites') {
      this.renderFavoritesView();
    } else if (view === 'lrc-catalog') {
      this.renderHome('lrc');
    } else {
      this.renderHome();
    }
  }

  navigateTo(path) {
    window.location.hash = path;
  }

  // --- Daily Chant of the Day ---
  renderDailyChant() {
    const banner = document.getElementById('daily-chant-banner');
    if (!banner) return;

    const day = new Date().getDay();
    const daysConfig = [
      {
        dayIndex: 0,
        days: {
          ta: { dayName: "ஞாயிறு / Sunday", desc: "ஞாயிறு சங்கடங்கள் நீங்க முழுமுதற் கடவுள் வழிபாடு" },
          en: { dayName: "Sunday", desc: "Lord Ganesha worship for removing obstacles and new beginnings" },
          te: { dayName: "ఆదివారం / Sunday", desc: "సంకటాలు తొలగించే వినాయక స్వామి పారాయణం" }
        },
        godId: "ganesha",
        songId: "ganesha-kavacham",
        titles: {
          ta: "விநாயகர் கவசம்",
          en: "Ganesha Kavacham",
          te: "వినాయక కవచం"
        }
      },
      {
        dayIndex: 1,
        days: {
          ta: { dayName: "திங்கள் / Monday", desc: "திங்கட்கிழமை சிவ தரிசனம் & கங்காதரனின் அருட்பெருக்கு" },
          en: { dayName: "Monday", desc: "Lord Shiva meditation and grace of Gangadhara" },
          te: { dayName: "సోమవారం / Monday", desc: "పరమశివుని దర్శనం & గంగాధరుని అనుగ్రహం" }
        },
        godId: "shiva",
        songId: "vishwanatha-ashtakam",
        titles: {
          ta: "ஸ்ரீ காசி விஸ்வநாதாஷ்டகம்",
          en: "Sri Kashi Vishwanatha Ashtakam",
          te: "శ్రీ కాశీ విశ్వనాథాష్టకం"
        }
      },
      {
        dayIndex: 2,
        days: {
          ta: { dayName: "செவ்வாய் / Tuesday", desc: "செவ்வாய்க்கிழமை சத்ரு பயம் நீக்கும் வெற்றிவேல் கவசம்" },
          en: { dayName: "Tuesday", desc: "Lord Murugan's Vel armor dispelling fear and enemies" },
          te: { dayName: "మంగళవారం / Tuesday", desc: "శత్రు భయాలు తొలగించే స్కంద గురు కవచం" }
        },
        godId: "murugan",
        songId: "skanda-guru-kavacham",
        titles: {
          ta: "ஸ்கந்த குரு கவசம்",
          en: "Skanda Guru Kavacham",
          te: "స్కంద గురు కవచం"
        }
      },
      {
        dayIndex: 3,
        days: {
          ta: { dayName: "புதன் / Wednesday", desc: "புதன்கிழமை கண்ணனின் திவ்ய நாம ஜெபம்" },
          en: { dayName: "Wednesday", desc: "Lord Krishna's divine sweet nectar chanting" },
          te: { dayName: "బుధవారం / Wednesday", desc: "శ్రీ కృష్ణుని దివ్య నామ సంకీర్తనం" }
        },
        godId: "krishna",
        songId: "achyutashtakam",
        titles: {
          ta: "அச்சுதாஷ்டகம்",
          en: "Achyutashtakam",
          te: "శ్రీ అచ్యుతాష్టకం"
        }
      },
      {
        dayIndex: 4,
        days: {
          ta: { dayName: "வியாழன் / Thursday", desc: "வியாழக்கிழமை சத்குருவின் மெய்ஞ்ஞான திருவருள்" },
          en: { dayName: "Thursday", desc: "Sri Guru grace and divine liberation" },
          te: { dayName: "గురువారం / Thursday", desc: "సద్గురువు దివ్య జ్ఞానానుగ్రహం" }
        },
        godId: "shiva",
        songId: "thodakashtakam",
        titles: {
          ta: "ஸ்ரீ தோடகாஷ்டகம்",
          en: "Sri Thodakashtakam",
          te: "శ్రీ తోటకాష్టకం"
        }
      },
      {
        dayIndex: 5,
        days: {
          ta: { dayName: "வெள்ளி / Friday", desc: "வெள்ளிக்கிழமை அன்னை பராசக்தியின் 1000 திருநாமங்கள்" },
          en: { dayName: "Friday", desc: "1000 sacred names of Divine Mother Lalitha Tripura Sundari" },
          te: { dayName: "శుక్రవారం / Friday", desc: "శ్రీ లలితా త్రిపుర సుందరి 1000 దివ్య నామాలు" }
        },
        godId: "lalitha",
        songId: "lalitha-sahasranamam",
        titles: {
          ta: "ஸ்ரீ லலிதா சஹஸ்ரநாமம்",
          en: "Sri Lalitha Sahasranamam",
          te: "శ్రీ లలితా సహస్రనామం"
        }
      },
      {
        dayIndex: 6,
        days: {
          ta: { dayName: "சனி / Saturday", desc: "சனிக்கிழமை சகல தோஷங்கள் போக்கும் முக்தி ஸ்தோத்திரம்" },
          en: { dayName: "Saturday", desc: "1000 names of Lord Maha Vishnu for liberation & peace" },
          te: { dayName: "శనివారం / Saturday", desc: "సర్వ దోషాలను హరించే శ్రీ విష్ణు సహస్రనామం" }
        },
        godId: "vishnu",
        songId: "vishnu-sahasranamam-complete",
        titles: {
          ta: "ஸ்ரீ விஷ்ணு சஹஸ்ரநாம ஸ்தோத்திரம்",
          en: "Sri Vishnu Sahasranama Stotram",
          te: "శ్రీ విష్ణు సహస్రనామ స్తోత్రం"
        }
      }
    ];

    const todayConfig = daysConfig[day];
    const dayData = todayConfig.days[this.lang] || todayConfig.days['ta'];
    const titleText = todayConfig.titles[this.lang] || todayConfig.titles['ta'];

    banner.innerHTML = `
      <div class="daily-chant-info">
        <div class="daily-icon-box">🪔</div>
        <div>
          <div class="daily-label">${dayData.dayName} • ${this.t('dailySpecial')}</div>
          <div class="daily-text">${titleText} (${dayData.desc})</div>
        </div>
      </div>
      <button class="btn-primary" id="btn-daily-chant">
        <span>${this.t('chantNow')}</span>
        <span>→</span>
      </button>
    `;

    document.getElementById('btn-daily-chant')?.addEventListener('click', () => {
      this.navigateTo(`song/${todayConfig.songId}`);
    });
  }

  // --- Home View ---
  renderHome(initialFilter = 'all') {
    const main = document.getElementById('main-content');
    if (!main) return;

    const totalLrcCount = this.songs.filter(s => s.hasLrc).length;

    main.innerHTML = `
      <!-- Hero Banner Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span>🕉️</span>
            <span>${this.t('heroBadge')}</span>
          </div>
          <h1 class="hero-title">
            ${this.t('heroTitleLine1')} <br>
            <span class="hero-gradient-text">${this.t('heroTitleLine2')}</span>
          </h1>
          <p class="hero-subtitle">
            ${this.t('heroSubtitle')}
          </p>
          <div class="hero-actions">
            <button class="btn-primary" id="hero-lrc-btn">
              <span>${this.t('heroLrcBtn')} (${totalLrcCount})</span>
              <span>→</span>
            </button>
            <button class="btn-secondary" id="hero-explore-btn">
              <span>${this.t('heroExploreBtn')}</span>
              <span>↓</span>
            </button>
            <button class="btn-icon" id="hero-bell-btn" title="${this.t('bellTitle')}">
              🔔
            </button>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="assets/images/hero_banner.jpg" alt="Devotional Temple Sanctum" class="hero-image" />
          <div class="hero-image-overlay"></div>
        </div>
      </section>

      <!-- Daily Special Chant Card -->
      <div class="daily-chant-banner" id="daily-chant-banner"></div>

      <!-- Deities Catalog Section -->
      <section style="margin-top: 3.5rem;" id="gods-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-tag">${this.t('godsTag')}</span>
            <h2 class="section-title">${this.t('godsTitle')}</h2>
            <span class="section-tamil-title">${this.t('godsSubtitle')}</span>
          </div>
          <div class="filter-tabs" id="gods-filter-tabs">
            <button class="tab-btn ${initialFilter === 'all' ? 'active' : ''}" data-filter="all">${this.t('filterAll')} (${this.gods.length})</button>
            <button class="tab-btn ${initialFilter === 'lrc' ? 'active' : ''}" data-filter="lrc">${this.t('filterLrc')} (${totalLrcCount})</button>
            <button class="tab-btn" data-filter="shiva-family">${this.t('filterShiva')}</button>
            <button class="tab-btn" data-filter="vishnu-family">${this.t('filterVishnu')}</button>
            <button class="tab-btn" data-filter="devi">${this.t('filterDevi')}</button>
            <button class="tab-btn" data-filter="nama-sangeerthanam">${this.t('filterNama')}</button>
          </div>
        </div>

        <div class="gods-grid" id="gods-grid">
          ${this.renderGodCards(this.gods)}
        </div>
      </section>

      <!-- Sacred Songs & LRC Chants Section -->
      <section style="margin-top: 4.5rem;" id="songs-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-tag">${this.t('songsTag')}</span>
            <h2 class="section-title">${this.t('songsTitle')}</h2>
            <span class="section-tamil-title" id="songs-section-title">${this.t('songsSubtitle')} (${this.songs.length} ${this.t('songsCountSuffix')})</span>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="tab-btn active" id="filter-all-songs-btn">${this.t('filterAll')} (${this.songs.length})</button>
            <button class="tab-btn" id="filter-lrc-songs-btn">${this.t('filterHasLrc')} (${totalLrcCount})</button>
          </div>
        </div>
        <div class="songs-grid" id="popular-songs-grid">
          ${this.renderSongCards(initialFilter === 'lrc' ? this.songs.filter(s => s.hasLrc) : this.songs)}
        </div>
      </section>
    `;

    this.renderDailyChant();
    this.attachHomeListeners();
  }

  renderGodCards(godsList) {
    return godsList.map(god => {
      const godSongs = this.songs.filter(s => s.godId === god.id);
      const lrcCount = godSongs.filter(s => s.hasLrc).length;
      const primaryName = this.getGodDisplayName(god);
      const secondaryName = this.lang === 'en' ? god.tamilName : god.name;
      const mantraText = this.getGodDisplayMantra(god);
      const popularText = this.getGodDisplayPopularSong(god);

      return `
        <article class="god-card" data-god-id="${god.id}">
          <div class="god-card-img-wrap">
            <img src="${god.image}" alt="${god.name}" class="god-card-img" loading="lazy" />
            <div class="god-card-gradient"></div>
            <div class="god-card-badge">
              <span>🪔</span>
              <span>${godSongs.length} ${this.t('songsCountSuffix')} ${lrcCount > 0 ? `• ⏱️ ${lrcCount} LRC` : ''}</span>
            </div>
          </div>
          <div class="god-card-body">
            <h3 class="god-tamil-name">${primaryName}</h3>
            <div class="god-english-name">${secondaryName}</div>
            <div class="god-card-mantra">“${mantraText}”</div>
            <div class="god-card-footer">
              <span class="god-songs-count">${this.t('popularPrefix')} ${popularText}</span>
              <div class="god-card-arrow">→</div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  renderSongCards(songsList) {
    return songsList.map(song => {
      const isFav = this.favorites.has(song.id);
      const god = this.gods.find(g => g.id === song.godId);
      const displayTitle = this.getSongDisplayTitle(song);
      const displaySubTitle = this.getSongDisplaySubTitle(song, god);
      const categoryText = this.getSongCategoryLabel(song);

      return `
        <div class="song-card" data-song-id="${song.id}">
          <div class="song-card-header">
            <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
              <span class="song-category-tag">${categoryText}</span>
              ${song.hasLrc ? '<span class="lrc-badge">⏱️ LRC சின்க்</span>' : ''}
            </div>
            <button class="song-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${song.id}" title="${this.t('favTitle')}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <h4 class="song-card-title-tamil">${displayTitle}</h4>
          <div class="song-card-title-english">${displaySubTitle}</div>
          <div class="song-card-meta">
            <span>⏱️ ${song.duration}</span>
            <span>📜 ${song.verseCount}</span>
            <div class="song-card-read-link">
              <span>${this.t('readLyrics')}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  attachHomeListeners() {
    document.getElementById('hero-lrc-btn')?.addEventListener('click', () => {
      const grid = document.getElementById('popular-songs-grid');
      const title = document.getElementById('songs-section-title');
      if (grid) {
        const lrcSongs = this.songs.filter(s => s.hasLrc);
        grid.innerHTML = this.renderSongCards(lrcSongs);
        this.attachSongCardListeners();
        if (title) title.textContent = `LRC சின்க்ரோனைஸ்டு பாடல்கள் (${lrcSongs.length} பாடல்கள்)`;
        document.getElementById('songs-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.getElementById('hero-explore-btn')?.addEventListener('click', () => {
      document.getElementById('gods-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('hero-bell-btn')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
      this.showToast(this.t('bellRangToast'));
    });

    document.getElementById('filter-all-songs-btn')?.addEventListener('click', (e) => {
      document.querySelectorAll('#songs-section .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const grid = document.getElementById('popular-songs-grid');
      if (grid) {
        grid.innerHTML = this.renderSongCards(this.songs);
        this.attachSongCardListeners();
      }
    });

    document.getElementById('filter-lrc-songs-btn')?.addEventListener('click', (e) => {
      document.querySelectorAll('#songs-section .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const grid = document.getElementById('popular-songs-grid');
      if (grid) {
        const lrcSongs = this.songs.filter(s => s.hasLrc);
        grid.innerHTML = this.renderSongCards(lrcSongs);
        this.attachSongCardListeners();
      }
    });

    // Deity category filter tabs
    document.querySelectorAll('#gods-filter-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#gods-filter-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        let filtered = this.gods;

        if (filter === 'shiva-family') {
          filtered = this.gods.filter(g => ['shiva', 'ganesha', 'murugan', 'bhairava'].includes(g.id));
        } else if (filter === 'vishnu-family') {
          filtered = this.gods.filter(g => ['vishnu', 'krishna', 'narasimha', 'balaji'].includes(g.id));
        } else if (filter === 'devi') {
          filtered = this.gods.filter(g => ['lalitha', 'lakshmi', 'saraswathi', 'durga'].includes(g.id));
        } else if (filter === 'nama-sangeerthanam') {
          filtered = this.gods.filter(g => ['nama-sangeerthanam', 'ayyappan', 'hanuman'].includes(g.id));
        } else if (filter === 'lrc') {
          filtered = this.gods.filter(g => {
            const hasLrcSong = this.songs.some(s => s.godId === g.id && s.hasLrc);
            return hasLrcSong;
          });
        }

        const godsGrid = document.getElementById('gods-grid');
        if (godsGrid) {
          godsGrid.innerHTML = this.renderGodCards(filtered);
          this.attachGodCardListeners();
        }
      });
    });

    this.attachGodCardListeners();
    this.attachSongCardListeners();
  }

  attachGodCardListeners() {
    document.querySelectorAll('.god-card').forEach(card => {
      card.addEventListener('click', () => {
        const godId = card.getAttribute('data-god-id');
        this.navigateTo(`god/${godId}`);
      });
    });
  }

  attachSongCardListeners() {
    document.querySelectorAll('.song-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.song-fav-btn')) return;
        const songId = card.getAttribute('data-song-id');
        this.navigateTo(`song/${songId}`);
      });
    });

    document.querySelectorAll('.song-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const songId = btn.getAttribute('data-fav-id');
        this.toggleFavorite(songId, btn);
      });
    });
  }

  // --- God Detail View ---
  renderGodDetail(godId) {
    const god = this.gods.find(g => g.id === godId);
    if (!god) {
      this.renderHome();
      return;
    }

    const deitySongs = this.songs.filter(s => s.godId === godId);
    const main = document.getElementById('main-content');
    if (!main) return;

    const primaryName = this.getGodDisplayName(god);
    const secondaryName = this.lang === 'en' ? god.tamilName : god.name;
    const subtitleText = this.getGodDisplaySubtitle(god);
    const mantraPrimary = this.getGodDisplayMantra(god);
    const mantraSecondary = this.lang === 'en' ? god.mantra : god.mantraEnglish;
    const descText = this.getGodDisplayDesc(god);
    const dayTag = this.getGodDisplayDay(god);

    main.innerHTML = `
      <div class="breadcrumb-nav">
        <a href="#home">${this.t('breadcrumbHome')}</a>
        <span>›</span>
        <span>${primaryName}</span>
      </div>

      <div class="deity-detail-hero">
        <div class="deity-hero-media">
          <img src="${god.image}" alt="${god.name}" class="deity-hero-img" />
          <div class="deity-hero-gradient"></div>
        </div>
        <div class="deity-hero-info">
          <span class="deity-hero-tag">${dayTag}</span>
          <h1 class="deity-hero-tamil-name">${primaryName}</h1>
          <div class="deity-hero-english-name">${secondaryName} (${subtitleText})</div>
          
          <div class="deity-mantra-box">
            <div class="deity-mantra-tamil">“${mantraPrimary}”</div>
            <div class="deity-mantra-english">${mantraSecondary}</div>
          </div>

          <p class="deity-desc">${descText}</p>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button class="btn-primary" id="btn-play-bell">
              <span>🔔 ${this.t('bellButton')}</span>
            </button>
            <button class="btn-secondary" id="btn-toggle-om">
              <span>🕉️ ${this.t('omButton')}</span>
            </button>
          </div>
        </div>
      </div>

      <section style="margin-top: 3.5rem;">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-tag">${this.t('songsTag')}</span>
            <h2 class="section-title">${god.name} ${this.t('godHymns')}</h2>
            <span class="section-tamil-title">${primaryName} ${this.t('godHymns')} (${deitySongs.length} ${this.t('songsCountSuffix')})</span>
          </div>
        </div>
        <div class="songs-grid">
          ${this.renderSongCards(deitySongs)}
        </div>
      </section>
    `;

    document.getElementById('btn-play-bell')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
      this.showToast(this.t('bellRangToast'));
    });

    const omBtn = document.getElementById('btn-toggle-om');
    omBtn?.addEventListener('click', () => {
      const isPlaying = spiritualAudio.toggleOmDrone();
      if (isPlaying) {
        omBtn.classList.add('active');
        this.showToast(this.t('omPlayingToast'));
      } else {
        omBtn.classList.remove('active');
        this.showToast(this.t('omStoppedToast'));
      }
    });

    this.attachSongCardListeners();
  }

  // --- Song Lyrics Detail View with Synchronized LRC Mode ---
  renderSongDetail(songId) {
    const song = this.songs.find(s => s.id === songId);
    if (!song) {
      this.renderHome();
      return;
    }
    this.currentSong = song;
    const god = this.gods.find(g => g.id === song.godId);
    const isFav = this.favorites.has(song.id);
    const main = document.getElementById('main-content');
    if (!main) return;

    // Reset default view to preferred language script unless user selected lrc
    if (this.currentScript === 'lrc' && !song.hasLrc) {
      this.currentScript = this.lang === 'te' ? 'telugu' : (this.lang === 'en' ? 'english' : 'tamil');
    }

    const primaryTitle = this.getSongDisplayTitle(song);
    const secondaryTitle = this.lang === 'en' ? song.tamilTitle : song.title;
    const godDisplayName = this.getGodDisplayName(god);
    const benefitsContent = this.lang === 'te' ? transliterateTamilToTelugu(song.benefits) : song.benefits;

    main.innerHTML = `
      <div class="breadcrumb-nav">
        <a href="#home">${this.t('breadcrumbHome')}</a>
        <span>›</span>
        <a href="#god/${god?.id}">${godDisplayName}</a>
        <span>›</span>
        <span>${primaryTitle}</span>
      </div>

      <div class="lyrics-view-wrapper">
        <!-- Header Box -->
        <div class="lyrics-header-box">
          <div class="lyrics-header-top">
            <div>
              <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                <span class="song-category-tag">${this.getSongCategoryLabel(song)}</span>
                ${song.hasLrc ? '<span class="lrc-badge">⏱️ Synchronized LRC Audio-Ready</span>' : ''}
              </div>
              <h1 class="lyrics-title-tamil">${primaryTitle}</h1>
              <div class="lyrics-title-english">${secondaryTitle} (${god?.name || ''})</div>
              <div class="lyrics-author-badge">
                <span>✍️ ${this.t('authorPrefix')} <strong>${song.author}</strong></span>
                <span>•</span>
                <span>⏱️ ${this.t('durationPrefix')} <strong>${song.duration}</strong></span>
                <span>•</span>
                <span>📜 <strong>${song.verseCount}</strong></span>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn-icon ${isFav ? 'active' : ''}" id="lyrics-fav-toggle" title="${this.t('favTitle')}">
                ${isFav ? '❤️' : '🤍'}
              </button>
              <button class="btn-icon" id="lyrics-bell-btn" title="${this.t('bellTitle')}">
                🔔
              </button>
              <button class="btn-icon" id="lyrics-om-btn" title="${this.t('omButton')}">
                🕉️
              </button>
              ${song.hasLrc ? `
                <button class="btn-icon" id="btn-download-lrc" title="${this.t('lrcDownloadBtn')}">
                  📥
                </button>
              ` : ''}
            </div>
          </div>

          <div class="lyrics-benefits-box">
            ✨ <strong>${this.t('benefitsTitle')}</strong> ${benefitsContent}
          </div>
        </div>

        <!-- Sticky Action Toolbar -->
        <div class="lyrics-toolbar" id="lyrics-toolbar">
          <div class="script-tabs">
            <button class="script-tab-btn ${this.currentScript === 'tamil' ? 'active' : ''}" data-script="tamil">${this.t('tabTamil')}</button>
            ${song.hasLrc ? `
              <button class="script-tab-btn ${this.currentScript === 'lrc' ? 'active' : ''}" data-script="lrc">${this.t('tabLrc')}</button>
            ` : ''}
            <button class="script-tab-btn ${this.currentScript === 'english' ? 'active' : ''}" data-script="english">${this.t('tabEnglish')}</button>
            <button class="script-tab-btn ${this.currentScript === 'telugu' ? 'active' : ''}" data-script="telugu">${this.t('tabTelugu')}</button>
            <button class="script-tab-btn ${this.currentScript === 'meaning' ? 'active' : ''}" data-script="meaning">${this.t('tabMeaning')}</button>
          </div>

          <div class="lyrics-controls-group">
            <!-- Font Size -->
            <div class="font-size-controls">
              <button class="font-btn" data-size="sm" title="A-">A-</button>
              <button class="font-btn" data-size="md" title="A">A</button>
              <button class="font-btn" data-size="lg" title="A+">A+</button>
              <button class="font-btn" data-size="xl" title="A++">A++</button>
            </div>

            <!-- Auto Scroll Controls (When not in LRC mode) -->
            <div class="autoscroll-bar" id="autoscroll-wrap">
              <button class="autoscroll-btn" id="autoscroll-toggle">
                <span id="scroll-icon">▶</span>
                <span id="scroll-label">${this.t('autoScroll')}</span>
              </button>
              <input type="range" class="autoscroll-slider" id="autoscroll-speed" min="1" max="4" value="${this.autoScrollSpeed}" title="${this.t('lrcSpeedLabel')}" />
            </div>

            <!-- Pooja / Zen Mode -->
            <button class="btn-secondary" id="btn-pooja-mode" title="${this.t('poojaMode')}">
              <span>${this.t('poojaMode')}</span>
            </button>

            <!-- 108 Japam Counter -->
            <button class="btn-secondary" id="btn-japam-counter" title="${this.t('japamCounter')}">
              <span>${this.t('japamCounter')}</span>
            </button>

            <!-- Copy & Share -->
            <button class="btn-icon" id="btn-copy-lyrics" title="${this.t('copyLyrics')}">
              📋
            </button>
            <button class="btn-icon" id="btn-share-lyrics" title="${this.t('shareWhatsapp')}">
              📲
            </button>
          </div>
        </div>

        <!-- Lyrics Body Text Container -->
        <div class="lyrics-content-card" id="lyrics-content-card">
          <div id="lyrics-body-container">
            ${this.renderLyricsBody(song, this.currentScript)}
          </div>
        </div>
      </div>
    `;

    this.attachSongDetailListeners(song, god);
  }

  // --- Render Lyrics or LRC View ---
  renderLyricsBody(song, script) {
    if (script === 'lrc' && song.hasLrc) {
      return this.renderLrcView(song);
    } else if (script === 'english') {
      const engContent = song.lyrics.english || song.lyrics.tamil;
      return `<div class="lyrics-text font-${this.fontSize} script-english">${engContent}</div>`;
    } else if (script === 'meaning') {
      return `<div class="lyrics-text font-${this.fontSize} script-meaning">${song.lyrics.meaning || ''}</div>`;
    } else if (script === 'telugu') {
      const teluguContent = song.lyrics.telugu || transliterateTamilToTelugu(song.lyrics.tamil);
      return `<div class="lyrics-text font-${this.fontSize} script-telugu">${teluguContent}</div>`;
    } else {
      return `<div class="lyrics-text font-${this.fontSize} script-tamil">${song.lyrics.tamil}</div>`;
    }
  }

  // --- LRC Synchronized View Renderer ---
  renderLrcView(song) {
    const rawLrc = (this.lang === 'te' && song.lrcRawTelugu) ? song.lrcRawTelugu : (song.lrcRaw || '');
    const lines = this.parseLrc(rawLrc);
    this.lrcParsedLines = lines;
    
    // Find max time
    let maxMs = 0;
    lines.forEach(l => {
      if (l.timeMs > maxMs) maxMs = l.timeMs;
    });
    this.lrcTotalDurationMs = maxMs + 5000;

    const totalDurationStr = this.formatMsToTime(this.lrcTotalDurationMs);

    const linesHtml = lines.map((item, idx) => {
      if (item.isHeader) {
        return `<div class="lrc-section-header">${item.text}</div>`;
      }
      return `
        <div class="lrc-line-row" data-lrc-idx="${idx}" data-time-ms="${item.timeMs}">
          <span class="lrc-line-stamp">${item.timeStr}</span>
          <span class="lrc-line-text">${item.text}</span>
        </div>
      `;
    }).join('');

    return `
      <!-- LRC Control Panel -->
      <div class="lrc-player-panel" id="lrc-player-panel">
        <div class="lrc-player-top">
          <div class="lrc-playback-controls">
            <button class="lrc-play-btn" id="lrc-main-play-btn">
              <span id="lrc-play-icon">▶</span>
              <span id="lrc-play-text">${this.t('lrcStartBtn')}</span>
            </button>
            <button class="lrc-speed-btn" id="lrc-reset-btn" title="${this.t('lrcResetBtn')}">
              ${this.t('lrcResetBtn')}
            </button>
            <div class="lrc-time-display">
              <span id="lrc-cur-time">00:00</span> / <span>${totalDurationStr}</span>
            </div>
          </div>

          <div class="lrc-speed-group">
            <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${this.t('lrcSpeedLabel')}</span>
            <button class="lrc-speed-btn ${this.lrcSpeed === 0.75 ? 'active' : ''}" data-lrc-speed="0.75">0.75x</button>
            <button class="lrc-speed-btn ${this.lrcSpeed === 1.0 ? 'active' : ''}" data-lrc-speed="1.0">1.0x</button>
            <button class="lrc-speed-btn ${this.lrcSpeed === 1.25 ? 'active' : ''}" data-lrc-speed="1.25">1.25x</button>
            <button class="lrc-speed-btn ${this.lrcSpeed === 1.5 ? 'active' : ''}" data-lrc-speed="1.5">1.5x</button>
          </div>
        </div>

        <div class="lrc-progress-wrap">
          <input 
            type="range" 
            class="lrc-progress-bar" 
            id="lrc-progress-bar" 
            min="0" 
            max="${this.lrcTotalDurationMs}" 
            value="${this.lrcCurrentMs}" 
          />
        </div>

        <div class="lrc-actions-toolbar">
          <button class="lrc-btn-action" id="lrc-copy-raw-btn">
            <span>${this.t('lrcCopyBtn')}</span>
          </button>
          <button class="lrc-btn-action" id="lrc-download-direct-btn">
            <span>${this.t('lrcDownloadBtn')}</span>
          </button>
          <button class="lrc-btn-action" id="lrc-toggle-bell">
            <span>${this.t('lrcBellBtn')}</span>
          </button>
        </div>
      </div>

      <!-- LRC Line by Line List -->
      <div class="lrc-lines-list" id="lrc-lines-list">
        ${linesHtml}
      </div>
    `;
  }

  // --- LRC Parsing Logic ---
  parseLrc(lrcText) {
    if (!lrcText) return [];
    const lines = lrcText.split('\n');
    const parsed = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || /^\[(ti|ar|al|by|la|re|ve):/i.test(trimmed)) continue;

      const match = trimmed.match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
      if (match) {
        const mins = parseInt(match[1], 10);
        const secs = parseFloat(match[2]);
        const timeMs = Math.round((mins * 60 + secs) * 1000);
        const timeStr = `${String(mins).padStart(2, '0')}:${String(Math.floor(secs)).padStart(2, '0')}`;
        let text = match[3].trim();
        if (text) {
          if (this.lang === 'te' && !/[ఀ-౿]/.test(text)) {
            text = transliterateTamilToTelugu(text);
          }
          parsed.push({ timeMs, timeStr, text, isHeader: false });
        }
      } else if (trimmed.startsWith('===') || trimmed.startsWith('#')) {
        let text = trimmed.replace(/^[=#\s]+|[=#\s]+$/g, '');
        if (this.lang === 'te' && !/[ఀ-౿]/.test(text)) {
          text = transliterateTamilToTelugu(text);
        }
        parsed.push({
          timeMs: -1,
          timeStr: '',
          text: text,
          isHeader: true
        });
      }
    }
    return parsed;
  }

  formatMsToTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // --- LRC Interactive Player Controller ---
  startLrcPlayback() {
    this.lrcPlaying = true;
    const playIcon = document.getElementById('lrc-play-icon');
    const playText = document.getElementById('lrc-play-text');
    if (playIcon) playIcon.textContent = '⏸';
    if (playText) playText.textContent = this.t('lrcPauseBtn');

    const intervalMs = 100;
    clearInterval(this.lrcTimer);

    this.lrcTimer = setInterval(() => {
      this.lrcCurrentMs += intervalMs * this.lrcSpeed;
      if (this.lrcCurrentMs >= this.lrcTotalDurationMs) {
        this.stopLrcPlayback();
        this.lrcCurrentMs = 0;
        this.showToast(this.t('lrcFinishedToast'));
        return;
      }
      this.updateLrcUI();
    }, intervalMs);
  }

  pauseLrcPlayback() {
    this.lrcPlaying = false;
    clearInterval(this.lrcTimer);
    this.lrcTimer = null;
    const playIcon = document.getElementById('lrc-play-icon');
    const playText = document.getElementById('lrc-play-text');
    if (playIcon) playIcon.textContent = '▶';
    if (playText) playText.textContent = this.t('lrcStartBtn');
  }

  stopLrcPlayback() {
    this.pauseLrcPlayback();
    this.lrcCurrentMs = 0;
    this.lrcActiveIndex = -1;
    this.updateLrcUI();
  }

  seekLrcTo(targetMs) {
    this.lrcCurrentMs = Math.max(0, Math.min(targetMs, this.lrcTotalDurationMs));
    this.updateLrcUI(true);
  }

  updateLrcUI(forceScroll = false) {
    // 1. Update time display & slider
    const curTimeEl = document.getElementById('lrc-cur-time');
    const progressBar = document.getElementById('lrc-progress-bar');
    if (curTimeEl) curTimeEl.textContent = this.formatMsToTime(this.lrcCurrentMs);
    if (progressBar) progressBar.value = this.lrcCurrentMs;

    // 2. Find currently active line
    let activeIdx = -1;
    for (let i = 0; i < this.lrcParsedLines.length; i++) {
      const line = this.lrcParsedLines[i];
      if (!line.isHeader && line.timeMs <= this.lrcCurrentMs) {
        activeIdx = i;
      }
    }

    if (activeIdx !== this.lrcActiveIndex || forceScroll) {
      this.lrcActiveIndex = activeIdx;
      
      // Update DOM rows
      document.querySelectorAll('.lrc-line-row').forEach(row => {
        const rowIdx = parseInt(row.getAttribute('data-lrc-idx'), 10);
        if (rowIdx === activeIdx) {
          row.classList.add('active');
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          row.classList.remove('active');
        }
      });
    }
  }

  attachLrcListeners(song) {
    const playBtn = document.getElementById('lrc-main-play-btn');
    playBtn?.addEventListener('click', () => {
      if (this.lrcPlaying) {
        this.pauseLrcPlayback();
      } else {
        this.startLrcPlayback();
      }
    });

    document.getElementById('lrc-reset-btn')?.addEventListener('click', () => {
      this.seekLrcTo(0);
      if (!this.lrcPlaying) this.startLrcPlayback();
    });

    const progressBar = document.getElementById('lrc-progress-bar');
    progressBar?.addEventListener('input', (e) => {
      this.seekLrcTo(parseInt(e.target.value, 10));
    });

    // Speed buttons
    document.querySelectorAll('.lrc-speed-btn[data-lrc-speed]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lrc-speed-btn[data-lrc-speed]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.lrcSpeed = parseFloat(btn.getAttribute('data-lrc-speed'));
        this.showToast(`${this.t('lrcSpeedLabel')} ${this.lrcSpeed}x`);
      });
    });

    // Line row clicks -> seek to that line
    document.querySelectorAll('.lrc-line-row').forEach(row => {
      row.addEventListener('click', () => {
        const timeMs = parseInt(row.getAttribute('data-time-ms'), 10);
        this.seekLrcTo(timeMs);
        if (!this.lrcPlaying) {
          this.startLrcPlayback();
        }
      });
    });

    // Copy raw LRC
    document.getElementById('lrc-copy-raw-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(song.lrcRaw).then(() => {
        this.showToast('📋 LRC ' + this.t('copiedLyricsToast'));
      });
    });

    // Download LRC
    document.getElementById('lrc-download-direct-btn')?.addEventListener('click', () => {
      this.downloadLrcFile(song);
    });

    // Bell toggle
    document.getElementById('lrc-toggle-bell')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
    });
  }

  downloadLrcFile(song) {
    const content = song.lrcRaw || song.lyrics.tamil;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = song.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.download = `${safeTitle}.lrc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast(`📥 ${this.getSongDisplayTitle(song)} (.lrc) downloading...`);
  }

  attachSongDetailListeners(song, god) {
    // Script Switchers
    document.querySelectorAll('.script-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.script-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentScript = btn.getAttribute('data-script');

        const bodyContainer = document.getElementById('lyrics-body-container');
        if (bodyContainer) {
          bodyContainer.innerHTML = this.renderLyricsBody(song, this.currentScript);
          if (this.currentScript === 'lrc') {
            this.attachLrcListeners(song);
          } else {
            this.stopLrcPlayback();
          }
        }
      });
    });

    if (this.currentScript === 'lrc') {
      this.attachLrcListeners(song);
    }

    // Font Size Controls
    document.querySelectorAll('.font-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.fontSize = btn.getAttribute('data-size');
        localStorage.setItem('bhakti_font_size', this.fontSize);
        const target = document.querySelector('.lyrics-text');
        if (target) {
          target.className = `lyrics-text font-${this.fontSize} script-${this.currentScript}`;
        }
        this.showToast(`Font: ${this.fontSize.toUpperCase()}`);
      });
    });

    // Favorite Button
    document.getElementById('lyrics-fav-toggle')?.addEventListener('click', (e) => {
      this.toggleFavorite(song.id, e.currentTarget);
    });

    // Temple Bell Sound
    document.getElementById('lyrics-bell-btn')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
      this.showToast(this.t('bellRangToast'));
    });

    // Om Drone Sound Toggle
    const omBtn = document.getElementById('lyrics-om-btn');
    omBtn?.addEventListener('click', () => {
      const isPlaying = spiritualAudio.toggleOmDrone();
      if (isPlaying) {
        omBtn.classList.add('active');
        this.showToast(this.t('omPlayingToast'));
      } else {
        omBtn.classList.remove('active');
        this.showToast(this.t('omStoppedToast'));
      }
    });

    // Direct download LRC button in header
    document.getElementById('btn-download-lrc')?.addEventListener('click', () => {
      this.downloadLrcFile(song);
    });

    // Auto-Scroll Toggle
    const scrollToggle = document.getElementById('autoscroll-toggle');
    const scrollIcon = document.getElementById('scroll-icon');
    const scrollLabel = document.getElementById('scroll-label');
    const speedSlider = document.getElementById('autoscroll-speed');

    scrollToggle?.addEventListener('click', () => {
      if (this.autoScrollTimer) {
        this.stopAutoScroll();
        if (scrollIcon) scrollIcon.textContent = '▶';
        if (scrollLabel) scrollLabel.textContent = this.t('autoScroll');
      } else {
        this.startAutoScroll();
        if (scrollIcon) scrollIcon.textContent = '⏸';
        if (scrollLabel) scrollLabel.textContent = this.t('stopScroll');
      }
    });

    speedSlider?.addEventListener('input', (e) => {
      this.autoScrollSpeed = parseInt(e.target.value);
      if (this.autoScrollTimer) {
        this.stopAutoScroll();
        this.startAutoScroll();
      }
    });

    // Zen / Pooja Mode Button
    document.getElementById('btn-pooja-mode')?.addEventListener('click', () => {
      this.openPoojaMode(song, god);
    });

    // Japam Counter Button
    document.getElementById('btn-japam-counter')?.addEventListener('click', () => {
      this.openJapamModal(song);
    });

    // Copy Lyrics Button
    document.getElementById('btn-copy-lyrics')?.addEventListener('click', () => {
      const title = this.getSongDisplayTitle(song);
      let content = song.lyrics.tamil;
      if (this.currentScript === 'english' && song.lyrics.english) {
        content = song.lyrics.english;
      } else if (this.currentScript === 'telugu') {
        content = song.lyrics.telugu || transliterateTamilToTelugu(song.lyrics.tamil);
      }
      const textToCopy = `${title} (${song.title})\n\n${content}\n\n-- BhaktiLahari Devotional Portal`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast(this.t('copiedLyricsToast'));
      });
    });

    // WhatsApp Share Button
    document.getElementById('btn-share-lyrics')?.addEventListener('click', () => {
      const title = this.getSongDisplayTitle(song);
      const godName = this.getGodDisplayName(god);
      const shareText = encodeURIComponent(`🪔 *${title}* (${song.title})\n${godName}\n\n${song.lyrics.tamil.substring(0, 180)}...\n\n${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    });
  }

  // --- Auto-Scroll Logic ---
  startAutoScroll() {
    this.stopAutoScroll();
    const interval = Math.max(20, 60 / this.autoScrollSpeed);
    this.autoScrollTimer = setInterval(() => {
      window.scrollBy({ top: 1, behavior: 'auto' });
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
        this.stopAutoScroll();
        const icon = document.getElementById('scroll-icon');
        const label = document.getElementById('scroll-label');
        if (icon) icon.textContent = '▶';
        if (label) label.textContent = this.t('autoScroll');
      }
    }, interval);
    this.showToast(this.t('autoScrollRunningToast'));
  }

  stopAutoScroll() {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }

  // --- Zen / Pooja Fullscreen Mode ---
  openPoojaMode(song, god) {
    const modal = document.getElementById('pooja-modal');
    if (!modal) return;

    let lyricsContent = song.lyrics.tamil;
    if (this.lang === 'en' && song.lyrics.english) {
      lyricsContent = song.lyrics.english;
    } else if (this.lang === 'te') {
      lyricsContent = song.lyrics.telugu || transliterateTamilToTelugu(song.lyrics.tamil);
    }

    const primaryTitle = this.getSongDisplayTitle(song);
    const godName = this.getGodDisplayName(god);

    modal.innerHTML = `
      <div class="pooja-header">
        <button class="btn-secondary" id="pooja-close-btn">${this.t('exitPooja')}</button>
        <div style="font-family: inherit; color: var(--gold-light); font-size: 1.1rem; font-weight: 700;">
          ${godName} • ${primaryTitle}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-icon" id="pooja-bell-btn">🔔</button>
          <button class="btn-icon" id="pooja-om-btn">🕉️</button>
        </div>
      </div>

      <div class="diya-altar">
        <div class="diya-altar-icon">🪔</div>
        <div class="diya-flame-glow"></div>
      </div>

      <div class="pooja-lyrics-scroll font-${this.fontSize} ${this.lang === 'te' ? 'script-telugu' : (this.lang === 'en' ? 'script-english' : 'script-tamil')}">
        <h2 style="color: var(--gold-primary); text-align: center; margin-bottom: 2rem;">
          ${primaryTitle}
        </h2>
        <div style="white-space: pre-wrap; line-height: 2.3;">
          ${lyricsContent}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('pooja-close-btn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    document.getElementById('pooja-bell-btn')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
    });

    document.getElementById('pooja-om-btn')?.addEventListener('click', () => {
      spiritualAudio.toggleOmDrone();
    });
  }

  // --- 108 Japam Counter Modal ---
  openJapamModal(song) {
    const modal = document.getElementById('japam-modal');
    const dialog = document.getElementById('japam-dialog');
    if (!modal || !dialog) return;

    this.japamCount = 0;
    const chantName = song ? this.getSongDisplayTitle(song) : (this.lang === 'te' ? 'శ్రీ రామ నామ జపం' : (this.lang === 'en' ? 'Sri Rama Nama Japam' : 'ஸ்ரீ ராம நாம ஜெபம்'));

    dialog.innerHTML = `
      <div class="japam-dialog-header">
        <div class="japam-title">${this.t('japamTitle')}</div>
        <button class="japam-close-btn" id="japam-close-btn">✕</button>
      </div>
      <div class="japam-dialog-body">
        <div class="japam-counter-circle" id="japam-touch-target">
          <div class="japam-count-number" id="japam-num">0</div>
          <div class="japam-count-total">${this.t('japamTotalSuffix')}</div>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 1.25rem 0 0.5rem;">
          ${this.t('japamInstruction')}
        </p>
        <div style="color: var(--gold-light); font-weight: 600;">
          ${chantName}
        </div>
      </div>
    `;

    modal.classList.add('active');

    const updateCount = () => {
      this.japamCount++;
      spiritualAudio.playBeadClick();
      const numEl = document.getElementById('japam-num');
      if (numEl) numEl.textContent = this.japamCount;

      if (this.japamCount === 108) {
        spiritualAudio.playTempleBell();
        this.showToast(this.t('japamComplete'));
      }
    };

    document.getElementById('japam-touch-target')?.addEventListener('click', updateCount);

    const keyListener = (e) => {
      if (e.code === 'Space' && modal.classList.contains('active')) {
        e.preventDefault();
        updateCount();
      }
    };
    window.addEventListener('keydown', keyListener);

    document.getElementById('japam-close-btn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      window.removeEventListener('keydown', keyListener);
    });
  }

  // --- Favorites View ---
  renderFavoritesView() {
    const main = document.getElementById('main-content');
    if (!main) return;

    const favSongs = this.songs.filter(s => this.favorites.has(s.id));

    main.innerHTML = `
      <div class="breadcrumb-nav">
        <a href="#home">${this.t('breadcrumbHome')}</a>
        <span>›</span>
        <span>${this.t('favSub')}</span>
      </div>

      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">${this.t('favTag')}</span>
          <h1 class="section-title">${this.t('favHeading')}</h1>
          <span class="section-tamil-title">${this.t('favSub')} (${favSongs.length})</span>
        </div>
      </div>

      ${favSongs.length === 0 ? `
        <div style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🤍</div>
          <h3 style="color: #fff; margin-bottom: 0.5rem;">${this.t('favEmpty')}</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            ${this.t('favEmptyDesc')}
          </p>
          <button class="btn-primary" id="btn-browse-stotras">
            <span>${this.t('browseSongs')}</span>
          </button>
        </div>
      ` : `
        <div class="songs-grid">
          ${this.renderSongCards(favSongs)}
        </div>
      `}
    `;

    document.getElementById('btn-browse-stotras')?.addEventListener('click', () => {
      this.navigateTo('home');
    });

    this.attachSongCardListeners();
  }

  // --- Toggle Favorite ---
  toggleFavorite(songId, btnEl) {
    if (this.favorites.has(songId)) {
      this.favorites.delete(songId);
      if (btnEl) {
        btnEl.classList.remove('active');
        btnEl.textContent = '🤍';
      }
      this.showToast(this.t('favRemovedToast'));
    } else {
      this.favorites.add(songId);
      if (btnEl) {
        btnEl.classList.add('active');
        btnEl.textContent = '❤️';
      }
      this.showToast(this.t('favAddedToast'));
    }
    localStorage.setItem('bhakti_favs', JSON.stringify([...this.favorites]));
  }

  // --- Toast Notification Feedback ---
  showToast(msg) {
    const toast = document.getElementById('toast-box');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Universal Search & Header Listeners ---
  setupEventListeners() {
    window.addEventListener('hashchange', () => this.handleRoute());

    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => this.cycleTheme());
    document.getElementById('nav-bell-btn')?.addEventListener('click', () => {
      spiritualAudio.playTempleBell();
      this.showToast(this.t('bellRangToast'));
    });
    document.getElementById('nav-fav-btn')?.addEventListener('click', () => this.navigateTo('favorites'));

    // Language Dropdown Toggle
    const langBtn = document.getElementById('nav-lang-btn');
    const langMenu = document.getElementById('lang-dropdown-menu');

    langBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu?.classList.toggle('show');
      langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang) {
          this.setLanguage(selectedLang);
        }
        langMenu?.classList.remove('show');
        langBtn?.setAttribute('aria-expanded', 'false');
      });
    });

    // Close language menu on outside click or escape
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#lang-dropdown-wrap')) {
        langMenu?.classList.remove('show');
        langBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        langMenu?.classList.remove('show');
        langBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    // Universal Search Box
    const searchInput = document.getElementById('nav-search');
    const searchResults = document.getElementById('search-results');

    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResults?.classList.remove('active');
        return;
      }

      const matchedGods = this.gods.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.tamilName.toLowerCase().includes(q) ||
        (g.teluguName && g.teluguName.toLowerCase().includes(q))
      );

      const matchedSongs = this.songs.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.tamilTitle.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        (TELUGU_SONG_TITLES[s.id] && TELUGU_SONG_TITLES[s.id].toLowerCase().includes(q))
      );

      let html = '';

      if (matchedGods.length > 0) {
        html += `<div style="padding: 0.5rem 1rem; font-size: 0.75rem; color: var(--gold-light); font-weight: 700;">${this.t('searchGods')} (${matchedGods.length})</div>`;
        html += matchedGods.map(g => `
          <div class="search-item" data-goto="god/${g.id}">
            <div>
              <div class="search-item-title">${this.getGodDisplayName(g)}</div>
              <div class="search-item-sub">${this.lang === 'en' ? g.tamilName : g.name}</div>
            </div>
            <span>→</span>
          </div>
        `).join('');
      }

      if (matchedSongs.length > 0) {
        html += `<div style="padding: 0.5rem 1rem; font-size: 0.75rem; color: var(--gold-light); font-weight: 700;">${this.t('searchSongs')} (${matchedSongs.length})</div>`;
        html += matchedSongs.slice(0, 10).map(s => `
          <div class="search-item" data-goto="song/${s.id}">
            <div>
              <div class="search-item-title">${this.getSongDisplayTitle(s)} ${s.hasLrc ? '<span class="lrc-badge" style="font-size: 0.65rem;">LRC</span>' : ''}</div>
              <div class="search-item-sub">${s.title} • ${this.getSongCategoryLabel(s)}</div>
            </div>
            <span>→</span>
          </div>
        `).join('');
      }

      if (!html) {
        html = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">${this.t('noResults')}</div>`;
      }

      if (searchResults) {
        searchResults.innerHTML = html;
        searchResults.classList.add('active');

        searchResults.querySelectorAll('.search-item').forEach(item => {
          item.addEventListener('click', () => {
            const target = item.getAttribute('data-goto');
            searchResults.classList.remove('active');
            if (searchInput) searchInput.value = '';
            this.navigateTo(target);
          });
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-search-wrap')) {
        searchResults?.classList.remove('active');
      }
    });
  }
}

// Instantiate application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.bhaktiApp = new BhaktiApp();
});
