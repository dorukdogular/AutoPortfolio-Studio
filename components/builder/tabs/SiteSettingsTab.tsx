
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

    // Safe Defaults for new fields
    const contactForm = data.contactForm || {
        enabled: false,
        provider: 'web3forms',
        apiKey: '',
        buttonText: 'Send Message',
        successMessage: 'Thank you! Your message has been sent successfully.',
    };

    const advancedCode = data.advancedCode || {
        customCss: '',
        customJs: '',
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            contactForm: {
                ...(prev.contactForm || contactForm),
                [name]: value,
            }
        }));
    };

    const handleContactToggle = () => {
        setData(prev => ({
            ...prev,
            contactForm: {
                ...(prev.contactForm || contactForm),
                enabled: !(prev.contactForm?.enabled ?? false),
            }
        }));
    };

    const handleAdvancedCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            advancedCode: {
                ...(prev.advancedCode || advancedCode),
                [name]: value,
            }
        }));
    };

    return (
        <div className="space-y-6 pb-8">
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
                <Select label="Font Family" name="fontFamily" value={data.siteSettings.fontFamily} onChange={handleChange}>
                    {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                </Select>
                <Select label="Color Scheme" name="colorScheme" value={data.siteSettings.colorScheme} onChange={handleChange}>
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </Select>
                 <Select label="Font Size" name="fontSize" value={data.siteSettings.fontSize} onChange={handleChange}>
                    <option value="sm">Small</option>
                    <option value="base">Medium</option>
                    <option value="lg">Large</option>
                </Select>
                <Select label="Content Width" name="contentWidth" value={data.siteSettings.contentWidth} onChange={handleChange}>
                    <option value="standard">Standard</option>
                    <option value="wide">Wide</option>
                    <option value="full">Full Width</option>
                </Select>
            </div>

            {/* Static Contact Form Section */}
            <div className="border-t border-gray-750 pt-6">
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 flex items-center justify-between mb-4">
                    <div>
                        <h4 className="font-semibold text-white">Enable Contact Form</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Let visitors email you directly from your static site</p>
                    </div>
                    <button
                        onClick={handleContactToggle}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            contactForm.enabled ? 'bg-indigo-600' : 'bg-gray-600'
                        }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                contactForm.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {contactForm.enabled && (
                    <div className="space-y-4 bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 animate-fadeIn">
                        <div>
                            <label htmlFor="provider" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Form Provider</label>
                            <select
                                id="provider"
                                name="provider"
                                value={contactForm.provider}
                                onChange={handleContactChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="web3forms">Web3Forms (Easiest - Free Key Needed)</option>
                                <option value="formspree">Formspree (Form ID / Custom Endpoint)</option>
                            </select>
                            <p className="text-xxs text-gray-400 mt-1">
                                {contactForm.provider === 'web3forms' ? (
                                    <span>Get a free Access Key instantly at <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">web3forms.com</a> (requires no registration).</span>
                                ) : (
                                    <span>Get a free Form ID instantly at <a href="https://formspree.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">formspree.io</a>.</span>
                                )}
                            </p>
                        </div>

                        <div>
                            <label htmlFor="apiKey" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                {contactForm.provider === 'web3forms' ? 'Web3Forms Access Key' : 'Formspree Form ID'}
                            </label>
                            <input
                                type="text"
                                id="apiKey"
                                name="apiKey"
                                value={contactForm.apiKey}
                                onChange={handleContactChange}
                                placeholder={contactForm.provider === 'web3forms' ? 'e.g., 00000000-0000-0000-0000-000000000000' : 'e.g., mqkvwzrd'}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="buttonText" className="block text-xs text-gray-300 mb-1">Submit Button Label</label>
                                <input
                                    type="text"
                                    id="buttonText"
                                    name="buttonText"
                                    value={contactForm.buttonText}
                                    onChange={handleContactChange}
                                    placeholder="e.g., Send Message"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="successMessage" className="block text-xs text-gray-300 mb-1">Success Toast Message</label>
                                <input
                                    type="text"
                                    id="successMessage"
                                    name="successMessage"
                                    value={contactForm.successMessage}
                                    onChange={handleContactChange}
                                    placeholder="Thank you message..."
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom CSS / Custom JS Injection Section */}
            <div className="border-t border-gray-750 pt-6">
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Advanced / Developer Settings</h3>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="customCss" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            Custom CSS Style Injection
                        </label>
                        <textarea
                            id="customCss"
                            name="customCss"
                            value={advancedCode.customCss}
                            onChange={handleAdvancedCodeChange}
                            placeholder="/* Type custom CSS overrides here. e.g., .my-card { box-shadow: 0 10px 15px rgba(0,0,0,0.5); } */"
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                        />
                        <p className="text-xxs text-gray-400 mt-1">This styling code overrides the layout themes and runs live in the preview pane.</p>
                    </div>

                    <div>
                        <label htmlFor="customJs" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            Custom JS Code Injection
                        </label>
                        <textarea
                            id="customJs"
                            name="customJs"
                            value={advancedCode.customJs}
                            onChange={handleAdvancedCodeChange}
                            placeholder="// Type custom Javascript code here. e.g., console.log('Portfolio Loaded!');"
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                        />
                        <p className="text-xxs text-gray-400 mt-1">Use this to inject analytics scripts, cookies/toasts, or widgets. Embedded at the bottom of the body tag.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteSettingsTab;
