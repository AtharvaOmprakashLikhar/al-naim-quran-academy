/**
 * Al Naim Qur'an Academy — Interactive Features & Audio Synthesizer
 * Powers: Web Audio API sound effects, Verse of the Day (3D tilt & speech synthesis),
 * Arabic Alphabet 3D tiles, Digital Tasbih counter, and particle effects.
 */

// Global Audio Engine (Zero external audio files required, 100% offline & instantaneous)
const AcademyAudio = (() => {
  let ctx = null;
  let muted = false;

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  return {
    toggleMute() {
      muted = !muted;
      return muted;
    },
    isMuted() {
      return muted;
    },
    playClick() {
      if (muted) return;
      const c = getContext();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, c.currentTime + 0.04);
        gain.gain.setValueAtTime(0.25, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.04);
      } catch (e) {}
    },
    playChime() {
      if (muted) return;
      const c = getContext();
      if (!c) return;
      try {
        // Celestial Islamic golden chime chord (F - A - C - E)
        const freqs = [349.23, 440.0, 523.25, 659.25, 880.0];
        freqs.forEach((freq, idx) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, c.currentTime + idx * 0.05);
          gain.gain.setValueAtTime(0.18, c.currentTime + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + idx * 0.05 + 1.2);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start(c.currentTime + idx * 0.05);
          osc.stop(c.currentTime + idx * 0.05 + 1.25);
        });
      } catch (e) {}
    },
    playPageTurn() {
      if (muted) return;
      const c = getContext();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.08);
      } catch (e) {}
    }
  };
})();

window.AcademyAudio = AcademyAudio;

// Particle explosion helper
function burst(x, y, count = 8) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    s.className = "sp";
    s.style.left = x + "px";
    s.style.top = y + "px";
    document.body.append(s);
    const angle = Math.random() * Math.PI * 2;
    const dist = 35 + Math.random() * 65;
    s.animate(
      [
        { transform: "translate(0,0) scale(1) rotate(45deg)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0) rotate(225deg)`,
          opacity: 0
        }
      ],
      {
        duration: 600 + Math.random() * 350,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    ).onfinish = () => s.remove();
  }
}

window.addEventListener("click", e => {
  if (e.target.closest("button, .btn, a, .tile, .tb")) {
    burst(e.clientX, e.clientY, 6);
  }
});

// Interactive Initialization
document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  /* ---------- Sound Button in Header ---------- */
  const soundBtn = $("soundBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const isMuted = AcademyAudio.toggleMute();
      soundBtn.textContent = isMuted ? "🔇" : "🔔";
      soundBtn.setAttribute("aria-label", isMuted ? "Unmute audio" : "Mute audio");
      if (!isMuted) AcademyAudio.playClick();
    });
  }

  /* ---------- Verse of the Day ---------- */
  const vAr = $("vAr");
  const vEn = $("vEn");
  const vRef = $("vRef");
  const vNext = $("vNext");
  const vSpeak = $("vSpeak");
  const hijriEl = $("hijri");
  const vc = $("vod");

  // Gather verses from PAGES & DAILY_VERSES
  const verseList = [...DAILY_VERSES];
  if (typeof PAGES !== "undefined") {
    PAGES.forEach(p => {
      if (p.verses) {
        p.verses.forEach(v => {
          verseList.push({
            ar: v.ar,
            en: v.en,
            ref: p.name.replace(" continued", "") + ", verse " + v.n
          });
        });
      }
    });
  }

  let currentVerseIdx = Math.floor(Date.now() / 864e5) % verseList.length;

  function renderVerse() {
    const v = verseList[currentVerseIdx];
    if (!v) return;
    if (vAr) {
      vAr.classList.remove("w");
      void vAr.offsetWidth;
      vAr.textContent = v.ar;
      vAr.classList.add("w");
    }
    if (vEn) vEn.textContent = v.en;
    if (vRef) vRef.textContent = v.ref;
  }

  if (vNext) {
    vNext.addEventListener("click", () => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * verseList.length);
      } while (nextIdx === currentVerseIdx && verseList.length > 1);
      currentVerseIdx = nextIdx;
      renderVerse();
      AcademyAudio.playClick();
    });
  }

  if (vSpeak) {
    vSpeak.addEventListener("click", () => {
      const v = verseList[currentVerseIdx];
      if (v && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(v.ar);
        u.lang = "ar-SA";
        u.rate = 0.75;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    });
  }

  // Display Hijri Date
  if (hijriEl) {
    try {
      const hijriDate = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(new Date());
      hijriEl.textContent = `Today: ${hijriDate} AH`;
    } catch (e) {
      hijriEl.textContent = "Spiritual guidance for each day";
    }
  }

  // 3D Perspective Tilt on Mouse Move
  if (vc) {
    vc.addEventListener("pointermove", e => {
      const rect = vc.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      vc.style.transform = `perspective(900px) rotateX(${-py * 10}deg) rotateY(${px * 12}deg)`;
    });
    vc.addEventListener("pointerleave", () => {
      vc.style.transform = "";
    });
  }

  renderVerse();

  /* ---------- Arabic Alphabet 3D Flip Tiles ---------- */
  const abcContainer = $("abc");
  if (abcContainer && typeof LETTERS !== "undefined") {
    abcContainer.innerHTML = LETTERS.split(",")
      .map(entry => {
        const [letter, arabicName, englishName] = entry.split("|");
        return `
          <button class="tile" data-ar="${arabicName}" aria-label="Arabic letter ${englishName}">
            <span class="ti">
              <span class="tf ar" lang="ar">${letter}</span>
              <span class="tb2">${englishName}</span>
            </span>
          </button>
        `;
      })
      .join("");

    abcContainer.addEventListener("click", e => {
      const tile = e.target.closest(".tile");
      if (!tile) return;
      tile.classList.toggle("on");
      AcademyAudio.playClick();

      // Pronounce letter aloud via SpeechSynthesis API
      if (tile.classList.contains("on") && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(tile.dataset.ar);
        u.lang = "ar-SA";
        u.rate = 0.8;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    });
  }

  /* ---------- Digital Tasbih Counter ---------- */
  const tb = $("tb");
  const tp = $("tp");
  const tn = $("tn");
  const tw = $("tw");
  const rnd = $("rnd");
  const tz = $("tz");
  const dhikrTabs = document.querySelectorAll(".dhikr-tab-btn");

  const DHIKR_PHRASES = [
    { ar: "سُبْحَانَ ٱللَّهِ", en: "SubhanAllah" },
    { ar: "ٱلْحَمْدُ لِلَّهِ", en: "Alhamdulillah" },
    { ar: "ٱللَّهُ أَكْبَرُ", en: "Allahu Akbar" },
    { ar: "لَا إِلَٰهَ إِلَّا ٱللَّهُ", en: "La ilaha illallah" },
    { ar: "أَسْتَغْفِرُ ٱللَّهَ", en: "Astaghfirullah" }
  ];

  let count = 0;
  let rounds = 0;
  let activeDhikrIdx = 0;

  function updateTasbihDisplay() {
    if (tn) tn.textContent = count;
    if (tp) tp.style.strokeDashoffset = 553 * (1 - count / 33);
    if (tw) tw.textContent = DHIKR_PHRASES[activeDhikrIdx].ar;
    if (rnd) rnd.textContent = `Rounds: ${rounds}`;
  }

  if (tb) {
    tb.addEventListener("click", () => {
      if (count >= 33) return;
      count++;
      AcademyAudio.playClick();
      if (navigator.vibrate) navigator.vibrate(12);
      updateTasbihDisplay();

      if (count === 33) {
        const rect = tb.getBoundingClientRect();
        burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
        AcademyAudio.playChime();
        tb.classList.remove("done");
        void tb.offsetWidth;
        tb.classList.add("done");

        setTimeout(() => {
          count = 0;
          rounds++;
          activeDhikrIdx = (activeDhikrIdx + 1) % DHIKR_PHRASES.length;
          // Sync active tab
          dhikrTabs.forEach((tab, idx) => {
            tab.classList.toggle("active", idx === activeDhikrIdx);
          });
          updateTasbihDisplay();
        }, 800);
      }
    });
  }

  if (tz) {
    tz.addEventListener("click", () => {
      count = 0;
      rounds = 0;
      AcademyAudio.playClick();
      updateTasbihDisplay();
    });
  }

  dhikrTabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => {
      dhikrTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeDhikrIdx = idx;
      count = 0;
      AcademyAudio.playClick();
      updateTasbihDisplay();
    });
  });

  updateTasbihDisplay();

  /* ---------- Learning Path Progressive Glow on Scroll ---------- */
  const pathContainer = $("path");
  if (pathContainer && typeof PATH !== "undefined") {
    pathContainer.innerHTML = PATH.map(
      p => `
      <details class="pt">
        <summary>${p[0]}<small>${p[1]}</small></summary>
        <p>${p[2]}</p>
      </details>
    `
    ).join("");

    const milestones = [...pathContainer.children];
    const updatePathGlow = () => {
      const rect = pathContainer.getBoundingClientRect();
      const threshold = window.innerHeight * 0.65;
      const progress = Math.min(1, Math.max(0, (threshold - rect.top) / rect.height));
      pathContainer.style.setProperty("--pp", progress.toFixed(3));
      milestones.forEach(m => {
        m.classList.toggle("on", m.getBoundingClientRect().top < threshold);
      });
    };

    window.addEventListener("scroll", updatePathGlow, { passive: true });
    updatePathGlow();
  }

  /* ---------- Custom Glowing Cursor (Desktop) ---------- */
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isReducedMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const cur = document.createElement("div");
    cur.className = "cur";
    document.body.append(cur);
    let targetX = -99;
    let targetY = -99;
    let curX = -99;
    let curY = -99;

    window.addEventListener("pointermove", e => {
      targetX = e.clientX;
      targetY = e.clientY;
      cur.classList.toggle("big", !!e.target.closest("a, button, summary, input, select, .tile, .tb"));
    });

    (function loop() {
      curX += (targetX - curX) * 0.2;
      curY += (targetY - curY) * 0.2;
      cur.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(loop);
    })();
  }
});
