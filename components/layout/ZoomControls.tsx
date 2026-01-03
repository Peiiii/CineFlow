
import React from 'react';
import IconButton from '../common/IconButton';

interface ZoomControlsProps {
  zoom: number;
  onZoom: (delta: number) => void;
  onReset: () => void;
  onFit: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoom, onReset, onFit }) => {
  return (
    <div className="flex items-center bg-white rounded-full px-2 py-1.5 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] h-[52px] pointer-events-auto gap-0.5">
      <div className="flex items-center gap-0.5">
        <IconButton 
          onClick={() => onZoom(-5)}
          title="缩小"
          icon={<span className="text-2xl font-medium">−</span>}
        />
        <span className="text-[14px] font-bold text-black min-w-[46px] text-center select-none tracking-tight">
          {zoom}%
        </span>
        <IconButton 
          onClick={() => onZoom(5)}
          title="放大"
          icon={<span className="text-xl font-medium">+</span>}
        />
      </div>

      <div className="w-[1px] h-4 bg-[#E5E7EB] mx-1.5" />

      <div className="flex items-center gap-0.5">
        <IconButton 
          onClick={onReset}
          title="重置缩放 (100%)"
          icon={
            <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
        />
        <IconButton 
          onClick={onFit}
          title="自适应视图"
          icon={
            <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m10-6h4a2 2 0 012 2v4M9 21H5a2 2 0 01-2-2v-4m10 6h4a2 2 0 002-2v-4" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default ZoomControls;
