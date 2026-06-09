// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== HERO PARTICLES =====
function createParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: -Math.random() * 0.5 - 0.2,
    alpha: Math.random() * 0.5 + 0.1
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}
createParticles();

// ===== HERO TEXT REVEAL =====
function revealHero() {
  const els = document.querySelectorAll('.hero-reveal');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 300 + i * 180);
  });
}
revealHero();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = el.dataset.target;
  const isNum = !isNaN(target);
  if (!isNum) { el.textContent = target; return; }
  const end = parseFloat(target);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * end);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end + (el.dataset.suffix || '');
  }
  requestAnimationFrame(update);
}

// ===== INTERSECTION OBSERVER =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    // Trigger counter if applicable
    const counter = entry.target.querySelector('[data-target]');
    if (counter) animateCounter(counter);
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

// Stagger children inside grid parents
document.querySelectorAll(
  '.projects-grid, .lifestyle-grid, .invest-points, .contact-info'
).forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('fade-up');
    child.style.transitionDelay = `${i * 0.12}s`;
    fadeObserver.observe(child);
  });
});

// Standalone elements
document.querySelectorAll(
  '.about-image-wrap, .about-text, .invest-visual, .contact-form, .section-title, .section-desc, .section-label, .stats-bar .stat'
).forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');
  if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (heroContent) heroContent.style.opacity = 1 - scrollY / 600;
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== CURSOR GLOW =====
const cursor = document.getElementById('cursorGlow');
if (cursor) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function moveCursor() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cursor.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
    requestAnimationFrame(moveCursor);
  }
  moveCursor();
}

// ===== TILT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CONTACT FORM → WHATSAPP / EMAIL =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const emailBtn = document.getElementById('emailBtn');

const projectMap = {
  villas: 'Larimar Villas',
  suites: 'Larimar Suites',
  l3: 'Larimar 3',
  all: 'All Projects'
};

function buildEnquiry() {
  const data = Object.fromEntries(new FormData(form));
  const project = projectMap[data.interest] || data.interest || 'Not specified';
  return { data, project };
}

function finishForm() {
  form.reset();
  successMsg.classList.remove('hidden');
}

// WhatsApp (form submit) — must open synchronously inside the tap
// or iOS Safari blocks it as a popup.
form.addEventListener('submit', e => {
  e.preventDefault();

  const { data, project } = buildEnquiry();
  const waNumber = form.dataset.waNumber || '201035299659';
  const agentName = form.dataset.agentName || 'Moaz';
  const msg = [
    `Hello ${agentName}! 👋 I'm interested in a property at Larimar Port Ghalib.`,
    ``,
    `*Name:* ${data.name || '-'}`,
    `*Phone:* ${data.phone || '-'}`,
    `*Email:* ${data.email || '-'}`,
    `*Interested in:* ${project}`,
    data.message ? `*Message:* ${data.message}` : '',
  ].filter(Boolean).join('\n');

  // Direct navigation to the WhatsApp deep link — opens the app on mobile,
  // web.whatsapp on desktop. Not blocked because it runs in the tap handler.
  window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  finishForm();
});

// Email (mailto)
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    const { data, project } = buildEnquiry();
    const agentEmail = form.dataset.email || 'm.moamen@larimar-resort.com';
    const subject = `Property Enquiry — ${project}`;
    const body = [
      `Hello, I'm interested in a property at Larimar Port Ghalib.`,
      ``,
      `Name: ${data.name || '-'}`,
      `Phone: ${data.phone || '-'}`,
      `Email: ${data.email || '-'}`,
      `Interested in: ${project}`,
      data.message ? `Message: ${data.message}` : '',
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:${agentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    finishForm();
  });
}

// Input focus animation
document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(input => {
  input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
  input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// ===== SECTION REVEAL LINES =====
document.querySelectorAll('.section-title').forEach(el => {
  el.classList.add('title-reveal');
});
