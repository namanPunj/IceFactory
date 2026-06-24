/* ============================================================
   Maa Saraswati Ice Factory — script.js
   Theme toggle · mobile menu · frost particles ·
   animated counters · scroll reveals
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Business details (edit here once) ---------- */
  var DETAILS = {
    phone: '+91 81969 66511',
    address: 'RXV9+63G, Sahnewal, Ludhiana, Punjab',
    hours: '4:00 AM – 8:00 PM, every day'
  };

  document.querySelectorAll('[data-bind]').forEach(function (el) {
    var key = el.getAttribute('data-bind');
    if (DETAILS[key]) el.textContent = DETAILS[key];
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- THEME ---------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('msif_theme'); } catch (e) {}
  if (stored !== 'dark' && stored !== 'light') {
    stored = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', stored);

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('msif_theme', next); } catch (e) {}
    });
  }

  /* ---------- MOBILE MENU ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  function closeMenu() {
    nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('#mobilePanel a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Failsafe: never leave content hidden (e.g. throttled/backgrounded tabs)
    window.addEventListener('load', function () {
      setTimeout(revealAll, 2200);
    });
  } else {
    revealAll();
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = (el.getAttribute('data-count') || '') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- HERO FROST PARTICLES ---------- */
  var canvas = document.getElementById('frost');
  if (canvas && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var particles = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;

    function resize() {
      W = hero.offsetWidth;
      H = hero.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(28, Math.min(70, Math.round(W / 22)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(true));
    }

    function makeParticle(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + 10,
        r: Math.random() * 2.4 + 0.6,
        sp: Math.random() * 0.4 + 0.15,
        drift: (Math.random() - 0.5) * 0.4,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2
      };
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.sp;
        p.x += p.drift;
        p.tw += 0.02;
        var alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,238,250,' + alpha.toFixed(3) + ')';
        ctx.fill();
        if (p.y < -10 || p.x < -10 || p.x > W + 10) {
          particles[i] = makeParticle(false);
        }
      }
      requestAnimationFrame(frame);
    }

    resize();
    frame();
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    });
  }
  /* ---------- VERCEL ANALYTICS (only on a real deployment) ---------- */
  (function () {
    var h = location.hostname;
    var isPreview = h === 'localhost' || h === '127.0.0.1' || /claudeusercontent\.com$/.test(h) || location.protocol === 'file:';
    if (isPreview) return;
    ['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js'].forEach(function (src) {
      var s = document.createElement('script');
      s.defer = true; s.src = src;
      document.head.appendChild(s);
    });
  })();
})();
