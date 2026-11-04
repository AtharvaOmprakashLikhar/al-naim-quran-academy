/**
 * Al Naim Qur'an Academy — 3D Book Interactive Engine
 * Handles 3D page rendering, scroll-driven page turns, manual page navigation,
 * lighting effects, floating Arabic letters, and rosary beads tracking.
 */

(() => {
  const $ = id => document.getElementById(id);
  const toAr = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const sec = $("bookSec");
  const book = $("book");
  const head = $("head");
  const siteNameEl = $("siteName");
  const siteTagEl = $("siteTag");

  if (!sec || !book) return;

  // Set site header in hero stage
  if (siteNameEl) siteNameEl.textContent = SITE.name;
  if (siteTagEl) siteTagEl.textContent = SITE.tagline;

  // Page renderer
  function renderPage(p, i) {
    if (p.type === "cover") {
      return `
        <div class="cv">
          <div class="star"></div>
          <div class="ctitle ar" lang="ar" dir="rtl">القرآن الكريم</div>
          <div class="cname">${SITE.name}</div>
        </div>
      `;
    }
    if (p.type === "back") return "";
    if (p.type === "blank") {
      return `<div class="pg c"><div class="orn"></div></div>`;
    }
    if (p.type === "intro") {
      return `
        <div class="pg c">
          <div class="orn"></div>
          <h2>${SITE.name}</h2>
          <p class="tag">${SITE.tagline}</p>
          <div style="margin-top:1em; font-family:'Amiri Quran',serif; font-size:1.4em; color:var(--emerald);">
            ${SITE.arabicName}
          </div>
        </div>
      `;
    }
    if (p.type === "end") {
      return `
        <div class="pg c">
          <h2>${p.title}</h2>
          <p class="tag">${p.text}</p>
          <button class="btn" onclick="document.getElementById('trialModal').classList.add('on')">
            ${SITE.join.label}
          </button>
        </div>
      `;
    }

    const headMarkup = p.cont
      ? `<p class="sub">${p.name}</p>`
      : `<div class="sname ar" lang="ar" dir="rtl">${p.ar}</div><p class="sub">${p.name}, ${p.sub}</p>`;

    const versesMarkup = p.verses
      .map(
        v => `
        <p class="v">
          <span class="ar" lang="ar" dir="rtl">${v.ar} <i>﴿${toAr(v.n)}﴾</i></span>
          <span class="en">${v.en}</span>
        </p>
      `
      )
      .join("");

    return `<div class="pg">${headMarkup}${versesMarkup}</div>`;
  }

  // Assemble faces: cover, pages, (blank pad if odd), back cover -> leaves
  const pagesList = PAGES.slice();
  if (pagesList.length % 2) {
    pagesList.push({ type: "blank" });
  }

  const faces = [{ type: "cover" }, ...pagesList, { type: "back" }];
  const L = faces.length / 2;
  const F = L - 1;

  book.innerHTML = Array.from({ length: L }, (_, k) => {
    const a = faces[2 * k];
    const b = faces[2 * k + 1];
    return `
      <div class="leaf">
        <div class="face f ${a.type === "cover" ? "cov" : ""}">${renderPage(a, 2 * k)}</div>
        <div class="face b ${b.type === "back" ? "cov back" : ""}">${renderPage(b, 2 * k + 1)}</div>
      </div>
    `;
  }).join("");

  // Add red ribbon bookmark
  book.insertAdjacentHTML("beforeend", '<i class="ribbon"></i>');

  // Set section height based on number of leaves for natural scroll distance
  sec.style.height = 150 + F * 75 + "vh";

  const leaves = [...document.querySelectorAll(".leaf")];
  const stage = document.querySelector(".stage");

  // Rosary beads setup (33 beads on right sidebar)
  const beadsContainer = $("beads");
  if (beadsContainer) {
    beadsContainer.innerHTML = "<i></i>".repeat(33);
  }
  const beads = beadsContainer ? [...beadsContainer.children] : [];

  // Index verses for staggered clip-path animation
  document.querySelectorAll(".pg").forEach(pg => {
    pg.querySelectorAll(".v").forEach((v, idx) => v.style.setProperty("--i", idx));
  });

  // Background stars and floating Arabic letters
  const starsContainer = $("stars");
  if (starsContainer) {
    const letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
    starsContainer.innerHTML =
      Array.from(
        { length: 48 },
        () =>
          `<i style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${-Math.random() * 4}s;scale:${0.5 + Math.random()}"></i>`
      ).join("") +
      Array.from(
        { length: 18 },
        () =>
          `<b class="ar" style="left:${4 + Math.random() * 92}%;animation-delay:${-Math.random() * 16}s;animation-duration:${12 + Math.random() * 10}s;font-size:${1.2 + Math.random() * 1.6}rem">${letters[Math.floor(Math.random() * letters.length)]}</b>`
      ).join("");
  }

  let ticking = false;
  let currentScrollX = 0;

  function update() {
    ticking = false;
    const rect = sec.getBoundingClientRect();
    const navH = 74;
    const scrollProgress = clamp(-(rect.top - navH) / (sec.offsetHeight - 1.5 * innerHeight));
    const x = scrollProgress * F;
    currentScrollX = x;
    const open = ease(clamp(x));

    leaves.forEach((el, k) => {
      const a = -180 * ease(clamp(x - k));
      el.style.transform = `rotateY(${a}deg)`;
      el.style.zIndex = a < -90 ? k + 1 : L - k;
    });

    book.style.transform = `translateX(${-25 * (1 - open)}%) rotateX(${16 * (1 - open)}deg)`;
    if (head) head.style.opacity = 1 - clamp(x * 2.2);

    if (stage) stage.style.setProperty("--open", open.toFixed(3));

    // Update beads progress
    const activeBeadCount = Math.round(scrollProgress * 33);
    beads.forEach((b, i) => b.classList.toggle("on", i < activeBeadCount));

    // Activate live verse reveal
    const curIdx = Math.round(x);
    leaves.forEach((l, k) => {
      l.children[0].classList.toggle("live", k === curIdx);
      l.children[1].classList.toggle("live", k === curIdx - 1);
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", update);
  update();
})();
