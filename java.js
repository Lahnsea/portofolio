/* ========== LOADING SCREEN ========== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

/* ========== CUSTOM CURSOR ========== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX - 17.5 + 'px';
    follower.style.top = followerY - 17.5 + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card, .contact-link, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => follower && follower.classList.add('hover'));
  el.addEventListener('mouseleave', () => follower && follower.classList.remove('hover'));
});

/* ========== PARTICLE BACKGROUND ========== */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.04 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* ========== TYPING ANIMATION ========== */
const typingEl = document.getElementById('typing-text');
const roles = ['Fullstack Developer', 'AI Engineer', 'Flutter Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (typingEl) {
    typingEl.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    if (!isDeleting && charIndex > current.length) {
      setTimeout(() => { isDeleting = true; typeEffect(); }, 1800);
      return;
    }
    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 90);
}
typeEffect();

/* ========== NAVBAR SCROLL ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

/* ========== MOBILE MENU ========== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ========== SCROLL REVEAL ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when visible
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
      // Animate stat counters
      const counters = entry.target.querySelectorAll('.stat-number[data-count]');
      counters.forEach(counter => {
        animateCounter(counter, parseInt(counter.getAttribute('data-count')));
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== COUNTER ANIMATION ========== */
function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + '+';
  }, 50);
}

/* ========== PROJECT FILTERING ========== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      const show = filter === 'all' || categories.includes(filter);
      card.style.opacity = show ? '1' : '0.15';
      card.style.transform = show ? 'scale(1)' : 'scale(0.95)';
      card.style.pointerEvents = show ? 'auto' : 'none';
    });
  });
});

/* ========== PROJECT MODAL ========== */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = card.getAttribute('data-title');
    document.getElementById('modalDesc').textContent = card.getAttribute('data-desc');
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    card.getAttribute('data-tags').split(',').forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
    modalOverlay.classList.add('active');
  });
});

if (modalClose) modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay) modalOverlay.classList.remove('active');
});

/* ========== CONTACT FORM ========== */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00cc6a, #00b4d8)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

/* ========== SMOOTH SCROLL FOR ALL ANCHORS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ========== PROFILE IMAGE FALLBACK ========== */
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const wrap = profileImg.parentElement;
    wrap.style.background = 'linear-gradient(135deg, #2d1f14, #1a1a1a)';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    wrap.style.aspectRatio = '4/5';
    wrap.style.borderRadius = '16px';
    wrap.style.fontSize = '72px';
    wrap.innerHTML = '<span style="opacity:0.3">👨‍💻</span>';
  });
}