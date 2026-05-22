
import React, { useState, useEffect, useRef } from 'react';
import type { PortfolioData, Theme } from '../../../types';
import { generatePreviewHtml } from '../../../services/portfolioGenerator';

interface PortfolioPreviewProps {
  data: PortfolioData;
  theme: Theme;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data, theme }) => {
    const [htmlSrcDoc, setHtmlSrcDoc] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const html = generatePreviewHtml(data, theme);
        setHtmlSrcDoc(html);
    }, [data, theme]);

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data && e.data.type === 'print-portfolio') {
                const iframe = iframeRef.current;
                if (iframe && iframe.contentWindow) {
                    try {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                    } catch (err) {
                        console.error('Iframe print failed, falling back to window print:', err);
                        window.print();
                    }
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

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
                ref={iframeRef}
                srcDoc={htmlSrcDoc}
                title="Portfolio Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals allow-same-origin"
            />
        </div>
    );
};

export default PortfolioPreview;
