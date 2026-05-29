/* ============================================================
   PORTFOLIO CLEMENT HUBERT - INTERACTIONS
   Carrousel hero + navigation
   ============================================================ */

(function() {
  'use strict';

  // Noms des projets pour l'indicateur en bas
  const projectNames = [
    'Campagne de lancement',
    'Événement corporate',
    'Refonte éditoriale',
    'Social media',
    'Branding'
  ];

  // Éléments du DOM
  const slides = document.getElementById('slides');
  const slideName = document.getElementById('slideName');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentSlide = 0;
  const totalSlides = projectNames.length;
  let autoplayInterval;
  const AUTOPLAY_DELAY = 4000; // 4 secondes entre chaque slide

  // Fonction : aller à une slide précise
  function goToSlide(index) {
    // Boucle infinie
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    // Déplace la bande de slides
    slides.style.transform = `translateX(-${index * 20}%)`;

    // Met à jour le label du projet
    slideName.style.opacity = 0;
    setTimeout(() => {
      slideName.textContent = projectNames[index];
      slideName.style.opacity = 1;
    }, 200);

    // Met à jour les points actifs
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Slide suivante
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Slide précédente
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Démarrer l'autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  // Arrêter l'autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Réinitialiser l'autoplay (après une action utilisateur)
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Listeners pour les flèches
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

  // Listeners pour les points
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index, 10);
      goToSlide(index);
      resetAutoplay();
    });
  });

  // Navigation au clavier (flèches gauche/droite)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  // Pause l'autoplay quand la souris est sur le hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
  }

  // Démarrer l'autoplay au chargement
  startAutoplay();

  // Transition pour le slideName
  if (slideName) {
    slideName.style.transition = 'opacity 0.2s ease';
  }

})();
