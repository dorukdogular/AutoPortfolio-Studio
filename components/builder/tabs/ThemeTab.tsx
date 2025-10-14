import React from 'react';
import type { PortfolioData, Theme } from '../../../types';
import { SparklesIcon } from './Icons';

interface ThemeTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  themes: Theme[];
}

const ThemeTab: React.FC<ThemeTabProps> = ({ data, setData, themes }) => {
  const handleThemeChange = (themeId: string) => {
    setData(prev => ({ ...prev, themeId }));
  };

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
                <h4 className="font-bold">{theme.name}</h4>
                {theme.isAIGenerated && <SparklesIcon className="w-5 h-5 text-yellow-400" />}
            </div>
            <div className="flex justify-center gap-2">
              {Object.values(theme.light).map((color, index) => (
                <div key={index} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeTab;
