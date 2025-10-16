import React, { useState } from 'react';
import type { PortfolioData, Theme, ThemeColors } from '../../../types';
import { generateThemeFromImage } from '../../../services/geminiService';
import { SparklesIcon, PhotoIcon } from './Icons';

interface ThemeTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  themes: Theme[];
  addTheme: (theme: Omit<Theme, 'id'>) => void;
}

const DEFAULT_CUSTOM_THEME: Omit<Theme, 'id' | 'isAIGenerated'> = {
  name: '',
  light: { primary: '#6366f1', secondary: '#a78bfa', background: '#f8fafc', card: '#ffffff', text: '#374151', heading: '#111827' },
  dark: { primary: '#818cf8', secondary: '#c4b5fd', background: '#111827', card: '#1f2937', text: '#d1d5db', heading: '#f9fafb' },
};

const CustomThemeCreator: React.FC<{ onSave: (theme: Omit<Theme, 'id' | 'isAIGenerated'>) => void }> = ({ onSave }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [theme, setTheme] = useState(DEFAULT_CUSTOM_THEME);

    const handleColorChange = (colorName: keyof ThemeColors, value: string) => {
        setTheme(prev => ({
            ...prev,
            [mode]: { ...prev[mode], [colorName]: value }
        }));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(prev => ({...prev, name: e.target.value}));
    };
    
    const handleSave = () => {
        if (theme.name.trim()) {
            onSave(theme);
            setTheme(DEFAULT_CUSTOM_THEME);
        } else {
            alert("Please provide a name for your theme.");
        }
    }

    return (
        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg space-y-4">
            <input type="text" placeholder="Custom Theme Name" value={theme.name} onChange={handleNameChange} className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500" />
            <div className="flex bg-gray-600 rounded-md p-1">
                <button onClick={() => setMode('light')} className={`flex-1 py-1 rounded text-sm ${mode === 'light' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-500'}`}>Light</button>
                <button onClick={() => setMode('dark')} className={`flex-1 py-1 rounded text-sm ${mode === 'dark' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-500'}`}>Dark</button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(theme[mode]).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                        <label className="text-sm capitalize text-gray-300">{key}</label>
                        <input type="color" value={value} onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)} className="w-10 h-8 p-0 border-none rounded bg-transparent cursor-pointer" />
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className="w-full py-2 px-4 bg-green-600 rounded-md hover:bg-green-700 font-semibold">Save Custom Theme</button>
        </div>
    );
};


const ThemeTab: React.FC<ThemeTabProps> = ({ data, setData, themes, addTheme }) => {
  const [isGeneratingFromImage, setIsGeneratingFromImage] = useState(false);
  const [aiError, setAiError] = useState('');
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  const handleThemeChange = (themeId: string) => {
    setData(prev => ({ ...prev, themeId }));
  };
  
  const handleGenerateFromImage = async () => {
    if (!data.basicInfo.profileImage) {
        setAiError('Please upload a profile image in the "Basic Info" tab first.');
        return;
    }
    setIsGeneratingFromImage(true);
    setAiError('');
    try {
        const newTheme = await generateThemeFromImage(data.basicInfo.profileImage);
        addTheme({ ...newTheme, isAIGenerated: true });
    } catch(e) {
        setAiError('Failed to generate theme from image. Please check API key and try again.');
        console.error(e);
    } finally {
        setIsGeneratingFromImage(false);
    }
  };
  
  const ActionButton: React.FC<{ onClick: () => void; loading: boolean; disabled?: boolean; children: React.ReactNode; icon: React.ReactNode; }> = 
  ({ onClick, loading, disabled, children, icon }) => (
    <button
        onClick={onClick}
        disabled={loading || disabled}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed font-semibold"
    >
        {loading ? 'Generating...' : <>{icon} {children}</>}
    </button>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select a Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {themes.map(theme => (
          <div
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`cursor-pointer p-4 rounded-lg border-2 relative transition-all ${data.themeId === theme.id ? 'border-indigo-500 scale-105' : 'border-gray-600 hover:border-gray-500'}`}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
                <h4 className="font-bold text-sm text-center">{theme.name}</h4>
                {theme.isAIGenerated && <SparklesIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />}
            </div>
            <div className="flex justify-center gap-1.5">
              {Object.values(theme.light).slice(0,6).map((color, index) => (
                <div key={index} className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold">Create a New Theme</h3>
        <ActionButton onClick={handleGenerateFromImage} loading={isGeneratingFromImage} disabled={!data.basicInfo.profileImage} icon={<PhotoIcon className="w-5 h-5" />}>
          Generate from Image
        </ActionButton>
        {!data.basicInfo.profileImage && <p className="text-xs text-center text-gray-400">Upload a profile image in 'Basic Info' to enable this.</p>}
        {aiError && <p className="text-red-400 bg-red-900/50 p-2 rounded-md text-sm text-center">{aiError}</p>}
        
        <button onClick={() => setIsCreatingCustom(prev => !prev)} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-600 rounded-md hover:bg-gray-500 font-semibold">
          {isCreatingCustom ? 'Cancel' : 'Create Custom Theme'}
        </button>
      </div>

      {isCreatingCustom && (
        <CustomThemeCreator onSave={(customTheme) => {
            addTheme({ ...customTheme, isAIGenerated: false });
            setIsCreatingCustom(false);
        }} />
      )}
    </div>
  );
};

export default ThemeTab;