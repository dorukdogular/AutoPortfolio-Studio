import React from 'react';
import type { PortfolioData } from '../../../types';
import { LAYOUTS } from '../../../constants';

interface LayoutTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const LayoutPreview = ({ layoutId }: { layoutId: string }) => {
  const baseClasses = "w-full h-16 bg-gray-700 rounded p-2 flex gap-1.5";
  
  // A map of layoutId to its preview component for better scalability
  const previews: { [key: string]: React.ReactNode } = {
    'classic': <div className={`${baseClasses} flex-col`}><div className="h-1/3 bg-gray-500 r-s w-full"></div><div className="h-2/3 bg-gray-500 r-s w-full"></div></div>,
    'minimal-split': <div className={`${baseClasses}`}><div className="w-1/3 h-full bg-gray-500 r-s"></div><div className="w-2/3 h-full bg-gray-500 r-s"></div></div>,
    'gallery-grid': <div className={`${baseClasses} flex-col`}><div className="h-1/4 bg-gray-500 r-s w-3/4 mx-auto"></div><div className="h-3/4 grid grid-cols-3 gap-1.5"><div className="bg-gray-500 r-s"></div><div className="bg-gray-500 r-s"></div><div className="bg-gray-500 r-s"></div></div></div>,
    'timeline': <div className={`${baseClasses} flex-col items-center`}><div className="h-1/4 bg-gray-500 r-s w-1/2"></div><div className="h-3/4 w-full flex items-center gap-2"><div className="w-1 h-full bg-gray-500 r-f"></div><div className="w-full h-full flex flex-col gap-1.5"><div className="h-1/3 w-full bg-gray-500 r-s"></div><div className="h-1/3 w-full bg-gray-500 r-s"></div><div className="h-1/3 w-full bg-gray-500 r-s"></div></div></div></div>,
    'top-nav': <div className={`${baseClasses} flex-col`}><div className="h-3 bg-gray-500 r-s w-full"></div><div className="h-1/3 bg-gray-500 r-s w-full mt-1.5"></div><div className="h-2/3 bg-gray-500 r-s w-full"></div></div>,
    'centered-card': <div className={`${baseClasses} items-center justify-center`}><div className="w-3/4 h-3/4 bg-gray-500 r-s"></div></div>,
    'interactive-blocks': <div className={`${baseClasses} flex-wrap`}><div className="w-full h-[30%] bg-gray-500 r-s"></div><div className="w-[calc(50%-3px)] h-[65%] bg-gray-500 r-s"></div><div className="w-[calc(50%-3px)] h-[65%] bg-gray-500 r-s"></div></div>,
    'booklet': <div className={`${baseClasses} items-center justify-center gap-0.5`}><div className="w-1/2 h-full bg-gray-500 r-s"></div><div className="w-1/2 h-full bg-gray-500 r-s"></div></div>,
    'material-resume': <div className={`${baseClasses} flex-col gap-1`}><div className="h-1/4 bg-gray-500 r-s w-full"></div><div className="h-3/4 bg-gray-600 r-s w-full p-1"><div className="bg-gray-500 w-full h-full r-s"></div></div></div>,
    'retro': <div className={`${baseClasses} border-2 border-gray-500`}><div className="w-full h-full border border-gray-500"></div></div>
  };

  return previews[layoutId] || null;
};

const LayoutTab: React.FC<LayoutTabProps> = ({ data, setData }) => {
  const handleLayoutChange = (layoutId: string) => {
    setData(prev => ({ ...prev, layoutId }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select a Page Layout</h3>
      <div className="grid grid-cols-2 gap-4">
        {LAYOUTS.map(layout => (
          <div
            key={layout.id}
            onClick={() => handleLayoutChange(layout.id)}
            className={`cursor-pointer p-3 rounded-lg border-2 flex flex-col gap-3 transition-all ${
              data.layoutId === layout.id
                ? 'border-indigo-500 scale-105 bg-gray-700/50'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <h4 className="font-semibold text-center text-sm">{layout.name}</h4>
            <LayoutPreview layoutId={layout.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutTab;