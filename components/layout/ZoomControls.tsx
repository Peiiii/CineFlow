
import React from 'react';

interface ZoomControlsProps {
  zoom: number;
  onZoom: (delta: number) => void;
  onReset: () => void;
  onFit: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoom, onReset, onFit }) => {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-1.5 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] h-[54px] pointer-events-auto gap-1">
      {/* 缩放区 */}
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onZoom(-5)} 
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#9BA3AF] hover:text-black hover:bg-gray-50 transition-all font-medium text-2xl"
        >
          −
        </button>
        <span className="text-[15px] font-bold text-black min-w-[50px] text-center select-none tracking-tight">
          {zoom}%
        </span>
        <button 
          onClick={() => onZoom(5)} 
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#9BA3AF] hover:text-black hover:bg-gray-50 transition-all font-medium text-xl"
        >
          +
        </button>
      </div>

      {/* 分割线 */}
      <div className="w-[1px] h-5 bg-[#E5E7EB] mx-2" />

      {/* 操作区 */}
      <div className="flex items-center gap-1">
        {/* 重置图标 (Rotate Back) */}
        <button 
          onClick={onReset}
          title="重置缩放"
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#9BA3AF] hover:text-black hover:bg-gray-50 transition-all"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* 自适应图标 (Fit Corners) */}
        <button 
          onClick={onFit}
          title="适应屏幕"
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#9BA3AF] hover:text-black hover:bg-gray-50 transition-all"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m10-6h4a2 2 0 012 2v4M9 21H5a2 2 0 01-2-2v-4m10 6h4a2 2 0 002-2v-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ZoomControls;
