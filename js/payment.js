/**
 * Al Naim Qur'an Academy — 3D Payment Gateway Simulation
 * Powers: Interactive 3D credit card with real-time brand detection, Luhn validation,
 * dynamic field highlight tracker, 3D CVV flip, multi-currency conversion, and 6-digit OTP verification.
 */

(() => {
  const $ = id => document.getElementById(id);
  const wait = ms => new Promise(r => setTimeout(r, ms));

  // Gateway simulation
  const GATEWAY = {
    async pay(order, card) {
      await wait(1200);
      return { id: "NAIM-" + Math.floor(100000 + Math.random() * 900000) };
    },
    async verifyOtp(id, code) {
      await wait(800);
      return code === "123456";
    },
    async resendOtp(id) {
      await wait(500);
    }
  };

  const payModal = $("pay");
  const card = $("card");
  const cn = $("cn");
  const ch = $("ch");
  const ce = $("ce");
  const cc = $("cc");
  const curSelect = $("cur");
  const err = $("err");
  const oerr = $("oerr");
  const goPay = $("goPay");
  const verifyBtn = $("verify");
  const otpEl = $("otp");
  const payX = $("payX");
  const doneBtn = $("done");
  const payTitle = $("payTitle");
  const amtEl = $("amt");
  const rcpt = $("rcpt");
  const printReceiptBtn = $("printReceipt");

  if (!payModal) return;

  let activeCourse = null;
  let payTransactionId = null;
  let lastFocusedElement = null;
  let otpTimer = null;

  const showStep = n => {
    ["s1", "s2", "s3"].forEach((id, i) => {
      const el = $(id);
      if (el) el.classList.toggle("on", i === n - 1);
    });
  };

  // Currency Formatter
  const formatMoney = usd => {
    const selectedCurr = curSelect ? curSelect.value : "USD";
    const curr = (typeof RATES !== "undefined" && RATES[selectedCurr]) ? RATES[selectedCurr] : { r: 1, s: "$" };
    return curr.s + (usd * curr.r).toFixed(curr.r >= 50 ? 0 : 2);
  };

  window.formatMoney = formatMoney;

  // Credit Card Brand Styling
  const detectBrand = num => {
    if (/^4/.test(num)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(num)) return "mc";
    if (/^3[47]/.test(num)) return "amex";
    return "";
  };

  const BRAND_THEMES = {
    visa: ["#1c44a8", "#081a4f", "VISA"],
    mc: ["#4a4f5c", "#14161c", '<i class="mc"></i>'],
    amex: ["#1f7a7a", "#0a3b3b", "AMEX"],
    "": ["#2b3a55", "#0e1626", ""]
  };

  // Luhn Algorithm
  const luhnCheck = s => {
    let t = 0;
    let d = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let n = +s[i];
      if (d) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      t += n;
      d = !d;
    }
    return t % 10 === 0;
  };

  // Populate currencies
  if (curSelect && typeof RATES !== "undefined") {
    curSelect.innerHTML = Object.keys(RATES)
      .map(c => `<option value="${c}">${c}</option>`)
      .join("");
  }

  const refreshAmountDisplay = () => {
    if (!activeCourse) return;
    const formatted = formatMoney(activeCourse.p);
    if (amtEl) amtEl.textContent = formatted;
    if (goPay) goPay.textContent = `Pay ${formatted} / month`;
  };

  if (curSelect) {
    curSelect.addEventListener("change", refreshAmountDisplay);
  }

  // Interactive Card Focus Ring & Live Card Inputs
  [cn, ch, ce, cc].forEach(field => {
    if (!field) return;
    const getHl = () => field.closest(".side").querySelector(".hl");

    field.addEventListener("focus", () => {
      card.classList.toggle("flip", field === cc);
      const hl = getHl();
      if (hl) {
        Object.assign(hl.style, {
          left: field.offsetLeft - 6 + "px",
          top: field.offsetTop - 4 + "px",
          width: field.offsetWidth + 12 + "px",
          height: field.offsetHeight + 8 + "px",
          opacity: 1
        });
      }
    });

    field.addEventListener("blur", () => {
      const hl = getHl();
      if (hl) hl.style.opacity = 0;
    });

    field.addEventListener("input", () => {
      field.classList.remove("tick");
      void field.offsetWidth;
      field.classList.add("tick");
    });
  });

  // Card Number formatting & recoloring
  if (cn) {
    cn.addEventListener("input", () => {
      const clean = cn.value.replace(/\D/g, "").slice(0, 19);
      const brand = detectBrand(clean);
      const isAmex = brand === "amex";
      const grouping = isAmex ? [4, 6, 5] : [4, 4, 4, 4, 4];
      const parts = [];
      let idx = 0;

      for (const len of grouping) {
        if (idx >= clean.length) break;
        parts.push(clean.slice(idx, idx + len));
        idx += len;
      }

      cn.value = parts.join(" ");

      // Recolor card with gradient
      const theme = BRAND_THEMES[brand];
      card.querySelectorAll(".side").forEach(s => {
        s.style.setProperty("--c1", theme[0]);
        s.style.setProperty("--c2", theme[1]);
      });

      const brandEl = $("brand");
      if (brandEl) brandEl.innerHTML = theme[2];

      if (cc) {
        cc.maxLength = isAmex ? 4 : 3;
        cc.placeholder = isAmex ? "••••" : "•••";
      }
    });
  }

  // Expiry date auto-formatting
  if (ce) {
    ce.addEventListener("input", () => {
      let d = ce.value.replace(/\D/g, "");
      if (d.length === 1 && d > 1) d = "0" + d;
      ce.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2, 4) : d;
    });
  }

  // Security code clean digits
  if (cc) {
    cc.addEventListener("input", () => {
      cc.value = cc.value.replace(/\D/g, "");
    });
  }

  // Open & Close Payment Modal
  window.openPaymentModal = function (courseData) {
    activeCourse = courseData;
    lastFocusedElement = document.activeElement;

    if (payTitle) payTitle.textContent = `${activeCourse.n} — Monthly Tuition`;
    [cn, ch, ce, cc].forEach(f => {
      if (f) f.value = "";
    });

    if (cn) cn.dispatchEvent(new Event("input"));
    card.classList.remove("flip");
    if (err) err.textContent = "";

    refreshAmountDisplay();
    showStep(1);
    payModal.classList.add("on");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      if (cn) cn.focus();
    }, 450);
  };

  function closePaymentModal() {
    payModal.classList.remove("on");
    document.body.style.overflow = "";
    clearInterval(otpTimer);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  window.closePaymentModal = closePaymentModal;

  if (payX) payX.onclick = closePaymentModal;
  if (doneBtn) doneBtn.onclick = closePaymentModal;

  payModal.addEventListener("click", e => {
    if (e.target === payModal) closePaymentModal();
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && payModal.classList.contains("on")) {
      closePaymentModal();
    }
  });

  // Step 1: Submit Card Details
  if (goPay) {
    goPay.onclick = async () => {
      const numClean = cn.value.replace(/\D/g, "");
      const [mm, yy] = (ce.value || "").split("/");
      let errorMsg = "";

      if (numClean.length < 13 || !luhnCheck(numClean)) {
        errorMsg = "Please enter a valid card number.";
      } else if (!ch.value || ch.value.trim().length < 2) {
        errorMsg = "Please enter the cardholder name.";
      } else if (
        !(
          +mm >= 1 &&
          +mm <= 12 &&
          yy &&
          yy.length === 2 &&
          new Date(2000 + +yy, +mm) > new Date()
        )
      ) {
        errorMsg = "Please check the expiration date (MM/YY).";
      } else if (!cc.value || cc.value.length < cc.maxLength) {
        errorMsg = "Please enter the security code (CVV).";
      }

      if (err) err.textContent = errorMsg;

      if (errorMsg) {
        const sc = $("scene");
        if (sc) {
          sc.classList.remove("shake");
          void sc.offsetWidth;
          sc.classList.add("shake");
        }
        return;
      }

      goPay.classList.add("busy");

      try {
        const res = await GATEWAY.pay(
          {
            course: activeCourse.n,
            usd: activeCourse.p,
            currency: curSelect.value
          },
          {
            num: numClean,
            mm,
            yy,
            cvc: cc.value,
            name: ch.value
          }
        );

        payTransactionId = res.id;
        [cn, ch, ce, cc].forEach(f => {
          if (f) f.value = "";
        });

        showStep(2);
        startOtpFlow();
      } catch (e) {
        if (err) err.textContent = "Payment initiation failed. Please try again.";
      } finally {
        goPay.classList.remove("busy");
      }
    };
  }

  // Step 2: 6-Digit OTP Handling
  if (otpEl) {
    otpEl.innerHTML = Array.from(
      { length: 6 },
      (_, i) =>
        `<input inputmode="numeric" maxlength="1" aria-label="Digit ${i + 1}" ${
          i ? "" : 'autocomplete="one-time-code"'
        }>`
    ).join("");

    const otpBoxes = [...otpEl.children];
    otpBoxes.forEach((b, i) => {
      b.addEventListener("input", () => {
        b.value = b.value.replace(/\D/g, "").slice(-1);
        if (b.value) {
          b.classList.remove("f");
          void b.offsetWidth;
          b.classList.add("f");
          if (i < 5) otpBoxes[i + 1].focus();
          else verifyOtpCode();
        }
      });

      b.addEventListener("keydown", e => {
        if (e.key === "Backspace" && !b.value && i > 0) {
          otpBoxes[i - 1].value = "";
          otpBoxes[i - 1].focus();
        }
      });

      b.addEventListener("paste", e => {
        const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
        if (!text) return;
        e.preventDefault();
        [...text].forEach((char, k) => {
          if (otpBoxes[k]) otpBoxes[k].value = char;
        });
        otpBoxes[Math.min(text.length, 5)].focus();
        if (text.length === 6) verifyOtpCode();
      });
    });
  }

  function startOtpFlow() {
    const otpBoxes = otpEl ? [...otpEl.children] : [];
    otpBoxes.forEach(b => (b.value = ""));
    if (oerr) oerr.textContent = "";

    let seconds = 30;
    clearInterval(otpTimer);

    const updateTimerDisplay = () => {
      const tmEl = $("tm");
      const resendEl = $("resend");
      if (tmEl) tmEl.textContent = seconds > 0 ? `Resend code in ${seconds}s` : "";
      if (resendEl) resendEl.hidden = seconds > 0;
    };

    updateTimerDisplay();
    otpTimer = setInterval(() => {
      seconds--;
      updateTimerDisplay();
      if (seconds <= 0) clearInterval(otpTimer);
    }, 1000);

    setTimeout(() => {
      if (otpBoxes[0]) otpBoxes[0].focus();
    }, 350);
  }

  const resendBtn = $("resend");
  if (resendBtn) {
    resendBtn.onclick = () => GATEWAY.resendOtp(payTransactionId).then(startOtpFlow);
  }

  if (verifyBtn) {
    verifyBtn.onclick = verifyOtpCode;
  }

  async function verifyOtpCode() {
    const otpBoxes = otpEl ? [...otpEl.children] : [];
    const code = otpBoxes.map(b => b.value).join("");

    if (code.length < 6) {
      if (oerr) oerr.textContent = "Please enter all 6 digits.";
      return;
    }

    verifyBtn.classList.add("busy");
    const isSuccess = await GATEWAY.verifyOtp(payTransactionId, code);
    verifyBtn.classList.remove("busy");

    if (isSuccess) {
      clearInterval(otpTimer);
      if (window.AcademyAudio) window.AcademyAudio.playChime();

      if (rcpt) {
        rcpt.innerHTML = [
          ["Course", activeCourse.n],
          ["Monthly Tuition", formatMoney(activeCourse.p)],
          ["Reference Code", payTransactionId],
          ["Status", "Confirmed (Enrolled)"],
          ["Date", new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })]
        ]
          .map(r => `<div class="rc"><span>${r[0]}</span><b>${r[1]}</b></div>`)
          .join("");
      }

      showStep(3);
    } else {
      if (oerr) oerr.textContent = "Incorrect code. Demo OTP is 123456.";
      otpEl.classList.remove("bad");
      void otpEl.offsetWidth;
      otpEl.classList.add("bad");
      otpBoxes.forEach(b => (b.value = ""));
      if (otpBoxes[0]) otpBoxes[0].focus();
    }
  }

  // Print Receipt Support
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", () => {
      window.print();
    });
  }
})();
