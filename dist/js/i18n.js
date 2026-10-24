/**
 * Internationalization (i18n) Engine for Musolla Al-Widad Kita Sejati
 * Loads JSON translation files from /lang/ms.json and /lang/en.json
 * Default language: Bahasa Melayu ('ms')
 */
(function() {
  const LANG_KEY = 'alwidad_language_pref';
  let currentLang = localStorage.getItem(LANG_KEY) || 'ms';
  let translations = {};

  async function loadTranslations(lang) {
    if (translations[lang]) return translations[lang];
    try {
      const res = await fetch(`lang/${lang}.json?v=${Date.now()}`);
      if (!res.ok) throw new Error(`Could not load lang/${lang}.json`);
      const data = await res.json();
      translations[lang] = data;
      return data;
    } catch (err) {
      console.warn(`[i18n] Failed to load translations for ${lang}, falling back to ms`, err);
      if (lang !== 'ms') return loadTranslations('ms');
      return null;
    }
  }

  function getNestedValue(obj, path) {
    if (!obj || !path) return '';
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function t(key, fallback = '') {
    const dict = translations[currentLang] || translations['ms'] || {};
    const val = getNestedValue(dict, key);
    if (val !== undefined && val !== null) {
      return val;
    }
    // Fallback to ms if available
    if (currentLang !== 'ms' && translations['ms']) {
      const msVal = getNestedValue(translations['ms'], key);
      if (msVal !== undefined && msVal !== null) return msVal;
    }
    return fallback || key;
  }

  function translateElement(el) {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const text = t(key);
      if (text) {
        if (typeof text === 'string') {
          el.innerHTML = text;
        }
      }
    }

    const placeholderKey = el.getAttribute('data-i18n-placeholder');
    if (placeholderKey) {
      el.setAttribute('placeholder', t(placeholderKey));
    }

    const titleKey = el.getAttribute('data-i18n-title');
    if (titleKey) {
      el.setAttribute('title', t(titleKey));
    }

    const ariaKey = el.getAttribute('data-i18n-aria');
    if (ariaKey) {
      el.setAttribute('aria-label', t(ariaKey));
    }
  }

  function updateDOM() {
    document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria]').forEach(translateElement);
    
    // Update active badges/labels for language switchers
    document.querySelectorAll('[data-lang-code]').forEach(btn => {
      const code = btn.getAttribute('data-lang-code');
      if (code === currentLang) {
        btn.classList.add('active', 'border-primary', 'bg-primary', 'text-white');
      } else {
        btn.classList.remove('active', 'border-primary', 'bg-primary', 'text-white');
      }
    });

    const langDisplays = document.querySelectorAll('.current-lang-text');
    langDisplays.forEach(el => {
      el.textContent = currentLang === 'ms' ? 'BM' : 'EN';
    });

    // Update document language
    document.documentElement.lang = currentLang;

    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  }

  async function setLanguage(lang) {
    if (lang !== 'ms' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    await loadTranslations(lang);
    updateDOM();
    if (window.showToast) {
      window.showToast(lang === 'ms' ? 'Bahasa ditukar ke Bahasa Melayu' : 'Language switched to English');
    }
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'ms' ? 'en' : 'ms');
  }

  async function init() {
    await loadTranslations('ms');
    if (currentLang !== 'ms') {
      await loadTranslations(currentLang);
    }
    updateDOM();
  }

  window.i18n = {
    init,
    t,
    setLanguage,
    toggleLanguage,
    getLanguage: () => currentLang,
    translateElement,
    updateDOM
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
