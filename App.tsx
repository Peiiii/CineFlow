
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import { Asset, AssetType } from './types';

const INITIAL_ASSETS: Asset[] = [
  {
    id: '1',
    type: AssetType.IMAGE,
    title: 'Visual Architecture: Core',
    content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    position: { x: 380, y: 240 },
    width: 440,
    height: 280
  },
  {
    id: '2',
    type: AssetType.TEXT,
    title: 'Narrative Brief',
    content: 'The narrative follows a splintered consciousness attempting to reassemble itself within a neon-drenched simulation.',
    position: { x: 860, y: 240 },
    width: 280,
    height: 180
  }
];

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [zoom, setZoom] = useState(100);

  const handleSelect = (id: string, multi: boolean) => {
    if (!id) return setSelectedAssetIds([]);
    if (multi) setSelectedAssetIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);
    else setSelectedAssetIds([id]);
  };

  const handleMove = (id: string, x: number, y: number) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, position: { x, y } } : a));
  };

  const handleAddAsset = (newAsset: Partial<Asset>) => {
    const asset: Asset = {
      id: Date.now().toString(),
      type: newAsset.type || AssetType.IMAGE,
      title: newAsset.title || 'Untitled Output',
      content: newAsset.content || '',
      position: newAsset.position || { x: 450, y: 400 },
      width: newAsset.width || 320,
      height: newAsset.height || 200
    };
    setAssets(prev => [...prev, asset]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#F9FAFB] overflow-hidden">
      {/* Ultra-Minimal Header */}
      <header className="fixed top-8 left-10 right-[520px] flex items-center justify-between z-40 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">L</div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-gray-900">Project_Neon</h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Studio Workspace</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pointer-events-auto bg-white/40 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/60 soft-shadow">
          <button onClick={() => setZoom(z => Math.max(z - 5, 25))} className="hover:text-blue-500 transition-colors text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M20 12H4" /></svg>
          </button>
          <span className="text-[11px] font-black text-gray-800 w-10 text-center">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 5, 200))} className="hover:text-blue-500 transition-colors text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas 
          assets={assets} 
          selectedIds={selectedAssetIds} 
          onSelect={handleSelect}
          onMove={handleMove}
        />
      </main>

      <AgentPanel 
        selectedAssets={assets.filter(a => selectedAssetIds.includes(a.id))} 
        onAddAsset={handleAddAsset}
      />

      {/* Discrete Footer */}
      <footer className="fixed bottom-10 left-10 flex gap-4 z-40 pointer-events-none">
        <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 border border-white/80 soft-shadow">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Ready</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
