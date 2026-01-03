
import React from 'react';

interface ZoomControlsProps {
  zoom: number;
  onZoom: (delta: number) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoom }) => {
  return (
    <div className="flex items-center bg-white rounded-full px-2.5 py-1.5 border border-gray-100/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] h-[54px] pointer-events-auto">
      <button onClick={() => onZoom(-5)} className="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-xl transition-all">−</button>
      <span className="text-[14px] font-black text-black min-w-[64px] text-center select-none tracking-tight">{zoom}%</span>
      <button onClick={() => onZoom(5)} className="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-xl transition-all">+</button>
    </div>
  );
};

export default ZoomControls;
