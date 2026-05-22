import React, { useState, useMemo, useRef } from 'react';
import type { PortfolioData, Theme, Tab, ExportData } from '../../types';
import { DEFAULT_THEMES, LAYOUTS } from '../../constants';
import PortfolioPreview from './preview/PortfolioPreview';
import BasicInfoTab from './tabs/BasicInfoTab';
import ProjectsTab from './tabs/ProjectsTab';
import SocialLinksTab from './tabs/SocialLinksTab';
import ThemeTab from './tabs/ThemeTab';
import LayoutTab from './tabs/LayoutTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import CertificationsTab from './tabs/CertificationsTab';
import SiteSettingsTab from './tabs/SiteSettingsTab';
import GitHubDeployModal from './GitHubDeployModal';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { generateFinalHtml } from '../../services/portfolioGenerator';
import { ArrowUpTrayIcon, ArrowDownTrayIcon, ArrowDownOnSquareIcon } from './tabs/Icons';

const BuilderPage: React.FC = () => {
  const [data, setData] = useState<PortfolioData>({
    basicInfo: { name: 'Jane Doe', title: 'Creative Professional', email: 'jane.doe@example.com', bio: 'A passionate individual creating amazing things.', profileImage: '' },
    skills: ['Web Design', 'Graphic Design', 'Project Management'],
    skillsTitle: 'My Skills',
    projects: [],
    projectsTitle: 'My Work',
    socialLinks: [{id: 'soc1', platform: 'GitHub', url: 'https://github.com/janedoe'}],
    experience: [],
    education: [],
    testimonials: [],
    certifications: [],
    themeId: 'indigo',
    layoutId: 'classic',
    siteSettings: { title: "Jane's Portfolio", description: 'My personal portfolio', favicon: '', fontFamily: 'Inter', colorScheme: 'light', fontSize: 'base', contentWidth: 'standard' },
    contactForm: { enabled: false, provider: 'web3forms', apiKey: '', buttonText: 'Send Message', successMessage: 'Thank you! Your message has been sent successfully.' },
    advancedCode: { customCss: '', customJs: '' }
  });

  const [themes, setThemes] = useState<Theme[]>(DEFAULT_THEMES);
  const [activeTab, setActiveTab] = useState<Tab>('Basic Info');
  const [isDeployModalOpen, setDeployModalOpen] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  const addTheme = (theme: Omit<Theme, 'id'>) => {
    const themeWithId: Theme = {
        ...theme,
        id: `${theme.isAIGenerated ? 'ai' : 'custom'}-${Date.now()}`,
    };
    setThemes(prev => [...prev, themeWithId]);
    setData(prev => ({...prev, themeId: themeWithId.id}));
    setActiveTab('Theme');
  };

  const selectedTheme = useMemo(() => themes.find(t => t.id === data.themeId) || themes[0], [themes, data.themeId]);

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    const htmlContent = generateFinalHtml(data, selectedTheme);
    zip.file("index.html", htmlContent);
    
    // Add .nojekyll to prevent Jekyll from processing and ignoring hidden folders/files
    zip.file(".nojekyll", "");

    // Add GitHub Actions deployment workflow
    const deployWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
    zip.file(".github/workflows/deploy.yml", deployWorkflow);

    // Add a helper README.md inside the zip
    const readmeContent = `# My Portfolio Website

This portfolio was designed and generated using **AutoPortfolio Studio**.

## 🚀 Instant Deployment to GitHub Pages

You can host this website online for free using GitHub Pages:

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new) and log in.
2. Create a new public repository. You can name it \`my-portfolio\` or \`your-username.github.io\`.
3. Do **not** check "Add a README file" or "Add .gitignore". Keep it empty.

### Step 2: Upload Your Files
1. Extract the downloaded \`portfolio.zip\` file.
2. Go to your new repository on GitHub.
3. Click on the link **"uploading an existing file"** (or click **"Add file" > "Upload files"**).
4. Drag and drop all the extracted files and folders (including \`index.html\`, \`.nojekyll\`, and the \`.github\` folder) into the browser.
5. Click **"Commit changes"** at the bottom of the page.

### Step 3: Enable GitHub Pages (Select One Method)

#### Method A: GitHub Actions (Recommended ⚡)
This repository contains a pre-configured GitHub Actions workflow that automates deployment.
1. In your GitHub repository, click on **Settings** (top tab bar).
2. In the left sidebar, click on **Pages**.
3. Under **Build and deployment** > **Source**, change the dropdown to **GitHub Actions**.
4. That's it! GitHub Actions will deploy your site. You can monitor the progress under the **Actions** tab.

#### Method B: Deploy from Branch (Classic 📂)
1. In your GitHub repository, click on **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, keep it as **Deploy from a branch**.
3. Under **Branch**, select \`main\` (or \`master\`) and click **Save**.
`;
    zip.file("README.md", readmeContent);

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "portfolio.zip");
  };

  const handleExportConfig = () => {
    const defaultThemeIds = new Set(DEFAULT_THEMES.map(t => t.id));
    const customThemes = themes.filter(t => !defaultThemeIds.has(t.id));
    
    const exportData: ExportData = {
      portfolioData: data,
      customThemes: customThemes,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    saveAs(blob, 'portfolio-config.json');
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const importedData: ExportData = JSON.parse(text);
        
        // Basic validation
        if (importedData.portfolioData && Array.isArray(importedData.customThemes)) {
          setData(importedData.portfolioData);
          setThemes([...DEFAULT_THEMES, ...importedData.customThemes]);
          alert('Configuration imported successfully!');
        } else {
          throw new Error('Invalid file structure.');
        }
      } catch (error) {
        console.error("Failed to import configuration:", error);
        alert('Failed to import configuration. Please make sure it is a valid portfolio config file.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input to allow re-uploading the same file
  };

  const tabs: Tab[] = ['Basic Info', 'Projects', 'Experience', 'Education', 'Testimonials', 'Certs', 'Socials', 'Layout', 'Theme', 'Settings'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Basic Info': return <BasicInfoTab data={data} setData={setData} />;
      case 'Projects': return <ProjectsTab data={data} setData={setData} />;
      case 'Experience': return <ExperienceTab data={data} setData={setData} />;
      case 'Education': return <EducationTab data={data} setData={setData} />;
      case 'Testimonials': return <TestimonialsTab data={data} setData={setData} />;
      case 'Certs': return <CertificationsTab data={data} setData={setData} />;
      case 'Socials': return <SocialLinksTab data={data} setData={setData} />;
      case 'Layout': return <LayoutTab data={data} setData={setData} />;
      case 'Theme': return <ThemeTab data={data} setData={setData} themes={themes} addTheme={addTheme} />;
      case 'Settings': return <SiteSettingsTab data={data} setData={setData} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-1/3 max-w-md h-full bg-gray-800 p-6 flex flex-col border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">AutoPortfolio Studio</h2>
        <div className="flex flex-wrap border-b border-gray-600 mb-4 -mx-6 px-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 text-sm font-medium transition-colors ${activeTab === tab ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-4">
          {renderTabContent()}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
            <div className="flex gap-4">
                <button onClick={handleImportClick} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors font-semibold">
                    <ArrowUpTrayIcon className="w-5 h-5" /> Import
                </button>
                <input type="file" ref={importInputRef} onChange={handleImportConfig} accept=".json" className="hidden" />
                <button onClick={handleExportConfig} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors font-semibold">
                    <ArrowDownTrayIcon className="w-5 h-5" /> Export
                </button>
            </div>
            <div className="flex gap-4">
                <button onClick={() => setDeployModalOpen(true)} className="flex-1 py-2 px-4 bg-green-600 rounded-md hover:bg-green-700 transition-colors font-semibold">
                    Deploy
                </button>
                <button onClick={handleDownloadZip} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors font-semibold">
                    <ArrowDownOnSquareIcon className="w-5 h-5" /> Download .zip
                </button>
            </div>
        </div>
      </aside>

      <main className="w-2/3 h-full p-6 bg-gray-900">
        <PortfolioPreview data={data} theme={selectedTheme} />
      </main>

      <GitHubDeployModal isOpen={isDeployModalOpen} onClose={() => setDeployModalOpen(false)} onDownloadRequest={handleDownloadZip} />
    </div>
  );
};

export default BuilderPage;