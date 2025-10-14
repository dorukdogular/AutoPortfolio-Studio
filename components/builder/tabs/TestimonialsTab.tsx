import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const TestimonialsTab: React.FC<TestimonialsTabProps> = ({ data, setData }) => {
  const handleItemChange = (id: string, field: 'author' | 'text', value: string) => {
    setData(prev => ({ ...prev, testimonials: prev.testimonials.map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, testimonials: [...prev.testimonials, { id: `test${Date.now()}`, author: '', text: '' }] }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(item => item.id !== id) }));
  };

  return (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
      <AnimatePresence>
        {data.testimonials.map((item, index) => (
          <motion.div
            key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="p-4 bg-gray-700 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Testimonial #{index + 1}</h3>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon className="w-5 h-5" /></button>
            </div>
            <input type="text" placeholder="Author" value={item.author} onChange={(e) => handleItemChange(item.id, 'author', e.target.value)} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2" />
            <textarea placeholder="Testimonial Text" value={item.text} onChange={(e) => handleItemChange(item.id, 'text', e.target.value)} rows={3} className="w-full bg-gray-600 border-gray-500 rounded-md px-3 py-2" />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700">
        <PlusIcon className="w-5 h-5" /> Add Testimonial
      </button>
    </div>
  );
};

export default TestimonialsTab;
