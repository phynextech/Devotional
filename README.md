# BhaktiLahari (பக்தி அலைகள்) 🪔
### Divine Hindu Devotional Songs & Stotras Lyrics Web Portal

**BhaktiLahari** is a modern, high-performance, responsive web application dedicated to sacred Hindu devotional lyrics, stotras, kavachams, ashtottarams, and bhajans with authentic Tamil & English transliteration, line-by-line meanings, ambient temple sounds, and dedicated pooja tools.

---

## ✨ Features

- 🕉️ **Comprehensive Pantheon of 15 Sacred Deities**:
  - **Lord Murugan (முருகன்)**: Skanda Guru Kavacham, Kandar Anubhuti, Kandha Sashti Kavasam, Vel Maral Maha Manthiram, Subrahmanya Bhujangam, Thavam Irundhalum, Viral Maral
  - **Lord Maha Vishnu & Rama (ஸ்ரீ மகா விஷ்ணு & ராமர்)**: Sri Vishnu Sahasranama Stotram (Complete & 9 Parts), Dasachi Sampathi, Hari Narayana (Periyazhwar)
  - **Goddess Lalitha & Abirami (ஸ்ரீ லலிதா & அபிராமி அம்மன்)**: Sri Lalitha Sahasranamam, Sri Abirami Anthadhi (100 Verses), Sri Soundarya Lahari (Tamil & Telugu 100 Slokas), Navaratna Malika Stotram
  - **Lord Ganesha (விநாயகர்)**: Ganesha Kavacham, Sri Ganapathi Stavam, Sri Ganesha Bhujangam, Vinayagar Agaval, Gayiye Ganapathi Jaga Vandana, Sankata Nashana Stotram, 108 Potri
  - **Lord Shiva (சிவபெருமான்)**: Sri Kashi Vishwanatha Ashtakam, Sri Thodakashtakam, Shiva Tandava Stotram, Lingashtakam, Sivapuranam (Thiruvasagam)
  - **Lord Krishna (ஸ்ரீ கிருஷ்ணர்)**: Sri Achyutashtakam, Sri Madhurashtakam, Neeraja Dala Nayana, Brindavaname, Radhe Kaun Se Punya Kiye Tune, Azhagellam Andalin Azhagaguma
  - **Lord Lakshmi Narasimha (ஸ்ரீ லக்ஷ்மி நரசிம்மர்)**: Sri Narasimha Ashtakam, Sri Lakshmi Narasimha Karavalamba Stotram
  - **Lord Kala Bhairava (ஸ்ரீ கால பைரவர்)**: Sri Kalabhairava Ashtakam
  - **Goddess Mahalakshmi (ஸ்ரீ மஹாலக்ஷ்மி)**: Kanakadhara Stotram, Sri Stavam (Koorathazhwan), Mahalakshmi Ashtakam
  - **Goddess Saraswati (ஸ்ரீ சரஸ்வதி தேவி)**: Sri Saraswati Dwadasa Nama Stotram
  - **Lord Hanuman (ஆஞ்சநேயர்)**: Hanuman Chalisa, Maruthi Stotram
  - **Lord Venkateshwara (வெங்கடேச பெருமாள்)**: Sri Venkateswara Suprabhatam
  - **Lord Ayyappan (சுவாமி ஐயப்பன்)**: Harivarasanam
  - **Goddess Durga (துர்க்கை அம்மன்)**: Mahishasuramardini Stotram (Aigiri Nandini)
  - **Divya Nama Sangeerthanam & Bhajans (நாம சங்கீர்த்தனம்)**: Andal Pasurams, Tulsidas, Samarth Ramdas, Radha-Krishna Kirtans

- ⏱️ **Interactive Synchronized LRC Chanting Engine**:
  - **40+ Synchronized `.lrc` Hymns**: Line-by-line synced playback with active line golden glowing highlight and auto-scrolling
  - **Clickable Timestamp Seeking**: Click any timestamp `[00:15.20]` to jump directly to that chant verse
  - **Chanting Speed Multiplier**: 0.75x, 1.0x, 1.25x, 1.5x for beginner or fast recitation
  - **Direct `.lrc` File Download & Copy**: One-tap download of the `.lrc` file or raw clipboard copy

- 🌐 **Multi-Language Portal (English, Tamil & Telugu)**:
  - **Navbar Globe Icon Switcher (🌐)**: Instant switching between **English**, **தமிழ் (Tamil)**, and **తెలుగు (Telugu)** with seamless state persistence in local storage
  - **Complete UI Localization**: All deity names, subtitles, sacred mantras, search placeholders, buttons, and daily chants dynamically localize into the selected language

- 📜 **Multi-Script Lyrics Viewer**:
  - **தமிழ் (Tamil)**: Authentic Tamil typography and traditional formatting
  - **⏱️ LRC சின்க் (Synced Chanting)**: Real-time karaoke-style chanting guide
  - **English (Transliteration)**: Accurate Romanized pronunciation for all devotees
  - **తెలుగు (Telugu)**: Native Soundarya Lahari 100 slokas and complete Telugu script support across all hymns
  - **பொருள் / Meaning**: Detailed explanation and spiritual significance

- 🪔 **Interactive Spiritual Toolkit**:
  - **Zen / Pooja Fullscreen Mode**: Clutter-free dark sanctuary with glowing virtual Diya oil lamp
  - **Hands-Free Auto-Scroll**: Adjustable speed slider for hands-free chanting during prayer
  - **Web Audio API Sound Suite**:
    - Authentic resonant **Temple Brass Bell** (கோவில் மணி ஒலி)
    - Meditative **432 Hz Sacred Om Drone** ambient tanpura hum
    - Japam bead clicking acoustics
  - **108 Japam Counter (ஜப மாலை)**: Interactive touch & spacebar bead counter with progress ring
  - **Font Size Adjuster**: A-, A, A+, A++ for comfortable reading
  - **Instant Universal Search**: Live debounced search across all 53 songs, deities, and titles
  - **Favorites & Bookmarks**: Save favorite daily stotras in local storage
  - **One-Tap WhatsApp & Clipboard Share**

---

## 🚀 How to Run Locally

You can open the application directly in your browser or run a lightweight local static server:

```bash
# Option 1: Using Python
python -m http.server 8080

# Option 2: Using npx serve
npx serve -l 8080 .
```

Open `http://localhost:8080` in your web browser.

---

## 📁 Project Structure

```
Devotional Lyrics/
├── index.html            # Main HTML5 Single Page Application shell
├── css/
│   ├── style.css         # Theme tokens, variables, typography, layout
│   └── components.css    # Deity cards, song cards, LRC player, lyrics viewer, modals
├── js/
│   ├── app.js            # Router, state, search, interactive LRC engine, pooja mode
│   ├── audio.js          # Web Audio API engine (bell, 432Hz Om drone, bead sounds)
│   └── data/
│       ├── gods.js       # 15 Deities metadata, mantras, banners
│       └── songs.js      # 53 Full songs catalog with lyrics, meanings & LRC raw data
├── assets/
│   ├── images/           # High-resolution devotional deity artwork
│   └── lrc/              # 41 Synchronized LRC files
│       ├── Velmaral/
│       │   ├── gurulrc.lrc
│       │   ├── kandarlrc.lrc
│       │   ├── kandhalrc.lrc
│       │   └── velmaaral.lrc
│       ├── Sruthilaya/
│       │   └── Lalitha.lrc
│       ├── Jai_Shree_Ram_Assets/
│       │   ├── Ashtakam/ (9 LRC files)
│       │   ├── Ganesha/ (2 LRC files)
│       │   ├── Lakshmi/ (2 LRC files)
│       │   ├── Saraswathi/ (1 LRC file)
│       │   ├── Nama_Sangeerthanam/ (9 LRC files)
│       │   └── Vishnu_Sahasranamam/ (10 LRC files: Complete & Parts 1-9)
│       ├── Abirami/
│       │   └── Abirami_Anthadhi_Complete.lrc
│       └── Soundarya_Lahari/
│           ├── Soundarya_Lahari_Tamil.lrc
│           └── Soundarya_Lahari_Telugu.lrc
└── README.md
```
