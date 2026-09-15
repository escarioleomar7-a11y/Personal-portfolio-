// =========================================================
// Leomar V. Escario — Portfolio interactivity
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Typewriter tagline ---------- */
  const taglineEl = document.getElementById('heroTagline');
  const taglines = [
    'BSIT student, Central Philippines State University.',
    'Learning to build things, one project at a time.',
    'Teammate, problem-solver, curious about new tech.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = taglines[phraseIndex];
    const visibleText = deleting
      ? current.slice(0, charIndex - 1)
      : current.slice(0, charIndex + 1);

    taglineEl.innerHTML = visibleText + '<span class="cursor"></span>';
    charIndex = deleting ? charIndex - 1 : charIndex + 1;

    let delay = deleting ? 35 : 55;

    if (!deleting && charIndex === current.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % taglines.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();

  /* ---------- Animate skill bars when visible ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.fill + '%';
        el.style.setProperty('--target', target);
        el.classList.add('filled');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(fill => skillObserver.observe(fill));

});