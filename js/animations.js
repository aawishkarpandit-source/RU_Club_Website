/**
 * Animations - AOS, GLightbox, scroll animations
 */

const Animations = {
    init() {
        this.initAOS();
        this.initGLightbox();
        this.initScrollObserver();
        this.setupEasterEgg();
    },

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                once: true,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                offset: 40,
                delay: 50,
                disable: 'mobile'
            });
        }
    },

    initGLightbox() {
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true,
                zoomable: true
            });
        }
    },

    initScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    },

    setupEasterEgg() {
        const poll = () => {
            const cells = document.querySelectorAll('td');
            let cell = null;
            cells.forEach(c => { if (c.textContent.includes('Sincere')) cell = c; });
            if (!cell) { setTimeout(poll, 300); return; }

            cell.title = '🌿';
            cell.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230D9488\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z\'/%3E%3Cpath d=\'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\'/%3E%3C/svg%3E") 12 12, pointer';

            cell.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = '/secret-garden';
            });

            let lastTap = 0;
            cell.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    e.stopPropagation();
                    window.location.href = '/secret-garden';
                    e.preventDefault();
                }
                lastTap = now;
            });
        };
        setTimeout(poll, 300);
    }
};