
import React, { useRef, useEffect } from 'react';
import { usePresenter } from '../PresenterContext';
import { useAgentStore } from '../stores/agentStore';

const WelcomeAction = ({ title, sub, images }: { title: string, sub: string, images: string[] }) => (
  <div className="lov-hover-card bg-[#F4F4F5] rounded-[40px] px-9 py-9 flex justify-between items-center cursor-pointer group mb-4 shadow-sm">
    <div className="flex-1 pr-4">
      <h4 className="text-[18px] font-black text-black mb-1.5 tracking-tight">{title}</h4>
      <p className="text-[14px] text-gray-400 font-medium leading-relaxed">{sub}</p>
    </div>
    <div className="relative flex -space-x-6 flex-shrink-0">
      {images.map((img, i) => (
        <div 
          key={i} 
          className="w-[70px] h-[50px] rounded-[12px] border-[2.5px] border-white overflow-hidden shadow-sm transform transition-transform group-hover:-translate-y-2 group-hover:rotate-2"
          style={{ zIndex: 10 - i }}
        >
          <img src={img} className="w-full h-full object-cover" />
        </div>
      ))}
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
    <div className="w-[540px] h-screen bg-white flex flex-col z-50 rounded-l-[60px] shadow-[-30px_0_80px_rgba(0,0,0,0.025)] relative">
      {/* 顶部工具栏 - 确保 icon-center 生效 */}
      <div className="px-12 pt-12 pb-4 flex items-center justify-end gap-3">
        {[
          'M12 4v16m8-8H4', 
          'M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z', 
          'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
          'M5 12h14',
          'M20 6L9 17l-5-5'
        ].map((d, i) => (
          <button key={i} className="lov-btn icon-center text-[#9A9A9A] hover:text-black hover:bg-[#F2F2F2] w-10 h-10 rounded-[14px]">
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-12 pb-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-12 pt-4">
            <div className="space-y-6">
              <div className="w-[54px] h-[54px] bg-black text-white rounded-full icon-center font-black text-xl shadow-xl shadow-black/10">L</div>
              <div>
                <h1 className="text-[44px] font-black leading-tight tracking-tight mb-1">Hi，我是你的AI导演</h1>
                <p className="text-[19px] text-[#A0A0A0] font-medium">开启你的电影创作之旅</p>
              </div>
            </div>

            <div className="space-y-4">
              <WelcomeAction title="剧本创作 (Script)" sub="编写一段充满张力的追逐戏..." images={images_script} />
              <WelcomeAction title="角色设定 (Cast)" sub="设计一个未来世界的反叛者..." images={images_cast} />
              <WelcomeAction title="分镜转换 (Board)" sub="将文字脚本视觉化..." images={images_board} />
            </div>
          </div>
        ) : (
          <div className="space-y-10 py-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-full icon-center flex-shrink-0 text-[14px] font-black border border-gray-100 ${msg.role === 'user' ? 'bg-[#F2F2F2] text-gray-400' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`max-w-[85%] text-[16.5px] leading-relaxed text-[#1A1A1A] font-medium ${msg.role === 'user' ? 'bg-[#F4F4F5] px-8 py-6 rounded-[34px]' : 'py-3'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部输入框 - 确保按钮图标对齐 */}
      <div className="px-12 pb-14 pt-4">
        <div className="bg-[#F4F4F5] rounded-[44px] p-8 shadow-sm transition-all focus-within:shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-transparent focus-within:border-gray-200/40">
          <textarea
            value={input} 
            onChange={(e) => agentManager.updateInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), agentManager.sendMessage())}
            placeholder="输入创作指令..."
            rows={1}
            className="w-full bg-transparent text-[18px] font-medium text-black placeholder:text-[#BBBBBB] mb-6 px-1"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="lov-btn icon-center text-[#9A9A9A] hover:bg-[#E8E8E8] hover:text-black w-11 h-11 rounded-[14px]">
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l4.5-4.5" /></svg>
              </button>
              <button className="lov-btn icon-center text-[#9A9A9A] hover:bg-[#E8E8E8] hover:text-black w-11 h-11 rounded-[14px]">
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" /></svg>
              </button>
              {/* 灵感按钮：背景浅蓝，星星居中 */}
              <button className="lov-btn icon-center bg-[#E9F2FF] text-[#0066FF] hover:bg-[#DCEBFF] w-[50px] h-[50px] rounded-[16px] ml-1">
                <svg className="w-7 h-7 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                   <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L18 11l-6.857 2.286L9 20l-2.286-6.857L0 11l6.857-2.286L9 2z" />
                </svg>
              </button>
            </div>
            {/* 发送按钮：灰色圆形，白色上箭头 */}
            <button 
              onClick={agentManager.sendMessage}
              className="w-14 h-14 bg-[#D9D9DE] hover:bg-black text-white rounded-full icon-center transition-all shadow-sm group"
            >
              <svg className="w-7 h-7 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
