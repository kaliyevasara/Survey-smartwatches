// Navigation
document.getElementById("homeBtn")?.addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.getElementById("compareBtn")?.addEventListener("click", () => {
  window.location.href = "./compare.html";
});

document.getElementById("surveyBtn")?.addEventListener("click", () => {
  window.location.href = "./survey.html";
});

document.getElementById("resultBtn")?.addEventListener("click", () => {
  window.location.href = "./result.html";
});

// CTA at bottom
document.getElementById("toSurveyCTA")?.addEventListener("click", () => {
  window.location.href = "./survey.html";
});

// Hamburger
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// Click on hamburger
navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  navToggle.classList.toggle("active"); 
});

// Close navigation when a menu link is clicked
document.querySelectorAll(".nav-links .nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    navLinks.classList.remove("show");
    navToggle.classList.remove("active");
  });
});

// Scroll reveal
const reveals = Array.from(document.querySelectorAll(".reveal"));
const observerOptions = { threshold: 0.15 };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const anim = el.dataset.anim || "fade-up";
      const delay = parseInt(el.dataset.delay || "0", 10);

      el.style.animation = `${anim} 0.9s ease ${delay}ms both`;
      revealObserver.unobserve(el);
    }
  });
}, observerOptions);

reveals.forEach(r => revealObserver.observe(r));

// Photo gallery switching
document.querySelectorAll(".photo-thumbs img").forEach(img => {
  img.addEventListener("click", () => {
    const target = document.getElementById(img.dataset.target);
    target.src = img.src;
  });
});
