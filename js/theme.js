/**
 * Theme System - Light/Dark mode toggle
 */

const Theme = {
    init() {
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        this.setupToggle();
        this.updateIcon(savedTheme);
    },

    setupToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;

        themeBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            this.updateIcon(next);
        });
    },

    updateIcon(theme) {
        const sun = document.getElementById('theme-icon-sun');
        const moon = document.getElementById('theme-icon-moon');
        if (!sun || !moon) return;
        if (theme === 'light') {
            sun.style.display = 'none';
            moon.style.display = 'inline';
        } else {
            sun.style.display = 'inline';
            moon.style.display = 'none';
        }
    }
};