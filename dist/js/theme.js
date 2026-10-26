/**
 * Theme Switcher Module for Musolla Al-Widad Kita Sejati
 * Light Mode is the DEFAULT.
 * Dark Mode is an available toggle option.
 * Zero device-setting dependency.
 */
(function() {
  const THEME_KEY = 'alwidad_theme_pref';

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const isDark = (theme === 'dark');

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update icons: show Moon when in Light mode (prompting to switch to dark),
    // and show Sun when in Dark mode (prompting to switch to light).
    const themeIcons = document.querySelectorAll('.theme-icon-active');
    themeIcons.forEach(el => {
      if (isDark) {
        // Sun Icon
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        // Moon Icon
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      }
    });

    // Update active state on option buttons if any
    document.querySelectorAll('[data-theme-option]').forEach(btn => {
      const opt = btn.getAttribute('data-theme-option');
      if (opt === theme) {
        btn.classList.add('active', 'border-primary', 'bg-primary', 'text-white');
      } else {
        btn.classList.remove('active', 'border-primary', 'bg-primary', 'text-white');
      }
    });
  }

  function setTheme(theme) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, validTheme);
    applyTheme(validTheme);
  }

  function toggleTheme() {
    const current = getSavedTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (window.showToast) {
      window.showToast(next === 'dark' ? 'Mod Gelap diaktifkan' : 'Mod Cerah diaktifkan');
    }
  }

  // Initial load: default to light
  applyTheme(getSavedTheme());

  window.ThemeManager = {
    get: getSavedTheme,
    set: setTheme,
    toggle: toggleTheme,
    apply: () => applyTheme(getSavedTheme())
  };
})();
