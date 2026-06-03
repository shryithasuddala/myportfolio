/* ===========================
   SHRYITHA SUDDALA – PORTFOLIO
   JS Interactions
   =========================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const id = entry.target.id;
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ---- Typed text effect ----
const phrases = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Problem Solver',
  'B.Tech CS Student',
  'ML Explorer',
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 50);
  } else {
    typedEl.textContent = current.substring(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  }
}
setTimeout(typeLoop, 600);

// ---- Back to top ----
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
});

// ---- Scroll reveal for cards ----
const revealEls = document.querySelectorAll('.project-card, .cert-card, .achievement-card, .skill-group, .timeline-card, .internship-card, .stat-chip');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});
