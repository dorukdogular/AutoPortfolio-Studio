import type { PortfolioData, Theme, ThemeColors } from '../types';

// Simple HTML escaping
const escape = (str: string) => str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';

const socialIconMap: { [key: string]: string } = {
  github: `<svg fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg>`,
  linkedin: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  twitter: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.634 4.208 3.803 4.649-.624.169-1.282.225-1.961.225-.29 0-.57-.028-.838-.079.588 1.839 2.301 3.189 4.34 3.225-1.623 1.275-3.669 2.03-5.897 2.03-.383 0-.76-.022-1.13-.065 2.099 1.353 4.604 2.148 7.29 2.148 8.743 0 13.522-7.243 13.522-13.522 0-.206-.005-.412-.013-.617.928-.67 1.734-1.512 2.368-2.454z"/></svg>`,
};

// =================================================================================
// CSS GENERATION
// =================================================================================

const generateCSS = (data: PortfolioData, theme: Theme) => {
    const { light, dark } = theme;
    const { siteSettings } = data;

    const generateColorVariables = (colors: ThemeColors) => `
        --color-primary: ${colors.primary};
        --color-secondary: ${colors.secondary};
        --color-background: ${colors.background};
        --color-card: ${colors.card};
        --color-text: ${colors.text};
        --color-heading: ${colors.heading};
    `;

    const lightVars = generateColorVariables(light);
    const darkVars = generateColorVariables(dark);
    
    const fontSizes: Record<string, string> = { sm: '0.875rem', base: '1rem', lg: '1.125rem' };
    const contentWidths: Record<string, string> = { standard: '1280px', wide: '1536px', full: '100%' };

    return `
    <style>
    /* TAILWIND STYLES INLINED VIA CDN SCRIPT */
    
    :root {
        ${siteSettings.colorScheme === 'light' ? lightVars : darkVars}
        --font-family: '${siteSettings.fontFamily}', sans-serif;
        --font-size-base: ${fontSizes[siteSettings.fontSize] || '1rem'};
        --content-width: ${contentWidths[siteSettings.contentWidth] || '1280px'};
    }

    html.dark { ${darkVars} }
    html.light { ${lightVars} }
    
    @media (prefers-color-scheme: dark) { html.system { ${darkVars} } }
    @media (prefers-color-scheme: light) { html.system { ${lightVars} } }

    /* BASE STYLES */
    body {
        background-color: var(--color-background);
        color: var(--color-text);
        font-family: var(--font-family);
        font-size: var(--font-size-base);
        line-height: 1.6;
        transition: background-color 0.3s, color 0.3s;
    }
    .container { max-width: var(--content-width); }
    h1, h2, h3, h4, h5, h6 { color: var(--color-heading); font-weight: 700; }
    a { color: var(--color-primary); text-decoration: none; transition: color 0.3s; }
    a:hover { color: var(--color-secondary); }
    .card {
      background-color: var(--color-card);
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
    .skill-badge { background-color: var(--color-primary); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; }
    .section { padding-top: 3rem; padding-bottom: 3rem; }
    .section-title { color: var(--color-heading); font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 2.5rem; }
    
    ${generateLayoutSpecificCSS(data.layoutId)}

    </style>
    ${data.advancedCode?.customCss ? `<style id="custom-injected-styles">${data.advancedCode.customCss}</style>` : ''}
    `;
};

// =================================================================================
// REUSABLE SECTION RENDERERS
// =================================================================================

const renderContactForm = (data: PortfolioData) => {
    if (!data.contactForm?.enabled) return '';
    const form = data.contactForm;
    const provider = form.provider;
    const apiKey = form.apiKey || '';
    const buttonText = escape(form.buttonText || 'Send Message');

    let actionUrl = '';
    let hiddenInputs = '';

    if (provider === 'web3forms') {
        actionUrl = 'https://api.web3forms.com/submit';
        hiddenInputs = `<input type="hidden" name="access_key" value="${escape(apiKey)}">`;
    } else {
        actionUrl = `https://formspree.io/f/${escape(apiKey)}`;
    }

    const layoutId = data.layoutId;

    // ----------------- Neo-Brutalism Form -----------------
    if (layoutId === 'neo-brutalism') {
        return `
        <section id="contact" class="mt-12 border-t-4 border-black pt-10 font-mono text-left">
          <h2 class="text-3xl font-black uppercase text-black mb-8 tracking-wider">Contact Payload</h2>
          <div class="border-4 border-black bg-[var(--color-card)] p-6 md:p-8 shadow-[8px_8px_0px_0px_#000000] max-w-xl">
            <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-6">
              ${hiddenInputs}
              <div>
                <label for="form-name" class="block text-sm font-bold text-black uppercase mb-1">Sender Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-50 transition-colors text-sm">
              </div>
              <div>
                <label for="form-email" class="block text-sm font-bold text-black uppercase mb-1">Return Email</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-50 transition-colors text-sm">
              </div>
              <div>
                <label for="form-message" class="block text-sm font-bold text-black uppercase mb-1">Transmission Message</label>
                <textarea id="form-message" name="message" rows="4" required class="w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-50 transition-colors text-sm"></textarea>
              </div>
              <div id="form-feedback" class="hidden text-sm p-3 border-4 border-black font-bold"></div>
              <button type="submit" id="form-submit-btn" class="w-full border-4 border-black bg-[var(--color-primary)] text-black hover:bg-[var(--color-secondary)] font-black py-4 px-6 rounded-none transition-all text-sm uppercase shadow-[4px_4px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center gap-2">
                <span>Execute Dispatch</span>
                <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-4 border-black border-t-transparent rounded-full"></span>
              </button>
            </form>
          </div>
        </section>
        `;
    }

    // ----------------- Glassmorphism Aurora Form -----------------
    if (layoutId === 'glassmorphism-aurora') {
        return `
        <section id="contact" class="mt-16 border-t border-white/10 pt-12 text-center">
          <h2 class="section-title">Get in Touch</h2>
          <div class="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-3xl text-left">
            <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-6">
              ${hiddenInputs}
              <div>
                <label for="form-name" class="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Your Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/10 transition-all text-sm">
              </div>
              <div>
                <label for="form-email" class="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/10 transition-all text-sm">
              </div>
              <div>
                <label for="form-message" class="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Message Payload</label>
                <textarea id="form-message" name="message" rows="4" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/10 transition-all text-sm"></textarea>
              </div>
              <div id="form-feedback" class="hidden text-sm p-3.5 rounded-2xl border border-white/10"></div>
              <button type="submit" id="form-submit-btn" class="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] duration-200">
                <span>${buttonText}</span>
                <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              </button>
            </form>
          </div>
        </section>
        `;
    }

    // ----------------- Retro (Terminal Style) Form -----------------
    if (layoutId === 'retro') {
        return `
        <section id="contact" class="mt-8 border-t border-[var(--color-primary)] pt-6 font-mono text-left">
          <div class="text-xs uppercase text-[var(--color-secondary)] mb-4">&gt;&gt; SECURE_COMMUNICATION_LINK</div>
          <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4 max-w-lg">
            ${hiddenInputs}
            <div>
              <label for="form-name" class="block text-sm text-[var(--color-primary)] mb-1">&gt; IDENTIFIER (NAME):</label>
              <input type="text" id="form-name" name="name" required class="w-full bg-black border border-[var(--color-primary)] rounded-none px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none font-mono text-sm">
            </div>
            <div>
              <label for="form-email" class="block text-sm text-[var(--color-primary)] mb-1">&gt; TRANSMISSION_ADDR (EMAIL):</label>
              <input type="email" id="form-email" name="email" required class="w-full bg-black border border-[var(--color-primary)] rounded-none px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none font-mono text-sm">
            </div>
            <div>
              <label for="form-message" class="block text-sm text-[var(--color-primary)] mb-1">&gt; ENCRYPTED_PAYLOAD (MESSAGE):</label>
              <textarea id="form-message" name="message" rows="4" required class="w-full bg-black border border-[var(--color-primary)] rounded-none px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none font-mono text-sm"></textarea>
            </div>
            <div id="form-feedback" class="hidden text-sm p-2 border border-[var(--color-primary)]"></div>
            <button type="submit" id="form-submit-btn" class="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 font-bold py-2 px-4 rounded-none transition-colors text-sm shadow-md flex items-center justify-center gap-2">
              <span>Execute Submission</span>
              <span id="form-spinner" class="hidden animate-spin h-3.5 w-3.5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"></span>
            </button>
          </form>
        </section>
        `;
    }

    // ----------------- Booklet (Presentation Card Style) Form -----------------
    if (layoutId === 'booklet') {
        return `
        <div class="max-w-xl mx-auto card flex flex-col justify-center border border-[var(--color-text)]/5 bg-[var(--color-card)] shadow-2xl p-8 rounded-2xl">
          <h2 class="text-3xl font-extrabold mb-6 text-center text-[var(--color-heading)]">Get in Touch</h2>
          <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-5">
            ${hiddenInputs}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1.5">Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all">
              </div>
              <div>
                <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all">
              </div>
            </div>
            <div>
              <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1.5">Message</label>
              <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all"></textarea>
            </div>
            <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
            <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
              <span>${buttonText}</span>
              <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            </button>
          </form>
        </div>
        `;
    }

    // ----------------- Centered-Card (Compact Flat Style) Form -----------------
    if (layoutId === 'centered-card') {
        return `
        <section id="contact" class="mt-12 border-t border-[var(--color-text)]/10 pt-10">
          <h2 class="text-3xl font-extrabold mb-6 text-center text-[var(--color-heading)]">Contact Me</h2>
          <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4 max-w-lg mx-auto">
            ${hiddenInputs}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input type="text" id="form-name" name="name" placeholder="Your Name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
              <div>
                <input type="email" id="form-email" name="email" placeholder="Your Email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
            </div>
            <div>
              <textarea id="form-message" name="message" placeholder="Your Message..." rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
            </div>
            <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
            <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-all text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
              <span>${buttonText}</span>
              <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            </button>
          </form>
        </section>
        `;
    }

    // ----------------- Interactive Blocks (No Nested Card) Form -----------------
    if (layoutId === 'interactive-blocks') {
        return `
        <div id="contact" class="w-full">
          <h2 class="text-2xl font-bold mb-6 text-[var(--color-heading)]">Get in Touch</h2>
          <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4">
            ${hiddenInputs}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
              <div>
                <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
            </div>
            <div>
              <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Message</label>
              <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
            </div>
            <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
            <button type="submit" id="form-submit-btn" class="w-full md:w-auto bg-[var(--color-primary)] text-white font-bold py-2.5 px-8 rounded-lg hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
              <span>${buttonText}</span>
              <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            </button>
          </form>
        </div>
        `;
    }

    // ----------------- Material Resume (Paper Layout Style) Form -----------------
    if (layoutId === 'material-resume') {
        return `
        <section id="contact" class="mt-12 border-t border-gray-200/50 pt-8">
          <h2 class="text-xl font-bold mb-6 text-[var(--color-heading)] border-b pb-2 tracking-wide uppercase text-sm">Contact Me</h2>
          <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-5 max-w-2xl">
            ${hiddenInputs}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="form-name" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border-b-2 border-gray-300 focus:border-[var(--color-primary)] px-2 py-2 text-sm focus:outline-none transition-colors">
              </div>
              <div>
                <label for="form-email" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border-b-2 border-gray-300 focus:border-[var(--color-primary)] px-2 py-2 text-sm focus:outline-none transition-colors">
              </div>
            </div>
            <div>
              <label for="form-message" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Message</label>
              <textarea id="form-message" name="message" rows="3" required class="w-full bg-[var(--color-background)] border-b-2 border-gray-300 focus:border-[var(--color-primary)] px-2 py-2 text-sm focus:outline-none transition-colors"></textarea>
            </div>
            <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
            <button type="submit" id="form-submit-btn" class="bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] font-bold py-2.5 px-8 rounded shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
              <span>${buttonText}</span>
              <span id="form-spinner" class="hidden animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
            </button>
          </form>
        </section>
        `;
    }

    // ----------------- Timeline (Visual Connector Node) Form -----------------
    if (layoutId === 'timeline') {
        return `
        <section id="contact" class="section">
          <h2 class="section-title">Get In Touch</h2>
          <div class="max-w-2xl mx-auto relative before:absolute before:inset-0 before:left-6 before:h-full before:w-0.5 before:bg-[var(--color-primary)]/20 md:before:left-1/2 md:before:-ml-0.25">
            <!-- Timeline connector dot -->
            <div class="absolute left-[18px] top-0 h-6 w-6 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)] md:left-1/2 md:-ml-3 z-10 animate-pulse"></div>
            
            <div class="pl-12 md:pl-0 md:pt-8">
              <div class="card border border-[var(--color-text)]/5 bg-[var(--color-card)] shadow-xl p-6 rounded-2xl max-w-xl mx-auto">
                <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4">
                  ${hiddenInputs}
                  <div>
                    <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Name</label>
                    <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
                  </div>
                  <div>
                    <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
                  </div>
                  <div>
                    <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Message</label>
                    <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
                  </div>
                  <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
                  <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
                    <span>${buttonText}</span>
                    <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        `;
    }

    // ----------------- Minimal Split Layout Form -----------------
    if (layoutId === 'minimal-split') {
        return `
        <section id="contact" class="section">
          <h2 class="text-3xl font-extrabold mb-8 text-[var(--color-heading)] border-b border-[var(--color-text)]/10 pb-4">Get in Touch</h2>
          <div class="card border border-[var(--color-text)]/5 bg-[var(--color-card)] shadow-xl p-6 rounded-2xl">
            <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4">
              ${hiddenInputs}
              <div>
                <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Your Name</label>
                <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
              <div>
                <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
              </div>
              <div>
                <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Message</label>
                <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
              </div>
              <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
              <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
                <span>${buttonText}</span>
                <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              </button>
            </form>
          </div>
        </section>
        `;
    }

    // ----------------- Gallery Grid Layout Form -----------------
    if (layoutId === 'gallery-grid') {
        return `
        <section id="contact" class="section mt-12">
          <h2 class="section-title">Let's Connect</h2>
          <div class="max-w-2xl mx-auto card border border-[var(--color-text)]/5 bg-[var(--color-card)] shadow-xl p-8 rounded-3xl">
            <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4">
              ${hiddenInputs}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Name</label>
                  <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-2xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
                </div>
                <div>
                  <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Email</label>
                  <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-2xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
                </div>
              </div>
              <div>
                <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Message</label>
                <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-2xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
              </div>
              <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
              <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
                <span>${buttonText}</span>
                <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              </button>
            </form>
          </div>
        </section>
        `;
    }

    // ----------------- Default Premium Layout (Classic Style) -----------------
    return `
    <section id="contact" class="section">
      <h2 class="section-title">Contact</h2>
      <div class="max-w-xl mx-auto card border border-[var(--color-text)]/5 bg-[var(--color-card)] shadow-xl p-8 rounded-2xl">
        <form id="portfolio-contact-form" action="${actionUrl}" method="POST" class="space-y-4">
          ${hiddenInputs}
          <div>
            <label for="form-name" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Name</label>
            <input type="text" id="form-name" name="name" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
          </div>
          <div>
            <label for="form-email" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Email Address</label>
            <input type="email" id="form-email" name="email" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]">
          </div>
          <div>
            <label for="form-message" class="block text-xs font-semibold text-[var(--color-text)] opacity-70 uppercase tracking-wider mb-1">Message</label>
            <textarea id="form-message" name="message" rows="4" required class="w-full bg-[var(--color-background)] border border-[var(--color-text)]/10 rounded-xl px-4 py-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-sm transition-all focus:border-[var(--color-primary)]"></textarea>
          </div>
          <div id="form-feedback" class="hidden text-sm p-3 rounded-lg"></div>
          <button type="submit" id="form-submit-btn" class="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]">
            <span>${buttonText}</span>
            <span id="form-spinner" class="hidden animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          </button>
        </form>
      </div>
    </section>
    `;
};

const renderHeader = (data: PortfolioData) => `
    ${data.basicInfo.profileImage ? `<img src="${data.basicInfo.profileImage}" alt="Profile" class="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 border-4 border-[var(--color-primary)] object-cover shadow-lg">` : ''}
    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--color-heading)]">${escape(data.basicInfo.name)}</h1>
    <p class="text-xl md:text-2xl text-[var(--color-secondary)] mt-2 font-medium">${escape(data.basicInfo.title)}</p>
    <p class="mt-4 max-w-3xl mx-auto text-lg">${escape(data.basicInfo.bio).replace(/\n/g, '<br>')}</p>
    <a href="mailto:${escape(data.basicInfo.email)}" class="mt-6 inline-flex items-center gap-2.5 bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-all text-base shadow-md hover:scale-[1.02] active:scale-[0.98] duration-200">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
        </svg>
        <span>${escape(data.basicInfo.email)}</span>
    </a>
`;
const renderSkills = (data: PortfolioData) => data.skills.length > 0 ? `<section id="skills" class="section"><h2 class="section-title">${escape(data.skillsTitle)}</h2><div class="flex flex-wrap justify-center gap-3">${data.skills.map(skill => `<span class="skill-badge">${escape(skill)}</span>`).join('')}</div></section>` : '';
const renderProjects = (data: PortfolioData) => data.projects.length > 0 ? `<section id="projects" class="section"><h2 class="section-title">${escape(data.projectsTitle)}</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${data.projects.map(p => `<div class="card flex flex-col">${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.title)}" class="w-full h-48 object-cover rounded-t-lg mb-4">` : ''}<div class="flex-grow"><h3 class="text-xl font-bold mb-2 text-[var(--color-heading)]">${escape(p.title)}</h3><p class="text-base mb-4">${escape(p.description).replace(/\n/g, '<br>')}</p></div>${p.link ? `<a href="${escape(p.link)}" target="_blank" rel="noopener noreferrer" class="font-semibold mt-auto self-start">View Project &rarr;</a>` : ''}</div>`).join('')}</div></section>` : '';
const renderExperience = (data: PortfolioData) => data.experience.length > 0 ? `<section id="experience" class="section"><h2 class="section-title">Experience</h2><div class="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-[var(--color-primary)]/30"><div class="pl-10 relative">${data.experience.map(exp => `<div class="mb-8"><div class="absolute -left-1.5 top-1 h-5 w-5 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]"></div><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(exp.role)}</h3><p class="text-lg font-medium text-[var(--color-secondary)]">${escape(exp.company)}</p><p class="text-sm text-gray-400 mb-2">${escape(exp.period)}</p><p>${escape(exp.description).replace(/\n/g, '<br>')}</p></div>`).join('')}</div></div></section>` : '';
const renderEducation = (data: PortfolioData) => data.education.length > 0 ? `<section id="education" class="section"><h2 class="section-title">Education</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">${data.education.map(edu => `<div class="card"><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(edu.degree)}</h3><p class="text-lg font-medium">${escape(edu.institution)}</p><p class="text-sm text-gray-400">${escape(edu.period)}</p></div>`).join('')}</div></section>` : '';
const renderTestimonials = (data: PortfolioData) => data.testimonials.length > 0 ? `<section id="testimonials" class="section"><h2 class="section-title">Testimonials</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">${data.testimonials.map(t => `<div class="card text-center"><p class="italic">"${escape(t.text)}"</p><p class="font-bold mt-4 text-[var(--color-heading)]">- ${escape(t.author)}</p></div>`).join('')}</div></section>` : '';
const renderCertifications = (data: PortfolioData) => data.certifications.length > 0 ? `<section id="certifications" class="section"><h2 class="section-title">Certifications</h2><div class="max-w-3xl mx-auto space-y-4">${data.certifications.map(c => `<div class="card flex justify-between items-center"><div class="flex-grow"><h3 class="font-bold text-[var(--color-heading)]">${escape(c.name)}</h3><p>${escape(c.authority)}</p></div><p class="text-sm text-gray-400">${escape(c.date)}</p></div>`).join('')}</div></section>` : '';
const renderFooter = (data: PortfolioData) => `<footer class="text-center py-8 mt-12 border-t border-gray-200/20"><div class="flex justify-center gap-6 mb-4">${data.socialLinks.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 text-gray-500 hover:text-[var(--color-primary)]" title="${escape(link.platform)}">${socialIconMap[link.platform.toLowerCase()] || escape(link.platform)}</a>`).join('')}</div><p>&copy; ${new Date().getFullYear()} ${escape(data.basicInfo.name)}. All rights reserved.</p></footer>`;
const renderAllSections = (data: PortfolioData) => [renderSkills(data), renderProjects(data), renderExperience(data), renderEducation(data), renderTestimonials(data), renderCertifications(data), renderContactForm(data)].join('');

// =================================================================================
// LAYOUT-SPECIFIC HTML & CSS
// =================================================================================
const allLayoutGenerators: Record<string, (data: PortfolioData) => string> = {
    'classic': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div>`,
    'minimal-split': data => `<div class="md:flex min-h-screen"><aside class="md:w-1/3 p-8 bg-[var(--color-card)] flex flex-col justify-center text-center md:sticky md:top-0 md:h-screen">${renderHeader(data)}</aside><main class="md:w-2/3 p-4 md:p-8"><div class="max-w-4xl mx-auto">${renderAllSections(data)}${renderFooter(data)}</div></main></div>`,
    'gallery-grid': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderSkills(data)}${renderProjects(data)}${renderExperience(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}${renderContactForm(data)}</main>${renderFooter(data)}</div>`,
    'timeline': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderExperience(data)}${renderSkills(data)}${renderProjects(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}${renderContactForm(data)}</main>${renderFooter(data)}</div>`,
    'centered-card': data => `<div class="min-h-screen flex items-center justify-center p-4"><div class="container bg-[var(--color-card)] rounded-xl shadow-2xl p-8 md:p-12"><header class="text-center mb-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div></div>`,
    'interactive-blocks': data => `<div class="container mx-auto p-4 md:p-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><header class="lg:col-span-3 text-center card">${renderHeader(data)}</header><div class="lg:col-span-2 card">${renderProjects(data)}</div><div class="card">${renderSkills(data)}</div><div class="lg:col-span-3 card">${renderExperience(data)}</div>${data.contactForm?.enabled ? `<div class="lg:col-span-3 card">${renderContactForm(data)}</div>` : ''}</div>${renderFooter(data)}</div>`,
    'booklet': data => `<div class="flex snap-x snap-mandatory h-screen w-screen overflow-x-auto"><section class="snap-start flex-shrink-0 w-screen h-screen flex flex-col justify-center text-center p-8">${renderHeader(data)}</section>${[renderSkills, renderProjects, renderExperience, renderEducation].map(f => `<section class="snap-start flex-shrink-0 w-screen h-screen flex flex-col justify-center p-8">${f(data)}</section>`).join('')}${data.contactForm?.enabled ? `<section class="snap-start flex-shrink-0 w-screen h-screen flex flex-col justify-center p-8">${renderContactForm(data)}</section>` : ''}</div>`,
    'material-resume': data => `<div class="container mx-auto p-4 md:p-8 max-w-4xl"><div class="card"><header class="text-center p-8">${renderHeader(data)}</header><main class="p-8">${renderAllSections(data)}</main>${renderFooter(data)}</div></div>`,
    'sidebar-modern': data => `
    <div class="flex flex-col md:flex-row min-h-screen bg-[var(--color-background)]">
      <aside class="w-full md:w-80 lg:w-[400px] bg-[var(--color-card)] border-r border-[var(--color-text)]/5 p-8 flex flex-col justify-between md:fixed md:h-screen md:overflow-y-auto z-10 shadow-2xl">
        <div class="text-left">${renderHeader(data)}</div>
        <div class="mt-12 hidden md:block">${renderFooter(data)}</div>
      </aside>
      <main class="w-full md:ml-80 lg:ml-[400px] p-6 md:p-12 lg:p-20 max-w-5xl mx-auto">
        <div class="space-y-24">
          ${renderSkills(data)}
          ${renderProjects(data)}
          ${renderExperience(data)}
          ${renderEducation(data)}
          ${renderTestimonials(data)}
          ${renderCertifications(data)}
          ${renderContactForm(data)}
        </div>
        <div class="md:hidden mt-12">${renderFooter(data)}</div>
      </main>
    </div>`,
    'bento-grid': data => `
    <div class="bento-theme min-h-screen p-4 md:p-8 bg-[var(--color-background)]">
      <div class="max-w-7xl mx-auto">
        <header class="mb-12 text-center bg-[var(--color-card)] p-12 rounded-[2rem] shadow-sm border border-[var(--color-text)]/5">${renderHeader(data)}</header>
        <main class="grid grid-cols-1 md:grid-cols-12 auto-rows-max gap-6">
          <div class="md:col-span-8 card !h-full flex flex-col">${renderProjects(data)}</div>
          <div class="md:col-span-4 card !h-full relative overflow-hidden flex flex-col justify-center text-center">
            <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 z-0"></div>
            <div class="relative z-10">${renderSkills(data)}</div>
          </div>
          <div class="md:col-span-6 card !h-full">${renderExperience(data)}</div>
          <div class="md:col-span-6 card !h-full flex flex-col justify-between">
            ${renderEducation(data)}
            ${data.certifications.length > 0 ? `<div class="mt-8 pt-8 border-t border-[var(--color-text)]/10">${renderCertifications(data)}</div>` : ''}
          </div>
          ${data.testimonials.length > 0 ? `<div class="md:col-span-12 card">${renderTestimonials(data)}</div>` : ''}
          ${data.contactForm?.enabled ? `<div class="md:col-span-12 card p-8 md:p-16">${renderContactForm(data)}</div>` : ''}
        </main>
        ${renderFooter(data)}
      </div>
    </div>`,
    'neo-brutalism': data => `<div class="neo-brutalism-theme min-h-screen p-4 md:p-8 max-w-5xl mx-auto"><header class="text-left py-12 border-b-4 border-black mb-12">${renderHeader(data)}</header><main class="space-y-12">${renderAllSections(data)}</main>${renderFooter(data)}</div>`,
    'glassmorphism-aurora': data => `
    <div class="aurora-theme min-h-screen relative overflow-hidden p-4 md:p-8 flex flex-col items-center justify-center">
      <div class="aurora-blob aurora-blob-1"></div>
      <div class="aurora-blob aurora-blob-2"></div>
      <div class="aurora-blob aurora-blob-3"></div>
      <div class="container relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-12 my-8">
        <header class="text-center py-8 mb-12">${renderHeader(data)}</header>
        <main>${renderAllSections(data)}</main>
        ${renderFooter(data)}
      </div>
    </div>`,
    'retro': data => {
        const c1 = "text-cyan-400";
        const c2 = "text-fuchsia-400";
        const c3 = "text-amber-400";
        const c4 = "text-green-400";
        const val = (v: string) => `<span class="text-white">"${escape(v)}"</span>`;

        return `<div class="min-h-screen p-4 flex items-center justify-center"><div class="container border-2 border-[var(--color-primary)] p-6 font-mono max-w-5xl bg-[#0a0a0a] rounded-lg shadow-2xl shadow-[var(--color-primary)]/20 text-sm md:text-base">
        <pre class="whitespace-pre-wrap"><code><span class="${c1}">const</span> <span class="${c2}">portfolio</span> = {
    <span class="${c3}">name</span>: ${val(data.basicInfo.name)},
    <span class="${c3}">title</span>: ${val(data.basicInfo.title)},
    <span class="${c3}">contact</span>: ${val(data.basicInfo.email)},
    <span class="${c3}">bio</span>: \`${escape(data.basicInfo.bio)}\`,
    <span class="${c3}">${data.skillsTitle}</span>: [${data.skills.map(s => `\n        ${val(s)}`).join(',')}\n    ],
    <span class="${c3}">${data.projectsTitle}</span>: [${data.projects.map(p => `\n        {\n            <span class="${c3}">title</span>: ${val(p.title)},\n            <span class="${c3}">description</span>: \`${escape(p.description)}\`\n        }`).join(',')}
    ],
};
<span class="${c4}">// Welcome to my portfolio!</span>
</div></pre>${data.contactForm?.enabled ? renderContactForm(data) : ''}${renderFooter(data)}</div></div>`;
    }
};

const allLayoutCSS: Record<string, string> = {
    'retro': `
        body { font-family: 'Space Mono', monospace; background-color: #000; }
    `,
    'booklet': `
        body { overflow: hidden; } /* Prevent body scroll */
    `,
    'minimal-split': `
        @media (max-width: 768px) {
            .md\\:flex { display: block; }
            .md\\:w-1\\/3, .md\\:w-2\\/3 { width: 100%; }
            .md\\:sticky { position: static; }
        }
    `,
    'bento-grid': `
        .bento-theme .card {
            border-radius: 1.5rem !important;
            box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05) !important;
            border: 1px solid var(--color-text);
            border-opacity: 0.05 !important;
        }
        .bento-theme .section-title {
            margin-bottom: 1.5rem;
            text-align: left;
            font-size: 1.75rem;
        }
        .bento-theme .section {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `,
    'sidebar-modern': `
        @media (min-width: 768px) {
            body { background-color: var(--color-background); }
            aside { border-right: 1px solid rgba(150, 150, 150, 0.1); }
        }
        .sidebar-modern header { text-align: left !important; }
    `,
    'neo-brutalism': `
        body {
            background-color: var(--color-background);
            color: #000000;
        }
        .neo-brutalism-theme {
            font-family: 'Space Mono', monospace;
            color: #000000 !important;
        }
        .neo-brutalism-theme .card {
            border: 4px solid #000000 !important;
            background-color: var(--color-card) !important;
            box-shadow: 8px 8px 0px 0px #000000 !important;
            border-radius: 0px !important;
            transition: all 0.2s ease-in-out !important;
        }
        .neo-brutalism-theme .card:hover {
            transform: translate(-4px, -4px) !important;
            box-shadow: 12px 12px 0px 0px #000000 !important;
        }
        .neo-brutalism-theme .skill-badge {
            border: 3px solid #000000 !important;
            background-color: var(--color-primary) !important;
            color: #000000 !important;
            box-shadow: 3px 3px 0px 0px #000000 !important;
            border-radius: 0px !important;
            font-weight: 900 !important;
            padding: 0.5rem 1rem !important;
        }
        .neo-brutalism-theme .section-title {
            color: #000000 !important;
            text-align: left !important;
            font-size: 2.75rem !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            border-bottom: 6px solid #000000 !important;
            padding-bottom: 0.5rem !important;
            margin-bottom: 3rem !important;
            display: inline-block !important;
        }
        .neo-brutalism-theme h1, 
        .neo-brutalism-theme h2, 
        .neo-brutalism-theme h3,
        .neo-brutalism-theme h4 {
            color: #000000 !important;
            font-weight: 900 !important;
        }
        .neo-brutalism-theme a[href^="mailto:"] {
            border: 4px solid #000000 !important;
            background-color: var(--color-primary) !important;
            color: #000000 !important;
            border-radius: 0px !important;
            box-shadow: 4px 4px 0px 0px #000000 !important;
            font-family: 'Space Mono', monospace;
            font-weight: 900 !important;
        }
        .neo-brutalism-theme a[href^="mailto:"]:hover {
            background-color: var(--color-secondary) !important;
            transform: translate(-2px, -2px) !important;
            box-shadow: 6px 6px 0px 0px #000000 !important;
        }
        .neo-brutalism-theme footer {
            border-top: 4px solid #000000 !important;
            margin-top: 4rem !important;
            padding-top: 2rem !important;
        }
    `,
    'glassmorphism-aurora': `
        .aurora-theme {
            font-family: 'Poppins', sans-serif;
            position: relative;
            background: #090610 !important;
            color: rgba(255, 255, 255, 0.8) !important;
            overflow-x: hidden;
        }
        .aurora-theme h1, 
        .aurora-theme h2, 
        .aurora-theme h3,
        .aurora-theme h4 {
            color: #ffffff !important;
        }
        .aurora-blob {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.35;
            z-index: 0;
            pointer-events: none;
            mix-blend-mode: screen;
            animation: floatBlob 22s infinite alternate ease-in-out;
        }
        .aurora-blob-1 {
            background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
            top: -100px;
            left: -100px;
            animation-duration: 25s;
        }
        .aurora-blob-2 {
            background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
            bottom: -150px;
            right: -100px;
            animation-duration: 30s;
            animation-delay: -5s;
        }
        .aurora-blob-3 {
            background: radial-gradient(circle, #f43f5e 0%, transparent 70%);
            top: 40%;
            left: 30%;
            width: 350px;
            height: 350px;
            animation-duration: 20s;
            animation-delay: -10s;
        }
        @keyframes floatBlob {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(70px, -50px) scale(1.15); }
            100% { transform: translate(-50px, 90px) scale(0.9); }
        }
        .aurora-theme .card {
            background: rgba(255, 255, 255, 0.03) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4) !important;
            border-radius: 1.5rem !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .aurora-theme .card:hover {
            background: rgba(255, 255, 255, 0.06) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
            transform: translateY(-6px) scale(1.01) !important;
            box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.55) !important;
        }
        .aurora-theme .skill-badge {
            background: rgba(255, 255, 255, 0.06) !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: #ffffff !important;
            border-radius: 9999px !important;
            transition: all 0.3s ease !important;
        }
        .aurora-theme .skill-badge:hover {
            background: var(--color-primary) !important;
            border-color: var(--color-primary) !important;
            transform: translateY(-2px);
        }
        .aurora-theme .section-title {
            color: #ffffff !important;
            font-size: 2.75rem !important;
            font-weight: 800 !important;
            letter-spacing: -0.025em !important;
            position: relative !important;
            display: inline-block !important;
            margin-bottom: 4rem !important;
            width: 100% !important;
            text-align: center !important;
        }
        .aurora-theme .section-title::after {
            content: '' !important;
            position: absolute !important;
            bottom: -12px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 80px !important;
            height: 4px !important;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)) !important;
            border-radius: 2px !important;
        }
        .aurora-theme a[href^="mailto:"] {
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2) !important;
            border-radius: 9999px !important;
            color: #ffffff !important;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .aurora-theme a[href^="mailto:"]:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.3) !important;
            opacity: 0.95;
        }
        .aurora-theme footer {
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
    `
};

const generateHTMLContent = (data: PortfolioData) => {
    const generator = allLayoutGenerators[data.layoutId] || allLayoutGenerators['classic'];
    return generator(data);
};

const generateLayoutSpecificCSS = (layoutId: string) => allLayoutCSS[layoutId] || '';

const generateClientScript = (data: PortfolioData) => {
  const hasContactForm = data.contactForm?.enabled;

  if (!hasContactForm) return '';

  let scriptContent = '';

  if (hasContactForm) {
    const formSettings = data.contactForm!;
    const successMsg = formSettings.successMessage || 'Thank you! Your message has been sent successfully.';
    scriptContent += `
      // --- Contact Form Submission Handler ---
      document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('portfolio-contact-form');
        if (form) {
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            const submitBtn = document.getElementById('form-submit-btn');
            const spinner = document.getElementById('form-spinner');
            
            if (!feedback || !submitBtn || !spinner) return;

            feedback.className = 'hidden text-sm p-3 rounded-md';
            feedback.textContent = '';
            
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');
            
            try {
              const formData = new FormData(form);
              const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept': 'application/json'
                }
              });
              
              if (response.ok) {
                feedback.textContent = ${JSON.stringify(successMsg)};
                if (document.querySelector('.neo-brutalism-theme')) {
                  feedback.className = 'text-sm p-3 border-4 border-black bg-green-200 text-black font-bold';
                } else if (document.querySelector('.aurora-theme')) {
                  feedback.className = 'text-sm p-3.5 rounded-2xl bg-green-500/10 text-green-300 border border-green-500/20';
                } else if (window.location.search.includes('layout=retro') || document.body.innerHTML.includes('border-2 border-[var(--color-primary)]')) {
                  feedback.className = 'text-sm p-2 border border-[var(--color-primary)] text-[var(--color-primary)] bg-black';
                } else {
                  feedback.className = 'text-sm p-3 rounded-md bg-green-500/10 text-green-400 border border-green-500/20';
                }
                form.reset();
              } else {
                const resData = await response.json();
                throw new Error(resData.message || 'Something went wrong. Please try again.');
              }
            } catch (err) {
              feedback.textContent = err.message || 'Could not send message. Please check your network or credentials.';
              if (document.querySelector('.neo-brutalism-theme')) {
                feedback.className = 'text-sm p-3 border-4 border-black bg-red-200 text-black font-bold';
              } else if (document.querySelector('.aurora-theme')) {
                feedback.className = 'text-sm p-3.5 rounded-2xl bg-red-500/10 text-red-300 border border-red-500/20';
              } else if (window.location.search.includes('layout=retro') || document.body.innerHTML.includes('border-2 border-[var(--color-secondary)]')) {
                feedback.className = 'text-sm p-2 border border-[var(--color-secondary)] text-[var(--color-secondary)] bg-black';
              } else {
                feedback.className = 'text-sm p-3 rounded-md bg-red-500/10 text-red-400 border border-red-500/20';
              }
            } finally {
              submitBtn.disabled = false;
              spinner.classList.add('hidden');
            }
          });
        }
      });
    `;
  }

  return `
    <script id="portfolio-client-scripts">
      ${scriptContent}
    </script>
  `;
};

// =================================================================================
// FINAL HTML ASSEMBLY
// =================================================================================

export const generateFinalHtml = (data: PortfolioData, theme: Theme): string => {
    const { siteSettings } = data;
    const themeMode = siteSettings.colorScheme === 'system' ? 'system' : siteSettings.colorScheme;
    
    const clientScript = generateClientScript(data);
    const customJs = data.advancedCode?.customJs ? `
        <script id="custom-injected-scripts">
            ${data.advancedCode.customJs}
        </script>
    ` : '';
    
    return `
        <!DOCTYPE html>
        <html lang="en" class="${themeMode}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escape(siteSettings.title)}</title>
            <meta name="description" content="${escape(siteSettings.description)}">
            ${siteSettings.favicon ? `<link rel="icon" href="${siteSettings.favicon}">` : ''}
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=${siteSettings.fontFamily.replace(/ /g, '+')}:wght@400;500;700;900&display=swap" rel="stylesheet">
            ${generateCSS(data, theme)}
        </head>
        <body class="antialiased">
            ${generateHTMLContent(data)}
            ${clientScript}
            ${customJs}
        </body>
        </html>
    `;
};

export const generatePreviewHtml = (data: PortfolioData, theme: Theme): string => {
    // For preview, we can inject a script to prevent links from working
    const finalHtml = generateFinalHtml(data, theme);
    const previewScript = `<script>document.addEventListener('click', e => e.preventDefault(), true);</script></body>`;
    return finalHtml.replace('</body>', previewScript);
};