import React from 'react';
import type { PortfolioData } from '../../../types';
import { PlusIcon, TrashIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ data, setData }) => {
  const handleProjectChange = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addProject = () => {
    const newId = `proj${Date.now()}`;
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: newId, title: '', description: '', link: '', image: `https://picsum.photos/seed/${newId}/400/300` }]
    }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="space-y-4">
        <AnimatePresence>
            {data.projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-700 rounded-lg space-y-3 origin-top"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Project {index + 1}</h3>
                        <button onClick={() => removeProject(project.id)} className="text-red-400 hover:text-red-300">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    <textarea placeholder="Project Description" value={project.description} onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} rows={3} className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    <input type="text" placeholder="Project Link" value={project.link} onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)} className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    <input type="text" placeholder="Image URL (optional)" value={project.image} onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)} className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
            ))}
        </AnimatePresence>
      <button onClick={addProject} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
        <PlusIcon className="w-5 h-5" />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsTab;