import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const EducationTab: React.FC<EducationTabProps> = ({ data, setData }) => {
  const handleItemChange = (id: string, field: string, value: string) => {
    setData(prev => ({ ...prev, education: prev.education.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, education: [...prev.education, { id: `edu${Date.now()}`, institution: '', degree: '', period: '' }] }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(p => p.id !== id) }));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {data.education.map((item, index) => (
          <motion.div
            key={item.id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, overflow: 'hidden' }} transition={{ duration: 0.3 }}
            className="p-4 bg-gray-700 rounded-lg space-y-3 origin-top"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Education #{index + 1}</h3>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon className="w-5 h-5" /></button>
            </div>
            <input type="text" placeholder="Institution" value={item.institution} onChange={(e) => handleItemChange(item.id, 'institution', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Degree / Certificate" value={item.degree} onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Period (e.g., 2018 - 2022)" value={item.period} onChange={(e) => handleItemChange(item.id, 'period', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
        <PlusIcon className="w-5 h-5" /> Add Education
      </button>
    </div>
  );
};

export default EducationTab;