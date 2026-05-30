/**
 * Forms - Smooth scroll and form handling
 */

const Forms = {
    init() {
        this.setupSmoothScroll();
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    // if target doesn't exist on this page, allow default behavior
                }
            });
        });
    }
};