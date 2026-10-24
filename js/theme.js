/**
 * Theme Switcher Module for Musolla Al-Widad Kita Sejati
 * Supports: 'system' (device default), 'dark', and 'light'.
 */
(function() {
  const THEME_KEY = 'alwidad_theme_pref';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getSystemPreference() {
    return mediaQuery.matches ? 'dark' : 'light';
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'system';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const effective = theme === 'system' ? getSystemPreference() : theme;

    if (effective === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update icons/labels in theme buttons across desktop & mobile
    const themeIcons = document.querySelectorAll('.theme-icon-active');
    const themeLabels = document.querySelectorAll('.theme-label-active');

    themeIcons.forEach(el => {
      if (theme === 'system') {
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`;
      } else if (theme === 'dark') {
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      } else {
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      }
    });

    themeLabels.forEach(el => {
      if (theme === 'system') {
        el.setAttribute('data-i18n', 'theme.system');
      } else if (theme === 'dark') {
        el.setAttribute('data-i18n', 'theme.dark');
      } else {
        el.setAttribute('data-i18n', 'theme.light');
      }
      if (window.i18n && typeof window.i18n.translateElement === 'function') {
        window.i18n.translateElement(el);
      }
    });

    document.querySelectorAll('[data-theme-option]').forEach(btn => {
      const opt = btn.getAttribute('data-theme-option');
      if (opt === theme) {
        btn.classList.add('active', 'border-primary', 'bg-primary/10');
      } else {
        btn.classList.remove('active', 'border-primary', 'bg-primary/10');
      }
    });
  }

  function setTheme(theme) {
    if (['system', 'dark', 'light'].includes(theme)) {
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    }
  }

  // Followed by dark mode: sequence is system -> dark -> light -> system
  function cycleTheme() {
    const current = getSavedTheme();
    let next;
    if (current === 'system') {
      next = 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'system';
    }
    setTheme(next);
    if (window.showToast) {
      const label = next === 'system' ? 'Ikut Peranti (Device)' : (next === 'dark' ? 'Mod Gelap (Dark)' : 'Mod Cerah (Light)');
      window.showToast(`Tema ditukar: ${label}`);
    }
  }

  // Listener for system changes
  mediaQuery.addEventListener('change', () => {
    if (getSavedTheme() === 'system') {
      applyTheme('system');
    }
  });

  // Initial load
  applyTheme(getSavedTheme());

  window.ThemeManager = {
    get: getSavedTheme,
    set: setTheme,
    cycle: cycleTheme,
    apply: () => applyTheme(getSavedTheme())
  };
})();
