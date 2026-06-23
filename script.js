/* ========== LOADING SCREEN ========== */
const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
};

window.addEventListener('load', () => setTimeout(hideLoader, 300));
setTimeout(hideLoader, 2000); // Failsafe timeout after 2s

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
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-card, .contact-link, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (follower) follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      if (follower) follower.classList.remove('hover');
    });
  });
}

/* ========== NAVBAR SCROLL & ACCENT THEMING ========== */
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

function handleScroll() {
  if (!heroSection || !navbar) return;
  const heroHeight = heroSection.offsetHeight;
  const scrollY = window.scrollY;

  // If scrolled past the hero section, transition navbar to Light theme
  if (scrollY > heroHeight - 80) {
    navbar.classList.remove('hero-state');
    navbar.classList.add('scrolled-state');
    document.body.classList.remove('in-hero');
  } else {
    navbar.classList.add('hero-state');
    navbar.classList.remove('scrolled-state');
    document.body.classList.add('in-hero');
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
// Initial execution
document.body.classList.add('in-hero');
handleScroll();

// Active link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
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
      // Animate stat counters
      const counters = entry.target.querySelectorAll('.stat-number[data-count]');
      counters.forEach(counter => {
        animateCounter(counter, parseInt(counter.getAttribute('data-count')));
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== COUNTER ANIMATION ========== */
function animateCounter(el, target) {
  if (el.dataset.animated) return;
  el.dataset.animated = "true";
  let current = 0;
  const duration = 1500; // Total duration in ms
  const stepTime = 30;
  const steps = duration / stepTime;
  const increment = target / steps;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + '+';
  }, stepTime);
}

/* ========== 3D CARD TILT EFFECT ========== */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation in degrees
    const maxRotation = 10; 
    
    const rotateX = ((centerY - y) / centerY) * maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = 'transform 0.05s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.05s ease';
  });
});

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
      
      if (show) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
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
      span.textContent = tag.trim();
      tagsContainer.appendChild(span);
    });
    
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = '';
    
    // Add github default link if project exists
    const ghLink = document.createElement('a');
    ghLink.href = "https://github.com/Lahnsea";
    ghLink.target = "_blank";
    ghLink.className = "btn btn-dark";
    ghLink.textContent = "View Code";
    linksContainer.appendChild(ghLink);

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
    btn.textContent = '✓ Opening Email!';
    btn.style.background = '#22c55e';
    btn.style.color = '#ffffff';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      contactForm.reset();
    }, 2500);
  });
}

/* ========== SMOOTH SCROLL FOR ALL ANCHORS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ========== THEME TOGGLE ========== */
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.icon') : null;

function setTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme(true);
} else {
  setTheme(false);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    setTheme(!isLight);
  });
}