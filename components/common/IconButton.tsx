
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

  // Tooltip 位置逻辑
  const tooltipPos = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2"
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

      {/* 自定义 Tooltip */}
      {title && (
        <div className={`
          absolute ${tooltipPos[tooltipSide]}
          px-2 py-1 bg-black text-white text-[10px] font-bold rounded-md
          opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-200 pointer-events-none whitespace-nowrap z-[100]
          shadow-xl
        `}>
          {title}
          {/* 小三角 */}
          <div className={`
            absolute w-1.5 h-1.5 bg-black rotate-45
            ${tooltipSide === 'top' ? 'top-full -mt-[3px] left-1/2 -translate-x-1/2' : ''}
            ${tooltipSide === 'bottom' ? 'bottom-full -mb-[3px] left-1/2 -translate-x-1/2' : ''}
          `} />
        </div>
      )}
    </button>
  );
};

export default IconButton;
