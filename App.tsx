
import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import { PresenterProvider, usePresenter } from './PresenterContext';
import { useWorkspaceStore } from './stores/workspaceStore';

const AppContent: React.FC = () => {
  const { workspaceManager } = usePresenter();
  const zoom = useWorkspaceStore(s => s.zoom);

  return (
    <div className="flex h-screen w-screen bg-[#FBFBFB] overflow-hidden text-[#1A1A1A]">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-[440px] h-16 flex items-center justify-between px-10 z-40 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-9 h-9 bg-black rounded-[12px] flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer group hover:bg-black/5 px-3 py-1.5 rounded-[12px] transition-all pointer-events-auto">
            <h1 className="text-[14px] font-bold tracking-tight">CineFlow Cinematic Project</h1>
            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-xl rounded-full px-4 py-1.5 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] h-10">
          <button onClick={() => workspaceManager.adjustZoom(-5)} title="缩小" className="lov-action-btn-sm text-lg font-light">-</button>
          <span className="text-[12px] font-bold text-black min-w-[36px] text-center select-none">{zoom}%</span>
          <button onClick={() => workspaceManager.adjustZoom(5)} title="放大" className="lov-action-btn-sm text-lg font-light">+</button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas />
      </main>

      <AgentPanel />
      
      {/* 左下角状态栏 - 高精度 Lovart 对齐 */}
      <div className="fixed bottom-10 left-10 flex items-center gap-3 z-40">
        <button title="主菜单" className="lov-action-btn bg-white border border-gray-100 shadow-sm hover:shadow-md h-[40px] w-[40px] rounded-[14px]">
          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <div title="个人中心" className="w-[40px] h-[40px] rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden hover:bg-black/5 transition-colors cursor-pointer active:scale-95">
             <span className="text-[14px] font-bold text-gray-800">W</span>
          </div>
          <div title="计算额度" className="h-[40px] bg-white border border-gray-100 shadow-sm rounded-full flex items-center px-5 gap-2.5 hover:bg-black/5 transition-all cursor-pointer active:scale-95">
             <svg className="w-[15px] h-[15px] text-orange-400 fill-current" viewBox="0 0 20 20">
               <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"/>
             </svg>
             <span className="text-[14px] font-bold tracking-tight text-gray-900">88</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <PresenterProvider>
    <AppContent />
  </PresenterProvider>
);

export default App;
