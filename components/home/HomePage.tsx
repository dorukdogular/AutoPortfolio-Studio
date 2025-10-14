

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../common/Logo';
import { SparklesIcon, CodeBracketIcon, PaintBrushIcon, ArrowDownOnSquareIcon } from '../builder/tabs/Icons';

interface HomePageProps {
  onStartBuilding: () => void;
}

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <motion.div 
        className="bg-white/5 p-6 rounded-lg border border-white/10"
        whileHover={{ y: -5, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-indigo-500/20 p-2 rounded-md text-indigo-400">{icon}</div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300">{children}</p>
    </motion.div>
);


const HomePage: React.FC<HomePageProps> = ({ onStartBuilding }) => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 animate-gradient-bg bg-[length:200%_200%] opacity-40"></div>
        <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"></div>

        <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Logo className="h-24 w-24 mb-4 text-indigo-400" />
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            AutoPortfolio Studio
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            The AI-powered portfolio generator that builds, writes, and designs for you. Go from zero to a deployed portfolio in minutes.
          </p>
          <motion.button
            onClick={onStartBuilding}
            className="px-8 py-4 bg-indigo-600 rounded-lg text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building for Free
          </motion.button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
            <motion.h2 
                className="text-4xl font-extrabold text-center mb-12"
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                Everything You Need, Nothing You Don't
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* FIX: The FeatureCard component requires a 'children' prop for its content. Added text content as children. */}
                <FeatureCard icon={<SparklesIcon className="w-6 h-6"/>} title="AI-Powered Content">Let AI write your bio, suggest project ideas, and even create unique color themes for you.</FeatureCard>
                {/* FIX: The FeatureCard component requires a 'children' prop for its content. Added text content as children. */}
                <FeatureCard icon={<CodeBracketIcon className="w-6 h-6"/>} title="Versatile Layouts">Choose from 9+ professionally designed, fully responsive layouts to match your style.</FeatureCard>
                {/* FIX: The FeatureCard component requires a 'children' prop for its content. Added text content as children. */}
                <FeatureCard icon={<PaintBrushIcon className="w-6 h-6"/>} title="Deep Customization">Fine-tune fonts, colors, spacing, and more. Or just pick a theme and go.</FeatureCard>
                {/* FIX: The FeatureCard component requires a 'children' prop for its content. Added text content as children. */}
                <FeatureCard icon={<ArrowDownOnSquareIcon className="w-6 h-6"/>} title="One-Click Export">Download your entire production-ready website as a clean, simple .zip file.</FeatureCard>
            </div>
        </div>
      </div>
      
       {/* How It Works Section */}
       <div className="py-20 px-4 bg-gray-800/50">
           <div className="max-w-4xl mx-auto text-center">
               <h2 className="text-4xl font-extrabold mb-12">Just 3 Steps to a Live Portfolio</h2>
               <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
                   <div className="flex-1">
                       <div className="text-5xl font-bold text-indigo-400 mb-2">1</div>
                       <h3 className="text-2xl font-bold mb-2">Add Your Info</h3>
                       <p className="text-gray-300">Fill in your name, title, skills, projects, and social links. Or, let our AI do it for you.</p>
                   </div>
                   <div className="text-indigo-400/50 text-2xl hidden md:block">&rarr;</div>
                   <div className="flex-1">
                       <div className="text-5xl font-bold text-indigo-400 mb-2">2</div>
                       <h3 className="text-2xl font-bold mb-2">Customize Design</h3>
                       <p className="text-gray-300">Pick a layout, choose a color theme, select a font, and watch your site update in real-time.</p>
                   </div>
                   <div className="text-indigo-400/50 text-2xl hidden md:block">&rarr;</div>
                   <div className="flex-1">
                       <div className="text-5xl font-bold text-indigo-400 mb-2">3</div>
                       <h3 className="text-2xl font-bold mb-2">Download & Deploy</h3>
                       <p className="text-gray-300">Export your complete site and follow our simple guide to host it online for free.</p>
                   </div>
               </div>
           </div>
       </div>

       {/* Final CTA Section */}
       <div className="py-20 px-4 text-center border-t border-white/10">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Build Your Portfolio?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">No accounts, no credit cards, no hassle. Just a beautiful portfolio, in minutes.</p>
             <motion.button
                onClick={onStartBuilding}
                className="px-8 py-4 bg-indigo-600 rounded-lg text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Start Building Now
            </motion.button>
       </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm bg-gray-900">
        <div className="flex justify-center items-center gap-4">
            <p>© Doruk Doğular 2025</p>
            <a href="https://github.com/dorukdogular" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                <span>dorukdogular</span>
            </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
