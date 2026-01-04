
import React, { useRef, useEffect } from 'react';
import { usePresenter } from '../PresenterContext';
import { useAgentStore } from '../stores/agentStore';
import AgentHeader from './agent/AgentHeader';
import AgentWelcome from './agent/AgentWelcome';
import AgentChatInput from './agent/AgentChatInput';

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
    <div className="w-[380px] h-screen bg-[#FFFFFF] flex flex-col z-50 rounded-l-[32px] 
      shadow-[
        -1px_0_0_rgba(0,0,0,0.06),
        -20px_0_80px_rgba(0,0,0,0.08),
        -5px_0_15px_rgba(0,0,0,0.03)
      ] 
      relative 
      border-l border-gray-200/80
      ring-1 ring-black/[0.02]
    ">
      {/* 增强顶部边界感 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100/50 rounded-tl-[32px]" />
      
      <AgentHeader />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <AgentWelcome />
        ) : (
          <div className="space-y-4 py-2">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full icon-center flex-shrink-0 text-[10px] font-black border border-gray-100 ${msg.role === 'user' ? 'bg-[#F2F2F2] text-gray-400' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`max-w-[88%] text-[13.5px] leading-relaxed text-[#1A1A1A] font-medium ${msg.role === 'user' ? 'bg-[#F4F4F5] px-4 py-3 rounded-[18px]' : 'py-1.5'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-100" />
                <div className="h-10 bg-gray-50 rounded-[18px] w-2/3" />
              </div>
            )}
          </div>
        )}
      </div>

      <AgentChatInput 
        input={input} 
        onInputChange={agentManager.updateInput} 
        onSend={agentManager.sendMessage} 
      />
      
      {/* 增强底部边界感 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100/30" />
    </div>
  );
};

export default AgentPanel;
