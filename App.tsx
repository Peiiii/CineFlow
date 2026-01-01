
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import { Asset, AssetType } from './types';

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [zoom, setZoom] = useState(25);

  const handleAddAsset = (newAsset: Partial<Asset>) => {
    setAssets(prev => [...prev, {
      id: Date.now().toString(),
      type: newAsset.type || AssetType.IMAGE,
      title: newAsset.title || 'Untitled',
      content: newAsset.content || '',
      position: newAsset.position || { x: 500, y: 300 },
      width: newAsset.width || 340,
      height: newAsset.height || 220
    }]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] overflow-hidden">
      {/* Top Header - Using px-8 and h-16 for consistency */}
      <header className="fixed top-0 left-0 right-[480px] h-16 flex items-center justify-between px-8 z-40 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm">L</div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-[15px] font-bold text-gray-900 tracking-tight">未命名</h1>
            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        
        <div className="flex items-center gap-1 pointer-events-auto bg-[#F9FAFB] rounded-[14px] px-3 py-1.5 border border-gray-100 shadow-sm">
          <button onClick={() => setZoom(z => Math.max(z - 5, 5))} className="p-1 text-gray-400 hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20 12H4" /></svg></button>
          <span className="text-[13px] font-bold text-gray-600 min-w-[44px] text-center select-none">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 200, 400))} className="p-1 text-gray-400 hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg></button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar onToolClick={(id) => console.log('Tool:', id)} />
        <Canvas 
          assets={assets} 
          selectedIds={selectedAssetIds} 
          zoom={zoom}
          onZoomChange={setZoom}
          onSelect={(id, multi) => setSelectedAssetIds(id ? (multi ? [...selectedAssetIds, id] : [id]) : [])}
          onMove={(id, x, y) => setAssets(prev => prev.map(a => a.id === id ? { ...a, position: { x, y } } : a))}
        />
      </main>

      <AgentPanel 
        selectedAssets={assets.filter(a => selectedAssetIds.includes(a.id))} 
        onAddAsset={handleAddAsset}
      />
      
      {/* Bottom Status Bar - Precisely aligned */}
      <div className="fixed bottom-6 left-8 flex items-center gap-6 z-40">
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-bold border border-gray-200">W</div>
          <div className="flex items-center gap-1.5 text-gray-900 text-[14px] font-bold tracking-tight">
            <svg className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"/></svg>
            88
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
