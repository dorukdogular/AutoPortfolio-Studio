
import React, { useState, useEffect } from 'react';
import type { PortfolioData, Theme } from '../../../types';
import { generatePreviewHtml } from '../../../services/portfolioGenerator';

interface PortfolioPreviewProps {
  data: PortfolioData;
  theme: Theme;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data, theme }) => {
    const [htmlSrcDoc, setHtmlSrcDoc] = useState('');

    useEffect(() => {
        const html = generatePreviewHtml(data, theme);
        setHtmlSrcDoc(html);
    }, [data, theme]);

    return (
        <div className="w-full h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-4 py-2 flex items-center">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-grow text-center text-sm text-gray-300">
                    Live Preview
                </div>
            </div>
            <iframe
                srcDoc={htmlSrcDoc}
                title="Portfolio Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
            />
        </div>
    );
};

export default PortfolioPreview;
