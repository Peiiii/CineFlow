
import React, { useState, useRef, useEffect } from 'react';

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
  tooltipSide
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [realSide, setRealSide] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

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

  // 智能计算弹出方向
  const updateDirection = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const defaultSide = tooltipSide || (variant === 'sidebar' ? 'right' : 'top');
    
    let side = defaultSide;

    // 边界检测逻辑
    if (side === 'top' && rect.top < 80) side = 'bottom';
    if (side === 'bottom' && window.innerHeight - rect.bottom < 80) side = 'top';
    if (side === 'left' && rect.left < 80) side = 'right';
    if (side === 'right' && window.innerWidth - rect.right < 80) side = 'left';

    setRealSide(side);
  };

  // 定位映射
  const containerPos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5"
  };

  const entryAnim = {
    top: "translate-y-1 group-hover:translate-y-0",
    bottom: "-translate-y-1 group-hover:translate-y-0",
    left: "translate-x-1 group-hover:translate-x-0",
    right: "-translate-x-1 group-hover:translate-x-0"
  };

  const arrowStyles = {
    top: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(-50%) rotate(45deg)', marginTop: '-1px' },
    bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(50%) rotate(45deg)', marginBottom: '-1px' },
    left: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(-50%) rotate(45deg)', marginLeft: '-1px' },
    right: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(50%) rotate(45deg)', marginRight: '-1px' }
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={updateDirection}
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

      {title && (
        <div className={`
          absolute ${containerPos[realSide]}
          z-[9999] pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-200 ease-out
          ${entryAnim[realSide]}
        `}>
          <div className="bg-black text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-2xl shadow-black/40 whitespace-nowrap relative">
            {title}
            <div 
              className="absolute w-2 h-2 bg-black"
              style={arrowStyles[realSide]}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default IconButton;
