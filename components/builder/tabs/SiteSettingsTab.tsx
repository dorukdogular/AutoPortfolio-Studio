
import React from 'react';
import type { PortfolioData, SiteSettings } from '../../../types';
import { GOOGLE_FONTS } from '../../../constants';

interface SiteSettingsTabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const Input = ({ label, name, value, onChange, placeholder }: { label: string, name: keyof SiteSettings, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input type="text" id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
    </div>
);

const Select = ({ label, name, value, onChange, children }: { label: string, name: keyof SiteSettings, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            {children}
        </select>
    </div>
);

const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


const SiteSettingsTab: React.FC<SiteSettingsTabProps> = ({ data, setData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            siteSettings: {
                ...prev.siteSettings,
                [name]: value,
            },
        }));
    };

    const handleFaviconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await fileToBase64(file);
            setData(prev => ({ ...prev, siteSettings: { ...prev.siteSettings, favicon: base64 } }));
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Meta Information</h3>
                <Input label="Site Title" name="title" value={data.siteSettings.title} onChange={handleChange} placeholder="e.g., Jane Doe's Portfolio" />
                <Input label="Site Description" name="description" value={data.siteSettings.description} onChange={handleChange} placeholder="A short description for search engines" />
                 <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Favicon</label>
                     <input type="file" accept="image/png, image/x-icon, image/svg+xml" onChange={handleFaviconChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"/>
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Appearance</h3>
                {/* FIX: The Select component requires a 'children' prop. Added option elements as children. */}
                <Select label="Font Family" name="fontFamily" value={data.siteSettings.fontFamily} onChange={handleChange}>
                    {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                </Select>
                {/* FIX: The Select component requires a 'children' prop. Added option elements as children. */}
                <Select label="Color Scheme" name="colorScheme" value={data.siteSettings.colorScheme} onChange={handleChange}>
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </Select>
                 {/* FIX: The Select component requires a 'children' prop. Added option elements as children. */}
                 <Select label="Font Size" name="fontSize" value={data.siteSettings.fontSize} onChange={handleChange}>
                    <option value="sm">Small</option>
                    <option value="base">Medium</option>
                    <option value="lg">Large</option>
                </Select>
                {/* FIX: The Select component requires a 'children' prop. Added option elements as children. */}
                <Select label="Content Width" name="contentWidth" value={data.siteSettings.contentWidth} onChange={handleChange}>
                    <option value="standard">Standard</option>
                    <option value="wide">Wide</option>
                    <option value="full">Full Width</option>
                </Select>
            </div>
        </div>
    );
};

export default SiteSettingsTab;
