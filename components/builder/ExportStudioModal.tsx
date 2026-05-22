import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon, 
  XCircleIcon 
} from './tabs/Icons';

interface ExportStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  onOpenDeploy: () => void;
  onExportConfig: () => void;
  onPrintResume: () => void;
}

const ExportStudioModal: React.FC<ExportStudioModalProps> = ({ 
  isOpen, 
  onClose, 
  onDownloadZip, 
  onOpenDeploy, 
  onExportConfig,
  onPrintResume
}) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const cardVariants = {
    hover: { 
      scale: 1.02, 
      translateY: -4, 
      backgroundColor: "rgba(55, 65, 81, 0.7)",
      borderColor: "rgba(99, 102, 241, 0.4)",
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.15), 0 8px 10px -6px rgba(99, 102, 241, 0.15)"
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900/90 border border-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative overflow-hidden backdrop-blur-xl"
            variants={modalVariants}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glowing effects */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">Export Studio</span>
                <h2 className="text-3xl font-extrabold mt-2 text-white tracking-tight">Publish & Export Dashboard</h2>
                <p className="text-gray-400 mt-1 text-sm">Choose how you want to export or host your portfolio and resume.</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <XCircleIcon className="w-8 h-8" />
              </button>
            </div>

            {/* Grid options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 relative z-10">
              
              {/* Option 1: PDF CV Print */}
              <motion.div 
                className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => {
                  onPrintResume();
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors">Print Professional A4 CV / PDF</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Export a beautiful, minimalist CV resume optimized for standard A4 page layout. Removes website interactions, backgrounds, buttons, and contact forms for a high-quality printable document.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">ATS-Friendly Layout</span>
                  <button className="text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                    Print / Save PDF &rarr;
                  </button>
                </div>
              </motion.div>

              {/* Option 2: Static Website ZIP */}
              <motion.div 
                className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onClick={onDownloadZip}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">Download Static Site Package</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Generate and download a complete static HTML package (`.zip`) containing your optimized code, inline CSS, active contact form, scroll reveal logic, and mobile accessibility layers.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">Fast Load Package</span>
                  <button className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                    Download .ZIP &rarr;
                  </button>
                </div>
              </motion.div>

              {/* Option 3: GitHub Pages Host */}
              <motion.div 
                className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => {
                  onClose();
                  onOpenDeploy();
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">Publish Free on GitHub Pages</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Deploy your website online for free using GitHub Pages. Automated using pre-configured GitHub Actions. Step-by-step assistant will guide you to launching your own live global URL in under 2 minutes.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded">CI/CD Automated</span>
                  <button className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                    Launch Deployer &rarr;
                  </button>
                </div>
              </motion.div>

              {/* Option 4: Portfolyo Backup Config */}
              <motion.div 
                className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onClick={onExportConfig}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">Export Portfolio Config</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Download a portable JSON backup file (`.json`) containing all your basic profile information, projects details, layout structure, color scheme choices, and style values. Perfect for safe keeping or migrating.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">Portable Backup</span>
                  <button className="text-xs font-semibold bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                    Download JSON &rarr;
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Modal Footer Info */}
            <div className="bg-gray-800/20 border border-gray-800 rounded-2xl p-4 flex items-center gap-3 relative z-10">
              <div className="text-indigo-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.97-8.97L19.5 12l-8.97 8.97z"></path>
                </svg>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Pro Tip:</strong> Printing to PDF generates the cleanest ATS-compliant resume layout because it strips away all non-content background layers and renders high-density vector text. Set your layout to **Material Resume** or **Classic** for the absolute best print output!
              </p>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportStudioModal;
