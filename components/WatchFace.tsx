import React from 'react';

interface WatchFaceProps {
  children: React.ReactNode;
  className?: string;
}

export const WatchFace: React.FC<WatchFaceProps> = ({ children, className = '' }) => {
  return (
    <div className="relative mx-auto w-[360px] h-[440px] bg-[#1c1c1e] rounded-[48px] border-[6px] border-[#3a3a3c] shadow-2xl flex items-center justify-center p-2 overflow-hidden ring-4 ring-orange-500/20">
      {/* Crown */}
      <div className="absolute -right-[12px] top-24 w-3 h-16 bg-[#c44900] rounded-r-md border-l border-gray-800 shadow-md"></div>
      {/* Side Button */}
      <div className="absolute -right-[10px] top-48 w-2 h-10 bg-[#3a3a3c] rounded-r-md shadow-sm"></div>
      
      {/* Screen */}
      <div className={`w-full h-full bg-black rounded-[40px] overflow-hidden relative flex flex-col ${className}`}>
        {children}
      </div>
    </div>
  );
};