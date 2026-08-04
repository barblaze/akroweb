/* scripts del sitio. nada fancy, vanilla. */
const header = document.querySelector('.site-header');
const toTop = document.querySelector('.to-top');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function onScroll() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (toTop) {
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

// menu movil
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  nav.classList.remove('open');
  toggle.classList.remove('open');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// slider del hero
const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.querySelector('.hero-dots');

if (slides.length) {
  let index = 0;
  let timer = null;
  const dots = [];

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Diapositiva ${i + 1}`);
      dot.addEventListener('click', () => {
        go(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function show() {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function next() { index = (index + 1) % slides.length; show(); }
  function prev() { index = (index - 1 + slides.length) % slides.length; show(); }
  function go(i) { index = i; show(); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });

  // swipe en el hero (touch)
  const hero = document.querySelector('.hero');
  let touchX = null;
  hero.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 45) { prev(); restart(); }
    else if (dx < -45) { next(); restart(); }
    touchX = null;
  }, { passive: true });

  if (reduceMotion) {
    clearInterval(timer);
  } else {
    show();
    restart();
  }
}

// animacion de aparicion al hacer scroll
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('in'));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// lightbox de la galeria
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');

if (galleryItems.length && lightbox) {
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCap = lightbox.querySelector('.lightbox-caption');
  const items = Array.from(galleryItems);
  let current = 0;

  function openLb(i) {
    current = i;
    lbImg.src = items[i].querySelector('img').src;
    lbCap.textContent = items[i].dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function stepLb(dir) {
    openLb((current + dir + items.length) % items.length);
  }

  items.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLb);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    stepLb(-1);
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    stepLb(1);
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') stepLb(-1);
    if (e.key === 'ArrowRight') stepLb(1);
  });
}

// el form no tiene backend, asi que por ahora solo muestra el mensaje
const form = document.querySelector('.contact-form');
if (form) {
  let submitted = false;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitted) return;
    submitted = true;
    const ok = form.querySelector('.form-success');
    if (ok) ok.classList.add('show');
    form.reset();
    setTimeout(() => {
      if (ok) ok.classList.remove('show');
      submitted = false;
    }, 6000);
  });
}
