// Progressive enhancement: the page and all links also work without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const mobileViewport = window.matchMedia('(max-width: 760px)');

if (menuButton && navigation) {
  function setMenuOpen(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? '−' : '+';
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
