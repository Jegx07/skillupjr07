import React from 'react';

const LoadingIndicator: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
    <div className="relative flex items-center justify-center">
      <span className="block w-16 h-16 rounded-full border-4 border-t-4 border-t-primary border-border animate-spin-gradient" />
      <span className="absolute text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>⏳</span>
    </div>
    <span className="text-xl font-bold tracking-wide animate-fade-in bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
      {text}
    </span>
  </div>
);

export default LoadingIndicator;
// Add the following CSS to App.css:
// .animate-spin-gradient { animation: spin 1s linear infinite; border-top-color: #06b6d4; border-right-color: #818cf8; border-bottom-color: #a21caf; border-left-color: transparent; }
// @keyframes spin { 100% { transform: rotate(360deg); } } 