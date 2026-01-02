
import React, { useRef, useEffect } from 'react';
import { usePresenter } from '../PresenterContext';
import { useAgentStore } from '../stores/agentStore';

const LovIcon = ({ d, className = "w-[18px] h-[18px]" }: { d: string, className?: string }) => (
  <svg className={`${className} thin-icon`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const IconButton = ({ d, title, active = false, onClick }: { d: string, title: string, active?: boolean, onClick?: () => void }) => (
  <button 
    title={title}
    onClick={onClick}
    className={`lov-action-btn-sm ${active ? 'lov-action-btn-active' : ''}`}
  >
    <LovIcon d={d} />
  </button>
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

  return (
    <div className="w-[440px] flex-shrink-0 h-screen bg-white flex flex-col z-50 border-v shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-h">
        <h2 className="text-[14px] font-bold text-black tracking-tight flex items-center gap-2">
          导演 Agent <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        </h2>
        <div className="flex items-center gap-0.5">
          <IconButton title="新建项目" d="M12 4v16m8-8H4" />
          <IconButton title="查看历史" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <IconButton title="分享导出" d="M8.684 13.342a3 3 0 110-2.684m6.632 3.316a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z" />
          <IconButton title="工作区设置" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </div>
      </div>

      {/* 消息历史 */}
      <div className="flex-1 overflow-y-auto custom-scroll px-8 py-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
             <div className="w-14 h-14 bg-gray-50 rounded-[18px] flex items-center justify-center mb-5">
               <LovIcon d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" className="w-8 h-8" />
             </div>
             <p className="text-[13px] font-bold leading-relaxed">开始编织你的电影梦。<br/>从描述一个角色或一个场景开始。</p>
          </div>
        ) : (
          <div className="space-y-8">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black border border-black/5 ${msg.role === 'user' ? 'bg-gray-100 text-gray-400' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`max-w-[85%] text-[14px] leading-relaxed text-[#1A1A1A] font-medium ${msg.role === 'user' ? 'bg-gray-50 px-5 py-3 rounded-[20px]' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] font-bold text-gray-300 tracking-widest uppercase animate-pulse pl-12">Dreaming...</div>}
          </div>
        )}
      </div>

      {/* 输入面板：重构为圆角矩形容器 */}
      <div className="px-6 pb-8 pt-2">
        <div className="lov-input-panel">
          <textarea
            value={input} 
            onChange={(e) => agentManager.updateInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), agentManager.sendMessage())}
            placeholder="描述角色、生成场景或管理上下文资产..."
            rows={2}
            className="w-full bg-transparent text-[14px] font-medium"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              <IconButton title="上传视觉参考" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <IconButton title="引用工作区资产" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
              <IconButton title="实时灵感模式" active={true} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </div>

            <div className="flex items-center gap-1">
              <div className="h-5 w-[1px] bg-black/5 mx-2" />
              <IconButton title="联网视觉检索" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9" />
              <button 
                onClick={agentManager.sendMessage}
                title="发送请求"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all ml-2 shadow-lg shadow-black/10"
              >
                 <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
