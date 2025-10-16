import React, { useState, useMemo, useRef } from 'react';
import type { PortfolioData, Theme, Tab, ExportData } from '../../types';
import { DEFAULT_THEMES, LAYOUTS } from '../../constants';
import PortfolioPreview from './preview/PortfolioPreview';
import BasicInfoTab from './tabs/BasicInfoTab';
import ProjectsTab from './tabs/ProjectsTab';
import SocialLinksTab from './tabs/SocialLinksTab';
import ThemeTab from './tabs/ThemeTab';
import AIAssistantTab from './tabs/AIAssistantTab';
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

  const tabs: Tab[] = ['Basic Info', 'Projects', 'Experience', 'Education', 'Testimonials', 'Certs', 'Socials', 'Layout', 'Theme', 'Settings', 'AI Assistant'];

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
      case 'AI Assistant': return <AIAssistantTab data={data} setData={setData} addTheme={addTheme} layouts={LAYOUTS} setActiveTab={setActiveTab} />;
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