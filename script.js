/* ================================
   CODIX STYLE LINE — Main JS
================================ */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .service-card, .port-card, .price-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorTrail.style.borderColor = 'rgba(255, 0, 128, 0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorTrail.style.borderColor = 'rgba(0, 245, 255, 0.4)';
  });
});

// ---- TOUCH DEVICE & CURSOR ----
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  if (cursor) cursor.style.display = 'none';
  if (cursorTrail) cursorTrail.style.display = 'none';
  document.body.classList.add('is-touch');
}

// ---- MOBILE MENU DRAWER LOGIC ----
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .mobile-cta-btn');

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('active');
  if (navToggle) navToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('active');
  if (navToggle) navToggle.classList.remove('active');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

mobileNavItems.forEach(item => {
  item.addEventListener('click', closeMobileMenu);
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ---- INTERSECTION OBSERVER ----
const observerOptions = { threshold: 0.15 };

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-num[data-target]');
      counters.forEach(c => animateCounter(c));
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Fade-in observer for cards
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, parseInt(delay));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .price-card, .port-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)';
  fadeObserver.observe(el);
});

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>✓ ОТПРАВЛЕНО!</span>';
    btn.style.background = 'var(--neon-green)';
    btn.style.borderColor = 'var(--neon-green)';
    btn.style.color = 'var(--bg-void)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}

// ---- TYPING EFFECT FOR CODE ----
const codeContent = document.getElementById('codeContent');
if (codeContent) {
  const lines = codeContent.querySelectorAll('.code-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = `opacity 0.4s, transform 0.4s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 800 + i * 200);
  });
}

// ---- PORTFOLIO HOVER EFFECT ----
document.querySelectorAll('.port-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const img = card.querySelector('.port-img');
    if (img) img.style.filter = 'brightness(1.15) saturate(1.3)';
  });
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('.port-img');
    if (img) img.style.filter = '';
  });
});

// ---- RANDOM NEON GLITCH ----
function randomGlitch() {
  const glitchEls = document.querySelectorAll('.glitch');
  if (glitchEls.length) {
    const el = glitchEls[Math.floor(Math.random() * glitchEls.length)];
    el.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => { el.style.filter = ''; }, 80);
  }
  setTimeout(randomGlitch, 3000 + Math.random() * 5000);
}
randomGlitch();

// ---- PARALLAX GRID ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const grid = document.querySelector('.grid-lines');
  if (grid) {
    grid.style.transform = `rotateX(20deg) scale(1.2) translateY(${scrollY * 0.1}px)`;
  }
});

// ---- NEON COLOR CYCLE ON HERO ----
let hue = 0;
function cycleNeon() {
  hue = (hue + 0.3) % 360;
  const cityGlow = document.querySelector('.city-glow');
  if (cityGlow) {
    cityGlow.style.background = `radial-gradient(
      ellipse at center bottom,
      hsla(${hue}, 100%, 60%, 0.06) 0%,
      hsla(${hue + 120}, 100%, 60%, 0.04) 40%,
      transparent 70%
    )`;
  }
  requestAnimationFrame(cycleNeon);
}
cycleNeon();

// ---- CONSOLE EASTER EGG ----
console.log(
  '%c[CODIX STYLE LINE]%c\nРазрабатываем сайты из будущего 🚀\nTelegram: @claower\nWhatsApp: 87000937002',
  'color: #00f5ff; font-family: monospace; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00f5ff;',
  'color: #888; font-family: monospace; font-size: 12px;'
);
