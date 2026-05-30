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
            let row = null;
            cells.forEach(c => { if (c.textContent.includes('Sincere')) row = c.closest('tr'); });
            if (!row) { setTimeout(poll, 300); return; }

            row.title = '🌿';
            row.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ctext y=\'18\' font-size=\'18\'%3E🌿%3C/text%3E%3C/svg%3E") 12 12, pointer';

            row.addEventListener('dblclick', () => this.burstLeaves(row));

            let lastTap = 0;
            row.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) { this.burstLeaves(row); e.preventDefault(); }
                lastTap = now;
            });
        };
        setTimeout(poll, 300);
    },

    burstLeaves(target) {
        if (this._bursting) return;
        this._bursting = true;
        console.info('🌿 Easter egg activated!');
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 + window.scrollX;
        const cy = rect.top + rect.height / 2 + window.scrollY;
        const colors = ['#0D9488', '#14B8A6', '#CCFBF1', '#059669', '#34D399', '#A7F3D0'];
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="COLOR" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
        const leaves = [];

        for (let i = 0; i < 30; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 18 + Math.random() * 16;
            const wrap = document.createElement('div');
            wrap.innerHTML = svg.replace('COLOR', color);
            const leaf = wrap.firstElementChild;
            leaf.style.cssText = `position:fixed;width:${size}px;height:${size}px;left:${cx - size / 2}px;top:${cy - size / 2}px;pointer-events:none;z-index:9999;opacity:1;`;
            document.body.appendChild(leaf);
            leaves.push(leaf);

            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 200;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist - 100;
            const rot = Math.random() * 720 - 360;

            leaf.offsetHeight;

            leaf.style.transition = `all ${0.6 + Math.random() * 0.6}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${0.4 + Math.random() * 0.4}s ease`;
            leaf.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${0.3 + Math.random() * 0.7})`;
            leaf.style.opacity = '0';
        }

        setTimeout(() => {
            leaves.forEach(l => l.remove());
            this._bursting = false;
        }, 1500);
    }
};