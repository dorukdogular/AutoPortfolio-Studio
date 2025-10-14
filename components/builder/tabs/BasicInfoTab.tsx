import React, { useCallback } from 'react';
import type { PortfolioData } from '../../../types';
import { XCircleIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface BasicInfoTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const Input = ({ label, value, onChange, name, placeholder, type = 'text' }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string, placeholder?: string, type?: string }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
    </div>
);

const Textarea = ({ label, value, onChange, name, placeholder }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, name: string, placeholder?: string }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
    </div>
);

const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ data, setData }) => {
    const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, [name]: value } }));
    };
    
    const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({...prev, [name]: value }));
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await fileToBase64(file);
            setData(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, profileImage: base64, profileImageFile: file } }));
        }
    };
    
    const handleSkillsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault();
            const newSkill = e.currentTarget.value.trim();
            if (!data.skills.includes(newSkill)) {
                setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            }
            e.currentTarget.value = '';
        }
    };
    
    const removeSkill = useCallback((skillToRemove: string) => {
        setData(prev => ({...prev, skills: prev.skills.filter(skill => skill !== skillToRemove)}));
    }, [setData]);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                <Input label="Your Name" name="name" value={data.basicInfo.name} onChange={handleBasicInfoChange} placeholder="e.g., Jane Doe" />
                <Input label="Your Title" name="title" value={data.basicInfo.title} onChange={handleBasicInfoChange} placeholder="e.g., Software Engineer" />
                <Input label="Contact Email" name="email" value={data.basicInfo.email} onChange={handleBasicInfoChange} placeholder="e.g., hello@example.com" type="email" />
                <Textarea label="Bio" name="bio" value={data.basicInfo.bio} onChange={handleBasicInfoChange} placeholder="Tell us a bit about yourself" />
                 <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image</label>
                     <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"/>
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Section Customization</h3>
                <Input label="Skills Section Title" name="skillsTitle" value={data.skillsTitle} onChange={handleSectionTitleChange} placeholder="e.g., My Skills" />
                <Input label="Projects Section Title" name="projectsTitle" value={data.projectsTitle} onChange={handleSectionTitleChange} placeholder="e.g., My Work" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{data.skillsTitle}</label>
                <input type="text" onKeyDown={handleSkillsChange} placeholder="Type an item and press Enter" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                <div className="flex flex-wrap gap-2 mt-2">
                    <AnimatePresence>
                        {data.skills.map(skill => (
                            <motion.span key={skill} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="flex items-center bg-gray-600 text-sm rounded-full px-3 py-1">
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 hover:text-white"><XCircleIcon className="w-4 h-4" /></button>
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default BasicInfoTab;