
import React from 'react';

const CanvasPlaceholder: React.FC = () => {
  return (
    <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center select-none">
      <div className="w-[380px] h-[380px] text-[#F9F9F9] relative flex items-center justify-center">
        {/* 场记板 SVG 图标 */}
        <svg className="w-full h-full opacity-80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
        </svg>
        {/* 核心弥散渐变卡片 */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[140px] bg-gradient-to-br from-[#FF9D4D] via-[#BD5AFF] to-[#00C2FF] rounded-[28px] shadow-2xl shadow-blue-500/10 border-[3px] border-white/50" />
      </div>
      <p className="text-center font-black tracking-[1em] -mt-5 text-[#F0F0F0] text-[16px] uppercase">
        Ready to shoot
      </p>
    </div>
  );
};

export default CanvasPlaceholder;
