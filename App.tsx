
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import { Asset, AssetType } from './types';

const HeaderIconBtn = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => (
  <button onClick={onClick} className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:text-black hover:bg-white compact-transition active:scale-90">
    {children}
  </button>
);

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'ref-1',
      type: AssetType.IMAGE,
      title: 'Initial Scene',
      content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      position: { x: 400, y: 200 },
      width: 480, height: 320
    }
  ]);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [zoom, setZoom] = useState(25);

  const handleAddAsset = (newAsset: Partial<Asset>) => {
    setAssets(prev => [...prev, {
      id: Date.now().toString(),
      type: newAsset.type || AssetType.IMAGE,
      title: newAsset.title || 'Untitled',
      content: newAsset.content || '',
      position: newAsset.position || { x: 500, y: 300 },
      width: newAsset.width || 340, height: 220
    }]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8F9FA] overflow-hidden">
      <header className="fixed top-0 left-0 right-[420px] h-16 flex items-center justify-between px-8 z-40 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 bg-black rounded-[10px] flex items-center justify-center text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>
          <div className="flex items-center gap-1 cursor-pointer group hover:bg-white px-2.5 py-1.5 rounded-xl compact-transition border border-transparent hover:border-gray-100">
            <h1 className="text-[14px] font-bold text-black tracking-tight">未命名项目</h1>
            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pointer-events-auto bg-white rounded-full px-4 py-1.5 border border-gray-100 lovart-card-shadow">
          <button onClick={() => setZoom(z => Math.max(z - 5, 5))} className="text-gray-300 hover:text-black compact-transition text-lg font-light px-0.5">−</button>
          <span className="text-[13px] font-bold text-black min-w-[36px] text-center select-none">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 5, 400))} className="text-gray-300 hover:text-black compact-transition text-lg font-light px-0.5">+</button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar onToolClick={(id) => console.log('Tool:', id)} />
        <Canvas 
          assets={assets} selectedIds={selectedAssetIds} zoom={zoom} onZoomChange={setZoom}
          onSelect={(id, multi) => setSelectedAssetIds(id ? (multi ? [...selectedAssetIds, id] : [id]) : [])}
          onMove={(id, x, y) => setAssets(prev => prev.map(a => a.id === id ? { ...a, position: { x, y } } : a))}
        />
      </main>

      <AgentPanel 
        selectedAssets={assets.filter(a => selectedAssetIds.includes(a.id))} 
        onAddAsset={handleAddAsset} 
      />
      
      <div className="fixed bottom-8 left-8 flex items-center gap-4 z-40">
        <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-black bg-white rounded-full border border-gray-100 shadow-sm compact-transition active:scale-90">
          <svg className="w-5 h-5 thin-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold shadow-sm">W</div>
          <div className="flex items-center gap-2 text-black text-[13px] font-black tracking-tight bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <svg className="w-3.5 h-3.5 text-orange-400 fill-current" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"/></svg>
            88
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
