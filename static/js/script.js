
// Custom cursor dot/ring (shown for precise pointers only, see CSS `@media (pointer:fine)`)
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
  });
}

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 12) header.style.boxShadow = '0 4px 20px rgba(0,0,0,.2)';
  else header.style.boxShadow = 'none';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Mobile nav toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
if (menuToggle && navbar) {
  const closeNav = () => {
    navbar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.classList.remove('active');
  };
  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.classList.toggle('active', isOpen);
  });
  navbar.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar.classList.contains('open')) {
      closeNav();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (navbar.classList.contains('open') && !navbar.contains(event.target) && !menuToggle.contains(event.target)) closeNav();
  });
}

// Highlight the active nav link as sections scroll into view
const sections = document.querySelectorAll('main .section[id]');
const navLinks = document.querySelectorAll('.navbar a');
if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach((section) => navObserver.observe(section));
}

// Contact form submission (FormSubmit.co, no backend required)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.innerHTML;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.classList.remove('is-error', 'is-success');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      if (navigator.onLine === false) throw new Error('Offline');
      const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === 'false') throw new Error('Request failed');
      status.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
      status.classList.add('is-success');
      contactForm.reset();
    } catch (err) {
      status.textContent = 'Something went wrong. Please email me directly at padmarajsanjay@gmail.com.';
      status.classList.add('is-error');
    } finally {
      clearTimeout(timeoutId);
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitLabel;
    }
  });
}

/* Project category filter chips (injected here so no-JS visitors still see every card) */
(() => {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.project-card')];
  cards.forEach((card) => {
    const tag = (card.querySelector('.project-meta span')?.textContent || '').toUpperCase();
    const cats = [];
    if (/AI|LLM|RAG|NLP/.test(tag)) cats.push('ai');
    if (/WEB|FULL-STACK|EDUCATION/.test(tag)) cats.push('web');
    if (/IOT|BIOSENSOR/.test(tag)) cats.push('iot');
    card.dataset.category = cats.join(' ');
  });
  const filters = [['all', 'All'], ['ai', 'AI & LLM'], ['web', 'Web'], ['iot', 'IoT & Hardware']];
  const bar = document.createElement('div');
  bar.className = 'project-filters';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter projects by category');
  filters.forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.dataset.filter = key;
    btn.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
    bar.appendChild(btn);
  });
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const key = btn.dataset.filter;
    bar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    cards.forEach((card) => {
      card.hidden = key !== 'all' && !card.dataset.category.split(' ').includes(key);
      card.classList.remove('filter-wide');
    });
    grid.classList.toggle('is-filtered', key !== 'all');
    const shown = cards.filter((card) => !card.hidden);
    // Fill the last row when an odd number of cards remains
    if (key !== 'all' && shown.length % 2 === 1) shown[shown.length - 1].classList.add('filter-wide');
    status.textContent = `Showing ${shown.length} of ${cards.length} projects`;
  });
  const status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  grid.before(bar);
  bar.after(status);
})();
