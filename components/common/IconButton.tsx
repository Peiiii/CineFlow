
import React from 'react';

export type IconButtonVariant = 'ghost' | 'solid' | 'ai' | 'sidebar' | 'subtle';
export type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonRounded = 'full' | '10' | '12' | '14';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
  active?: boolean;
  className?: string;
  variant?: IconButtonVariant;
  rounded?: IconButtonRounded;
  size?: IconButtonSize;
  disabled?: boolean;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  title,
  active,
  className = '',
  variant = 'ghost',
  rounded = 'full',
  size = 'md',
  disabled,
  tooltipSide = 'top'
}) => {
  const baseClasses = "lov-btn icon-center transition-all duration-300 select-none flex-shrink-0 group relative";
  
  const variants = {
    ghost: "text-[#9BA3AF] hover:text-black hover:bg-gray-100/80",
    solid: "bg-black text-white shadow-lg shadow-black/10 active:scale-95 hover:bg-zinc-800",
    ai: "bg-[#E9F2FF] text-[#0066FF] hover:bg-[#DCEBFF] shadow-sm active:scale-95",
    sidebar: active 
      ? "bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] scale-100" 
      : "text-[#A0A0A0] hover:bg-[#F2F2F2] hover:text-black",
    subtle: "bg-white border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:scale-95"
  };

  const sizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
    xl: "w-11 h-11"
  };

  const radius = {
    full: "rounded-full",
    '10': "rounded-[10px]",
    '12': "rounded-[12px]",
    '14': "rounded-[14px]"
  };

  // 精确的容器定位映射
  const containerPos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  // 动画进入方向映射
  const entryAnim = {
    top: "translate-y-1 group-hover:translate-y-0",
    bottom: "-translate-y-1 group-hover:translate-y-0",
    left: "translate-x-1 group-hover:translate-x-0",
    right: "-translate-x-1 group-hover:translate-x-0"
  };

  // 箭头定位映射 (相对于黑盒)
  const arrowPos = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-[3px]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-[3px]",
    left: "left-full top-1/2 -translate-y-1/2 -ml-[3px]",
    right: "right-full top-1/2 -translate-y-1/2 -mr-[3px]"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${radius[rounded]} 
        ${className}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
    >
      <span className="flex items-center justify-center pointer-events-none">
        {icon}
      </span>

      {/* 增强型 Tooltip */}
      {title && (
        <div className={`
          absolute ${containerPos[tooltipSide]}
          z-[9999] pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-200 ease-out
          ${entryAnim[tooltipSide]}
        `}>
          <div className="bg-black text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl shadow-black/20 whitespace-nowrap relative">
            {title}
            {/* 像素级精确的小箭头 */}
            <div className={`
              absolute w-2 h-2 bg-black rotate-45
              ${arrowPos[tooltipSide]}
            `} />
          </div>
        </div>
      )}
    </button>
  );
};

export default IconButton;
