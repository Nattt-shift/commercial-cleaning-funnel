// SparkPro Funnel Script
// Handles two-step form logic, validation, local demo storage, and countdown timer.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("funnelForm");
  const step1 = document.querySelector('.form-step[data-step="1"]');
  const step2 = document.querySelector('.form-step[data-step="2"]');
  const nextBtn = document.getElementById("nextStepBtn");
  const backBtn = document.getElementById("backStepBtn");
  const message = document.getElementById("formMessage");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const companyInput = document.getElementById("company");

  const countdown = document.getElementById("countdown");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Optional urgency countdown: 10 days from initial page load.
  startCountdown(countdown);

  nextBtn?.addEventListener("click", () => {
    clearMessage();

    if (!nameInput.value.trim()) {
      showMessage("Please enter your full name.", true);
      nameInput.focus();
      return;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showMessage("Please enter a valid work email address.", true);
      emailInput.focus();
      return;
    }

    step1.classList.remove("active");
    step2.classList.add("active");
    phoneInput.focus();
  });

  backBtn?.addEventListener("click", () => {
    clearMessage();
    step2.classList.remove("active");
    step1.classList.add("active");
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage();

    const lead = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      company: companyInput.value.trim(),
      submittedAt: new Date().toISOString(),
    };

    if (!lead.phone || !lead.company) {
      showMessage("Please complete phone and company fields.", true);
      return;
    }

    if (!lead.name || !isValidEmail(lead.email)) {
      showMessage("Please complete the required fields with valid information.", true);
      return;
    }

    // Browser security prevents direct write to local JSON files without a backend.
    // For demo purposes, we store leads in localStorage and keep JSON structure compatible
    // with data/leads.json so it can be exported/copied easily.
    const leads = getStoredLeads();
    leads.push(lead);
    localStorage.setItem("sparkproLeads", JSON.stringify(leads, null, 2));

    showMessage("Success! Redirecting to your thank you page...", false);

    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 900);
  });

  function getStoredLeads() {
    try {
      const stored = localStorage.getItem("sparkproLeads");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(text, isError) {
    if (!message) return;
    message.textContent = text;
    message.style.color = isError ? "#c0392b" : "#167a39";
  }

  function clearMessage() {
    if (!message) return;
    message.textContent = "";
  }
});

function startCountdown(targetEl) {
  if (!targetEl) return;

  const storageKey = "sparkproCountdownTarget";
  let targetTime = Number(localStorage.getItem(storageKey));

  if (!targetTime || targetTime < Date.now()) {
    targetTime = Date.now() + 10 * 24 * 60 * 60 * 1000;
    localStorage.setItem(storageKey, String(targetTime));
  }

  const timer = setInterval(() => {
    const distance = targetTime - Date.now();

    if (distance <= 0) {
      targetEl.textContent = " New consultation slots opening soon.";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((distance / (1000 * 60)) % 60);

    targetEl.textContent = ` ${days}d ${hours}h ${mins}m remaining.`;
  }, 1000);
}
