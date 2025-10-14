import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialLinksTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const SocialLinksTab: React.FC<SocialLinksTabProps> = ({ data, setData }) => {
  const handleLinkChange = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
    }));
  };

  const addLink = () => {
    setData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: `soc${Date.now()}`, platform: '', url: '' }]
    }));
  };

  const removeLink = (id: string) => {
    setData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  return (
    <div className="space-y-4">
        <AnimatePresence>
            {data.socialLinks.map(link => (
                <motion.div
                    key={link.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-gray-700 rounded-lg flex items-center gap-3"
                >
                    <input
                        type="text"
                        placeholder="Platform (e.g., GitHub)"
                        value={link.platform}
                        onChange={(e) => handleLinkChange(link.id, 'platform', e.target.value)}
                        className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                        className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button onClick={() => removeLink(link.id)} className="text-red-400 hover:text-red-300 p-2">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </motion.div>
            ))}
        </AnimatePresence>
      <button onClick={addLink} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
        <PlusIcon className="w-5 h-5" />
        Add Link
      </button>
    </div>
  );
};

export default SocialLinksTab;