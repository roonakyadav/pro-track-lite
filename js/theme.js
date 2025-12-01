// Theme management for ProTrack Lite v1.0.2
// Handles dark/light theme switching and localStorage persistence

/**
 * Toggles between dark and light themes
 * Updates both the document element classes and localStorage
 */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

// Update theme toggle icon
function updateThemeIcon(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const svg = button.querySelector('svg');
    if (theme === 'dark') {
        // Moon icon for dark mode (current theme is dark, toggle to light, so moon)
        svg.innerHTML = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>';
    } else {
        // Sun icon for light mode (current theme is light, toggle to dark, so sun)
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;

    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    updateThemeIcon(savedTheme);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});

// Mobile menu toggle (available on all pages)
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        sidebar.classList.toggle('lg:translate-x-0');
        overlay.classList.toggle('hidden');
    }
}
