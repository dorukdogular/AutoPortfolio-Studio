import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircleIcon } from './tabs/Icons';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadRequest: () => void;
}

const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose, onDownloadRequest }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 border border-gray-700 relative"
            variants={modalVariants}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">Deploy to GitHub Pages</h2>
            <p className="text-gray-300 mb-6">
              Follow these steps to publish your portfolio online for free.
            </p>

            <ol className="list-decimal list-inside space-y-4 text-gray-200">
              <li>
                <strong>Download Your Portfolio:</strong> First, you need the generated website files.
                <button 
                  onClick={() => {
                      onDownloadRequest();
                      onClose();
                  }}
                  className="ml-4 px-4 py-1 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors text-sm font-semibold"
                >
                  Download .zip
                </button>
              </li>
              <li>
                <strong>Create a GitHub Repository:</strong> Go to GitHub and create a new public repository. Name it something like{' '}
                <code>your-username.github.io</code> or <code>my-portfolio</code>.
                <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="block mt-1 text-indigo-400 hover:underline">
                  Create New Repository &rarr;
                </a>
              </li>
              <li>
                <strong>Upload Your Files:</strong> Unzip the downloaded file. In your new GitHub repository, click on "Add file" &gt; "Upload files" and drag all the unzipped files and folders (including <code>index.html</code>, <code>.nojekyll</code>, and the <code>.github</code> folder) into the uploader, then commit the changes.
              </li>
              <li>
                <strong>Enable GitHub Pages:</strong> In your repository, go to "Settings" &gt; "Pages".
                <div className="mt-3 pl-4 border-l-2 border-indigo-500/40 space-y-3 text-sm text-gray-300">
                  <div>
                    <span className="font-semibold text-indigo-400">Method A: GitHub Actions (Recommended ⚡)</span>
                    <p className="mt-0.5">Under "Build and deployment" &gt; "Source", select <strong>GitHub Actions</strong>. The pre-configured workflow in your upload will automatically build and publish your site!</p>
                  </div>
                  <div>
                    <span className="font-semibold text-indigo-400">Method B: Classic (Deploy from branch)</span>
                    <p className="mt-0.5">Under "Build and deployment" &gt; "Source", select <strong>Deploy from a branch</strong>. Then under "Branch", select <code>main</code> (or <code>master</code>) and click "Save".</p>
                  </div>
                </div>
              </li>
               <li>
                <strong>You're Live!</strong> Once deployment is complete, your site will be available at{' '}
                <code>https://your-username.github.io/your-repo-name/</code>.
              </li>
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GitHubDeployModal;