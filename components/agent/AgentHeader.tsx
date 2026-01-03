
import React from 'react';

const AgentHeader: React.FC = () => {
  const tools = [
    { id: 'plus', d: 'M12 5v14m-7-7h14' }, 
    { id: 'eye', d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' }, 
    { id: 'circle', d: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' },
    { id: 'minus', d: 'M5 12h14' }
  ];

  return (
    <div className="px-8 pt-8 pb-3 flex items-center justify-end gap-1.5">
      {tools.map((t) => (
        <button key={t.id} className="lov-btn icon-center text-[#9A9A9A] hover:text-black hover:bg-[#F2F2F2] w-9 h-9 rounded-[10px] transition-colors">
          <svg className="w-[18px] h-[18px] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d={t.d} />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default AgentHeader;
