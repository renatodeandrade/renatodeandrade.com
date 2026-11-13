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

// Illustrative charts share the same 24 marks: each chart is a new arrangement of
// those marks, so one figure rearranges itself into the next instead of fading.
const CHART_MARKS = 24;
const chartLayouts = (() => {
  const mark = (cx, cy, w, h, r, o) => ({ cx, cy, w, h, r, o });
  // 01 Relações — scatter along a rising trend.
  const scatter = Array.from({ length: CHART_MARKS }, (_, i) => {
    const t = i / (CHART_MARKS - 1);
    const x = 60 + t * 330;
    const trend = 205 - 160 * t + 18 * Math.sin(t * 7.5);
    const noise = [10, -14, 6, -8, 16, -4, -12, 8, -6, 12, -16, 4, 10, -10, 6, -6, 14, -12, 4, -4, 10, -8, 6, -2][i];
    const size = [10, 8, 12, 8, 10, 8, 12, 10, 8, 10, 12, 8, 10, 8, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12][i];
    return mark(x, trend + noise, size, size, size / 2, .95);
  });
  // 02 Comparações — six bars, each built from four stacked blocks.
  const barHeights = [64, 104, 88, 152, 128, 184];
  const bars = [];
  barHeights.forEach((height, b) => {
    const block = (height - 12) / 4;
    for (let k = 0; k < 4; k++) {
      bars.push(mark(72 + b * 56, 230 - k * (block + 4) - block / 2, 28, block, 3, .4 + b * .1));
    }
  });
  // 03 Distribuições — a dot histogram shaped like a bell curve.
  const columns = [1, 2, 3, 5, 6, 4, 2, 1];
  const dist = [];
  columns.forEach((count, c) => {
    for (let k = 0; k < count; k++) dist.push(mark(72 + c * 42, 220 - k * 24, 18, 18, 9, .55 + count * .07));
  });
  // 04 Padrões — a 6 × 4 heatmap, read column by column.
  const heat = [
    [.18, .28, .46, .27, .16, .24],
    [.31, .58, .76, .48, .21, .33],
    [.49, .84, 1, .62, .37, .23],
    [.27, .52, .72, .89, .51, .30],
  ];
  const cells = [];
  for (let c = 0; c < 6; c++) {
    for (let r = 3; r >= 0; r--) cells.push(mark(82 + c * 56, 56 + r * 52, 44, 44, 4, heat[r][c]));
  }
  // 05 Composição — a ring of dots split into three shares.
  const ring = Array.from({ length: CHART_MARKS }, (_, i) => {
    const a = -Math.PI / 2 + (i / CHART_MARKS) * Math.PI * 2;
    return mark(220 + Math.cos(a) * 88, 136 + Math.sin(a) * 88, 20, 20, 10, i < 10 ? 1 : i < 17 ? .6 : .3);
  });
  return [
    { marks: scatter, axes: .3 },
    { marks: bars, axes: .25 },
    { marks: dist, axes: .25 },
    { marks: cells, axes: 0 },
    { marks: ring, axes: 0 },
  ];
})();

function createMorphChart(stage) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 440 280');
  svg.setAttribute('class', 'chart-morph');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<defs><pattern id="morph-grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity=".2"/></pattern></defs><rect width="440" height="280" fill="url(#morph-grid)"/><path class="chart-axes" d="M35 230H410M35 230V25" stroke="currentColor" fill="none"/>';
  const axes = svg.querySelector('.chart-axes');
  const rects = Array.from({ length: CHART_MARKS }, () => {
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('fill', 'currentColor');
    svg.append(rect);
    return rect;
  });
  stage.replaceChildren(svg);
  let current = { marks: chartLayouts[0].marks.map(m => ({ ...m })), axes: chartLayouts[0].axes };
  let frame;
  const draw = state => {
    state.marks.forEach((m, i) => {
      const rect = rects[i];
      rect.setAttribute('x', (m.cx - m.w / 2).toFixed(2));
      rect.setAttribute('y', (m.cy - m.h / 2).toFixed(2));
      rect.setAttribute('width', m.w.toFixed(2));
      rect.setAttribute('height', m.h.toFixed(2));
      rect.setAttribute('rx', Math.min(m.r, m.w / 2, m.h / 2).toFixed(2));
      rect.setAttribute('opacity', m.o.toFixed(3));
    });
    axes.setAttribute('opacity', state.axes.toFixed(3));
  };
  const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  draw(current);
  return function morphTo(index, instant) {
    cancelAnimationFrame(frame);
    const from = { marks: current.marks.map(m => ({ ...m })), axes: current.axes };
    const to = chartLayouts[index];
    if (instant) {
      current = { marks: to.marks.map(m => ({ ...m })), axes: to.axes };
      draw(current);
      return;
    }
    const duration = 900;
    const stagger = 22;
    const start = performance.now();
    const step = now => {
      const elapsed = now - start;
      current.marks = from.marks.map((a, i) => {
        const b = to.marks[i];
        const t = ease(Math.min(1, Math.max(0, (elapsed - i * stagger) / duration)));
        const lerp = key => a[key] + (b[key] - a[key]) * t;
        return { cx: lerp('cx'), cy: lerp('cy'), w: lerp('w'), h: lerp('h'), r: lerp('r'), o: lerp('o') };
      });
      current.axes = from.axes + (to.axes - from.axes) * ease(Math.min(1, elapsed / duration));
      draw(current);
      if (elapsed < duration + stagger * CHART_MARKS) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };
}

// Illustrative charts: manual selection stops rotation; motion preferences win.
const chartCarousel = document.querySelector('[data-chart-carousel]');
if (chartCarousel) {
  const dots = [...chartCarousel.querySelectorAll('.chart-dot')];
  const names = dots.map(dot => dot.getAttribute('aria-label'));
  const morphTo = createMorphChart(chartCarousel.querySelector('.chart-stage'));
  const playback = chartCarousel.querySelector('.chart-playback');
  const name = chartCarousel.querySelector('.chart-name');
  const counter = chartCarousel.querySelector('.chart-counter');
  const announcement = chartCarousel.querySelector('.chart-announcement');
  let active = 0;
  let playing = !reducedMotion.matches;
  let visible = true;
  let hovering = false;
  let timer;
  let gesture = null;
  chartCarousel.querySelector('.chart-toolbar').hidden = false;
  function scheduleChart() {
    clearTimeout(timer);
    const paused = !playing || reducedMotion.matches;
    playback.hidden = reducedMotion.matches;
    playback.classList.toggle('is-paused', paused);
    playback.setAttribute('aria-label', paused ? playback.dataset.playLabel : playback.dataset.pauseLabel);
    if (!paused && !gesture && visible && !hovering && !document.hidden && !chartCarousel.contains(document.activeElement)) {
      timer = setTimeout(() => selectChart((active + 1) % names.length, false), 6000);
    }
  }
  function selectChart(index, manual) {
    active = index;
    morphTo(active, reducedMotion.matches);
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === active)));
    name.textContent = names[active];
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(names.length).padStart(2, '0')}`;
    if (manual) {
      playing = false;
      announcement.textContent = name.textContent;
    }
    scheduleChart();
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => selectChart(i, true)));
  playback.addEventListener('click', () => {
    if (reducedMotion.matches) {
      selectChart((active + 1) % names.length, true);
      return;
    }
    playing = !playing;
    scheduleChart();
  });
  chartCarousel.querySelector('.chart-pagination').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1 : (active + (event.key === 'ArrowRight' ? 1 : -1) + names.length) % names.length;
    selectChart(next, true);
    dots[next].focus();
  });
  // Pointer events cover touch, pen and mouse without blocking vertical scrolling.
  const stage = chartCarousel.querySelector('.chart-stage');
  function finishGesture(event, cancelled = false) {
    if (!gesture || event.pointerId !== gesture.id) return;
    const { id, x, y } = gesture;
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    const threshold = Math.min(64, Math.max(32, stage.clientWidth * .12));
    gesture = null;
    stage.classList.remove('is-dragging');
    stage.style.removeProperty('--chart-drag');
    if (stage.hasPointerCapture(id)) stage.releasePointerCapture(id);
    if (!cancelled && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.3) {
      selectChart((active + (dx < 0 ? 1 : -1) + names.length) % names.length, true);
    } else {
      scheduleChart();
    }
  }
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || gesture) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
    scheduleChart();
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.3) {
      finishGesture(event, true);
      return;
    }
    if (!reducedMotion.matches && Math.abs(dx) > Math.abs(dy)) {
      stage.style.setProperty('--chart-drag', `${Math.max(-24, Math.min(24, dx * .15))}px`);
    }
  });
  stage.addEventListener('pointerup', event => finishGesture(event));
  stage.addEventListener('pointercancel', event => finishGesture(event, true));
  stage.addEventListener('lostpointercapture', event => finishGesture(event, true));
  chartCarousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovering = true; scheduleChart(); } });
  chartCarousel.addEventListener('pointerleave', () => { hovering = false; scheduleChart(); });
  chartCarousel.addEventListener('focusin', scheduleChart);
  chartCarousel.addEventListener('focusout', () => setTimeout(scheduleChart, 0));
  document.addEventListener('visibilitychange', scheduleChart);
  reducedMotion.addEventListener('change', () => { playing = !reducedMotion.matches; scheduleChart(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; scheduleChart(); }, { threshold: .4 }).observe(chartCarousel);
  }
  scheduleChart();
}
