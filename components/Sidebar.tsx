
import React from 'react';

const icons = [
  { id: 'select', path: 'M15.01 13.01l-4.24 4.24a1 1 0 01-1.42 0l-4.24-4.24a1 1 0 011.42-1.42L10 15.17l3.59-3.58a1 1 0 011.42 1.42z' },
  { id: 'add', path: 'M12 6v12m6-6H6' },
  { id: 'shape', path: 'M4 4h16v16H4z' },
  { id: 'text', path: 'M4 7V4h16v3M9 20h6M12 4v16' },
  { id: 'image', path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white/40 backdrop-blur-xl rounded-[24px] p-1.5 flex flex-col gap-1 border border-white/50 soft-shadow">
        {icons.map((item) => (
          <button
            key={item.id}
            className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white/80 transition-all text-gray-400 hover:text-blue-600 group relative"
          >
            <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.path} />
            </svg>
            <div className="absolute left-14 bg-black text-white text-[10px] py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-widest uppercase">
              {item.id}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
