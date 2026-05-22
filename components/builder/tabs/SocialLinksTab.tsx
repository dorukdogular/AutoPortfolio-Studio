import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialLinksTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const POPULAR_PLATFORMS = [
  'GitHub',
  'LinkedIn',
  'Twitter',
  'X',
  'Instagram',
  'YouTube',
  'Medium',
  'Dribbble',
  'Behance',
  'Figma',
  'Dev.to',
  'GitLab',
  'Stack Overflow',
  'Facebook',
  'Website'
];

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
            {data.socialLinks.map(link => {
                const isPopular = POPULAR_PLATFORMS.includes(link.platform) || link.platform === '';
                const displaySelectValue = isPopular ? link.platform : 'custom';

                return (
                    <motion.div
                        key={link.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 bg-gray-700 rounded-lg flex items-start gap-3"
                    >
                        <div className="flex-1 flex flex-col gap-2">
                            <select
                                value={displaySelectValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === 'custom') {
                                        handleLinkChange(link.id, 'platform', 'Custom Platform');
                                    } else {
                                        handleLinkChange(link.id, 'platform', val);
                                    }
                                }}
                                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white text-sm"
                            >
                                <option value="">Select Platform</option>
                                {POPULAR_PLATFORMS.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                                <option value="custom">Custom...</option>
                            </select>
                            {!isPopular && (
                                <input
                                    type="text"
                                    placeholder="Platform Name (e.g., Pinterest)"
                                    value={link.platform === 'Custom Platform' ? '' : link.platform}
                                    onChange={(e) => handleLinkChange(link.id, 'platform', e.target.value)}
                                    className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white"
                                />
                            )}
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                            />
                        </div>
                        <button onClick={() => removeLink(link.id)} className="text-red-400 hover:text-red-300 p-2 mt-1">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </motion.div>
                );
            })}
        </AnimatePresence>
      <button onClick={addLink} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
        <PlusIcon className="w-5 h-5" />
        Add Link
      </button>
    </div>
  );
};

export default SocialLinksTab;