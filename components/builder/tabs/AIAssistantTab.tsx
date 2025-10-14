

import React, { useState } from 'react';
// FIX: Import the shared Tab type.
import type { PortfolioData, Theme, Layout, Tab } from '../../../types';
import { generateBio, suggestProjects, generateTheme, suggestLayout } from '../../../services/geminiService';
import { SparklesIcon } from './Icons';

interface AIAssistantTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  addTheme: (theme: Omit<Theme, 'id' | 'isAIGenerated'>) => void;
  layouts: Layout[];
  // FIX: Update prop type to match the state setter from useState.
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const AIAssistantTab: React.FC<AIAssistantTabProps> = ({ data, setData, addTheme, layouts, setActiveTab }) => {
    const [isLoading, setIsLoading] = useState({
        bio: false,
        projects: false,
        theme: false,
        layout: false,
    });
    const [error, setError] = useState('');

    const handleGenerateBio = async () => {
        setIsLoading(prev => ({ ...prev, bio: true }));
        setError('');
        try {
            const newBio = await generateBio(data.basicInfo.name, data.basicInfo.title, data.skills);
            setData(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, bio: newBio } }));
        } catch (err) {
            setError('Failed to generate bio. Please check your API key and try again.');
        } finally {
            setIsLoading(prev => ({ ...prev, bio: false }));
        }
    };
    
    const handleSuggestProjects = async () => {
        setIsLoading(prev => ({ ...prev, projects: true }));
        setError('');
        try {
            const suggested = await suggestProjects(data.basicInfo.name, data.basicInfo.title, data.skills);
            const newProjects = suggested.map(p => ({ id: `proj${Date.now()}${Math.random()}`, ...p, image: p.image || `https://picsum.photos/seed/${Date.now()}${Math.random()}/400/300`, link: '' }));
            setData(prev => ({ ...prev, projects: [...prev.projects, ...newProjects] }));
        } catch (err) {
            setError('Failed to suggest projects. Please check your API key.');
        } finally {
            setIsLoading(prev => ({ ...prev, projects: false }));
        }
    };
    
    const handleGenerateTheme = async () => {
        setIsLoading(prev => ({ ...prev, theme: true }));
        setError('');
        try {
            const newTheme = await generateTheme();
            addTheme(newTheme);
        } catch (err) {
            setError('Failed to generate theme. Please check your API key.');
        } finally {
            setIsLoading(prev => ({ ...prev, theme: false }));
        }
    };

    const handleSuggestLayout = async () => {
        setIsLoading(prev => ({ ...prev, layout: true }));
        setError('');
        try {
            const suggestedLayoutId = await suggestLayout(data.basicInfo.bio, data.basicInfo.title, layouts);
            setData(prev => ({ ...prev, layoutId: suggestedLayoutId }));
            setActiveTab('Layout'); // Switch to the Layout tab
        } catch (err) {
            setError('Failed to suggest a layout. Please check your API key.');
        } finally {
            setIsLoading(prev => ({ ...prev, layout: false }));
        }
    };
    
    const Button = ({ onClick, loading, children }: { onClick: () => void, loading: boolean, children: React.ReactNode }) => (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed font-semibold"
        >
            {loading ? 'Generating...' : <><SparklesIcon className="w-5 h-5" /> {children}</>}
        </button>
    );

    return (
        <div className="space-y-6">
             <h3 className="text-lg font-semibold text-center">AI Content Tools</h3>
             {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-sm">{error}</p>}
             <div className="space-y-4">
                {/* FIX: The Button component requires a 'children' prop for its content. Added text content as children. */}
                <Button onClick={handleGenerateBio} loading={isLoading.bio}>Write My Bio</Button>
                {/* FIX: The Button component requires a 'children' prop for its content. Added text content as children. */}
                <Button onClick={handleSuggestProjects} loading={isLoading.projects}>Suggest Projects</Button>
                {/* FIX: The Button component requires a 'children' prop for its content. Added text content as children. */}
                <Button onClick={handleGenerateTheme} loading={isLoading.theme}>Create a New Theme</Button>
                {/* FIX: The Button component requires a 'children' prop for its content. Added text content as children. */}
                <Button onClick={handleSuggestLayout} loading={isLoading.layout}>Suggest a Layout</Button>
             </div>
        </div>
    );
};

export default AIAssistantTab;
