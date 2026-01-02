
import React, { useState, useRef, useEffect } from 'react';
import { Asset, AssetType } from '../types';
import { geminiService } from '../services/geminiService';

interface AgentPanelProps {
  selectedAssets: Asset[];
  onAddAsset: (asset: Partial<Asset>) => void;
}

const WelcomeCard = ({ title, desc, images, onClick }: { title: string, desc: string, images: string[], onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative w-full h-[140px] bg-white rounded-[28px] p-6 overflow-hidden cursor-pointer hover:bg-gray-50/50 compact-transition border border-gray-100"
  >
    <div className="relative z-10 max-w-[60%]">
      <h3 className="text-[16px] font-black text-black mb-1.5 tracking-tight leading-tight">{title}</h3>
      <p className="text-[12px] text-gray-400 leading-snug line-clamp-2 font-medium">{desc}</p>
    </div>
    <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 flex items-center h-full">
      {images.map((img, i) => (
        <div 
          key={i} 
          className="w-[75px] h-[100px] rounded-[14px] shadow-lg border-[2.5px] border-white overflow-hidden bg-white -ml-12 first:ml-0 transition-all duration-500 group-hover:scale-105"
          style={{ 
            transform: `rotate(${i === 0 ? -12 : i === 1 ? -2 : 12}deg) translateY(${i === 1 ? -6 : 0}px)`, 
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

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: textToSend }]);
    setInput('');
    setLoading(true);
    try {
      const res = await geminiService.generateWithTools(textToSend, selectedAssets);
      if (res.text) setMessages(prev => [...prev, { id: 'a' + Date.now(), role: 'assistant', text: res.text }]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const UtilityBtn = ({ icon }: { icon: React.ReactNode }) => (
    <button className="p-1.5 text-gray-300 hover:text-black compact-transition active:scale-90">
      <svg className="w-[19px] h-[19px] thin-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
    </button>
  );

  return (
    <div className="w-[420px] flex-shrink-0 h-screen bg-white flex flex-col z-50 border-l border-gray-100 shadow-xl">
      <div className="px-6 py-4 flex items-center justify-end gap-1.5 border-b border-gray-50/50">
        <UtilityBtn icon={<path d="M12 4v16m8-8H4"/>} />
        <UtilityBtn icon={<path d="M4 6h16M4 12h16M4 18h16"/>} />
        <UtilityBtn icon={<path d="M8.684 13.342a3 3 0 110-2.684m6.632 3.316a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z"/>} />
        <UtilityBtn icon={<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>} />
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll px-7" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="pt-8 space-y-10">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-[14px] bg-black flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              </div>
              <div>
                <h1 className="text-[28px] font-black text-black tracking-tighter leading-tight">Hi, 我是AI设计师</h1>
                <p className="text-[14px] text-gray-400 mt-1 font-medium tracking-tight">让我们开始今天的电影创作吧</p>
              </div>
            </div>
            <div className="space-y-4 pb-6">
              <WelcomeCard 
                title="Wine List Aesthetic" 
                desc="Generate elegant bottle visuals." 
                images={[
                  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200", 
                  "https://images.unsplash.com/photo-1553126736-a83d4ed99ec7?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?auto=format&fit=crop&q=80&w=200"
                ]} 
                onClick={() => handleSend("Create a cinematic wine list style.")} 
              />
              <WelcomeCard 
                title="Coffee Branding" 
                desc="Visualizing brand elements." 
                images={[
                  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200", 
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200",
                  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=200"
                ]} 
                onClick={() => handleSend("Develop a visual concept for a coffee shop.")} 
              />
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-8">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-[10px] bg-black flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                  </div>
                )}
                <div className={`max-w-[85%] text-[14px] leading-relaxed text-black font-medium ${msg.role === 'user' ? 'bg-[#F3F4F6] px-4 py-2.5 rounded-[20px]' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-300 text-[10px] font-black tracking-widest uppercase animate-pulse">Designing...</div>}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="lovart-input-bg rounded-[32px] p-5 flex flex-col gap-3 lovart-card-shadow border border-gray-100">
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="请输入你的设计需求"
            className="w-full bg-transparent border-none focus:ring-0 px-2 py-1 text-[15px] min-h-[60px] resize-none text-black placeholder-gray-300 font-medium leading-normal"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-black compact-transition"><svg className="w-5 h-5 thin-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13"/></svg></button>
              <button className="p-1 text-gray-400 hover:text-black compact-transition"><svg className="w-5 h-5 thin-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></button>
              <button className="p-1 bg-blue-50/50 rounded-xl text-blue-500 hover:bg-blue-100/50 compact-transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></button>
            </div>
            <button onClick={() => handleSend()} className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 compact-transition shadow-lg shadow-black/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
