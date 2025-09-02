
document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 12) header.style.boxShadow = '0 4px 20px rgba(0,0,0,.2)';
  else header.style.boxShadow = 'none';
});
