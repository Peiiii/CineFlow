
import React from 'react';

interface AgentChatInputProps {
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

const AgentChatInput: React.FC<AgentChatInputProps> = ({ input, onInputChange, onSend }) => {
  return (
    <div className="px-8 pb-10 pt-2">
      <div className="bg-[#F4F4F5] rounded-[32px] p-5 shadow-sm transition-all focus-within:shadow-[0_12px_36px_rgba(0,0,0,0.03)] border border-transparent focus-within:border-gray-200/40">
        <textarea
          value={input} 
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSend())}
          placeholder="输入创作指令..."
          rows={1}
          className="w-full bg-transparent text-[15px] font-medium text-black placeholder:text-[#BBBBBB] mb-4 px-1"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button className="lov-btn icon-center text-[#9A9A9A] hover:bg-[#E8E8E8] hover:text-black w-9 h-9 rounded-[10px]">
              <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5" /></svg>
            </button>
            <button className="lov-btn icon-center text-[#9A9A9A] hover:bg-[#E8E8E8] hover:text-black w-9 h-9 rounded-[10px]">
              <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" /></svg>
            </button>
            <button className="lov-btn icon-center bg-[#E9F2FF] text-[#0066FF] hover:bg-[#DCEBFF] w-10 h-10 rounded-[12px] ml-0.5">
              <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                 <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L18 11l-6.857 2.286L9 20l-2.286-6.857L0 11l6.857-2.286L9 2z" />
              </svg>
            </button>
          </div>
          <button 
            onClick={onSend}
            className="w-10 h-10 bg-[#D9D9DE] hover:bg-black text-white rounded-full icon-center transition-all shadow-sm group active:scale-90"
          >
            <svg className="w-5 h-5 pointer-events-none transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentChatInput;
