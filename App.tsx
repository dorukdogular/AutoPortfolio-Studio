
import React, { useState } from 'react';
import HomePage from './components/home/HomePage';
import BuilderPage from './components/builder/BuilderPage';

function App() {
  const [isBuilding, setIsBuilding] = useState(false);

  const startBuilding = () => {
    setIsBuilding(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {isBuilding ? (
        <BuilderPage />
      ) : (
        <HomePage onStartBuilding={startBuilding} />
      )}
    </div>
  );
}

export default App;
