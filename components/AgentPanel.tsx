
import React, { useRef, useEffect } from 'react';
import { usePresenter } from '../PresenterContext';
import { useAgentStore } from '../stores/agentStore';

const WelcomeAction = ({ title, sub, images }: { title: string, sub: string, images: string[] }) => (
  <div className="relative group lov-card-transition">
    <div className="welcome-card-body bg-[#F4F4F5] rounded-[36px] px-8 py-8 flex justify-between items-center transition-all duration-300 group-hover:bg-[#ECECEE] group-hover:-translate-y-1 cursor-pointer group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] group-hover:z-10 relative">
      <div className="flex-1 pr-6">
        <h4 className="text-[17px] font-black text-black mb-1.5 tracking-tight">{title}</h4>
        <p className="text-[14px] text-gray-400 font-medium leading-relaxed">{sub}</p>
      </div>
      <div className="flex -space-x-5 flex-shrink-0">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="w-[66px] h-[48px] rounded-[12px] border-[2.5px] border-white overflow-hidden shadow-sm transform transition-all group-hover:-translate-y-1.5 group-hover:rotate-1"
            style={{ zIndex: 10 - i }}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AgentPanel: React.FC = () => {
  const { agentManager } = usePresenter();
  const messages = useAgentStore(s => s.messages);
  const input = useAgentStore(s => s.input);
  const loading = useAgentStore(s => s.loading);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const images_script = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=120&h=90&fit=crop",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=120&h=90&fit=crop"
  ];
  const images_cast = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=90&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=90&fit=crop"
  ];
  const images_board = [
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=120&h=90&fit=crop",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=120&h=90&fit=crop"
  ];

  return (
    <div className="w-[520px] flex-shrink-0 h-screen bg-white flex flex-col z-50 rounded-l-[56px] shadow-[-20px_0_80px_rgba(0,0,0,0.02)] border-l border-gray-50/50">
      {/* 顶部工具栏 - 图标完全居中 */}
      <div className="px-12 pt-10 pb-6 flex items-center justify-end gap-2 text-[#A0A0A0]">
        {['M12 4v16m8-8H4', 'M10.3 4.3c.4-1.7 2.9-1.7 3.3 0', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z', 'M19 11H5', 'M10 6H6'].map((d, i) => (
          <button key={i} className="w-10 h-10 icon-center rounded-[12px] hover:bg-[#F2F2F2] hover:text-black transition-colors">
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-12 pb-10" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-12 pt-4 pb-12">
            <div className="space-y-5">
              <div className="w-[46px] h-[46px] bg-black text-white rounded-full icon-center font-bold shadow-lg shadow-black/15">L</div>
              <div>
                <h1 className="text-[42px] font-black leading-tight tracking-tight mb-1">Hi，我是你的AI导演</h1>
                <p className="text-[18px] text-[#A0A0A0] font-medium">开启你的电影创作之旅</p>
              </div>
            </div>

            <div className="space-y-5">
              <WelcomeAction title="剧本创作 (Script)" sub="编写一段充满张力的追逐戏..." images={images_script} />
              <WelcomeAction title="角色设定 (Cast)" sub="设计一个未来世界的反叛者..." images={images_cast} />
              <WelcomeAction title="分镜转换 (Board)" sub="将文字脚本视觉化..." images={images_board} />
            </div>
          </div>
        ) : (
          <div className="space-y-10 py-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-11 h-11 rounded-full icon-center flex-shrink-0 text-[13px] font-black border border-gray-100 ${msg.role === 'user' ? 'bg-[#F2F2F2] text-gray-400' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`max-w-[85%] text-[16px] leading-relaxed text-[#1A1A1A] font-medium ${msg.role === 'user' ? 'bg-[#F4F4F5] px-7 py-5 rounded-[30px]' : 'py-2'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[11px] font-black text-gray-200 tracking-[0.5em] uppercase animate-pulse pl-16">PRODUCING VISION</div>}
          </div>
        )}
      </div>

      {/* 底部输入面板 - 1:1 精准复刻图标布局 */}
      <div className="px-12 pb-14">
        <div className="bg-[#F4F4F5] rounded-[36px] p-7 transition-all duration-300 focus-within:bg-[#ECECEE] focus-within:shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-transparent focus-within:border-gray-100">
          <textarea
            value={input} 
            onChange={(e) => agentManager.updateInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), agentManager.sendMessage())}
            placeholder="输入创作指令..."
            rows={1}
            className="w-full bg-transparent text-[17px] font-medium text-black placeholder:text-[#C4C4C4] mb-5 px-1"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 icon-center rounded-[12px] text-[#A0A0A0] hover:bg-[#E8E8E8] hover:text-black transition-colors">
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l4.5-4.5" /></svg>
              </button>
              <button className="w-10 h-10 icon-center rounded-[12px] text-[#A0A0A0] hover:bg-[#E8E8E8] hover:text-black transition-colors">
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6"><path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5" /></svg>
              </button>
              <button className="w-11 h-11 icon-center text-[#0066FF] bg-[#E9F2FF] rounded-[14px] hover:bg-[#D9E9FF] transition-all">
                <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L18 11l-6.857 2.286L9 20l-2.286-6.857L0 11l6.857-2.286L9 2z" /></svg>
              </button>
            </div>
            <button 
              onClick={agentManager.sendMessage}
              className="w-[48px] h-[48px] bg-[#D6D6DA] hover:bg-black text-white rounded-full icon-center transition-all duration-300 group shadow-sm active:scale-90"
            >
              <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
