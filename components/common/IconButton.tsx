
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
  disabled
}) => {
  // 基础样式
  const baseClasses = "lov-btn icon-center transition-all duration-300 select-none flex-shrink-0";
  
  // 变体映射
  const variants = {
    ghost: "text-[#9BA3AF] hover:text-black hover:bg-gray-100/80",
    solid: "bg-black text-white shadow-lg shadow-black/10 active:scale-95 hover:bg-zinc-800",
    ai: "bg-[#E9F2FF] text-[#0066FF] hover:bg-[#DCEBFF] shadow-sm active:scale-95",
    sidebar: active 
      ? "bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] scale-100" 
      : "text-[#A0A0A0] hover:bg-[#F2F2F2] hover:text-black",
    subtle: "bg-white border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:scale-95"
  };

  // 尺寸映射
  const sizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
    xl: "w-11 h-11"
  };

  // 圆角映射
  const radius = {
    full: "rounded-full",
    '10': "rounded-[10px]",
    '12': "rounded-[12px]",
    '14': "rounded-[14px]"
  };

  return (
    <button
      title={title}
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
      {/* 自动处理 Icon 容器，确保内部居中 */}
      <span className="flex items-center justify-center pointer-events-none">
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
