
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
