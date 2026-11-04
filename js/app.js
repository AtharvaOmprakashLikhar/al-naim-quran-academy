/**
 * Al Naim Qur'an Academy — Master Application Controller
 * Handles dynamic content population, mobile navigation, sticky header transitions,
 * free trial form processing, and modal window management.
 */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  /* ---------- Sticky Header Blur Transition ---------- */
  const header = document.querySelector(".site-header");
  const handleScroll = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile Hamburger Navigation Drawer ---------- */
  const hamburgerBtn = $("hamburgerBtn");
  const mobileDrawer = $("mobileDrawer");
  const drawerCloseBtn = $("drawerCloseBtn");

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  const closeMobileDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeMobileDrawer);
  document.querySelectorAll(".mobile-links a").forEach(link => {
    link.addEventListener("click", closeMobileDrawer);
  });

  /* ---------- Populate Academy Features / Why Choose Us ---------- */
  const featuresGrid = $("featuresGrid");
  if (featuresGrid && typeof FEATURES !== "undefined") {
    featuresGrid.innerHTML = FEATURES.map(
      f => `
      <div class="feature-card">
        <div class="feature-icon-box">${f.icon}</div>
        <h3 class="feature-title">${f.title}</h3>
        <p class="feature-text">${f.desc}</p>
      </div>
    `
    ).join("");
  }

  /* ---------- Populate Courses & Dynamic Currency Switcher ---------- */
  const coursesGrid = $("coursesGrid");
  const pageCurrencySelect = $("pageCurrencySelect");

  function renderCourseCards(currKey = "USD") {
    if (!coursesGrid || typeof SITE === "undefined" || !SITE.courses) return;

    const rateObj = (typeof RATES !== "undefined" && RATES[currKey]) ? RATES[currKey] : { r: 1, s: "$" };

    coursesGrid.innerHTML = SITE.courses
      .map((c, idx) => {
        const convertedPrice = rateObj.s + (c.p * rateObj.r).toFixed(rateObj.r >= 50 ? 0 : 2);
        return `
        <div class="course-card ${c.popular ? "featured" : ""}">
          ${c.popular ? '<div class="popular-badge">Most Popular</div>' : ""}
          <div class="course-header">
            <span class="course-level-tag">${c.level}</span>
            <h3 class="course-name">${c.n}</h3>
            <div class="course-arabic">${c.ar}</div>
            <p class="course-desc">${c.d}</p>
            <div class="course-meta">
              <span>⏱ Duration: <strong>${c.duration}</strong></span>
              <span>📅 Schedule: <strong>${c.classesPerWeek}</strong></span>
            </div>
            <ul class="course-features-list">
              ${c.features.map(feat => `<li class="course-feature-item"><i>✓</i> ${feat}</li>`).join("")}
            </ul>
          </div>
          <div class="course-pricing-area">
            <div class="course-price-wrap">
              <span class="course-price-val">${convertedPrice}</span>
              <span class="course-price-unit">/ month</span>
            </div>
            <div class="course-btn-group">
              <button class="enroll-btn" data-course-idx="${idx}">Enroll Now</button>
              <a href="#trialModal" class="trial-sublink open-trial-btn">Or start with 100% Free Trial</a>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  renderCourseCards("USD");

  // Sync page currency switcher
  if (pageCurrencySelect && typeof RATES !== "undefined") {
    pageCurrencySelect.innerHTML = Object.keys(RATES)
      .map(k => `<option value="${k}">${k} (${RATES[k].s.trim()})</option>`)
      .join("");

    pageCurrencySelect.addEventListener("change", e => {
      renderCourseCards(e.target.value);
      // Sync modal currency selector as well
      const modalCur = $("cur");
      if (modalCur) modalCur.value = e.target.value;
    });
  }

  // Course button click delegation (Enroll -> opens 3D Payment)
  document.addEventListener("click", e => {
    const enrollBtn = e.target.closest("[data-course-idx]");
    if (enrollBtn) {
      const idx = +enrollBtn.dataset.courseIdx;
      if (SITE.courses[idx] && window.openPaymentModal) {
        window.openPaymentModal(SITE.courses[idx]);
      }
    }
  });

  /* ---------- Populate Testimonials ---------- */
  const testimonialsGrid = $("testimonialsGrid");
  if (testimonialsGrid && typeof TESTIMONIALS !== "undefined") {
    testimonialsGrid.innerHTML = TESTIMONIALS.map(
      t => `
      <div class="testimonial-card">
        <div>
          <div class="testimonial-stars">${"★".repeat(t.rating)}</div>
          <p class="testimonial-quote">“${t.text}”</p>
        </div>
        <div>
          <div class="testimonial-author-name">${t.name}</div>
          <div class="testimonial-author-role">${t.role} • ${t.loc}</div>
        </div>
      </div>
    `
    ).join("");
  }

  /* ---------- Populate FAQ Accordion ---------- */
  const faqList = $("faqList");
  if (faqList && typeof FAQS !== "undefined") {
    faqList.innerHTML = FAQS.map(
      (f, i) => `
      <div class="faq-item ${i === 0 ? "active" : ""}">
        <button class="faq-question" aria-expanded="${i === 0}">
          <span>${f.q}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>${f.a}</p>
        </div>
      </div>
    `
    ).join("");

    faqList.addEventListener("click", e => {
      const questionBtn = e.target.closest(".faq-question");
      if (!questionBtn) return;
      const item = questionBtn.closest(".faq-item");
      const isAlreadyActive = item.classList.contains("active");

      // Close all
      document.querySelectorAll(".faq-item").forEach(el => {
        el.classList.remove("active");
        el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isAlreadyActive) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
        if (window.AcademyAudio) window.AcademyAudio.playClick();
      }
    });
  }

  /* ---------- Free Trial Modal Logic ---------- */
  const trialModal = $("trialModal");
  const trialCloseBtn = $("trialCloseBtn");
  const trialForm = $("trialForm");
  const trialSuccess = $("trialSuccess");

  const openTrialModal = () => {
    if (trialModal) {
      trialModal.classList.add("on");
      document.body.style.overflow = "hidden";
      if (trialSuccess) trialSuccess.style.display = "none";
      if (trialForm) trialForm.style.display = "block";
    }
  };

  const closeTrialModal = () => {
    if (trialModal) {
      trialModal.classList.remove("on");
      document.body.style.overflow = "";
    }
  };

  // Wire all "Book Free Trial" buttons
  document.addEventListener("click", e => {
    if (e.target.closest(".open-trial-btn, #navTrialBtn, #heroTrialBtn, #joinTrialBtn")) {
      e.preventDefault();
      openTrialModal();
    }
  });

  if (trialCloseBtn) trialCloseBtn.addEventListener("click", closeTrialModal);

  if (trialModal) {
    trialModal.addEventListener("click", e => {
      if (e.target === trialModal) closeTrialModal();
    });
  }

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && trialModal && trialModal.classList.contains("on")) {
      closeTrialModal();
    }
  });

  // Free trial form submission
  if (trialForm) {
    trialForm.addEventListener("submit", e => {
      e.preventDefault();
      const studentName = $("studentName").value;
      const studentAge = $("studentAge").value;
      const courseChoice = $("courseChoice").value;
      const contactInfo = $("contactInfo").value;

      if (window.AcademyAudio) window.AcademyAudio.playChime();

      trialForm.style.display = "none";
      if (trialSuccess) {
        trialSuccess.style.display = "block";
        const trialDetailsSummary = $("trialDetailsSummary");
        if (trialDetailsSummary) {
          trialDetailsSummary.innerHTML = `
            <div class="rc"><span>Student Name</span><b>${studentName}</b></div>
            <div class="rc"><span>Age Group</span><b>${studentAge}</b></div>
            <div class="rc"><span>Selected Course</span><b>${courseChoice}</b></div>
            <div class="rc"><span>Contact</span><b>${contactInfo}</b></div>
          `;
        }
      }
    });
  }

  /* ---------- Dynamic Footer Data ---------- */
  const foot = $("foot");
  if (foot && typeof SITE !== "undefined") {
    foot.textContent = SITE.footer;
  }
});
