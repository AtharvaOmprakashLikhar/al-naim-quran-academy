# 📖 Al Naim Qur’an Academy — Official Website

> **A luxury, state-of-the-art interactive web application for Al Naim Qur'an Academy**, featuring a scroll-driven 3D interactive Mushaf, real-time Arabic speech synthesis, digital Tasbih counter with audio chimes, structured curriculum roadmap, and an interactive 3D payment gateway.

---

## ✨ Features & Highlights

1. **3D Interactive Holy Qur'an Experience**
   - Realistic 3D book physics with perspective page flips on scroll or button clicks.
   - Sacred golden halo with rotating geometric rings and heavenly light rays.
   - Floating Arabic calligraphy letters and twinkling night sky stars.
   - Traditional brass swinging lanterns with flickering candlelight.
   - Rosary beads reading progress indicator (33 beads).
   - Staggered calligraphic reveal for Arabic verses.

2. **Course Catalog & Multi-Currency Tuition**
   - Detailed course cards for *Noorani Qaida*, *Nazra & Applied Tajweed*, *Hifz*, and *Translation & Tafseer*.
   - Live multi-currency exchange conversion (USD, EUR, GBP, INR, AED, SAR, CAD).
   - Instant "Enroll Now" and "Book Free Trial" call-to-actions.

3. **Daily Quran Reflection & Verse of the Day**
   - 3D interactive card with perspective tilt on cursor movement.
   - Animated handwriting clip-path stroke effect.
   - Native Arabic speech pronunciation via Web Speech API.
   - Real-time Umm al-Qura Islamic Hijri calendar integration.
   - Instant random verse shuffle.

4. **Meet the Letters — Arabic Alphabet Studio**
   - 28 3D tactile flipping blocks with Arabic typography and English transliteration.
   - Native audio pronunciation on tap/click.

5. **Spiritual Digital Tasbih Counter**
   - Illuminated radial SVG progress ring filling up to 33 dhikr.
   - Dhikr switch tabs (*SubhanAllah*, *Alhamdulillah*, *Allahu Akbar*, *La ilaha illallah*, *Astaghfirullah*).
   - Celestial chime chord and golden confetti burst celebration on round completion.
   - Haptic vibration feedback for mobile devices.

6. **Structured Curriculum Roadmap**
   - Interactive illuminated golden path that fills dynamically as you scroll down.
   - Expandable milestone details for every learning stage.

7. **Interactive 3D Credit Card & Payment Gateway Simulation**
   - Realistic 3D flip card with gold chip and magnetic strip.
   - Dynamic brand detection (Visa, MasterCard, American Express) with real-time gradient recoloring.
   - Active field highlight tracker ring (`.hl`).
   - Luhn algorithm validation and MM/YY expiry checks.
   - 6-digit OTP verification screen with countdown timer and resend functionality.
   - Printable transaction receipt.

8. **Free 1-on-1 Trial Booking Modal & WhatsApp Chat**
   - Interactive scheduling modal for students and parents.
   - Floating direct WhatsApp admission chat button with pulsing indicator.

9. **Web Audio Synthesizer (Zero External Audio Dependencies)**
   - Custom synthesized wooden clicks, soft page flips, and celestial completion chords using the Web Audio API.
   - Sound toggle button with mute/unmute control in the navbar.

---

## 📁 Project Directory Structure

```text
acadmey/
├── assets/
│   └── images/
│       ├── logo.jpg          # Official Academy Logo
│       └── favicon.svg       # Gold Rub-el-Hizb SVG Favicon
├── css/
│   └── style.css             # Luxury Emerald & Gold Design System
├── js/
│   ├── data.js               # Centralized content (Courses, Verses, Pages, FAQs)
│   ├── book.js               # 3D Book scroll & rendering engine
│   ├── interactive.js        # Tasbih, Alphabet, Audio synthesizer, Cursor
│   ├── payment.js            # 3D card widget, validation & OTP simulation
│   └── app.js                # App controller, navigation, trial modal
├── index.html                # Modern, semantic website entry point
├── package.json              # Local runner scripts
└── README.md                 # Project documentation
```

---

## 🚀 How to Run Locally

You can run this website in any modern web browser:

### Option 1: Direct File
Double-click `index.html` to open it directly in Chrome, Edge, Safari, or Firefox.

### Option 2: Using Node.js (Recommended)
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Using Python
```bash
npm run serve
# or: python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ How to Customize Content

All text, courses, surahs, pricing, and contact numbers can be edited in a single file:
👉 **[js/data.js](file:///c:/Users/Atharva/OneDrive/Desktop/acadmey/js/data.js)**

- To update courses or prices: edit `SITE.courses` in `js/data.js`.
- To add or modify Qur'an pages: edit `PAGES` in `js/data.js`.
- To update WhatsApp link or phone: edit `SITE.contact` in `js/data.js`.

---

## 🌐 Live URLs & Deployment

### 🔗 Live Website (GitHub Pages)
👉 **[https://atharvaomprakashlikhar.github.io/al-naim-quran-academy/](https://atharvaomprakashlikhar.github.io/al-naim-quran-academy/)**

### 📦 GitHub Repository
👉 **[https://github.com/AtharvaOmprakashLikhar/al-naim-quran-academy](https://github.com/AtharvaOmprakashLikhar/al-naim-quran-academy)**

### 🚀 Deploy to Render
Click the button below to deploy this repository directly to Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/AtharvaOmprakashLikhar/al-naim-quran-academy)

**Render Settings (Static Site)**:
- **Build Command**: *(leave empty)*
- **Publish Directory**: `.`
- Pre-configured with [`render.yaml`](file:///c:/Users/Atharva/OneDrive/Desktop/acadmey/render.yaml) for automatic setup.
