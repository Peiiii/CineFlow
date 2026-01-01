
import React, { useState, useRef, useEffect } from 'react';
import { Message, Asset, AssetType } from '../types';
import { geminiService } from '../services/geminiService';

interface AgentPanelProps {
  selectedAssets: Asset[];
  onAddAsset: (asset: Partial<Asset>) => void;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ selectedAssets, onAddAsset }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: "Hello Director. Current workspace analysis complete. Ready to visualize new storyboards?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && selectedAssets.length === 0) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, attachments: selectedAssets.map(a => a.id) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const isImg = input.toLowerCase().match(/generate|draw|image|visualize/);
      if (isImg) {
        const refImg = selectedAssets.find(a => a.type === AssetType.IMAGE)?.content;
        const res = await geminiService.generateImage(input, refImg);
        if (res) {
          onAddAsset({ type: AssetType.IMAGE, content: res, title: 'Studio Output', width: 340, height: 210, position: { x: 500, y: 350 } });
          setMessages(prev => [...prev, { id: 'a' + Date.now(), role: 'assistant', text: "Framework generated and added to the canvas." }]);
        }
      } else {
        const res = await geminiService.generateContent(input, selectedAssets);
        setMessages(prev => [...prev, { id: 'a' + Date.now(), role: 'assistant', text: res || "Sequence processed." }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', text: "API Pipeline error. Please verify input." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[440px] h-[calc(100vh-48px)] m-6 flex flex-col bg-white rounded-[32px] border border-gray-100 soft-shadow z-50">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Studio Agent</h2>
          <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.15em]">{selectedAssets.length} Context Items</span>
        </div>
        <div className="flex -space-x-1">
          {selectedAssets.map((a, i) => (
            <div key={a.id} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm" style={{zIndex: 10 - i}}>
              {a.type === AssetType.IMAGE ? <img src={a.content} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-400">T</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-2 space-y-6" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-[20px] px-5 py-3.5 text-sm leading-[1.6] ${
              msg.role === 'user' ? 'bg-[#121212] text-white' : 'bg-[#F3F4F6] text-gray-800'
            }`}>
              {msg.text}
            </div>
            {msg.role === 'assistant' && (
              <span className="mt-2 ml-1 text-[10px] text-gray-300 font-bold uppercase tracking-widest">CineFlow Core</span>
            )}
          </div>
        ))}
        {loading && <div className="flex gap-1.5 p-2"><div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" /><div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" /></div>}
      </div>

      <div className="p-6">
        <div className="bg-[#F9FAFB] rounded-[24px] border border-gray-200/60 p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Instruct the studio agent..."
            className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-sm min-h-[90px] resize-none text-gray-800 placeholder-gray-400"
          />
          <div className="flex items-center justify-between p-2">
            <div className="flex gap-1">
              {['plus', 'spark', 'world'].map(btn => (
                <button key={btn} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <div className="w-4 h-4 border-[1.5px] border-current rounded-sm opacity-60" />
                </button>
              ))}
            </div>
            <button 
              onClick={handleSend} 
              disabled={loading}
              className="w-9 h-9 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
