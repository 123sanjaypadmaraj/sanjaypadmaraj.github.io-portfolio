
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
  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.classList.toggle('active', isOpen);
  });
  navbar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.classList.remove('active');
    });
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

    try {
      const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });
      if (!response.ok) throw new Error('Request failed');
      status.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
      status.classList.add('is-success');
      contactForm.reset();
    } catch (err) {
      status.textContent = 'Something went wrong. Please email me directly at padmarajsanjay@gmail.com.';
      status.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitLabel;
    }
  });
}
