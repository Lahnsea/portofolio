/* ========== LOADING SCREEN ========== */
// Fallback timeout to ensure loading screen always disappears
const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
};

window.addEventListener('load', () => setTimeout(hideLoader, 500));
setTimeout(hideLoader, 2500); // Failsafe timeout after 2.5s

/* ========== CUSTOM CURSOR ========== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
const isMobile = window.innerWidth < 768;

if (!isMobile) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX - 3 + 'px';
      cursor.style.top = mouseY - 3 + 'px';
    }
  });

  let targetMagnetic = null;

  function animateFollower() {
    if (targetMagnetic) {
      const rect = targetMagnetic.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      
      const magnetStrength = 0.4;
      const magneticX = targetX + (mouseX - targetX) * magnetStrength;
      const magneticY = targetY + (mouseY - targetY) * magnetStrength;

      followerX += (magneticX - followerX) * 0.2;
      followerY += (magneticY - followerY) * 0.2;
      
      if (follower) {
        follower.style.left = followerX - 30 + 'px';
        follower.style.top = followerY - 30 + 'px';
      }
    } else {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (follower) {
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
      }
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-card, .contact-link, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.classList.contains('btn') || el.classList.contains('theme-btn')) {
        targetMagnetic = el;
        if (follower) follower.classList.add('magnetic');
      } else {
        if (follower) follower.classList.add('hover');
      }
    });
    el.addEventListener('mouseleave', () => {
      targetMagnetic = null;
      if (follower) {
        follower.classList.remove('magnetic');
        follower.classList.remove('hover');
      }
    });
  });
}

/* ========== PARTICLE BACKGROUND ========== */
const canvas = document.getElementById('particles-canvas');
if (canvas && !isMobile) {
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
      ctx.fillStyle = `rgba(${window.currentAccent || '139, 92, 246'}, ${this.opacity})`;
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
          ctx.strokeStyle = `rgba(${window.currentAccent || '139, 92, 246'}, ${0.04 * (1 - dist / 150)})`;
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
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    const subject = encodeURIComponent(`Contact from Portfolio - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:fadlansyahrullohajib@gmail.com?subject=${subject}&body=${body}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '✓ Opening Email Client!';
    btn.style.background = 'linear-gradient(135deg, var(--accent-gold), var(--beige-light))';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
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

/* ========== THEME TOGGLE ========== */
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.icon') : null;

function setTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
    window.currentAccent = '109, 40, 217';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
    window.currentAccent = '139, 92, 246';
  }
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme(true);
} else {
  setTheme(false); // default dark
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    setTheme(!isLight);
  });
}