import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ data, setData }) => {
  const handleItemChange = (id: string, field: string, value: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, experience: [...prev.experience, { id: `exp${Date.now()}`, role: '', company: '', period: '', description: '' }] }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(p => p.id !== id) }));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {data.experience.map((item, index) => (
          <motion.div
            key={item.id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, overflow: 'hidden' }} transition={{ duration: 0.3 }}
            className="p-4 bg-gray-700 rounded-lg space-y-3 origin-top"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Experience #{index + 1}</h3>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon className="w-5 h-5" /></button>
            </div>
            <input type="text" placeholder="Role / Title" value={item.role} onChange={(e) => handleItemChange(item.id, 'role', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Company" value={item.company} onChange={(e) => handleItemChange(item.id, 'company', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Period (e.g., 2020 - Present)" value={item.period} onChange={(e) => handleItemChange(item.id, 'period', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="Description" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} rows={3} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
        <PlusIcon className="w-5 h-5" /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceTab;