
import React, { useState, useRef, useEffect } from 'react';
import { Asset, AssetType } from '../types';
import { geminiService } from '../services/geminiService';

interface AgentPanelProps {
  selectedAssets: Asset[];
  onAddAsset: (asset: Partial<Asset>) => void;
}

const WelcomeCard = ({ title, desc, images }: { title: string, desc: string, images: string[] }) => (
  <div className="group relative w-full h-[120px] bg-[#F9FAFB] rounded-[20px] p-6 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
    <div className="relative z-10 max-w-[60%]">
      <h3 className="text-[15px] font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-[12px] text-gray-400 leading-tight line-clamp-2">{desc}</p>
    </div>
    <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 flex items-center h-full">
      {images.map((img, i) => (
        <div 
          key={i} 
          className="w-[70px] h-[90px] rounded-lg shadow-xl border-2 border-white overflow-hidden bg-white -ml-8 first:ml-0 transition-transform group-hover:scale-105"
          style={{ 
            transform: `rotate(${i === 0 ? -12 : i === 1 ? 0 : 12}deg)`,
            zIndex: i
          }}
        >
          <img src={img} className="w-full h-full object-cover" alt="" />
        </div>
      ))}
    </div>
  </div>
);

const AgentPanel: React.FC<AgentPanelProps> = ({ selectedAssets, onAddAsset }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: textToSend }]);
    setInput('');
    setLoading(true);

    try {
      const res = await geminiService.generateContent(textToSend, selectedAssets);
      setMessages(prev => [...prev, { 
        id: 'a' + Date.now(), 
        role: 'assistant', 
        text: res,
        suggestions: ["继续细化当前场景", "生成对应的概念图"]
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', text: "系统繁忙，请稍后再试。" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[480px] flex-shrink-0 h-screen bg-white border-l border-gray-100 flex flex-col z-50">
      {/* Header - Margins per reference */}
      <div className="px-8 py-5 flex items-center justify-end gap-5">
        <button className="text-gray-300 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg></button>
        <button className="text-gray-300 hover:text-gray-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg></button>
        <button className="text-gray-300 hover:text-gray-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
        <button className="text-gray-300 hover:text-gray-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg></button>
        <button className="text-gray-300 hover:text-gray-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg></button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scroll" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="px-8 pt-12 space-y-8">
            {/* Welcome Greeting */}
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-black text-sm">L</div>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Hi，我是你的AI设计师</h1>
                <p className="text-[16px] text-gray-400 mt-1">让我们开始今天的创作吧！</p>
              </div>
            </div>

            {/* Template Grid */}
            <div className="space-y-4">
              <WelcomeCard 
                title="Wine List" 
                desc="Mimic this effect to generate wine menus with elegant visuals."
                images={[
                  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1553412110-2603e8d5fbc1?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?auto=format&fit=crop&q=80&w=200"
                ]}
              />
              <WelcomeCard 
                title="Coffee Shop Branding" 
                desc="You are a brand designer creating a fresh look for a coffee house."
                images={[
                  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=200"
                ]}
              />
              <WelcomeCard 
                title="Story Board" 
                desc="I NEED A STORY BOARD for a futuristic cyberpunk film."
                images={[
                  "https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=200"
                ]}
              />
            </div>

            {/* Switch Action */}
            <div className="flex items-center gap-2 text-gray-400 text-[13px] hover:text-gray-900 cursor-pointer transition-colors pt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15"/></svg>
              <span>切换</span>
            </div>

            {/* Banner */}
            <div className="bg-blue-50/80 rounded-[14px] px-4 py-3.5 flex items-center justify-between border border-blue-100/50">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1h-1a2 2 0 110-4h.17A3.001 3.001 0 015 5zm4-2a1 1 0 10-2 0 1 1 0 002 0zm5 3a1 1 0 10-2 0 1 1 0 002 0zM7 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-[13px] text-blue-600 font-medium tracking-tight">升级会员，Nano Banana Pro 免费365天!</span>
              </div>
              <button className="text-blue-300 hover:text-blue-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>
          </div>
        ) : (
          <div className="px-8 py-6 space-y-8">
            {messages.map(msg => (
              <div key={msg.id} className="space-y-4">
                <div className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-[10px] text-white font-bold">L</div>
                  )}
                  <div className={`max-w-[85%] text-[14px] leading-[1.7] text-gray-800 ${msg.role === 'user' ? 'bg-gray-50 px-4 py-2.5 rounded-2xl' : ''}`}>
                    {msg.text}
                  </div>
                </div>
                {msg.suggestions && (
                  <div className="flex flex-col gap-2 pl-12">
                    {msg.suggestions.map((s: string, i: number) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(s)}
                        className="suggestion-chip text-left px-4 py-2.5 bg-[#F9FAFB] rounded-xl text-[13px] text-gray-600 border border-transparent hover:border-gray-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="pl-12 flex gap-1"><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" /></div>}
          </div>
        )}
      </div>

      {/* Footer Area - Replicating reference exactly */}
      <div className="px-8 pb-8 pt-4">
        <div className="bg-[#F9FAFB] rounded-[24px] border border-gray-100 flex flex-col p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="请输入你的设计需求"
            className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-[14px] min-h-[100px] resize-none text-gray-900 placeholder-gray-400"
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1.5">
              <button className="input-icon-btn p-2 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13"/></svg></button>
              <button className="input-icon-btn p-2 rounded-lg text-gray-400 text-lg font-medium flex items-center justify-center">@</button>
              <button className="input-icon-btn p-2 rounded-lg text-blue-500 bg-blue-50/50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 4.5h18M3 9.5h18M3 14.5h18M3 19.5h18"/></svg></button>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="input-icon-btn p-2 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></button>
              <button className="input-icon-btn p-2 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
              <button className="input-icon-btn p-2 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg></button>
              <button className="input-icon-btn p-2 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></button>
              <button 
                onClick={() => handleSend()}
                className="w-10 h-10 bg-[#BDBDBD] text-white rounded-xl flex items-center justify-center transition-colors hover:bg-black"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
