
import React from 'react';

const AgentHeader: React.FC = () => {
  const tools = [
    'M12 4v16m8-8H4', 
    'M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z', 
    'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    'M5 12h14'
  ];

  return (
    <div className="px-8 pt-8 pb-3 flex items-center justify-end gap-2">
      {tools.map((d, i) => (
        <button key={i} className="lov-btn icon-center text-[#9A9A9A] hover:text-black hover:bg-[#F2F2F2] w-8 h-8 rounded-[10px]">
          <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default AgentHeader;
