/**
 * Al Naim Qur'an Academy — Site Data & Content Configuration
 * Centralized content repository for courses, verses, 3D book pages, curriculum, and settings.
 */

const SITE = {
  name: "Al Naim Qur’an Academy",
  arabicName: "أكاديمية النعيم للقرآن الكريم",
  tagline: "Learn to read, recite and understand the Holy Qur’an with patient, certified teachers from Al-Azhar and renowned Islamic institutions, online from the comfort of your home.",
  subtag: "1-on-1 Live Online Classes for Kids & Adults Worldwide with Personalized Tajweed & Hifz Tracking",
  contact: {
    whatsapp: "+1 (555) 786-9292",
    whatsappLink: "https://wa.me/15557869292?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20inquire%20about%20classes%20at%20Al%20Naim%20Quran%20Academy.",
    email: "admissions@alnaimacademy.com",
    phone: "+1 (800) 555-NAIM",
    hours: "24/7 Flexible Global Scheduling"
  },
  courses: [
    {
      id: "noorani-qaida",
      n: "Noorani Qaida & Foundation",
      ar: "القاعدة النورانية",
      d: "Master Arabic letters, Makharij (points of articulation), vowel signs (Harakat), and foundational phonetics for young children and beginner adults.",
      level: "Beginner",
      duration: "3 - 4 Months",
      classesPerWeek: "3 - 5 classes / week (30 mins)",
      features: [
        "Arabic letter recognition & correct Makharij",
        "Tanween, Sukoon, Shaddah, and Madd rules",
        "Gradual progression into word joining",
        "Interactive digital whiteboards & games"
      ],
      p: 30,
      popular: false
    },
    {
      id: "nazra-tajweed",
      n: "Nazra & Applied Tajweed",
      ar: "القراءة بالتجويد",
      d: "Develop fluent, melodic recitation directly from the Mushaf while practicing essential Tajweed rules step-by-step with certified reciters.",
      level: "Intermediate",
      duration: "6 - 9 Months",
      classesPerWeek: "3 - 4 classes / week (30-45 mins)",
      features: [
        "Rules of Noon Sakinah & Meem Sakinah",
        "Ahkam Al-Madd, Qalqalah, and Ghunnah",
        "Breath control & stop/start signs (Waqf & Ibtida)",
        "Daily recitation critique & corrective practice"
      ],
      p: 35,
      popular: true
    },
    {
      id: "hifz-quran",
      n: "Hifz (Quran Memorization)",
      ar: "حفظ القرآن الكريم",
      d: "A structured, guided memorisation program utilizing the classical Sabaq, Sabqi, and Manzil methodology with daily tracking and monthly examinations.",
      level: "Advanced",
      duration: "2 - 3 Years (Custom Pace)",
      classesPerWeek: "5 days / week (45 mins)",
      features: [
        "Daily new lesson (Sabaq) with teacher verification",
        "Recent memorization revision (Sabqi)",
        "Cumulative retention revision (Manzil)",
        "Ijaza pathway preparation upon completion"
      ],
      p: 45,
      popular: false
    },
    {
      id: "translation-tafseer",
      n: "Translation & Tafseer",
      ar: "ترجمة وتفسير القرآن",
      d: "Go beyond recitation. Understand the historical context (Asbab al-Nuzul), linguistic beauty, and timeless wisdom of every Surah you recite.",
      level: "All Levels",
      duration: "Ongoing / Flexible",
      classesPerWeek: "2 - 3 classes / week (45 mins)",
      features: [
        "Word-by-word Arabic grammatical analysis",
        "Context of revelation (Asbab al-Nuzul)",
        "Practical life lessons & moral guidance",
        "Interactive Q&A discussions"
      ],
      p: 40,
      popular: false
    }
  ],
  join: {
    title: "Start with a 100% Free Trial Class",
    text: "Experience our patient teaching style firsthand. Choose your preferred day and time — no credit card required for your trial lesson.",
    label: "Book a Free Trial Class",
    href: "#trialModal"
  },
  footer: "© 2026 Al Naim Qur’an Academy. All rights reserved. Dedicated to spreading the light of the Holy Qur'an worldwide."
};

/* Book pages in authentic reading order */
const PAGES = [
  { type: "intro" },
  { 
    type: "surah", 
    ar: "الفاتحة", 
    name: "Al-Fātiḥah", 
    sub: "The Opening", 
    verses: [
      { n: 1, ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", en: "In the name of Allah, the Most Merciful, the Most Compassionate." },
      { n: 2, ar: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", en: "All praise belongs to Allah, Lord of all the worlds," },
      { n: 3, ar: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", en: "The Most Merciful, the Most Compassionate," },
      { n: 4, ar: "مَٰلِكِ يَوْمِ ٱلدِّينِ", en: "Master of the Day of Judgment." } 
    ] 
  },
  { 
    type: "surah", 
    cont: true, 
    name: "Al-Fātiḥah continued", 
    verses: [
      { n: 5, ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", en: "You alone we worship, and You alone we ask for help." },
      { n: 6, ar: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", en: "Guide us along the straight path," },
      { n: 7, ar: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", en: "The path of those You have blessed, not of those who earned anger, nor of those who go astray." } 
    ] 
  },
  { 
    type: "surah", 
    ar: "الإخلاص", 
    name: "Al-Ikhlāṣ", 
    sub: "The Purity of Faith", 
    verses: [
      { n: 1, ar: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", en: "Say: He is Allah, the One." },
      { n: 2, ar: "ٱللَّهُ ٱلصَّمَدُ", en: "Allah, the Eternal Refuge." },
      { n: 3, ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", en: "He neither begets nor is born," },
      { n: 4, ar: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", en: "Nor is there to Him any equivalent." } 
    ] 
  },
  { 
    type: "surah", 
    ar: "العلق", 
    name: "Al-ʿAlaq", 
    sub: "The Clot (First Revealed)", 
    verses: [
      { n: 1, ar: "ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ", en: "Read in the name of your Lord who created," },
      { n: 2, ar: "خَلَقَ ٱلْإِنسَٰنَ مِنْ عَلَقٍ", en: "Created man from a clinging clot." },
      { n: 3, ar: "ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ", en: "Read, and your Lord is the Most Generous," },
      { n: 4, ar: "ٱلَّذِى عَلَّمَ بِٱلْقَلَمِ", en: "Who taught by the pen," },
      { n: 5, ar: "عَلَّمَ ٱلْإِنسَٰنَ مَا لَمْ يَعْلَمْ", en: "Taught man that which he knew not." } 
    ] 
  },
  { 
    type: "surah",
    ar: "الناس",
    name: "An-Nās",
    sub: "Mankind",
    verses: [
      { n: 1, ar: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", en: "Say: I seek refuge in the Lord of mankind," },
      { n: 2, ar: "مَلِكِ ٱلنَّاسِ", en: "The Sovereign of mankind," },
      { n: 3, ar: "إِلَٰهِ ٱلنَّاسِ", en: "The God of mankind," },
      { n: 4, ar: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ", en: "From the evil of the retreating whisperer." }
    ]
  },
  { 
    type: "end", 
    title: "Begin Your Blessed Journey", 
    text: "The Prophet ﷺ said: 'The best among you are those who learn the Qur’an and teach it.' (Sahih al-Bukhari)" 
  }
];

/* Currency exchange rates for international enrollment */
const RATES = { 
  USD: { r: 1, s: "$" }, 
  EUR: { r: 0.92, s: "€" }, 
  GBP: { r: 0.79, s: "£" }, 
  INR: { r: 84, s: "₹" }, 
  AED: { r: 3.67, s: "AED " },
  SAR: { r: 3.75, s: "SAR " },
  CAD: { r: 1.36, s: "CA$" }
};

/* Learning path milestone tracker */
const PATH = [
  ["Noorani Qaida", "Months 1 to 3", "Recognise every Arabic letter, distinguish similar shapes, master vowels (Fathah, Kasrah, Dammah), and pronounce each Makhraj with precision."],
  ["Nazra Fluent Recitation", "Months 4 to 9", "Read smoothly from the holy Mushaf with steady pacing, rhythm, and confidence under constant live teacher guidance."],
  ["Tajweed Application", "Year 1 to 2", "In-depth application of Ikhfa, Idgham, Iqlab, Izhar, Madd rules, stopping pauses, and spiritual reflection."],
  ["Hifz Memorization", "Year 2 Onward", "Commit Surahs to heart with disciplined daily Sabaq, recent Sabqi, and long-term Manzil retention rounds."],
  ["Tafseer & Living the Quran", "Lifelong Blessing", "Internalize the divine wisdom, stories of prophets, and moral teachings in everyday personal character."]
];

/* Complete 28 Arabic letters with Arabic name and English transliteration */
const LETTERS = "ا|ألف|Alif,ب|باء|Bāʼ,ت|تاء|Tāʼ,ث|ثاء|Thāʼ,ج|جيم|Jīm,ح|حاء|Ḥāʼ,خ|خاء|Khāʼ,د|دال|Dāl,ذ|ذال|Dhāl,ر|راء|Rāʼ,ز|زاي|Zāy,س|سين|Sīn,ش|شين|Shīn,ص|صاد|Ṣād,ض|ضاد|Ḍād,ط|طاء|Ṭāʼ,ظ|ظاء|Ẓāʼ,ع|عين|ʿAyn,غ|غين|Ghayn,ف|فاء|Fāʼ,ق|قاف|Qāf,ك|كاف|Kāf,ل|لام|Lām,م|ميم|Mīm,ن|نون|Nūn,ه|هاء|Hāʼ,و|واو|Wāw,ي|ياء|Yāʼ";

/* Inspiring Quranic verses for daily reflection */
const DAILY_VERSES = [
  { ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", en: "In the name of Allah, the Most Merciful, the Most Compassionate.", ref: "Surah Al-Fatihah 1:1" },
  { ar: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", en: "Guide us along the straight path.", ref: "Surah Al-Fatihah 1:6" },
  { ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", en: "For indeed, with hardship [will be] ease.", ref: "Surah Ash-Sharh 94:5" },
  { ar: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", en: "Indeed, with hardship [will be] ease.", ref: "Surah Ash-Sharh 94:6" },
  { ar: "وَقُل رَّبِّ زِدْنِى عِلْمًا", en: "And say: 'My Lord, increase me in knowledge.'", ref: "Surah Ta-Ha 20:114" },
  { ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", en: "Unquestionably, by the remembrance of Allah hearts are assured.", ref: "Surah Ar-Ra'd 13:28" },
  { ar: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا", en: "And whoever fears Allah — He will make for him a way out.", ref: "Surah At-Talaq 65:2" },
  { ar: "ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ", en: "Read, and your Lord is the Most Generous.", ref: "Surah Al-Alaq 96:3" }
];

/* Why Choose Al Naim Academy Features */
const FEATURES = [
  {
    icon: "🌟",
    title: "1-on-1 Personalized Attention",
    desc: "Every student learns at their individual pace with dedicated private tutoring sessions that adapt to their schedule."
  },
  {
    icon: "📜",
    title: "Certified Al-Azhar Scholars",
    desc: "Our male and female instructors are certified with authentic Sanad (Ijazah) connected through unbroken chains of transmission."
  },
  {
    icon: "⏰",
    title: "24/7 Global Flexible Scheduling",
    desc: "Whether you reside in the US, UK, Canada, Australia, or the Gulf, reschedule or select times that fit your family."
  },
  {
    icon: "🧕",
    title: "Male & Female Tutors Available",
    desc: "Comfortable, culturally respectful environment with dedicated female teachers available for sisters and younger children."
  },
  {
    icon: "📊",
    title: "Monthly Progress Reports",
    desc: "Track attendance, verses memorized, Tajweed mastery, and instructor feedback through dedicated student portals."
  },
  {
    icon: "🎁",
    title: "100% Free Trial Lesson",
    desc: "Assess our teaching methodology without any financial commitment before finalizing your monthly enrollment."
  }
];

/* Genuine parent and student testimonials */
const TESTIMONIALS = [
  {
    name: "Dr. Tariq & Aisha Rahman",
    loc: "London, United Kingdom",
    role: "Parents of Zaid (Age 8) & Maryam (Age 11)",
    text: "Finding teachers who have both authentic Tajweed and genuine patience with children is rare. Our kids look forward to their Quran lessons every evening. Highly recommended!",
    rating: 5
  },
  {
    name: "Sister Fatima Al-Mansoor",
    loc: "Toronto, Canada",
    role: "Adult Tajweed Student",
    text: "As a working professional, the flexible scheduling made it possible for me to restart my Quran recitation after 15 years. My female Ustatha is wonderfully encouraging.",
    rating: 5
  },
  {
    name: "Brother Imran Siddiqui",
    loc: "Dallas, Texas, USA",
    role: "Father of Hamza (Hifz Student)",
    text: "The structured Sabaq and Manzil revision system helped my son memorize 5 Juz in just 9 months with crystal-clear pronunciation. The monthly updates keep us thoroughly informed.",
    rating: 5
  }
];

/* Frequently Asked Questions */
const FAQS = [
  {
    q: "How does the free trial class work?",
    a: "Click 'Book a Free Trial', choose your preferred day/time, and tell us the student's age. We will arrange a 30-minute private 1-on-1 trial class with a certified teacher over Zoom or Google Meet. No credit card is required."
  },
  {
    q: "Can I choose a female teacher for my daughter or myself?",
    a: "Yes, absolutely. We have an esteemed team of certified female Quran scholars and Hafidhas for sisters and young children."
  },
  {
    q: "What age can children start learning?",
    a: "Children can start our beginner Noorani Qaida course as young as 4.5 to 5 years old. Our tutors use colorful, child-friendly visuals and gentle pedagogical pacing."
  },
  {
    q: "Can classes be rescheduled if we are traveling or busy?",
    a: "Yes. Simply notify your tutor or our support team via WhatsApp 2 hours prior to the scheduled lesson, and we will happily arrange a make-up class."
  },
  {
    q: "What equipment do I need for online classes?",
    a: "All you need is a computer, laptop, tablet, or smartphone with an active internet connection and headphones with a microphone."
  }
];
