
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
    <div className="w-[400px] h-screen bg-white flex flex-col z-50 rounded-l-[40px] shadow-[-20px_0_60px_rgba(0,0,0,0.02)] relative border-l border-gray-50">
      <AgentHeader />

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <AgentWelcome />
        ) : (
          <div className="space-y-6 py-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full icon-center flex-shrink-0 text-[12px] font-black border border-gray-100 ${msg.role === 'user' ? 'bg-[#F2F2F2] text-gray-400' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`max-w-[85%] text-[14px] leading-relaxed text-[#1A1A1A] font-medium ${msg.role === 'user' ? 'bg-[#F4F4F5] px-5 py-4 rounded-[20px]' : 'py-2'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AgentChatInput 
        input={input} 
        onInputChange={agentManager.updateInput} 
        onSend={agentManager.sendMessage} 
      />
    </div>
  );
};

export default AgentPanel;
