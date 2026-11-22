// 1. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 2. Dark / Light Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
});

// 3. Terminal Typing Animation
const phrases = [
  'Building full-stack web apps...',
  'Solving DSA problems in C++...',
  'Shipping AI-powered dev tools...'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = phrases[phraseIdx];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  if (!isDeleting && charIdx === current.length + 1) {
    isDeleting = true;
    setTimeout(typeLoop, 1400);
    return;
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
  }
  setTimeout(typeLoop, isDeleting ? 45 : 85);
}
typeLoop();

// 4. Interactive Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.filter;
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// 5. Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 6. Scroll-Spy Navbar Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const navLink = document.querySelector(`.nav-item[href="#${id}"]`);
    if (navLink) {
      if (scrollY >= top && scrollY < top + height) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
});

// 7. Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    formStatus.textContent = `✓ Thanks ${name}! Your message has been received. I'll reply to ${email} soon.`;
    contactForm.reset();
  }
});