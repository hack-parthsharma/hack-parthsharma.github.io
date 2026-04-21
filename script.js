/* ==========================================================================
   Parth Sharma — Portfolio JS
   ========================================================================== */

/* --------------------------------------------------------------
   1. Typewriter hero name
-------------------------------------------------------------- */
(function typeName() {
    const target = document.querySelector('#heading--main');
    if (!target) return;
    const name = 'PARTH SHARMA';
    let i = 0;
    const step = () => {
        if (i < name.length) {
            target.textContent += name[i++];
            setTimeout(step, 110);
        }
    };
    // Slight initial delay so the user sees the caret first
    setTimeout(step, 400);
})();

/* --------------------------------------------------------------
   2. Skill bar fill via IntersectionObserver
-------------------------------------------------------------- */
(function fillSkills() {
    const bars = document.querySelectorAll('.skill-line > div');
    if (!bars.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const w = el.dataset.width || '0';
                el.style.width = w + '%';
                io.unobserve(el);
            }
        });
    }, { threshold: 0.25 });

    bars.forEach((b) => io.observe(b));
})();

/* --------------------------------------------------------------
   3. Theme toggle — persists in memory for the session
-------------------------------------------------------------- */
(function theme() {
    const btn = document.querySelector('#day-night');
    if (!btn) return;
    const body = document.body;

    const apply = (mode) => {
        if (mode === 'light') {
            body.classList.add('light');
            body.classList.remove('dark');
            btn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.add('dark');
            body.classList.remove('light');
            btn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Default: dark
    apply('dark');

    btn.addEventListener('click', () => {
        const next = body.classList.contains('dark') ? 'light' : 'dark';
        apply(next);
    });
})();

/* --------------------------------------------------------------
   4. Custom cursor (skipped on touch / small screens)
   Professional: precise dot + subtle ring that only appears on hover.
-------------------------------------------------------------- */
(function cursor() {
    const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 820;
    if (isTouch) return;

    const ring = document.querySelector('.cursor');
    const dot  = document.querySelector('.cursor-dot');
    if (!ring || !dot) return;

    // Both follow the mouse precisely — no lag, no trailing.
    document.addEventListener('mousemove', (e) => {
        const t = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        dot.style.transform = t;
        ring.style.transform = t;
    }, { passive: true });

    // Hover states — ring fades in on interactive elements.
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .exp-card, .cert-card');
    hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });

    // Hide when leaving the window.
    document.addEventListener('mouseleave', () => {
        ring.style.opacity = '0';
        dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        ring.style.opacity = '';
        dot.style.opacity = '';
    });
})();

/* --------------------------------------------------------------
   5. AOS init (library loaded via CDN)
-------------------------------------------------------------- */
if (window.AOS) {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
    });
}

/* --------------------------------------------------------------
   6. Smooth in-page anchors respecting <base target="_blank">
   (base sends hash links to a new tab otherwise)
-------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.setAttribute('target', '_self');
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id && id.length > 1) {
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', id);
            }
        }
    });
});
