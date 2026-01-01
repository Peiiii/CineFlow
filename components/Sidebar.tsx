
import React from 'react';

interface SidebarProps {
  onToolClick?: (id: string) => void;
}

const tools = [
  { id: 'cursor', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5' },
  { id: 'plus', icon: 'M12 4v16m8-8H4' },
  { id: 'square', icon: 'M4 4h16v16H4z' },
  { id: 'text', icon: 'M4 7V4h16v3M9 20h6M12 4v16' },
  { id: 'pen', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { id: 'image', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'play', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' }
];

const Sidebar: React.FC<SidebarProps> = ({ onToolClick }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-2 flex flex-col gap-2">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => onToolClick?.(t.id)}
            className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all active:scale-95"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
