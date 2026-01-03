
import React from 'react';

// Use React.FC to define the component props, which correctly handles the 'key' prop when mapping over actions and avoids type mismatch.
const WelcomeAction: React.FC<{ title: string; sub: string; images: string[] }> = ({ title, sub, images }) => (
  <div className="lov-hover-card bg-[#F4F4F5] rounded-[24px] px-5 py-4 flex justify-between items-center cursor-pointer group mb-3 shadow-sm">
    <div className="flex-1 pr-3">
      <h4 className="text-[14px] font-bold text-black mb-0.5 tracking-tight">{title}</h4>
      <p className="text-[12px] text-gray-400 font-medium leading-snug">{sub}</p>
    </div>
    <div className="relative flex -space-x-4 flex-shrink-0">
      {images.map((img, i) => (
        <div key={i} className="w-[48px] h-[34px] rounded-[8px] border-[2px] border-white overflow-hidden shadow-sm transform transition-transform group-hover:-translate-y-1.5 group-hover:rotate-1" style={{ zIndex: 10 - i }}>
          <img src={img} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

const AgentWelcome: React.FC = () => {
  const actions = [
    { title: "剧本创作 (Script)", sub: "编写一段充满张力的追逐戏...", images: ["https://images.unsplash.com/photo-1485846234645-a62644f84728?w=120&h=90&fit=crop", "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=120&h=90&fit=crop"] },
    { title: "角色设定 (Cast)", sub: "设计一个未来世界的反叛者...", images: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=90&fit=crop", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=90&fit=crop"] },
    { title: "分镜转换 (Board)", sub: "将文字脚本视觉化...", images: ["https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=120&h=90&fit=crop", "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=120&h=90&fit=crop"] }
  ];

  return (
    <div className="space-y-8 pt-2">
      <div className="space-y-4">
        <div className="w-[42px] h-[42px] bg-black text-white rounded-full icon-center font-black text-lg shadow-lg shadow-black/10">L</div>
        <div>
          <h1 className="text-[28px] font-black leading-tight tracking-tight mb-0.5">Hi，我是你的AI导演</h1>
          <p className="text-[15px] text-[#A0A0A0] font-medium">开启你的电影创作之旅</p>
        </div>
      </div>
      <div className="space-y-3">
        {actions.map((act, idx) => <WelcomeAction key={idx} {...act} />)}
      </div>
    </div>
  );
};

export default AgentWelcome;
