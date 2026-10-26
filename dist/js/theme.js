/**
 * Theme & Color Palette Engine for Mosque Landing Page Template
 * Supports:
 * - Default Light Mode & comfortable Solid Dark Mode toggle
 * - Built-in Islamic Mosque Color Presets:
 *   - 'teal-amber' (Musolla Al-Widad Warm Community Vibe)
 *   - 'emerald-gold' (Classic Mosque Emerald Green & Crescent Gold)
 *   - 'royal-blue' (Deep Dome Sapphire Blue & Desert Sand)
 *   - 'maroon-gold' (Heritage Ottoman Velvet Maroon & Crescent Gold)
 * - Custom Hex Color Overrides for both Light and Dark modes
 * - Zero external dependencies. Converts Hex to space-separated HSL for CSS variable compatibility.
 */

(function() {
  const THEME_PREF_KEY = 'mosque_theme_pref';
  const THEME_CACHE_KEY = 'mosque_theme_config';

  // Built-in Curated Mosque Color Presets
  const THEME_PRESETS = {
    'teal-amber': {
      name: 'Teal & Amber (Al-Widad Default)',
      light: {
        primary: '#116876',
        primaryForeground: '#fbf9f5',
        secondary: '#eb7713',
        secondaryForeground: '#ffffff',
        accent: '#f1a91e',
        accentForeground: '#1c2d36',
        background: '#f6f4ef',
        card: '#faf8f5',
        foreground: '#1c2d36',
        muted: '#ece7de',
        mutedForeground: '#5c707a',
        border: '#ddd7ca'
      },
      dark: {
        primary: '#21b8cc',
        primaryForeground: '#0e1a1f',
        secondary: '#f68928',
        secondaryForeground: '#ffffff',
        accent: '#f5b72e',
        accentForeground: '#0e1a1f',
        background: '#101c23',
        card: '#1a2932',
        foreground: '#f4f1ec',
        muted: '#253641',
        mutedForeground: '#9caeb8',
        border: '#2f424f'
      }
    },
    'emerald-gold': {
      name: 'Emerald & Crescent Gold (Classic Mosque)',
      light: {
        primary: '#047857',
        primaryForeground: '#ffffff',
        secondary: '#d97706',
        secondaryForeground: '#ffffff',
        accent: '#f59e0b',
        accentForeground: '#142820',
        background: '#f5f7f5',
        card: '#fafbfa',
        foreground: '#142820',
        muted: '#e6ece6',
        mutedForeground: '#4b6357',
        border: '#d7e2d8'
      },
      dark: {
        primary: '#10b981',
        primaryForeground: '#062015',
        secondary: '#f59e0b',
        secondaryForeground: '#062015',
        accent: '#fbbf24',
        accentForeground: '#062015',
        background: '#0a1912',
        card: '#12261d',
        foreground: '#edf7f1',
        muted: '#1b382b',
        mutedForeground: '#8ab49d',
        border: '#244838'
      }
    },
    'royal-blue': {
      name: 'Royal Blue & Sand (Modern Mosque)',
      light: {
        primary: '#1d4ed8',
        primaryForeground: '#ffffff',
        secondary: '#d97706',
        secondaryForeground: '#ffffff',
        accent: '#3b82f6',
        accentForeground: '#ffffff',
        background: '#f4f6fa',
        card: '#f9fafd',
        foreground: '#1e293b',
        muted: '#e2e8f0',
        mutedForeground: '#64748b',
        border: '#cbd5e1'
      },
      dark: {
        primary: '#60a5fa',
        primaryForeground: '#0f172a',
        secondary: '#fbbf24',
        secondaryForeground: '#0f172a',
        accent: '#93c5fd',
        accentForeground: '#0f172a',
        background: '#0b1329',
        card: '#131e3d',
        foreground: '#f1f5f9',
        muted: '#1e293b',
        mutedForeground: '#94a3b8',
        border: '#334155'
      }
    },
    'maroon-gold': {
      name: 'Maroon & Gold (Heritage Ottoman)',
      light: {
        primary: '#881337',
        primaryForeground: '#ffffff',
        secondary: '#b45309',
        secondaryForeground: '#ffffff',
        accent: '#d97706',
        accentForeground: '#ffffff',
        background: '#faf6f6',
        card: '#fdfbfb',
        foreground: '#2e1217',
        muted: '#f0e4e6',
        mutedForeground: '#7a5157',
        border: '#e4d0d3'
      },
      dark: {
        primary: '#fb7185',
        primaryForeground: '#1f090e',
        secondary: '#f59e0b',
        secondaryForeground: '#1f090e',
        accent: '#fcd34d',
        accentForeground: '#1f090e',
        background: '#1a0b0e',
        card: '#291419',
        foreground: '#fbeff1',
        muted: '#3b1f26',
        mutedForeground: '#b8949b',
        border: '#4d2932'
      }
    }
  };

  /**
   * Helper: Convert Hex color string (#RRGGBB or #RGB) to CSS space-separated HSL "H S% L%"
   */
  function hexToHslSpace(colorStr) {
    if (!colorStr) return '';
    const trimmed = String(colorStr).trim();
    // If already space-separated HSL numbers (e.g. "188 76% 28%")
    if (trimmed.includes('%')) return trimmed;

    let hex = trimmed.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return '';

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h = Math.round(h * 60);
    }
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);

    return `${h} ${sPct}% ${lPct}%`;
  }

  function getSavedMode() {
    return localStorage.getItem(THEME_PREF_KEY) || 'light';
  }

  function applyMode(mode) {
    const root = document.documentElement;
    const isDark = (mode === 'dark');

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Toggle Moon / Sun icons
    document.querySelectorAll('.theme-icon-active').forEach(el => {
      if (isDark) {
        // Sun Icon
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        // Moon Icon
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      }
    });

    document.querySelectorAll('[data-theme-option]').forEach(btn => {
      const opt = btn.getAttribute('data-theme-option');
      if (opt === mode) {
        btn.classList.add('active', 'border-primary', 'bg-primary', 'text-white');
      } else {
        btn.classList.remove('active', 'border-primary', 'bg-primary', 'text-white');
      }
    });
  }

  /**
   * Applies custom theme colors into a dedicated <style id="custom-theme-vars"> element.
   */
  function applyPalette(themeConfig) {
    if (!themeConfig) return;

    let lightPalette = {};
    let darkPalette = {};

    const presetKey = themeConfig.preset || 'teal-amber';
    if (THEME_PRESETS[presetKey]) {
      lightPalette = Object.assign({}, THEME_PRESETS[presetKey].light);
      darkPalette = Object.assign({}, THEME_PRESETS[presetKey].dark);
    }

    // Overlay user custom colors if specified
    if (themeConfig.light) {
      lightPalette = Object.assign(lightPalette, themeConfig.light);
    }
    if (themeConfig.dark) {
      darkPalette = Object.assign(darkPalette, themeConfig.dark);
    }

    function buildCssBlock(palette) {
      const mapping = [
        ['primary', '--primary'],
        ['primaryForeground', '--primary-foreground'],
        ['secondary', '--secondary'],
        ['secondaryForeground', '--secondary-foreground'],
        ['accent', '--accent'],
        ['accentForeground', '--accent-foreground'],
        ['background', '--background'],
        ['card', '--card'],
        ['foreground', '--foreground'],
        ['muted', '--muted'],
        ['mutedForeground', '--muted-foreground'],
        ['border', '--border']
      ];

      return mapping
        .map(([prop, cssVar]) => {
          if (!palette[prop]) return '';
          const hsl = hexToHslSpace(palette[prop]);
          return hsl ? `  ${cssVar}: ${hsl} !important;` : '';
        })
        .filter(Boolean)
        .join('\n');
    }

    const lightCss = buildCssBlock(lightPalette);
    const darkCss = buildCssBlock(darkPalette);

    let styleEl = document.getElementById('custom-theme-vars');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'custom-theme-vars';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
:root {
${lightCss}
}
.dark {
${darkCss}
}
`;
  }

  function setMode(mode) {
    const valid = mode === 'dark' ? 'dark' : 'light';
    localStorage.setItem(THEME_PREF_KEY, valid);
    applyMode(valid);
  }

  function toggleTheme() {
    const current = getSavedMode();
    const next = current === 'dark' ? 'light' : 'dark';
    setMode(next);
    if (window.showToast) {
      window.showToast(next === 'dark' ? 'Mod Gelap diaktifkan' : 'Mod Cerah diaktifkan');
    }
  }

  // Load cached theme config immediately to prevent flash
  try {
    const cachedConfig = localStorage.getItem(THEME_CACHE_KEY);
    if (cachedConfig) {
      applyPalette(JSON.parse(cachedConfig));
    }
  } catch (e) {}

  // Apply default light / saved mode
  applyMode(getSavedMode());

  // Public Interface
  window.ThemeManager = {
    get: getSavedMode,
    set: setMode,
    toggle: toggleTheme,
    apply: () => applyMode(getSavedMode()),
    applyPalette: function(config) {
      if (config) {
        try {
          localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(config));
        } catch (e) {}
        applyPalette(config);
      }
    },
    getPresets: () => THEME_PRESETS
  };
})();
