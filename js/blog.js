/**
 * Zero-Dependency On-The-Fly Markdown & Blogging Engine for Mosque Landing Page Template
 *
 * Folder Convention:
 *   /blog/<year>/<month>/<day>/<post_folder>/<markdown_file_and_images>
 *
 * Requirements Met:
 * - Parses Markdown & YAML Frontmatter on the fly (Zero compile required)
 * - Date formatting displayed on HTML page strictly as: <DD>/<MM>/<YYYY>
 * - Resolves relative image paths against the post folder (e.g. ![Poster](banner.jpg))
 * - Real-time search, category filter, reading time calculation & social sharing
 */

(function() {
  /**
   * Format year, month, day into <DD>/<MM>/<YYYY>
   */
  function formatDateDMY(year, month, day) {
    if (!year) return '';
    const dd = String(day || 1).padStart(2, '0');
    const mm = String(month || 1).padStart(2, '0');
    const yyyy = String(year);
    return `${dd}/${mm}/${yyyy}`;
  }

  /**
   * Parse any ISO date string or path into <DD>/<MM>/<YYYY>
   */
  function parseToDMY(dateInput) {
    if (!dateInput) return '';
    const str = String(dateInput).trim();
    // Check YYYY-MM-DD or YYYY/MM/DD
    const match = str.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (match) {
      return formatDateDMY(match[1], match[2], match[3]);
    }
    // Check DD/MM/YYYY already
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
      return str;
    }
    // Fallback Date object
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return formatDateDMY(d.getFullYear(), d.getMonth() + 1, d.getDate());
    }
    return str;
  }

  /**
   * Lightweight Frontmatter Parser (Extracts YAML between --- markers)
   */
  function extractFrontmatter(rawText) {
    const trimmed = rawText.trimStart();
    if (!trimmed.startsWith('---')) {
      return { metadata: {}, body: rawText };
    }

    const endIdx = trimmed.indexOf('\n---', 3);
    if (endIdx === -1) {
      return { metadata: {}, body: rawText };
    }

    const yamlBlock = trimmed.substring(3, endIdx).trim();
    const body = trimmed.substring(endIdx + 4).trimStart();
    const metadata = {};

    yamlBlock.split('\n').forEach(line => {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      const key = line.substring(0, colonIdx).trim();
      let val = line.substring(colonIdx + 1).trim();

      // Unquote strings
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      // Array handling: [tag1, tag2]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.substring(1, val.length - 1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
      metadata[key] = val;
    });

    return { metadata, body };
  }

  /**
   * Lightweight Markdown to HTML Parser
   * Supports headers, bold, italics, strikethrough, blockquotes, lists,
   * tables, code blocks, inline code, links and images (with base folder resolution).
   */
  function parseMarkdown(mdText, baseFolder = '') {
    if (!mdText) return '';

    // Normalize base folder to end with '/'
    let base = baseFolder ? baseFolder.replace(/\\/g, '/') : '';
    if (base && !base.endsWith('/')) base += '/';

    let html = mdText;

    // Preserve and handle code blocks ```lang ... ```
    const codeBlocks = [];
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const idx = codeBlocks.length;
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      codeBlocks.push(`<pre><code class="language-${lang || 'text'}">${escapedCode}</code></pre>`);
      return `%%CODEBLOCK_${idx}%%`;
    });

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, (match, inline) => {
      const escaped = inline.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<code>${escaped}</code>`;
    });

    // Images: ![alt](url) -> resolve relative path
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
      let resolvedSrc = src.trim();
      // If relative URL (not starting with http://, https://, or /)
      if (!/^(https?:|\/|data:)/i.test(resolvedSrc)) {
        resolvedSrc = base + resolvedSrc.replace(/^\.\//, '');
      }
      return `<figure class="my-6"><img src="${resolvedSrc}" alt="${alt}" class="rounded-xl mx-auto shadow-md" loading="lazy">${alt ? `<figcaption class="text-center text-xs text-muted-foreground mt-2">${alt}</figcaption>` : ''}</figure>`;
    });

    // Links: [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
      const isExternal = /^https?:\/\//i.test(url);
      const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}" ${target}>${text}</a>`;
    });

    // Headers (# to ######)
    html = html.replace(/^###### (.*$)/gim, '<h6 class="text-base font-bold text-foreground mt-6 mb-2">$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5 class="text-lg font-bold text-foreground mt-6 mb-2">$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-xl font-bold text-foreground mt-7 mb-3">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-foreground mt-8 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-bold text-foreground mt-9 mb-4 pb-2 border-b border-border">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl sm:text-4xl font-extrabold text-foreground mt-6 mb-4">$1</h1>');

    // Horizontal Rule
    html = html.replace(/^(\*{3,}|-{3,}|_{3,})$/gim, '<hr class="my-8 border-border">');

    // Blockquotes (> text)
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-2 italic bg-primary/5 rounded-r my-4 text-foreground/90">$1</blockquote>');

    // Bold, Italic, Strikethrough
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Simple Tables: | a | b |
    html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
      const lines = match.trim().split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) return match;

      let tableHtml = '<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse border border-border text-sm">';
      let isHeader = true;

      lines.forEach((line, idx) => {
        if (line.includes('---')) {
          // Separator line
          isHeader = false;
          return;
        }
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        if (idx === 0) {
          tableHtml += '<thead><tr class="bg-muted">';
          cells.forEach(c => tableHtml += `<th class="p-3 border border-border font-bold text-foreground">${c}</th>`);
          tableHtml += '</tr></thead><tbody>';
        } else {
          tableHtml += '<tr class="border-b border-border">';
          cells.forEach(c => tableHtml += `<td class="p-3 border border-border text-foreground/90">${c}</td>`);
          tableHtml += '</tr>';
        }
      });

      tableHtml += '</tbody></table></div>';
      return tableHtml;
    });

    // Unordered Lists: - item or * item
    html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, (match) => {
      // Wrap consecutive <li> into <ul> if not already wrapped
      return `<ul>${match}</ul>`;
    }).replace(/<\/ul>\s*<ul>/g, '');

    // Paragraphs: double newline separated
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs.map(p => {
      p = p.trim();
      if (!p) return '';
      // Skip if already a block element
      if (/^<(h[1-6]|ul|ol|pre|blockquote|div|table|figure|hr)/i.test(p)) {
        return p;
      }
      return `<p class="my-4 leading-relaxed">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    // Restore Code Blocks
    codeBlocks.forEach((block, idx) => {
      html = html.replace(`%%CODEBLOCK_${idx}%%`, block);
    });

    return html;
  }

  /**
   * Estimate reading time in minutes
   */
  function estimateReadingTime(text) {
    const words = (text || '').trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes;
  }

  /**
   * Parse folder path: /blog/<year>/<month>/<day>/<post_folder>/
   */
  function parseBlogPath(fullPath) {
    const normalized = fullPath.replace(/\\/g, '/');
    const match = normalized.match(/(?:^|\/)blog\/(\d{4})\/(\d{1,2})\/(\d{1,2})\/([^\/]+)/i);
    if (match) {
      const year = match[1];
      const month = String(match[2]).padStart(2, '0');
      const day = String(match[3]).padStart(2, '0');
      const slug = match[4];
      const postFolder = `blog/${year}/${month}/${day}/${slug}`;
      const dateFormatted = formatDateDMY(year, month, day);
      return { year, month, day, slug, postFolder, dateFormatted };
    }
    return null;
  }

  /**
   * Load and render a single markdown post on the fly
   */
  async function loadPostBySlug(slugPath, containerEl) {
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="py-16 text-center space-y-4">
        <div class="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p class="text-sm text-muted-foreground font-medium">Memuatkan artikel blog...</p>
      </div>
    `;

    // Normalize slugPath e.g. "2026/10/26/pelancaran-portal" or "blog/2026/10/26/pelancaran-portal"
    let cleanPath = slugPath.replace(/^blog\//, '').replace(/^\//, '').replace(/\/$/, '');
    const folderInfo = parseBlogPath('blog/' + cleanPath);

    // Candidates for markdown file name
    const candidates = [
      `blog/${cleanPath}/post.md`,
      `blog/${cleanPath}/index.md`,
      `blog/${cleanPath}/content.md`,
      `blog/${cleanPath}/${folderInfo ? folderInfo.slug : 'post'}.md`
    ];

    let mdText = null;
    let successfulFile = null;

    for (const url of candidates) {
      try {
        const res = await fetch(`${url}?v=${Date.now()}`);
        if (res.ok) {
          mdText = await res.text();
          successfulFile = url;
          break;
        }
      } catch (e) {}
    }

    if (!mdText) {
      containerEl.innerHTML = `
        <div class="py-16 text-center space-y-4">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 class="text-2xl font-bold text-foreground">Artikel Tidak Dijumpai</h2>
          <p class="text-sm text-muted-foreground max-w-md mx-auto">
            Fail Markdown (.md) tidak ditemui di laluan <code>/blog/${cleanPath}/</code>.
          </p>
          <div class="pt-4">
            <a href="blog/" class="btn btn-primary btn-sm">Kembali ke Indeks Blog</a>
          </div>
        </div>
      `;
      return;
    }

    // Extract frontmatter
    const { metadata, body } = extractFrontmatter(mdText);
    const baseFolder = `blog/${cleanPath}/`;

    // Date computation: Folder path is primary source, fallback to frontmatter
    let displayDate = folderInfo ? folderInfo.dateFormatted : '';
    if (!displayDate && metadata.date) {
      displayDate = parseToDMY(metadata.date);
    }
    if (!displayDate) {
      displayDate = formatDateDMY(2026, 10, 26);
    }

    // Title resolution
    let title = metadata.title;
    if (!title) {
      const h1Match = body.match(/^#\s+(.*)$/m);
      if (h1Match) {
        title = h1Match[1].trim();
      } else {
        title = (folderInfo?.slug || 'Artikel Blog').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // Author & category
    const author = metadata.author || 'Pentadbiran Musolla';
    const category = metadata.category || 'Umum';
    const readTime = estimateReadingTime(body);

    // Cover image
    let coverSrc = metadata.cover || '';
    if (coverSrc && !/^(https?:|\/)/i.test(coverSrc)) {
      coverSrc = baseFolder + coverSrc.replace(/^\.\//, '');
    }

    // Parse Markdown body
    const bodyHtml = parseMarkdown(body, baseFolder);

    // Tags
    const tags = Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? String(metadata.tags).split(',').map(t => t.trim()) : []);

    const pageUrl = window.location.href;
    const shareText = encodeURIComponent(`${title} - Laman Web Rasmi Musolla`);

    // Render full post page
    containerEl.innerHTML = `
      <article class="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <!-- Navigation Breadcrumbs -->
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
          <a href="index.html" class="hover:text-primary transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Utama</span>
          </a>
          <span>/</span>
          <a href="blog/" class="hover:text-primary transition-colors">Blog & Hebahan</a>
          <span>/</span>
          <span class="text-foreground truncate max-w-[200px] sm:max-w-xs">${title}</span>
        </div>

        <!-- Article Header -->
        <header class="space-y-4">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="badge badge-primary text-xs uppercase font-bold tracking-wider">${category}</span>
            <!-- Requirement: Date formatting as <DD>/<MM>/<YYYY> -->
            <time class="blog-badge-date badge badge-outline text-xs font-bold text-foreground flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${displayDate}</span>
            </time>
            <span class="text-xs text-muted-foreground flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${readTime} min bacaan</span>
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            ${title}
          </h1>

          <div class="flex items-center gap-3 pt-2 text-xs sm:text-sm text-muted-foreground">
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
              ${author.charAt(0)}
            </div>
            <div>
              <span class="font-semibold text-foreground">${author}</span>
              <span class="mx-1.5">•</span>
              <span>Disiarkan pada ${displayDate}</span>
            </div>
          </div>
        </header>

        <!-- Cover Image (if available) -->
        ${coverSrc ? `
          <div class="rounded-2xl overflow-hidden border border-border shadow-sm max-h-[460px] bg-muted">
            <img src="${coverSrc}" alt="${title}" class="w-full h-full object-cover">
          </div>
        ` : ''}

        <!-- Post Content Body -->
        <div class="prose pt-4">
          ${bodyHtml}
        </div>

        <!-- Tags List -->
        ${tags.length > 0 ? `
          <div class="pt-6 border-t border-border flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-muted-foreground">Tag:</span>
            ${tags.map(t => `<span class="badge badge-secondary text-xs">#${t}</span>`).join(' ')}
          </div>
        ` : ''}

        <!-- Social Share & Return Actions -->
        <div class="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-center sm:text-left">
            <h4 class="text-sm font-bold text-foreground">Kongsi Artikel Ini</h4>
            <p class="text-xs text-muted-foreground">Sebarkan maklumat &amp; kebaikan kepada kariah dan sahabat.</p>
          </div>
          <div class="flex items-center gap-2">
            <a href="https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm gap-1.5 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white" title="Kongsi di WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.3-.777.98-1.028 1.28-.25.3-.501.35-.802.2-.3-.15-1.267-.468-2.414-1.49-1.024-.913-1.716-2.04-1.917-2.385-.2-.345-.021-.531.13-.68.135-.135.301-.35.451-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.928-2.234-.244-.588-.492-.508-.677-.518-.175-.009-.376-.011-.577-.011-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.703.25-1.305.175-1.43-.075-.125-.275-.2-.576-.35zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.93.55 3.73 1.5 5.26L2 22l4.87-1.49c1.47.88 3.19 1.4 5.17 1.4 5.53 0 10.02-4.49 10.02-10.02S17.57 2 12.04 2z"/></svg>
              <span>WhatsApp</span>
            </a>
            <a href="https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${shareText}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm gap-1.5 text-xs text-sky-500 hover:bg-sky-500 hover:text-white" title="Kongsi di Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              <span>Telegram</span>
            </a>
            <button onclick="navigator.clipboard.writeText(window.location.href); if (window.showToast) window.showToast('Pautan berjaya disalin!');" class="btn btn-outline btn-sm gap-1.5 text-xs" title="Salin Pautan">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>Salin</span>
            </button>
          </div>
        </div>

        <div class="pt-4 flex justify-between items-center">
          <a href="blog/" class="btn btn-outline btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            <span>Semua Artikel Blog</span>
          </a>
          <a href="index.html" class="btn btn-primary btn-sm gap-2">
            <span>Ke Laman Utama</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </article>
    `;

    // Update document title
    document.title = `${title} | Musolla Al-Widad`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Fetch list of posts from posts.json (generated by build or dev server)
   */
  async function fetchPostsIndex() {
    const endpoints = [
      'blog/posts.json',
      'posts.json',
      '/api/blog/posts'
    ];
    for (const ep of endpoints) {
      try {
        const res = await fetch(`${ep}?v=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.posts)) return data.posts;
        }
      } catch (e) {}
    }
    return [];
  }

  /**
   * Render blog cards grid on the blog catalog page
   */
  function renderBlogCatalog(posts, containerEl, filterCategory = 'all', searchQuery = '') {
    if (!containerEl) return;

    let filtered = posts.slice();

    if (filterCategory && filterCategory !== 'all') {
      filtered = filtered.filter(p => (p.category || 'Umum').toLowerCase() === filterCategory.toLowerCase());
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        return (p.title && p.title.toLowerCase().includes(q)) ||
               (p.summary && p.summary.toLowerCase().includes(q)) ||
               (p.author && p.author.toLowerCase().includes(q)) ||
               (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
      });
    }

    if (filtered.length === 0) {
      containerEl.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-3">
          <div class="w-12 h-12 mx-auto rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground">Tiada Artikel Dijumpai</h3>
          <p class="text-xs text-muted-foreground max-w-sm mx-auto">
            Tiada artikel yang bertepatan dengan carian atau kategori yang dipilih.
          </p>
        </div>
      `;
      return;
    }

    // Sort descending by date
    filtered.sort((a, b) => {
      const dateA = a.rawDate || a.dateFormatted || '';
      const dateB = b.rawDate || b.dateFormatted || '';
      return dateB.localeCompare(dateA);
    });

    containerEl.innerHTML = filtered.map(post => {
      const postSlug = post.slugPath || `${post.year}/${post.month}/${post.day}/${post.slug}`;
      const postUrl = `blog/?post=${postSlug}`;
      const cover = post.cover || 'assets/logo.png';
      // Requirement: Display date formatting on page as <DD>/<MM>/<YYYY>
      const displayDate = post.dateFormatted || formatDateDMY(post.year, post.month, post.day);
      const category = post.category || 'Umum';
      const readTime = post.readTime || 2;

      return `
        <div class="blog-card card p-0 flex flex-col justify-between border border-border bg-card overflow-hidden rounded-2xl group">
          <div>
            <!-- Thumbnail Cover -->
            <div class="h-48 overflow-hidden bg-muted relative">
              <img src="${cover}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
              <span class="absolute top-3 left-3 badge badge-primary text-[11px] font-bold shadow-sm">
                ${category}
              </span>
            </div>

            <!-- Card Content -->
            <div class="p-5 space-y-2.5">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <!-- Strict <DD>/<MM>/<YYYY> date requirement -->
                <span class="blog-badge-date font-bold text-foreground flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  <span>${displayDate}</span>
                </span>
                <span>•</span>
                <span>${readTime} min baca</span>
              </div>

              <h3 class="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <a href="${postUrl}">${post.title}</a>
              </h3>

              <p class="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                ${post.summary || 'Klik untuk membaca artikel penuh di laman web rasmi.'}
              </p>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-5 pt-0 mt-auto flex items-center justify-between border-t border-border/50 text-xs">
            <span class="text-muted-foreground font-medium">${post.author || 'Pihak Musolla'}</span>
            <a href="${postUrl}" class="btn btn-outline btn-sm text-xs font-semibold gap-1.5">
              <span>Baca Penuh</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Render Top 3 Latest Posts Widget for index.html homepage
   */
  async function renderHomepageWidget(containerId = 'homepage-blog-container', maxPosts = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const posts = await fetchPostsIndex();
    if (!posts || posts.length === 0) {
      const section = document.getElementById('blog-section');
      if (section) section.classList.add('hidden');
      return;
    }

    // Sort latest
    posts.sort((a, b) => {
      const dateA = a.rawDate || a.dateFormatted || '';
      const dateB = b.rawDate || b.dateFormatted || '';
      return dateB.localeCompare(dateA);
    });

    const topPosts = posts.slice(0, maxPosts);

    container.innerHTML = topPosts.map(post => {
      const postSlug = post.slugPath || `${post.year}/${post.month}/${post.day}/${post.slug}`;
      const postUrl = `blog/?post=${postSlug}`;
      const cover = post.cover || 'assets/logo.png';
      const displayDate = post.dateFormatted || formatDateDMY(post.year, post.month, post.day);
      const category = post.category || 'Umum';

      return `
        <div class="blog-card card p-0 flex flex-col justify-between border border-border bg-card overflow-hidden rounded-2xl group">
          <div>
            <div class="h-44 overflow-hidden bg-muted relative">
              <img src="${cover}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
              <span class="absolute top-3 left-3 badge badge-primary text-[11px] font-bold shadow-sm">
                ${category}
              </span>
            </div>
            <div class="p-5 space-y-2">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span class="blog-badge-date font-bold text-foreground flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  <span>${displayDate}</span>
                </span>
                <span>•</span>
                <span>${post.readTime || 2} min baca</span>
              </div>
              <h3 class="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <a href="${postUrl}">${post.title}</a>
              </h3>
              <p class="text-xs text-muted-foreground line-clamp-2">
                ${post.summary || 'Klik untuk membaca artikel hebahan penuh.'}
              </p>
            </div>
          </div>
          <div class="p-5 pt-0 mt-auto flex items-center justify-between border-t border-border/50 text-xs">
            <span class="text-muted-foreground font-medium">${post.author || 'Pihak Musolla'}</span>
            <a href="${postUrl}" class="btn btn-outline btn-sm text-xs font-semibold gap-1">
              <span>Baca</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Expose Global BlogEngine
  window.BlogEngine = {
    formatDateDMY,
    parseToDMY,
    extractFrontmatter,
    parseMarkdown,
    parseBlogPath,
    estimateReadingTime,
    loadPostBySlug,
    fetchPostsIndex,
    renderBlogCatalog,
    renderHomepageWidget
  };
})();
