/* ============================================================
   PORTFOLIO CLEMENT HUBERT - INTERACTIONS
   Carrousel hero + animations au scroll
   ============================================================ */

(function() {
  'use strict';

  // ============== CARROUSEL HERO ==============
  const projectNames = [
    'Campagne de lancement',
    'Événement corporate',
    'Refonte éditoriale',
    'Social media',
    'Branding'
  ];

  const slides = document.getElementById('slides');
  const slideName = document.getElementById('slideName');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentSlide = 0;
  const totalSlides = projectNames.length;
  let autoplayInterval;
  const AUTOPLAY_DELAY = 4500;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    if (slides) {
      slides.style.transform = `translateX(-${index * 20}%)`;
    }

    if (slideName) {
      slideName.style.opacity = 0;
      setTimeout(() => {
        slideName.textContent = projectNames[index];
        slideName.style.opacity = 1;
      }, 200);
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index, 10);
      goToSlide(index);
      resetAutoplay();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
  }

  if (slideName) {
    slideName.style.transition = 'opacity 0.2s ease';
  }

  startAutoplay();


  // ============== ANIMATIONS AU SCROLL ==============
  // Animation d'apparition fluide quand les éléments entrent dans la vue
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback : afficher directement si le navigateur ne supporte pas
    fadeElements.forEach(el => el.classList.add('visible'));
  }


  // ============== NAVBAR AU SCROLL ==============
  // Effet subtil : la navbar se "compresse" légèrement quand on scrolle
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.style.padding = '14px 60px';
        navbar.style.boxShadow = '0 1px 12px rgba(0,0,0,0.04)';
      } else {
        navbar.style.padding = '20px 60px';
        navbar.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    });
  }

})();
