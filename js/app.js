/**
 * Main Application Logic for Musolla Al-Widad Kita Sejati
 * Warm, Homey Community Vibe
 * Dynamic Social Media, Year-Based Financial Reports with Pagination,
 * History-Aware PDF & Credits Modals, and Clean State Management.
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

// Social Media Vector Icons Map
const SOCIAL_ICONS = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.667.417-1.667 1.667v2.313h4.484l-.588 3.667h-3.896v7.98h-5.447Z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.3-.777.98-1.028 1.28-.25.3-.501.35-.802.2-.3-.15-1.267-.468-2.414-1.49-1.024-.913-1.716-2.04-1.917-2.385-.2-.345-.021-.531.13-.68.135-.135.301-.35.451-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.928-2.234-.244-.588-.492-.508-.677-.518-.175-.009-.376-.011-.577-.011-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.703.25-1.305.175-1.43-.075-.125-.275-.2-.576-.35zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.93.55 3.73 1.5 5.26L2 22l4.87-1.49c1.47.88 3.19 1.4 5.17 1.4 5.53 0 10.02-4.49 10.02-10.02S17.57 2 12.04 2z"/></svg>`,
  default: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
};

document.addEventListener('DOMContentLoaded', async () => {
  let siteConfig = null;
  let orgData = null;
  let activitiesData = null;
  let reportsData = null;

  // 1. Fetch Configuration & Data Files
  try {
    const [cfgRes, orgRes, actRes, repRes] = await Promise.all([
      fetch('site.config.json'),
      fetch('data/organisasi.json'),
      fetch('data/activities.json'),
      fetch('data/reports.json')
    ]);
    if (cfgRes.ok) siteConfig = await cfgRes.json();
    if (orgRes.ok) orgData = await orgRes.json();
    if (actRes.ok) activitiesData = await actRes.json();
    if (repRes.ok) reportsData = await repRes.json();
  } catch (err) {
    console.error('Error fetching data files:', err);
  }

  // 2. Bind Site Configuration Elements
  if (siteConfig) {
    const pengerusiPhone = siteConfig.contacts?.pengerusi?.phone || '+6012-345 6789';
    const pengerusiWa = siteConfig.contacts?.pengerusi?.whatsapp || '60123456789';
    const setiausahaPhone = siteConfig.contacts?.setiausaha?.phone || '+6013-456 7890';
    const setiausahaWa = siteConfig.contacts?.setiausaha?.whatsapp || '60134567890';
    const email = siteConfig.contacts?.email || 'alwidad.kitasejati@gmail.com';
    const mapsUrl = siteConfig.location?.googleMapsUrl || 'https://www.google.com/maps?q=2.876102,101.646251';
    const khairatUrl = siteConfig.urls?.khairatMasjidAlIlmi || 'https://www.e-khairat.com/al-ilmi';
    const feedbackUrl = siteConfig.urls?.googleFormFeedback || '#';
    const perlembagaanPdf = siteConfig.urls?.perlembagaanPdf || 'assets/perlembagaan/perlembagaan-musolla-al-widad.pdf';

    document.querySelectorAll('.link-pengerusi-call').forEach(el => el.href = `tel:${pengerusiPhone}`);
    document.querySelectorAll('.link-pengerusi-wa').forEach(el => el.href = `https://wa.me/${pengerusiWa}`);
    document.querySelectorAll('.link-setiausaha-call').forEach(el => el.href = `tel:${setiausahaPhone}`);
    document.querySelectorAll('.link-setiausaha-wa').forEach(el => el.href = `https://wa.me/${setiausahaWa}`);
    document.querySelectorAll('.link-email').forEach(el => el.href = `mailto:${email}`);
    document.querySelectorAll('.link-maps').forEach(el => el.href = mapsUrl);
    document.querySelectorAll('.link-khairat-portal').forEach(el => el.href = khairatUrl);
    document.querySelectorAll('.link-feedback-form').forEach(el => el.href = feedbackUrl);
    
    // Perlembagaan PDF button
    document.querySelectorAll('.btn-perlembagaan-pdf').forEach(btn => {
      btn.onclick = () => window.openPdfModal(perlembagaanPdf, 'Perlembagaan Musolla Al-Widad');
    });
    document.querySelectorAll('.link-perlembagaan-download').forEach(link => {
      link.href = perlembagaanPdf;
    });

    renderDynamicSocialMedia(siteConfig.socialMedia || []);
  }

  // 3. Dynamic Social Media Rendering (Supports adding/removing accounts easily)
  function renderDynamicSocialMedia(socialList) {
    // Footer social icons container
    const footerContainer = document.getElementById('footer-social-container');
    if (footerContainer) {
      footerContainer.innerHTML = '';
      socialList.forEach(soc => {
        const iconSvg = SOCIAL_ICONS[soc.icon] || SOCIAL_ICONS.default;
        const a = document.createElement('a');
        a.href = soc.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all';
        a.title = `${soc.name}: ${soc.handle}`;
        a.setAttribute('aria-label', soc.name);
        a.innerHTML = iconSvg;
        footerContainer.appendChild(a);
      });
    }

    // Activities section social cards container
    const activitySocialContainer = document.getElementById('activity-social-container');
    if (activitySocialContainer) {
      activitySocialContainer.innerHTML = '';
      const lang = window.i18n ? window.i18n.getLanguage() : 'ms';

      socialList.forEach(soc => {
        const iconSvg = SOCIAL_ICONS[soc.icon] || SOCIAL_ICONS.default;
        const desc = lang === 'en' ? (soc.descEn || soc.handle) : (soc.descMs || soc.handle);
        const card = document.createElement('div');
        card.className = 'card p-5 flex flex-col justify-between border border-border bg-card hover:border-primary/40 transition-all';
        card.innerHTML = `
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                ${iconSvg}
              </div>
              <span class="badge badge-outline text-[11px] font-semibold">${soc.handle}</span>
            </div>
            <div>
              <h4 class="text-base font-bold text-foreground">${soc.name}</h4>
              <p class="text-xs text-muted-foreground mt-1 line-clamp-2">${desc}</p>
            </div>
          </div>
          <div class="pt-4 mt-auto">
            <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm w-full gap-2 text-xs">
              <span>Buka ${soc.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            </a>
          </div>
        `;
        activitySocialContainer.appendChild(card);
      });
    }
  }

  // 4. Organization Chart Rendering (Guidelines removed)
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
          <a href="https://wa.me/${member.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm w-full gap-1.5 mt-3 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-green-600"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.3-.777.98-1.028 1.28-.25.3-.501.35-.802.2-.3-.15-1.267-.468-2.414-1.49-1.024-.913-1.716-2.04-1.917-2.385-.2-.345-.021-.531.13-.68.135-.135.301-.35.451-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.928-2.234-.244-.588-.492-.508-.677-.518-.175-.009-.376-.011-.577-.011-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.703.25-1.305.175-1.43-.075-.125-.275-.2-.576-.35zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.93.55 3.73 1.5 5.26L2 22l4.87-1.49c1.47.88 3.19 1.4 5.17 1.4 5.53 0 10.02-4.49 10.02-10.02S17.57 2 12.04 2z"/></svg>
            WhatsApp
          </a>
        `;
      }

      card.innerHTML = `
        <div class="relative w-20 h-20 mb-3">
          <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full logo-sq border-2 border-primary/20 p-1 bg-card">
          <span class="badge badge-accent absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 whitespace-nowrap shadow-sm">${member.badge}</span>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-foreground mt-2">${member.name}</h4>
        <p class="text-xs sm:text-sm font-semibold text-primary mt-0.5">${role}</p>
        ${member.note ? `<p class="text-xs text-muted-foreground mt-1 line-clamp-2">${member.note}</p>` : ''}
        ${contactHtml}
      `;
      container.appendChild(card);
    });
  }

  // 5. Activities Rendering with Empty-State Handling
  let currentCategory = 'all';
  function renderActivities() {
    const container = document.getElementById('activities-grid');
    const filterContainer = document.getElementById('activities-filter-bar');
    const emptyNotice = document.getElementById('activities-empty-notice');
    if (!container) return;

    const lang = window.i18n ? window.i18n.getLanguage() : 'ms';
    container.innerHTML = '';

    // If no activities at all, show friendly empty notice and hide filters
    if (!activitiesData || activitiesData.length === 0) {
      if (filterContainer) filterContainer.style.display = 'none';
      if (emptyNotice) emptyNotice.classList.remove('hidden');
      return;
    }

    if (filterContainer) filterContainer.style.display = 'flex';
    if (emptyNotice) emptyNotice.classList.add('hidden');

    const filtered = currentCategory === 'all' 
      ? activitiesData 
      : activitiesData.filter(a => a.category === currentCategory);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-8 text-center bg-card rounded-2xl border border-border">
          <p class="text-sm text-muted-foreground">${lang === 'en' ? 'No activities found in this category.' : 'Tiada aktiviti dalam kategori ini.'}</p>
        </div>
      `;
      return;
    }

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
            <h4 class="text-base font-bold text-foreground mb-2 line-clamp-2">${title}</h4>
            <p class="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4">${desc}</p>
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

  // Filter Buttons
  document.querySelectorAll('[data-activity-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-activity-filter]').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');
      currentCategory = btn.getAttribute('data-activity-filter');
      renderActivities();
    });
  });

  // 6. Financial Reports with Year Selection & Pagination (5 per page)
  let selectedReportYear = '2026';
  let reportCurrentPage = 1;
  const reportsPerPage = 5;

  function renderFinancialReports() {
    const listContainer = document.getElementById('finance-reports-list');
    const yearNav = document.getElementById('finance-year-nav');
    const paginationContainer = document.getElementById('finance-pagination');
    const pageIndicator = document.getElementById('finance-page-indicator');
    const prevBtn = document.getElementById('finance-prev-btn');
    const nextBtn = document.getElementById('finance-next-btn');

    if (!listContainer || !reportsData) return;

    // Render Year Selector Tabs
    if (yearNav && reportsData.years) {
      yearNav.innerHTML = '';
      reportsData.years.forEach(yr => {
        const btn = document.createElement('button');
        btn.className = `btn btn-sm ${yr === selectedReportYear ? 'btn-primary' : 'btn-outline'}`;
        btn.textContent = `Tahun ${yr}`;
        btn.onclick = () => {
          selectedReportYear = yr;
          reportCurrentPage = 1;
          renderFinancialReports();
        };
        yearNav.appendChild(btn);
      });
    }

    // Filter reports by selected year
    const allForYear = (reportsData.reports || []).filter(r => r.year === selectedReportYear);
    const totalPages = Math.ceil(allForYear.length / reportsPerPage) || 1;
    if (reportCurrentPage > totalPages) reportCurrentPage = totalPages;

    const startIndex = (reportCurrentPage - 1) * reportsPerPage;
    const pageReports = allForYear.slice(startIndex, startIndex + reportsPerPage);

    listContainer.innerHTML = '';

    if (pageReports.length === 0) {
      listContainer.innerHTML = `
        <div class="p-8 text-center text-sm text-muted-foreground" data-i18n="finance.noReports">
          Tiada laporan kewangan direkodkan untuk tahun ini lagi.
        </div>
      `;
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    }

    if (paginationContainer) {
      paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';
      if (pageIndicator) pageIndicator.textContent = `${reportCurrentPage} / ${totalPages}`;
      if (prevBtn) prevBtn.disabled = reportCurrentPage <= 1;
      if (nextBtn) nextBtn.disabled = reportCurrentPage >= totalPages;
    }

    pageReports.forEach(rep => {
      const row = document.createElement('div');
      row.className = 'p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0';
      row.innerHTML = `
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
            PDF
          </div>
          <div>
            <h5 class="font-bold text-foreground text-sm sm:text-base">${rep.title}</h5>
            <p class="text-xs text-muted-foreground">Tempoh: ${rep.period} • Status: ${rep.status}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end sm:self-center">
          <button class="btn btn-primary btn-sm gap-1.5" onclick="window.openPdfModal('${rep.file}', '${rep.title}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Papar PDF</span>
          </button>
          <a href="${rep.file}" download class="btn btn-outline btn-sm gap-1.5" title="Muat Turun PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            <span class="hidden sm:inline">Muat Turun</span>
          </a>
        </div>
      `;
      listContainer.appendChild(row);
    });
  }

  // Pagination click handlers
  const prevPageBtn = document.getElementById('finance-prev-btn');
  const nextPageBtn = document.getElementById('finance-next-btn');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (reportCurrentPage > 1) {
        reportCurrentPage--;
        renderFinancialReports();
      }
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      reportCurrentPage++;
      renderFinancialReports();
    });
  }

  // 7. Announcements Carousel Engine
  const track = document.getElementById('carousel-track');
  const prevCarouselBtn = document.getElementById('carousel-prev');
  const nextCarouselBtn = document.getElementById('carousel-next');
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

    if (nextCarouselBtn) nextCarouselBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevCarouselBtn) prevCarouselBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

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

  // 8. Tabs for Pengurusan Musolla
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

  // 9. Accordions (FAQ)
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(it => it.classList.remove('open'));
      }

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 10. Clipboard Copy Actions
  window.copyText = function(text, successMsg) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMsg || 'Berjaya disalin ke papan keratan!');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      window.showToast(successMsg || 'Berjaya disalin ke papan keratan!');
    });
  };

  const copyBankBtn = document.getElementById('copy-bank-account-btn');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', () => {
      const acc = siteConfig?.bankAccount?.accountNumber || '12038010098765';
      const msg = window.i18n ? window.i18n.t('donation.bankCard.copiedToast') : 'No. akaun berjaya disalin!';
      window.copyText(acc, msg);
    });
  }

  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addr = siteConfig?.location?.address || 'Musolla Al-Widad, Pangsapuri Kita Sejati Cybersouth, Persiaran Cybersouth Perdana, Cybersouth, 43800 Dengkil, Selangor Darul Ehsan';
      const msg = window.i18n ? window.i18n.t('contact.locationSection.copiedAddressToast') : 'Alamat berjaya disalin!';
      window.copyText(addr, msg);
    });
  }

  // 11. Mobile Sheet Navigation
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
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 12. History-Aware PDF Viewer Modal (Closes on ESC and Phone Back)
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

    // Push history state so mobile back button closes modal
    try {
      history.pushState({ modalOpen: 'pdf' }, '');
    } catch (_) {}
  };

  function closePdfModal(updateHistory = true) {
    if (pdfModal && pdfModal.classList.contains('open')) {
      pdfModal.classList.remove('open');
      if (pdfIframe) pdfIframe.src = 'about:blank';
      document.body.style.overflow = '';
      if (updateHistory && history.state?.modalOpen === 'pdf') {
        history.back();
      }
    }
  }

  if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', () => closePdfModal(true));
  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) closePdfModal(true);
    });
  }

  // 13. Credits Modal (History-Aware, Closes on ESC and Phone Back)
  const creditsModal = document.getElementById('credits-modal-backdrop');
  const creditsOpenBtn = document.getElementById('open-credits-btn');
  const creditsCloseBtn = document.getElementById('credits-modal-close');

  window.openCreditsModal = function() {
    if (creditsModal) {
      creditsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      try {
        history.pushState({ modalOpen: 'credits' }, '');
      } catch (_) {}
    }
  };

  function closeCreditsModal(updateHistory = true) {
    if (creditsModal && creditsModal.classList.contains('open')) {
      creditsModal.classList.remove('open');
      document.body.style.overflow = '';
      if (updateHistory && history.state?.modalOpen === 'credits') {
        history.back();
      }
    }
  }

  if (creditsOpenBtn) creditsOpenBtn.addEventListener('click', openCreditsModal);
  if (creditsCloseBtn) creditsCloseBtn.addEventListener('click', () => closeCreditsModal(true));
  if (creditsModal) {
    creditsModal.addEventListener('click', (e) => {
      if (e.target === creditsModal) closeCreditsModal(true);
    });
  }

  // Handle ESC on desktop keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pdfModal && pdfModal.classList.contains('open')) closePdfModal(true);
      if (creditsModal && creditsModal.classList.contains('open')) closeCreditsModal(true);
      if (sheetPanel && sheetPanel.classList.contains('open')) closeMobileNav();
    }
  });

  // Handle Mobile / Phone Back button (popstate)
  window.addEventListener('popstate', () => {
    if (pdfModal && pdfModal.classList.contains('open')) closePdfModal(false);
    if (creditsModal && creditsModal.classList.contains('open')) closeCreditsModal(false);
  });

  // Re-render components on language toggle
  window.addEventListener('languageChanged', () => {
    renderOrgChart();
    renderActivities();
    renderFinancialReports();
    if (siteConfig) renderDynamicSocialMedia(siteConfig.socialMedia || []);
  });

  // Initial renders
  renderOrgChart();
  renderActivities();
  renderFinancialReports();
  initCarousel();
});
