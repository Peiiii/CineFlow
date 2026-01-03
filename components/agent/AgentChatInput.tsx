
import React from 'react';
import IconButton from '../common/IconButton';

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
            <IconButton 
              rounded="10"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              }
            />
            <IconButton 
              rounded="10"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-9 9" />
                </svg>
              }
            />
            <IconButton 
              variant="ai"
              size="lg"
              rounded="12"
              className="ml-1"
              icon={
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                </svg>
              }
            />
          </div>
          
          <IconButton 
            variant="solid"
            size="lg"
            onClick={onSend}
            icon={
              <svg className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AgentChatInput;
