/**
 * Main Application Logic for Musolla Al-Widad Kita Sejati
 * Modular, Accessible, and Mobile-Friendly
 */

// Global Toast System
window.showToast = function(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
};

document.addEventListener('DOMContentLoaded', async () => {
  let siteConfig = null;
  let orgData = null;
  let activitiesData = null;

  // Fetch Configurations
  try {
    const [cfgRes, orgRes, actRes] = await Promise.all([
      fetch('site.config.json'),
      fetch('data/organisasi.json'),
      fetch('data/activities.json')
    ]);
    if (cfgRes.ok) siteConfig = await cfgRes.json();
    if (orgRes.ok) orgData = await orgRes.json();
    if (actRes.ok) activitiesData = await actRes.json();
  } catch (err) {
    console.error('Error fetching data files:', err);
  }

  // 1. Initialize Site Configuration bindings
  if (siteConfig) {
    // Contact phone and emails
    const pengerusiPhone = siteConfig.contacts?.pengerusi?.phone || '+6012-345 6789';
    const pengerusiWa = siteConfig.contacts?.pengerusi?.whatsapp || '60123456789';
    const setiausahaPhone = siteConfig.contacts?.setiausaha?.phone || '+6013-456 7890';
    const setiausahaWa = siteConfig.contacts?.setiausaha?.whatsapp || '60134567890';
    const email = siteConfig.contacts?.email || 'alwidad.kitasejati@gmail.com';
    const mapsUrl = siteConfig.location?.googleMapsUrl || 'https://maps.app.goo.gl/9jPWqJ2ThMqtXptb9';
    const fbUrl = siteConfig.socialMedia?.facebook?.url || 'https://www.facebook.com/alwidad.kitasejati';
    const igUrl = siteConfig.socialMedia?.instagram?.url || 'https://www.instagram.com/alwidad.kitasejati';
    const khairatUrl = siteConfig.urls?.khairatMasjidAlIlmi || 'https://masjidalilmi-dengkil.com/ekhairat';
    const feedbackUrl = siteConfig.urls?.googleFormFeedback || 'https://docs.google.com';
    const driveUrl = siteConfig.urls?.constitutionDrive || '#';

    // Apply URLs
    document.querySelectorAll('.link-pengerusi-call').forEach(el => el.href = `tel:${pengerusiPhone}`);
    document.querySelectorAll('.link-pengerusi-wa').forEach(el => el.href = `https://wa.me/${pengerusiWa}`);
    document.querySelectorAll('.link-setiausaha-call').forEach(el => el.href = `tel:${setiausahaPhone}`);
    document.querySelectorAll('.link-setiausaha-wa').forEach(el => el.href = `https://wa.me/${setiausahaWa}`);
    document.querySelectorAll('.link-email').forEach(el => el.href = `mailto:${email}`);
    document.querySelectorAll('.link-maps').forEach(el => el.href = mapsUrl);
    document.querySelectorAll('.link-facebook').forEach(el => el.href = fbUrl);
    document.querySelectorAll('.link-instagram').forEach(el => el.href = igUrl);
    document.querySelectorAll('.link-khairat-portal').forEach(el => el.href = khairatUrl);
    document.querySelectorAll('.link-feedback-form').forEach(el => el.href = feedbackUrl);
    document.querySelectorAll('.link-constitution-drive').forEach(el => el.href = driveUrl);
  }

  // 2. Organization Chart Rendering
  function renderOrgChart() {
    const container = document.getElementById('org-members-grid');
    if (!container || !orgData || !orgData.members) return;

    const lang = window.i18n ? window.i18n.getLanguage() : 'ms';
    container.innerHTML = '';

    orgData.members.forEach(member => {
      const role = lang === 'en' ? member.roleEn : member.roleMs;
      const card = document.createElement('div');
      card.className = 'card card-hoverable flex flex-col p-5 items-center text-center';

      let contactHtml = '';
      if (member.whatsapp) {
        contactHtml = `
          <a href="https://wa.me/${member.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm w-full gap-2 mt-4 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            WhatsApp
          </a>
        `;
      }

      card.innerHTML = `
        <div class="relative w-20 h-20 mb-4">
          <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full logo-sq border-2 border-primary/20 shadow-md p-1 bg-card">
          <span class="badge badge-accent absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 whitespace-nowrap shadow-sm">${member.badge}</span>
        </div>
        <h4 class="text-base font-bold text-foreground mt-2">${member.name}</h4>
        <p class="text-sm font-semibold text-primary mt-0.5">${role}</p>
        ${member.note ? `<p class="text-xs text-muted-foreground mt-2 line-clamp-2">${member.note}</p>` : ''}
        ${contactHtml}
      `;
      container.appendChild(card);
    });
  }

  // 3. Activities Rendering with Category Filtering
  let currentCategory = 'all';
  function renderActivities() {
    const container = document.getElementById('activities-grid');
    if (!container || !activitiesData) return;

    const lang = window.i18n ? window.i18n.getLanguage() : 'ms';
    container.innerHTML = '';

    const filtered = currentCategory === 'all' 
      ? activitiesData 
      : activitiesData.filter(a => a.category === currentCategory);

    filtered.forEach(act => {
      const title = lang === 'en' ? act.titleEn : act.titleMs;
      const desc = lang === 'en' ? act.descEn : act.descMs;
      const loc = lang === 'en' ? act.locationEn : act.locationMs;
      const badge = lang === 'en' ? act.badgeEn : act.badgeMs;

      const card = document.createElement('div');
      card.className = 'card card-hoverable flex flex-col overflow-hidden';
      card.innerHTML = `
        <div class="relative h-44 w-full overflow-hidden bg-muted">
          <img src="${act.image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="badge ${act.status === 'upcoming' ? 'badge-primary' : 'badge-muted'} shadow-sm">${badge}</span>
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs text-secondary font-semibold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${act.date}</span>
            </div>
            <h4 class="text-lg font-bold text-foreground mb-2 line-clamp-2">${title}</h4>
            <p class="text-sm text-muted-foreground line-clamp-3 mb-4">${desc}</p>
          </div>
          <div class="border-t border-border pt-3 mt-auto">
            <div class="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${act.time}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="truncate">${loc}</span>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Activities Filter Buttons
  document.querySelectorAll('[data-activity-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-activity-filter]').forEach(b => b.classList.remove('active', 'btn-primary'));
      document.querySelectorAll('[data-activity-filter]').forEach(b => b.classList.add('btn-outline'));
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');
      currentCategory = btn.getAttribute('data-activity-filter');
      renderActivities();
    });
  });

  // 4. Announcements Carousel Engine
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  let currentSlide = 0;
  let carouselInterval = null;

  function initCarousel() {
    if (!track) return;
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((d, idx) => {
          if (idx === currentSlide) d.classList.add('active');
          else d.classList.remove('active');
        });
      }
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    function startAutoplay() {
      carouselInterval = setInterval(nextSlide, 5500);
    }

    function resetAutoplay() {
      clearInterval(carouselInterval);
      startAutoplay();
    }

    const wrapper = track.closest('.carousel-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
      wrapper.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  // 5. Tabs for Pengurusan Musolla
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab-target');
      const container = btn.closest('.tabs-container');
      if (!container) return;

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      container.querySelectorAll('.tab-panel').forEach(panel => {
        if (panel.id === tabTarget) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 6. Accordions (FAQ)
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      // Close all in this group
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(it => it.classList.remove('open'));
      }

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 7. Clipboard Copy Actions
  window.copyText = function(text, successMsg) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMsg || 'Berjaya disalin ke papan keratan!');
    }).catch(err => {
      console.warn('Clipboard write failed, fallbacking...', err);
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      window.showToast(successMsg || 'Berjaya disalin ke papan keratan!');
    });
  };

  // Copy Bank Account Button
  const copyBankBtn = document.getElementById('copy-bank-account-btn');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', () => {
      const acc = siteConfig?.bankAccount?.accountNumber || '12038010098765';
      const msg = window.i18n ? window.i18n.t('donation.bankCard.copiedToast') : 'No. akaun berjaya disalin!';
      window.copyText(acc, msg);
    });
  }

  // Copy Address Button
  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addr = siteConfig?.location?.address || 'Musolla Al-Widad, Residensi Kita Sejati Cybersouth, 43800 Dengkil, Selangor';
      const msg = window.i18n ? window.i18n.t('contact.locationSection.copiedAddressToast') : 'Alamat berjaya disalin!';
      window.copyText(addr, msg);
    });
  }

  // 8. Mobile Sheet Drawer Navigation
  const openMobileNavBtn = document.getElementById('open-mobile-nav');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');
  const sheetBackdrop = document.getElementById('mobile-sheet-backdrop');
  const sheetPanel = document.getElementById('mobile-sheet-panel');

  function openMobileNav() {
    if (sheetBackdrop && sheetPanel) {
      sheetBackdrop.classList.add('open');
      sheetPanel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (sheetBackdrop && sheetPanel) {
      sheetBackdrop.classList.remove('open');
      sheetPanel.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openMobileNavBtn) openMobileNavBtn.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (sheetBackdrop) sheetBackdrop.addEventListener('click', closeMobileNav);

  // Close sheet on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 9. PDF Viewer Modal for Financial Statements
  const pdfModal = document.getElementById('pdf-modal-backdrop');
  const pdfIframe = document.getElementById('pdf-modal-iframe');
  const pdfTitleEl = document.getElementById('pdf-modal-title');
  const pdfCloseBtn = document.getElementById('pdf-modal-close');
  const pdfDownloadBtn = document.getElementById('pdf-modal-download');

  window.openPdfModal = function(fileUrl, title) {
    if (!pdfModal || !pdfIframe) {
      window.open(fileUrl, '_blank');
      return;
    }
    pdfIframe.src = fileUrl;
    if (pdfTitleEl) pdfTitleEl.textContent = title || 'Dokumen PDF';
    if (pdfDownloadBtn) pdfDownloadBtn.href = fileUrl;
    pdfModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closePdfModal() {
    if (pdfModal) {
      pdfModal.classList.remove('open');
      if (pdfIframe) pdfIframe.src = 'about:blank';
      document.body.style.overflow = '';
    }
  }

  if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', closePdfModal);
  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) closePdfModal();
    });
  }

  // 10. Re-render dynamic components on language change
  window.addEventListener('languageChanged', () => {
    renderOrgChart();
    renderActivities();
  });

  // Initial renders
  renderOrgChart();
  renderActivities();
  initCarousel();
});
