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
    `;
};

// =================================================================================
// REUSABLE SECTION RENDERERS
// =================================================================================

const renderHeader = (data: PortfolioData) => `
    ${data.basicInfo.profileImage ? `<img src="${data.basicInfo.profileImage}" alt="Profile" class="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 border-4 border-[var(--color-primary)] object-cover shadow-lg">` : ''}
    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--color-heading)]">${escape(data.basicInfo.name)}</h1>
    <p class="text-xl md:text-2xl text-[var(--color-secondary)] mt-2 font-medium">${escape(data.basicInfo.title)}</p>
    <p class="mt-4 max-w-3xl mx-auto text-lg">${escape(data.basicInfo.bio).replace(/\n/g, '<br>')}</p>
    <a href="mailto:${escape(data.basicInfo.email)}" class="mt-6 inline-block bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-lg hover:bg-[var(--color-secondary)] transition-colors text-lg shadow-md">
        Contact Me
    </a>
`;
const renderSkills = (data: PortfolioData) => data.skills.length > 0 ? `<section id="skills" class="section"><h2 class="section-title">${escape(data.skillsTitle)}</h2><div class="flex flex-wrap justify-center gap-3">${data.skills.map(skill => `<span class="skill-badge">${escape(skill)}</span>`).join('')}</div></section>` : '';
const renderProjects = (data: PortfolioData) => data.projects.length > 0 ? `<section id="projects" class="section"><h2 class="section-title">${escape(data.projectsTitle)}</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${data.projects.map(p => `<div class="card flex flex-col">${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.title)}" class="w-full h-48 object-cover rounded-t-lg mb-4">` : ''}<div class="flex-grow"><h3 class="text-xl font-bold mb-2 text-[var(--color-heading)]">${escape(p.title)}</h3><p class="text-base mb-4">${escape(p.description).replace(/\n/g, '<br>')}</p></div>${p.link ? `<a href="${escape(p.link)}" target="_blank" rel="noopener noreferrer" class="font-semibold mt-auto self-start">View Project &rarr;</a>` : ''}</div>`).join('')}</div></section>` : '';
const renderExperience = (data: PortfolioData) => data.experience.length > 0 ? `<section id="experience" class="section"><h2 class="section-title">Experience</h2><div class="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-[var(--color-primary)]/30"><div class="pl-10 relative">${data.experience.map(exp => `<div class="mb-8"><div class="absolute -left-1.5 top-1 h-5 w-5 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]"></div><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(exp.role)}</h3><p class="text-lg font-medium text-[var(--color-secondary)]">${escape(exp.company)}</p><p class="text-sm text-gray-400 mb-2">${escape(exp.period)}</p><p>${escape(exp.description).replace(/\n/g, '<br>')}</p></div>`).join('')}</div></div></section>` : '';
const renderEducation = (data: PortfolioData) => data.education.length > 0 ? `<section id="education" class="section"><h2 class="section-title">Education</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">${data.education.map(edu => `<div class="card"><h3 class="text-xl font-bold text-[var(--color-heading)]">${escape(edu.degree)}</h3><p class="text-lg font-medium">${escape(edu.institution)}</p><p class="text-sm text-gray-400">${escape(edu.period)}</p></div>`).join('')}</div></section>` : '';
const renderTestimonials = (data: PortfolioData) => data.testimonials.length > 0 ? `<section id="testimonials" class="section"><h2 class="section-title">Testimonials</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">${data.testimonials.map(t => `<div class="card text-center"><p class="italic">"${escape(t.text)}"</p><p class="font-bold mt-4 text-[var(--color-heading)]">- ${escape(t.author)}</p></div>`).join('')}</div></section>` : '';
const renderCertifications = (data: PortfolioData) => data.certifications.length > 0 ? `<section id="certifications" class="section"><h2 class="section-title">Certifications</h2><div class="max-w-3xl mx-auto space-y-4">${data.certifications.map(c => `<div class="card flex justify-between items-center"><div class="flex-grow"><h3 class="font-bold text-[var(--color-heading)]">${escape(c.name)}</h3><p>${escape(c.authority)}</p></div><p class="text-sm text-gray-400">${escape(c.date)}</p></div>`).join('')}</div></section>` : '';
const renderFooter = (data: PortfolioData) => `<footer class="text-center py-8 mt-12 border-t border-gray-200/20"><div class="flex justify-center gap-6 mb-4">${data.socialLinks.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 text-gray-500 hover:text-[var(--color-primary)]" title="${escape(link.platform)}">${socialIconMap[link.platform.toLowerCase()] || escape(link.platform)}</a>`).join('')}</div><p>&copy; ${new Date().getFullYear()} ${escape(data.basicInfo.name)}. All rights reserved.</p></footer>`;
const renderAllSections = (data: PortfolioData) => [renderSkills(data), renderProjects(data), renderExperience(data), renderEducation(data), renderTestimonials(data), renderCertifications(data)].join('');

// =================================================================================
// LAYOUT-SPECIFIC HTML & CSS
// =================================================================================
const allLayoutGenerators: Record<string, (data: PortfolioData) => string> = {
    'classic': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div>`,
    'minimal-split': data => `<div class="md:flex min-h-screen"><aside class="md:w-1/3 p-8 bg-[var(--color-card)] flex flex-col justify-center text-center md:sticky md:top-0 md:h-screen">${renderHeader(data)}</aside><main class="md:w-2/3 p-4 md:p-8"><div class="max-w-4xl mx-auto">${renderAllSections(data)}${renderFooter(data)}</div></main></div>`,
    'gallery-grid': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderSkills(data)}${renderProjects(data).replace('lg:grid-cols-3', 'lg:grid-cols-3') /* Ensure 3 cols */}${renderExperience(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}</main>${renderFooter(data)}</div>`,
    'timeline': data => `<div class="container mx-auto p-4 md:p-8"><header class="text-center py-12">${renderHeader(data)}</header><main>${renderExperience(data)}${renderSkills(data)}${renderProjects(data)}${renderEducation(data)}${renderTestimonials(data)}${renderCertifications(data)}</main>${renderFooter(data)}</div>`,
    'centered-card': data => `<div class="min-h-screen flex items-center justify-center p-4"><div class="container bg-[var(--color-card)] rounded-xl shadow-2xl p-8 md:p-12"><header class="text-center mb-12">${renderHeader(data)}</header><main>${renderAllSections(data)}</main>${renderFooter(data)}</div></div>`,
    'interactive-blocks': data => `<div class="container mx-auto p-4 md:p-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><header class="lg:col-span-3 text-center card">${renderHeader(data)}</header><div class="lg:col-span-2 card">${renderProjects(data)}</div><div class="card">${renderSkills(data)}</div><div class="lg:col-span-3 card">${renderExperience(data)}</div></div>${renderFooter(data)}</div>`,
    'booklet': data => `<div class="flex snap-x snap-mandatory h-screen w-screen overflow-x-auto"><section class="snap-start flex-shrink-0 w-screen h-screen flex flex-col justify-center text-center p-8">${renderHeader(data)}</section>${[renderSkills, renderProjects, renderExperience, renderEducation].map(f => `<section class="snap-start flex-shrink-0 w-screen h-screen flex flex-col justify-center p-8">${f(data)}</section>`).join('')}</div>`,
    'material-resume': data => `<div class="container mx-auto p-4 md:p-8 max-w-4xl"><div class="card"><header class="text-center p-8">${renderHeader(data)}</header><main class="p-8">${renderAllSections(data)}</main>${renderFooter(data)}</div></div>`,
    'retro': data => {
        const c1 = "text-cyan-400";
        const c2 = "text-fuchsia-400";
        const c3 = "text-amber-400";
        const c4 = "text-green-400";
        const val = (v: string) => `<span class="text-white">"${escape(v)}"</span>`;

        const renderText = (content: string) => `<div class="pl-4 border-l border-gray-700">${escape(content).replace(/\n/g, '<br>')}</div>`;

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
</code></pre>${renderFooter(data)}</div></div>`;
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
    `
};

const generateHTMLContent = (data: PortfolioData) => {
    const generator = allLayoutGenerators[data.layoutId] || allLayoutGenerators['classic'];
    return generator(data);
};

const generateLayoutSpecificCSS = (layoutId: string) => allLayoutCSS[layoutId] || '';

// =================================================================================
// FINAL HTML ASSEMBLY
// =================================================================================

export const generateFinalHtml = (data: PortfolioData, theme: Theme): string => {
    const { siteSettings } = data;
    const themeMode = siteSettings.colorScheme === 'system' ? 'system' : siteSettings.colorScheme;
    
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
        </body>
        </html>
    `;
}

export const generatePreviewHtml = (data: PortfolioData, theme: Theme): string => {
    // For preview, we can inject a script to prevent links from working
    const finalHtml = generateFinalHtml(data, theme);
    const previewScript = `<script>document.addEventListener('click', e => e.preventDefault(), true);</script></body>`;
    return finalHtml.replace('</body>', previewScript);
};