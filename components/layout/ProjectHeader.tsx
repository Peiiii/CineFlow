
import React from 'react';

const ProjectHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer hover:bg-[#F8F8F8] px-4 py-2.5 rounded-[20px] transition-all">
      <div className="w-[42px] h-[42px] bg-black rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-black/20">
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
      </div>
      <div className="flex items-center gap-2.5">
        <h1 className="text-[18px] font-black tracking-tight">未命名项目</h1>
        <svg className="w-4 h-4 text-[#D0D0D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M19 9l-7 7-7-7"/></svg>
      </div>
    </div>
  );
};

export default ProjectHeader;
