import type { PortfolioData, Theme, ThemeColors } from '../types';

// Simple HTML escaping
const escape = (str: string) => str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';

const socialIconMap: { [key: string]: string } = {
  github: `<svg fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg>`,
  linkedin: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  twitter: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.634 4.208 3.803 4.649-.624.169-1.282.225-1.961.225-.29 0-.57-.028-.838-.079.588 1.839 2.301 3.189 4.34 3.225-1.623 1.275-3.669 2.03-5.897 2.03-.383 0-.76-.022-1.13-.065 2.099 1.353 4.604 2.148 7.29 2.148 8.743 0 13.522-7.243 13.522-13.522 0-.206-.005-.412-.013-.617.928-.67 1.734-1.512 2.368-2.454z"/></svg>`,
  x: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  youtube: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  medium: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42s-3.38-2.88-3.38-6.42 1.51-6.42 3.38-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.17-.32 5.75-.72 5.75s-.73-2.58-.73-5.75.33-5.75.73-5.75.72 2.58.72 5.75z"/></svg>`,
  dribbble: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.362c-.08-.347-1.127-4.66-4.52-6.533 1.347 1.83 2.054 3.996 2.067 4.037.953.518 1.83.997 2.453 1.328v1.168zm-3.382-7.14c-1.39-2.072-3.13-3.167-3.17-3.193-.01.006-.713 3.655-2.28 7.395 3.303 1.157 5.093 3.61 5.45 4.12 0-.003.738-3.86-.003-8.322zM15.42 2.544C12.56 1.815 9.774 2.5 9.697 2.52c.003.013.91 4.544.757 8.795-3.87-.953-7.534-.143-7.607-.124-.006.182-.016.368-.016.556 0 2.223.712 4.298 1.91 6.002.046-.017 3.987-1.48 7.382-1.07-1.037 3.017-2.128 5.674-2.222 5.9.683.218 1.4.327 2.128.327 2.977 0 5.632-1.802 6.848-4.475-.01-.013-1.002-3.33-4.836-4.54 1.48-3.774 2.37-6.93 2.452-7.227 1.637.893 2.982 2.377 3.737 4.195a14.773 14.773 0 0 0-1.898-1.08zm-7.683 20.08c-.027-.066-1.127-2.822-.194-6.425-3.328-.316-6.073.743-6.104.755A11.9 11.9 0 0 0 8.35 22.844c.007-.076-.445-1.458-.613-2.22zM2.08 15.347c.05-.015 2.26-.74 5.253-.53-.082.355-.7 3.197-.847 4.12A11.905 11.905 0 0 1 2.08 15.347z"/></svg>`,
  behance: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 10.7h-6v1.2h6v-1.2zm-12.8 1.8c.8 0 1.5-.4 1.8-1 .3-.6.3-1.4.3-2.1 0-1-.1-1.7-.4-2.3-.3-.6-.9-1-1.7-1H4.5v11.7h4.8c.9 0 1.6-.4 1.9-1.1.3-.7.3-1.5.3-2.3 0-1-.1-1.6-.3-2.2-.3-.5-.9-.8-1.6-.8zm-2.7-3.9h2.2c.7 0 1 .4 1 1.1s-.3 1.1-1 1.1H6.5V8.6zm2.2 6.2H6.5v-2.3h2.2c.7 0 1 .4 1 1.1s-.3 1.2-1 1.2zm11-4.7c-.8 0-1.5.3-2 1-.5.6-.8 1.5-.8 2.6H23c0-1.1-.3-2-.7-2.6-.5-.7-1.2-1-2.1-1zm-2.8 4.7c0 .6.2 1.1.6 1.5.4.4.9.6 1.6.6.6 0 1.1-.2 1.4-.5.4-.3.5-.8.6-1.4l-.1-.2c-.1-.1-.2-.2-.3-.3-.2-.1-.4-.2-.7-.2h-3.1zM12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z"/></svg>`,
  figma: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3 5.5a2.5 2.5 0 0 1 2.5-2.5H12v5H11.5A2.5 2.5 0 0 1 9 7.5zm0 5a2.5 2.5 0 0 1 2.5-2.5H12v5H11.5A2.5 2.5 0 0 1 9 12.5zm2.5 6.5A2.5 2.5 0 0 1 9 16.5a2.5 2.5 0 0 1 2.5-2.5h.5v2.5A2.5 2.5 0 0 1 11.5 19zm3.5-6.5a2.5 2.5 0 1 1-5 0v-5a2.5 2.5 0 0 1 5 0v5z"/></svg>`,
  "dev.to": `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM9.771 14.886H8.286v-1.99h1.485c.677 0 1.037.332 1.037.986V13.9c0 .654-.36 1.986-1.037 1.986zm5.829-1.99c0-.654-.36-.986-1.037-.986h-1.485v1.99h1.485c.677 0 1.037-.332 1.037-.986v-.018z"/></svg>`,
  gitlab: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.649 10.358l-1.41-4.338a.62.62 0 0 0-.222-.303.628.628 0 0 0-.374-.105.632.632 0 0 0-.371.127.604.604 0 0 0-.203.284L19.4 11.23H4.6L2.93 6.033a.626.626 0 0 0-.203-.284.629.629 0 0 0-.745-.022.617.617 0 0 0-.222.303L.351 10.358a.91.91 0 0 0 .079.743.957.957 0 0 0 .548.423l10.592 7.747 10.592-7.747a.952.952 0 0 0 .548-.423.91.91 0 0 0 .079-.743z"/></svg>`,
  "stack overflow": `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.986 21.865v-6.404h2.155v8.559H1.86v-8.559h2.155v6.404zm-14.7-4.148l10.307 2.146.435-2.106-10.306-2.147-.436 2.107zm1.258-4.631l9.539 4.384.907-1.968-9.539-4.385-.907 1.969zm2.493-4.15l7.986 6.812 1.409-1.652-7.987-6.811-1.408 1.651zm3.874-3.136l5.772 8.784 1.792-1.18-5.772-8.783-1.792 1.18zm5.022-2.1l3.076 10.024 2.062-.633-3.076-10.024-2.062.633z"/></svg>`,
  facebook: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`,
  website: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`,
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
        --content-width: ${contentWidths[siteSettings.contentWidth] || '1280px'};
    }

    html {
        font-size: ${siteSettings.fontSize === 'sm' ? '14px' : siteSettings.fontSize === 'lg' ? '18px' : '16px'};
    }

    html.dark { ${darkVars} }
    html.light { ${lightVars} }
    
    @media (prefers-color-scheme: dark) { html.system { ${darkVars} } }
    @media (prefers-color-scheme: light) { html.system { ${lightVars} } }

    /* BASE STYLES */
    body, h1, h2, h3, h4, h5, h6, input, textarea, button, select {
        font-family: var(--font-family);
        transition: background-color 0.3s, color 0.3s;
    }
    body {
        background-color: var(--color-background);
        color: var(--color-text);
        line-height: 1.6;
    }
    .container { max-width: var(--content-width); }
    h1, h2, h3, h4, h5, h6 { color: var(--color-heading); font-weight: 700; }
    a { color: var(--color-primary); text-decoration: none; transition: color 0.3s; }
    a:hover { color: var(--color-secondary); }
    
    /* CARD & NESTED CARD STYLES */
    .card {
      background-color: var(--color-card);
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
    
    /* Elegant nested card cleanup to solve double border/shadow issues */
    .card .card {
        background-color: rgba(0, 0, 0, 0.02) !important;
        border: 1px solid rgba(0, 0, 0, 0.04) !important;
        box-shadow: none !important;
        transform: none !important;
        padding: 1.25rem !important;
    }
    html.dark .card .card {
        background-color: rgba(255, 255, 255, 0.02) !important;
        border: 1px solid rgba(255, 255, 255, 0.04) !important;
    }
    .card .card:hover {
        transform: none !important;
        box-shadow: none !important;
        background-color: rgba(0, 0, 0, 0.03) !important;
    }
    html.dark .card .card:hover {
        background-color: rgba(255, 255, 255, 0.03) !important;
    }

    .skill-badge { background-color: var(--color-primary); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; }
    .section { padding-top: 3rem; padding-bottom: 3rem; }
    .section-title { color: var(--color-heading); font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 2.5rem; }
    
    /* SCROLL REVEAL STYLES */
    .scroll-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
    }
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* GLASSMORPHIC ACTIONS PANEL */
    #floating-actions button {
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
        cursor: pointer;
    }
    #floating-actions button:hover {
        background-color: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }

    /* PROJECT CARD FILTER ANIMATIONS */
    .project-card {
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .project-card.filtered-out {
        opacity: 0 !important;
        transform: scale(0.9) !important;
        position: absolute !important;
        width: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        overflow: hidden !important;
        pointer-events: none !important;
    }

    /* BACKDROP EFFECTS */
    .cyber-grid {
        background-size: 40px 40px;
        background-image: linear-gradient(to right, rgba(128, 90, 213, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(128, 90, 213, 0.05) 1px, transparent 1px);
    }
    html.dark .cyber-grid {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    }
    .dot-matrix {
        background-size: 24px 24px;
        background-image: radial-gradient(rgba(128, 90, 213, 0.08) 1px, transparent 1px);
    }
    html.dark .dot-matrix {
        background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    }

    @keyframes floatBlob1 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(100px, -80px) scale(1.15); }
        100% { transform: translate(-80px, 120px) scale(0.9); }
    }
    @keyframes floatBlob2 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-80px, 100px) scale(1.2); }
        100% { transform: translate(120px, -60px) scale(0.85); }
    }

    /* INTERACTIVE SKILL BADGES */
    .skill-badge {
        transition: all 0.3s ease;
    }
    .skill-badge:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 10px rgba(128, 90, 213, 0.2);
    }

    /* PRINT ONLY CV CONTAINER STYLING */
    .print-only-cv-container {
        display: none !important;
    }

    /* PRINT (PDF) STYLES */
    @media print {
        html, body {
            background-color: white !important;
            color: #1e293b !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        body {
            font-size: 10pt !important;
            margin: 1.2cm !important;
        }
        
        .digital-portfolio-layout, #floating-actions, .no-print, #contact, footer, button, .flex-shrink-0, #project-filters, #project-detail-modal {
            display: none !important;
        }
        
        .print-only-cv-container {
            display: block !important;
            background-color: white !important;
            color: #1e293b !important; /* Slate 800 */
            padding: 0 !important;
            margin: 0 !important;
            font-size: 10pt !important;
            line-height: 1.5 !important;
        }
        
        .cv-header {
            border-bottom: 2px solid #6366f1; /* Indigo 500 */
            padding-bottom: 1.25rem;
            margin-bottom: 1.5rem;
        }
        .cv-name {
            font-size: 24pt !important;
            font-weight: 800 !important;
            color: #0f172a !important; /* Slate 900 */
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 0.15rem 0 !important;
            line-height: 1.1 !important;
        }
        .cv-title {
            font-size: 13pt !important;
            font-weight: 600 !important;
            color: #4f46e5 !important; /* Indigo 600 */
            letter-spacing: 0.5px;
            margin: 0 0 0.75rem 0 !important;
            line-height: 1.2 !important;
        }
        .cv-contact {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1rem;
            font-size: 9pt !important;
            color: #475569 !important; /* Slate 600 */
            margin-top: 0.5rem;
        }
        .cv-contact-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        .cv-contact-item a {
            color: inherit !important;
            text-decoration: none !important;
        }
        .cv-section {
            margin-top: 1.5rem;
            page-break-inside: avoid;
        }
        .cv-section-title {
            font-size: 11pt !important;
            font-weight: 700 !important;
            color: #0f172a !important; /* Slate 900 */
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 1.5px solid #e2e8f0; /* Slate 200 */
            padding-bottom: 0.25rem;
            margin-bottom: 0.85rem;
        }
        .cv-grid {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .cv-item {
            page-break-inside: avoid;
        }
        .cv-item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.2rem;
        }
        .cv-item-title {
            font-size: 10.5pt !important;
            font-weight: 700 !important;
            color: #1e293b !important; /* Slate 800 */
        }
        .cv-item-subtitle {
            font-size: 10pt !important;
            font-weight: 600 !important;
            color: #4f46e5 !important; /* Indigo 600 */
        }
        .cv-item-date {
            font-size: 9pt !important;
            font-weight: 500 !important;
            color: #64748b !important; /* Slate 500 */
        }
        .cv-item-desc {
            font-size: 9.5pt !important;
            color: #475569 !important; /* Slate 600 */
            line-height: 1.5 !important;
        }
        .cv-skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .cv-skill-tag {
            background-color: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
            color: #334155 !important;
            padding: 0.15rem 0.5rem !important;
            border-radius: 4px !important;
            font-size: 8.5pt !important;
            font-weight: 500 !important;
        }
        .cv-projects-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem;
        }
        .cv-project-card {
            border: 1px solid #e2e8f0 !important;
            padding: 0.75rem !important;
            border-radius: 6px !important;
            background-color: #f8fafc !important;
            page-break-inside: avoid;
        }
        .cv-project-title {
            font-size: 10pt !important;
            font-weight: 700 !important;
            color: #0f172a !important;
            margin: 0 !important;
        }
        .cv-project-link {
            font-size: 8.5pt !important;
            color: #4f46e5 !important;
            text-decoration: underline !important;
        }
        .cv-project-desc {
            font-size: 8.5pt !important;
            color: #475569 !important;
            margin-top: 0.25rem !important;
            line-height: 1.4 !important;
        }
    }
    
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
const extractTags = (text: string): string[] => {
    const tags: string[] = [];
    const hashRegex = /#(\w+)/g;
    const bracketRegex = /\[([^\]]+)\]/g;
    
    let match;
    while ((match = hashRegex.exec(text)) !== null) {
        tags.push(match[1]);
    }
    while ((match = bracketRegex.exec(text)) !== null) {
        tags.push(match[1]);
    }
    
    return Array.from(new Set(tags.map(t => t.trim()))).filter(t => t.length > 0);
};

const renderProjects = (data: PortfolioData) => {
    if (data.projects.length === 0) return '';
    
    const enableFilters = data.siteSettings.enableProjectFilters ?? true;
    
    let allTagsSet = new Set<string>();
    const projectsWithTags = data.projects.map(p => {
        const tags = extractTags(p.description);
        tags.forEach(t => allTagsSet.add(t));
        return { ...p, tags };
    });
    
    const allTags = Array.from(allTagsSet);
    
    const filterButtonsHtml = (enableFilters && allTags.length > 0) ? `
    <div class="flex flex-wrap justify-center gap-2 mb-8 no-print" id="project-filters">
        <button class="project-filter-btn active px-4 py-1.5 rounded-full text-xs font-semibold border border-[var(--color-primary)] bg-[var(--color-primary)] text-white transition-all hover:scale-105 active:scale-95 duration-200" data-filter="all">All</button>
        ${allTags.map(tag => `
            <button class="project-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-300 dark:border-white/10 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all hover:scale-105 active:scale-95 duration-200" data-filter="${escape(tag.toLowerCase())}">${escape(tag)}</button>
        `).join('')}
    </div>
    ` : '';

    return `
    <section id="projects" class="section">
        <h2 class="section-title">${escape(data.projectsTitle)}</h2>
        ${filterButtonsHtml}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
            ${projectsWithTags.map(p => {
                const tagsAttr = p.tags.map(t => t.toLowerCase()).join(',');
                return `
                <div class="card flex flex-col project-card transition-all duration-300" data-tags="${escape(tagsAttr)}">
                    ${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.title)}" class="w-full h-48 object-cover rounded-t-lg mb-4">` : ''}
                    <div class="flex-grow">
                        <h3 class="text-xl font-bold mb-2 text-[var(--color-heading)]">${escape(p.title)}</h3>
                        <p class="text-base mb-4">${escape(p.description).replace(/\n/g, '<br>')}</p>
                    </div>
                    ${p.link ? `<a href="${escape(p.link)}" target="_blank" rel="noopener noreferrer" class="font-semibold mt-auto self-start">View Project &rarr;</a>` : ''}
                </div>
                `;
            }).join('')}
        </div>
    </section>
    `;
};
const renderExperience = (data: PortfolioData) => data.experience.length > 0 ? `<section id="experience" class="section"><h2 class="section-title">Experience</h2><div class="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-[var(--color-primary)]/30"><div class="pl-10 relative">${data.experience.map(exp => `<div class="mb-8"><div class="absolute -left-1.5 top-1 h-5 w-5 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]"></div><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(exp.role)}</h3><p class="text-lg font-medium text-[var(--color-secondary)]">${escape(exp.company)}</p><p class="text-sm text-gray-400 mb-2">${escape(exp.period)}</p><p>${escape(exp.description).replace(/\n/g, '<br>')}</p></div>`).join('')}</div></div></section>` : '';
const renderEducation = (data: PortfolioData) => data.education.length > 0 ? `<section id="education" class="section"><h2 class="section-title">Education</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">${data.education.map(edu => `<div class="card"><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(edu.degree)}</h3><p class="text-lg font-medium">${escape(edu.institution)}</p><p class="text-sm text-gray-400">${escape(edu.period)}</p></div>`).join('')}</div></section>` : '';
const renderTestimonials = (data: PortfolioData) => data.testimonials.length > 0 ? `<section id="testimonials" class="section"><h2 class="section-title">Testimonials</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">${data.testimonials.map(t => `<div class="card text-center"><p class="italic">"${escape(t.text)}"</p><p class="font-bold mt-4 text-[var(--color-heading)]">- ${escape(t.author)}</p></div>`).join('')}</div></section>` : '';
const renderCertifications = (data: PortfolioData) => data.certifications.length > 0 ? `<section id="certifications" class="section"><h2 class="section-title">Certifications</h2><div class="max-w-3xl mx-auto space-y-4">${data.certifications.map(c => `<div class="card flex justify-between items-center"><div class="flex-grow"><h3 class="font-bold text-[var(--color-heading)]">${escape(c.name)}</h3><p>${escape(c.authority)}</p></div><p class="text-sm text-gray-400">${escape(c.date)}</p></div>`).join('')}</div></section>` : '';
const renderFooter = (data: PortfolioData) => `<footer class="text-center py-8 mt-12 border-t border-gray-200/20"><div class="flex justify-center gap-6 mb-4">${data.socialLinks.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 text-gray-500 hover:text-[var(--color-primary)]" title="${escape(link.platform)}">${socialIconMap[link.platform.toLowerCase()] || escape(link.platform)}</a>`).join('')}</div><p>&copy; ${new Date().getFullYear()} ${escape(data.basicInfo.name)}. All rights reserved.</p><p style="font-size: 0.75rem; opacity: 0.6; margin-top: 0.5rem; letter-spacing: 0.05em;">Generated with <a href="https://github.com/dorukdogular/AutoPortfolio-Studio" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--color-primary); text-decoration: underline;">AutoPortfolio Studio</a> by <span style="font-weight: 600;">Doruk Doğular</span></p></footer>`;
const renderAllSections = (data: PortfolioData) => [renderSkills(data), renderProjects(data), renderExperience(data), renderEducation(data), renderTestimonials(data), renderCertifications(data), renderContactForm(data)].join('');

const renderPrintOnlyCV = (data: PortfolioData) => {
    const { basicInfo, skills, projects, experience, education, certifications, socialLinks, siteSettings } = data;
    
    // Contact list items
    const contactItems: string[] = [];
    if (basicInfo.email) {
        contactItems.push(`
            <div class="cv-contact-item">
                <svg style="width: 14px; height: 14px; color: #4f46e5; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                </svg>
                <span>${escape(basicInfo.email)}</span>
            </div>
        `);
    }
    
    const portfolioUrl = siteSettings.portfolioUrl || '';
    if (portfolioUrl) {
        contactItems.push(`
            <div class="cv-contact-item">
                <svg style="width: 14px; height: 14px; color: #4f46e5; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"></path>
                </svg>
                <a href="${escape(portfolioUrl)}" target="_blank" style="color: inherit; text-decoration: none;">${escape(portfolioUrl.replace(/^https?:\/\//, ''))}</a>
            </div>
        `);
    }

    socialLinks.forEach(link => {
        const platformName = escape(link.platform);
        const displayUrl = escape(link.url.replace(/^https?:\/\/(www\.)?/, ''));
        contactItems.push(`
            <div class="cv-contact-item">
                <span style="font-weight: 700; font-size: 8pt; color: #4f46e5; text-transform: uppercase; margin-right: 4px;">${platformName}:</span>
                <a href="${escape(link.url)}" target="_blank" style="color: inherit; text-decoration: none;">${displayUrl}</a>
            </div>
        `);
    });

    const contactSection = contactItems.length > 0 
        ? `<div class="cv-contact">${contactItems.join('')}</div>`
        : '';

    const summarySection = basicInfo.bio
        ? `
        <div class="cv-section">
            <h2 class="cv-section-title">Professional Summary</h2>
            <p class="cv-item-desc" style="font-size: 10pt !important; line-height: 1.6; color: #334155;">
                ${escape(basicInfo.bio).replace(/\n/g, '<br>')}
            </p>
        </div>
        `
        : '';

    const experienceItems = experience.map(exp => `
        <div class="cv-item">
            <div class="cv-item-header">
                <div>
                    <span class="cv-item-title">${escape(exp.role)}</span>
                    <span style="color: #cbd5e1; margin: 0 0.5rem;">|</span>
                    <span class="cv-item-subtitle">${escape(exp.company)}</span>
                </div>
                <span class="cv-item-date">${escape(exp.period)}</span>
            </div>
            <p class="cv-item-desc" style="margin-top: 0.35rem;">
                ${escape(exp.description).replace(/\n/g, '<br>')}
            </p>
        </div>
    `).join('');

    const experienceSection = experience.length > 0
        ? `
        <div class="cv-section">
            <h2 class="cv-section-title">Work Experience</h2>
            <div class="cv-grid">
                ${experienceItems}
            </div>
        </div>
        `
        : '';

    const projectItems = projects.map(p => `
        <div class="cv-project-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h3 class="cv-project-title">${escape(p.title)}</h3>
                ${p.link ? `<a href="${escape(p.link)}" class="cv-project-link" target="_blank">View Project</a>` : ''}
            </div>
            <p class="cv-project-desc">${escape(p.description).replace(/\n/g, '<br>')}</p>
        </div>
    `).join('');

    const projectsSection = projects.length > 0
        ? `
        <div class="cv-section">
            <h2 class="cv-section-title">Key Projects</h2>
            <div class="cv-projects-grid">
                ${projectItems}
            </div>
        </div>
        `
        : '';
    
    const skillsHtml = skills.length > 0
        ? `
        <div>
            <h2 class="cv-section-title" style="margin-top: 0;">Skills & Competencies</h2>
            <div class="cv-skills-list">
                ${skills.map(s => `<span class="cv-skill-tag">${escape(s)}</span>`).join('')}
            </div>
        </div>
        `
        : '';

    const educationHtml = education.length > 0
        ? `
        <div style="margin-bottom: 1.5rem;">
            <h2 class="cv-section-title" style="margin-top: 0;">Education</h2>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                ${education.map(edu => `
                    <div style="page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-weight: 700; color: #1e293b; font-size: 10pt;">${escape(edu.degree)}</span>
                            <span style="font-size: 9pt; color: #64748b; font-weight: 500;">${escape(edu.period)}</span>
                        </div>
                        <div style="color: #4f46e5; font-weight: 600; font-size: 9.5pt; margin-top: 0.1rem;">${escape(edu.institution)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        `
        : '';

    const certificationsHtml = certifications.length > 0
        ? `
        <div>
            <h2 class="cv-section-title" style="margin-top: 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem;">Certifications</h2>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${certifications.map(c => `
                    <div style="page-break-inside: avoid; display: flex; justify-content: space-between; align-items: baseline;">
                        <div style="flex-grow: 1;">
                            <span style="font-weight: 700; color: #1e293b; font-size: 9.5pt;">${escape(c.name)}</span>
                            <span style="color: #64748b; font-size: 9pt;"> - ${escape(c.authority)}</span>
                        </div>
                        <span style="font-size: 9pt; color: #64748b; font-weight: 500; flex-shrink: 0; margin-left: 0.5rem;">${escape(c.date)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        `
        : '';

    const eduAndCertsHtml = (education.length > 0 || certifications.length > 0)
        ? `
        <div>
            ${educationHtml}
            ${certificationsHtml}
        </div>
        `
        : '';

    const bottomGridSection = (skills.length > 0 || education.length > 0 || certifications.length > 0)
        ? `
        <div class="cv-section" style="page-break-inside: avoid;">
            <div style="display: grid; grid-template-columns: 4fr 5fr; gap: 2rem;">
                ${skillsHtml || '<div></div>'}
                ${eduAndCertsHtml || '<div></div>'}
            </div>
        </div>
        `
        : '';

    const qrCodeHtml = portfolioUrl
        ? `
        <div class="cv-qr-code" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(portfolioUrl)}" alt="QR Code" style="width: 70px; height: 70px; border: 1px solid #e2e8f0; padding: 2px; border-radius: 4px;">
            <span style="font-size: 7.5pt; color: #64748b; margin-top: 4px;">Scan to view online</span>
        </div>
        `
        : '';

    return `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; position: relative;">
            <!-- Header -->
            <div class="cv-header" style="position: relative; display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex-grow: 1; text-align: left; padding-right: 20px;">
                    <h1 class="cv-name">${escape(basicInfo.name)}</h1>
                    <p class="cv-title">${escape(basicInfo.title)}</p>
                    ${contactSection}
                </div>
                ${qrCodeHtml}
            </div>

            <!-- Body -->
            ${summarySection}
            ${experienceSection}
            ${projectsSection}
            ${bottomGridSection}
        </div>
    `;
};

// =================================================================================
// LAYOUT-SPECIFIC HTML & CSS
// =================================================================================
const allLayoutGenerators: Record<string, (data: PortfolioData) => string> = {
    'classic': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div>`,
    'minimal-split': data => `<div class="md:flex min-h-screen"><aside class="md:w-1/3 p-8 bg-[var(--color-card)] flex flex-col justify-center text-center md:sticky md:top-0 md:h-screen">${renderHeader(data)}</aside><main class="md:w-2/3 p-4 md:p-8"><div class="max-w-4xl mx-auto">${renderAllSections(data)}${renderFooter(data)}</div></main></div>`,
    'gallery-grid': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderSkills(data)}${renderProjects(data)}${renderExperience(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}${renderContactForm(data)}</main>${renderFooter(data)}</div>`,
    'timeline': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderExperience(data)}${renderSkills(data)}${renderProjects(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}${renderContactForm(data)}</main>${renderFooter(data)}</div>`,
    'centered-card': data => `<div class="min-h-screen flex items-center justify-center p-4"><div class="container bg-[var(--color-card)] rounded-xl shadow-2xl p-8 md:p-12"><header class="text-center mb-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div></div>`,
    'interactive-blocks': data => {
      const hasProjects = data.projects.length > 0;
      const hasSkills = data.skills.length > 0;
      const hasExperience = data.experience.length > 0;
      const hasContact = data.contactForm?.enabled;

      return `<div class="container mx-auto p-4 md:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <header class="lg:col-span-3 text-center card">${renderHeader(data)}</header>
          ${hasProjects ? `<div class="lg:col-span-2 card">${renderProjects(data)}</div>` : ''}
          ${hasSkills ? `<div class="card">${renderSkills(data)}</div>` : ''}
          ${hasExperience ? `<div class="lg:col-span-3 card">${renderExperience(data)}</div>` : ''}
          ${hasContact ? `<div class="lg:col-span-3 card">${renderContactForm(data)}</div>` : ''}
        </div>
        ${renderFooter(data)}
      </div>`;
    },
    'booklet': data => {
        const slides = [
            `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center text-center">${renderHeader(data)}</div>`,
            data.skills.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderSkills(data)}</div>` : '',
            data.projects.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderProjects(data)}</div>` : '',
            data.experience.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderExperience(data)}</div>` : '',
            data.education.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderEducation(data)}</div>` : '',
            data.testimonials.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderTestimonials(data)}</div>` : '',
            data.certifications.length > 0 ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderCertifications(data)}</div>` : '',
            data.contactForm?.enabled ? `<div class="max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center">${renderContactForm(data)}</div>` : ''
        ].filter(Boolean);

        return `<div class="flex snap-x snap-mandatory h-screen w-screen overflow-x-auto bg-[var(--color-background)]">
            ${slides.map(slide => `<section class="snap-start flex-shrink-0 w-screen h-screen overflow-y-auto py-16 px-4 md:px-8 bg-[var(--color-background)]">${slide}</section>`).join('')}
        </div>`;
    },
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
    'bento-grid': data => {
      const hasProjects = data.projects.length > 0;
      const hasSkills = data.skills.length > 0;
      const hasExperience = data.experience.length > 0;
      const hasEducation = data.education.length > 0;
      const hasCertifications = data.certifications.length > 0;
      const hasTestimonials = data.testimonials.length > 0;
      const hasContact = data.contactForm?.enabled;

      return `
      <div class="bento-theme min-h-screen p-4 md:p-8 bg-[var(--color-background)]">
        <div class="max-w-7xl mx-auto">
          <header class="mb-12 text-center bg-[var(--color-card)] p-12 rounded-[2rem] shadow-sm border border-[var(--color-text)]/5">${renderHeader(data)}</header>
          <main class="grid grid-cols-1 md:grid-cols-12 auto-rows-max gap-6">
            ${hasProjects ? `<div class="md:col-span-8 card !h-full flex flex-col">${renderProjects(data)}</div>` : ''}
            ${hasSkills ? `
            <div class="md:col-span-4 card !h-full relative overflow-hidden flex flex-col justify-center text-center">
              <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 z-0"></div>
              <div class="relative z-10">${renderSkills(data)}</div>
            </div>` : ''}
            ${hasExperience ? `<div class="md:col-span-6 card !h-full">${renderExperience(data)}</div>` : ''}
            ${(hasEducation || hasCertifications) ? `
            <div class="md:col-span-6 card !h-full flex flex-col justify-between">
              ${renderEducation(data)}
              ${hasCertifications ? `<div class="mt-8 pt-8 border-t border-[var(--color-text)]/10">${renderCertifications(data)}</div>` : ''}
            </div>` : ''}
            ${hasTestimonials ? `<div class="md:col-span-12 card">${renderTestimonials(data)}</div>` : ''}
            ${hasContact ? `<div class="md:col-span-12 card p-8 md:p-16">${renderContactForm(data)}</div>` : ''}
          </main>
          ${renderFooter(data)}
        </div>
      </div>`;
    },
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
  const formSettings = data.contactForm;
  const enableFilters = data.siteSettings.enableProjectFilters ?? true;

  let contactFormJs = '';

  if (hasContactForm && formSettings) {
    const successMsg = formSettings.successMessage || 'Thank you! Your message has been sent successfully.';
    contactFormJs = `
      // --- Contact Form Submission Handler ---
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
    `;
  }

  const coreScripts = `
    // --- Scroll Reveal Animations ---
    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('section, .card, header');
      animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    });

    // --- Theme Switcher & PDF Print logic ---
    document.addEventListener('DOMContentLoaded', () => {
      const html = document.documentElement;
      const toggleBtn = document.getElementById('theme-toggle-btn');
      const sunIcon = document.getElementById('theme-sun-icon');
      const moonIcon = document.getElementById('theme-moon-icon');
      const printBtn = document.getElementById('download-pdf-btn');

      const updateIcons = () => {
        if (html.classList.contains('dark')) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      };

      // Starting theme check
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        html.className = savedTheme;
      } else if (html.classList.contains('system')) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.className = systemPrefersDark ? 'dark' : 'light';
      }
      updateIcons();

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          if (html.classList.contains('dark')) {
            html.className = 'light';
            localStorage.setItem('portfolio-theme', 'light');
          } else {
            html.className = 'dark';
            localStorage.setItem('portfolio-theme', 'dark');
          }
          updateIcons();
        });
      }

      if (printBtn) {
        printBtn.addEventListener('click', () => {
          if (window.self !== window.top) {
            window.parent.postMessage({ type: 'print-portfolio' }, '*');
          } else {
            window.print();
          }
        });
      }
    });

    // --- Project Filtering ---
    document.addEventListener('DOMContentLoaded', () => {
      const filterContainer = document.getElementById('project-filters');
      if (filterContainer) {
        const filterBtns = filterContainer.querySelectorAll('.project-filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
              b.classList.remove('active', 'bg-[var(--color-primary)]', 'text-white', 'border-[var(--color-primary)]');
              b.classList.add('border-gray-300', 'dark:border-white/10', 'text-[var(--color-text)]');
            });
            
            btn.classList.add('active');
            btn.classList.remove('border-gray-300', 'dark:border-white/10', 'text-[var(--color-text)]');
            btn.classList.add('bg-[var(--color-primary)]', 'text-white', 'border-[var(--color-primary)]');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
              if (filter === 'all') {
                card.classList.remove('filtered-out');
              } else {
                const tags = card.getAttribute('data-tags') || '';
                const tagList = tags.split(',');
                if (tagList.includes(filter)) {
                  card.classList.remove('filtered-out');
                } else {
                  card.classList.add('filtered-out');
                }
              }
            });
          });
        });
      }
    });

    // --- Interactive Skills Tag Sync ---
    \${enableFilters ? \`
    document.addEventListener('DOMContentLoaded', () => {
      const skillBadges = document.querySelectorAll('#skills .skill-badge');
      skillBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.title = 'Click to filter projects by this skill';
        badge.addEventListener('click', () => {
          const skillName = badge.textContent.trim().toLowerCase();
          const filterBtn = document.querySelector('.project-filter-btn[data-filter="' + skillName + '"]');
          
          if (filterBtn) {
            filterBtn.click();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            const projectCards = document.querySelectorAll('.project-card');
            skillBadges.forEach(b => b.classList.remove('ring-2', 'ring-[var(--color-primary)]'));
            badge.classList.add('ring-2', 'ring-[var(--color-primary)]');
            
            projectCards.forEach(card => {
              const text = card.textContent.toLowerCase();
              if (text.includes(skillName)) {
                card.classList.remove('filtered-out');
              } else {
                card.classList.add('filtered-out');
              }
            });
            
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });
    \` : ''}

    // --- Premium Project Detail Modal ---
    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.createElement('div');
      modal.id = 'project-detail-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md hidden opacity-0 transition-opacity duration-300 no-print';
      modal.innerHTML = \`
        <div class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200/20 dark:border-white/10 shadow-2xl transform scale-95 transition-transform duration-300">
          <button id="modal-close-btn" class="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div id="modal-image-container" class="w-full h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
            <img id="modal-image" src="" alt="" class="w-full h-full object-cover">
          </div>
          <div class="p-6 md:p-8 space-y-4">
            <h3 id="modal-title" class="text-2xl font-extrabold text-[var(--color-heading)]"></h3>
            <div id="modal-tags" class="flex flex-wrap gap-2"></div>
            <p id="modal-description" class="text-sm md:text-base leading-relaxed text-[var(--color-text)] overflow-y-auto max-h-48"></p>
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-250/20">
              <a id="modal-link" href="" target="_blank" rel="noopener noreferrer" class="bg-[var(--color-primary)] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors text-sm shadow-md inline-flex items-center gap-2">
                <span>Visit Live Project</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>
              </a>
            </div>
          </div>
        </div>
      \`;
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('modal-close-btn');
      const closeModal = () => {
        modal.firstElementChild.classList.remove('scale-100');
        modal.firstElementChild.classList.add('scale-95');
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
      };

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          if (e.target.tagName === 'A' || e.target.closest('a')) return;
          
          const title = card.querySelector('h3').textContent;
          const desc = card.querySelector('p').innerHTML;
          const imgEl = card.querySelector('img');
          const imgSrc = imgEl ? imgEl.src : '';
          const linkEl = card.querySelector('a');
          const linkHref = linkEl ? linkEl.href : '#';
          const tags = card.getAttribute('data-tags') || '';
          
          document.getElementById('modal-title').textContent = title;
          document.getElementById('modal-description').innerHTML = desc;
          
          const modalImg = document.getElementById('modal-image');
          if (imgSrc) {
            modalImg.src = imgSrc;
            modalImg.classList.remove('hidden');
            document.getElementById('modal-image-container').classList.remove('hidden');
          } else {
            modalImg.classList.add('hidden');
            document.getElementById('modal-image-container').classList.add('hidden');
          }
          
          const linkBtn = document.getElementById('modal-link');
          if (linkHref && linkHref !== '#' && linkHref !== window.location.href) {
            linkBtn.href = linkHref;
            linkBtn.classList.remove('hidden');
          } else {
            linkBtn.classList.add('hidden');
          }
          
          const tagsContainer = document.getElementById('modal-tags');
          tagsContainer.innerHTML = '';
          if (tags) {
            tags.split(',').forEach(tag => {
              const span = document.createElement('span');
              span.className = 'px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-semibold rounded-full border border-gray-250/20';
              span.textContent = tag.toUpperCase();
              tagsContainer.appendChild(span);
            });
          }
          
          modal.classList.remove('hidden');
          modal.offsetHeight;
          modal.classList.remove('opacity-0');
          modal.classList.add('opacity-100');
          modal.firstElementChild.classList.remove('scale-95');
          modal.firstElementChild.classList.add('scale-100');
        });
      });
    });

    ${contactFormJs}
  `;

  return `
    <script id="portfolio-client-scripts">
      ${coreScripts}
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
    
    const ogTitle = siteSettings.ogTitle || `${data.basicInfo.name} | ${data.basicInfo.title || 'Personal Portfolio'}`;
    const ogDescription = siteSettings.ogDescription || data.basicInfo.bio || siteSettings.description || `Explore the personal portfolio of ${data.basicInfo.name}.`;
    const ogImage = siteSettings.ogImage || data.basicInfo.profileImage || '';
    const ogUrl = siteSettings.portfolioUrl || '';

    let analyticsHtml = '';
    if (siteSettings.analyticsId) {
        if (siteSettings.analyticsProvider === 'umami') {
            analyticsHtml = `
            <!-- Umami Analytics -->
            <script defer src="https://cloud.umami.is/script.js" data-website-id="${escape(siteSettings.analyticsId)}"></script>
            `;
        } else {
            analyticsHtml = `
            <!-- Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=${escape(siteSettings.analyticsId)}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${escape(siteSettings.analyticsId)}');
            </script>
            `;
        }
    }

    return `
        <!DOCTYPE html>
        <html lang="en" class="${themeMode}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escape(siteSettings.title)}</title>
            <meta name="description" content="${escape(siteSettings.description)}">
            
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:title" content="${escape(ogTitle)}">
            <meta property="og:description" content="${escape(ogDescription)}">
            ${ogImage ? `<meta property="og:image" content="${escape(ogImage)}">` : ''}
            ${ogUrl ? `<meta property="og:url" content="${escape(ogUrl)}">` : ''}
            
            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:title" content="${escape(ogTitle)}">
            <meta property="twitter:description" content="${escape(ogDescription)}">
            ${ogImage ? `<meta property="twitter:image" content="${escape(ogImage)}">` : ''}
            
            ${siteSettings.favicon ? `<link rel="icon" href="${siteSettings.favicon}">` : ''}
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=${siteSettings.fontFamily.replace(/ /g, '+')}:wght@400;500;700;900&display=swap" rel="stylesheet">
            ${generateCSS(data, theme)}
            ${analyticsHtml}
        </head>
        <body class="antialiased">
            ${siteSettings.backdropEffect === 'aurora' ? `
            <div class="aurora-bg no-print" style="position: fixed; inset: 0; z-index: -10; overflow: hidden; pointer-events: none; opacity: 0.6;">
                <div class="aurora-blob aurora-blob-1" style="position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.25; background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%); top: -200px; left: -200px; animation: floatBlob1 25s infinite alternate ease-in-out;"></div>
                <div class="aurora-blob aurora-blob-2" style="position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.25; background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%); bottom: -200px; right: -200px; animation: floatBlob2 30s infinite alternate ease-in-out;"></div>
            </div>
            ` : ''}
            ${siteSettings.backdropEffect === 'grid' ? `
            <div class="cyber-grid no-print" style="position: fixed; inset: 0; z-index: -10; pointer-events: none; opacity: 0.7;"></div>
            ` : ''}
            ${siteSettings.backdropEffect === 'dots' ? `
            <div class="dot-matrix no-print" style="position: fixed; inset: 0; z-index: -10; pointer-events: none; opacity: 0.7;"></div>
            ` : ''}
            ${siteSettings.portfolioUrl ? `
            <div class="print-qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(siteSettings.portfolioUrl)}" alt="QR Code">
                <span>Scan to view online</span>
            </div>
            ` : ''}
            <div class="digital-portfolio-layout">
                ${generateHTMLContent(data)}
            </div>
            
            <div class="print-only-cv-container">
                ${renderPrintOnlyCV(data)}
            </div>
            
            <!-- Floating Premium Glassmorphic Control Dock -->
            <div class="fixed bottom-6 right-6 flex items-center gap-2 z-50 no-print" id="floating-actions">
                <div class="flex items-center p-1.5 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/30 dark:border-white/10 shadow-2xl transition-all duration-300 hover:shadow-primary/10">
                    <!-- CV Export Button -->
                    <button id="download-pdf-btn" title="Export Portfolio as CV / PDF" class="flex items-center gap-2 px-4 py-2.5 rounded-full text-white hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border: none;">
                        <svg class="w-4.5 h-4.5 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                        </svg>
                        <span class="text-xs font-bold tracking-wide">Export CV</span>
                    </button>
                    
                    <!-- Vertical Divider -->
                    <div class="h-6 w-px bg-gray-350 dark:bg-white/10 mx-2" style="display: \${(siteSettings.enableThemeToggle ?? true) ? 'block' : 'none'};"></div>
                    
                    <!-- Theme Switcher Button -->
                    <button id="theme-toggle-btn" title="Toggle Theme" style="display: \${(siteSettings.enableThemeToggle ?? true) ? 'flex' : 'none'};" class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-105 active:scale-95 transition-all duration-200">
                        <svg id="theme-sun-icon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.95 4.95l1.58 1.58m10.95 10.95l1.58 1.58M3 12h2.25m13.5 0H21m-2.234-7.016l-1.58 1.58m-10.95 10.95l-1.58 1.58M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"></path>
                        </svg>
                        <svg id="theme-moon-icon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
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