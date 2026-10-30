// Progressive enhancement: the page and all links also work without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const mobileViewport = window.matchMedia('(max-width: 960px)');

if (menuButton && navigation) {
  function setMenuOpen(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-collapsed', mobileViewport.matches && !open);
  }

  function syncMenu() {
    const activeElement = document.activeElement;
    menuButton.hidden = !mobileViewport.matches;
    if (mobileViewport.matches && navigation.contains(activeElement)) {
      menuButton.focus();
    } else if (!mobileViewport.matches && activeElement === menuButton) {
      navigation.querySelector('a').focus();
    }
    setMenuOpen(false);
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobileViewport.matches) return;
    setMenuOpen(false);
    const destination = document.querySelector(link.hash);
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileViewport.matches && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  mobileViewport.addEventListener('change', syncMenu);
  syncMenu();
}

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

// Native language links work without JavaScript; keep a selected section when possible.
const languageLinks = [...document.querySelectorAll('[data-language-link]')];
function updateLanguageLinks() {
  const hash = window.location.hash;
  const section = hash && document.getElementById(hash.slice(1));
  languageLinks.forEach((link) => {
    link.href = link.dataset.languageLink + (section ? hash : '');
  });
}
window.addEventListener('hashchange', updateLanguageLinks);
updateLanguageLinks();

// Reveal once on entry. Never hide content when motion is reduced or unsupported.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = [...document.querySelectorAll('[data-reveal]')];
let revealObserver;

function showSection(element) {
  element.classList.remove('reveal-pending');
  element.classList.add('is-revealed');
}

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      showSection(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      showSection(element);
    } else {
      element.classList.add('reveal-pending');
      revealObserver.observe(element);
    }
  });
}

// A small pointer response belongs to the illustration, not to the page scroll.
const perspective = document.querySelector('.perspective');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let pointerFrame = 0;

function resetPerspective() {
  cancelAnimationFrame(pointerFrame);
  if (perspective) {
    perspective.style.removeProperty('--tilt-x');
    perspective.style.removeProperty('--tilt-y');
  }
}

if (perspective) {
  perspective.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const rect = perspective.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      perspective.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
      perspective.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
    });
  });
  perspective.addEventListener('pointerleave', resetPerspective);
}

reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  revealObserver?.disconnect();
  revealElements.forEach(showSection);
  resetPerspective();
});
finePointer.addEventListener('change', resetPerspective);

// Keep orientation clear as the visitor moves through the page.
const header = document.querySelector('.site-header');
const sectionLinks = [...document.querySelectorAll('.navigation a[href^="#"]')];
const sections = sectionLinks.map((link) => document.querySelector(link.hash));
let scrollFrame = 0;

function updateNavigation() {
  scrollFrame = 0;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
  let activeId = '';
  sections.forEach((section) => {
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
      activeId = section.id;
    }
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
    activeId = 'contact';
  }
  sectionLinks.forEach((link) => {
    if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function scheduleNavigationUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
updateNavigation();

// The four-frame observation loops only while visible. Pause stays paused.
const observation = document.querySelector('[data-observation]');
if (observation) {
  const image = observation.querySelector('img');
  const control = observation.querySelector('.animation-toggle');
  const labels = {
    play: control.dataset.playText,
    pause: control.dataset.pauseText,
    playLabel: control.dataset.playLabel,
    pauseLabel: control.dataset.pauseLabel,
  };
  let inView = false;
  let playbackPreference = null;
  let playing = false;
  control.hidden = false;

  function updateObservation() {
    const wantsPlayback = playbackPreference ?? !reducedMotion.matches;
    const nextPlaying = inView && !document.hidden && wantsPlayback;
    if (playing !== nextPlaying) {
      playing = nextPlaying;
      image.src = playing ? image.dataset.animatedSrc : image.dataset.stillSrc;
    }
    control.classList.toggle('is-playing', playing);
    control.querySelector('span').textContent = playing ? labels.pause : labels.play;
    control.setAttribute('aria-label', playing ? labels.pauseLabel : labels.playLabel);
  }

  control.addEventListener('click', () => {
    playbackPreference = !playing;
    updateObservation();
  });

  if ('IntersectionObserver' in window) {
    const observationObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateObservation();
    }, { threshold: 0.15 });
    observationObserver.observe(observation);
  } else {
    inView = true;
    updateObservation();
  }

  reducedMotion.addEventListener('change', () => {
    playbackPreference = null;
    updateObservation();
  });
  document.addEventListener('visibilitychange', updateObservation);
}
