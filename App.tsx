
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
    <div className="flex h-screen w-screen bg-[#FFFFFF] overflow-hidden text-black">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-[540px] h-[120px] flex items-center justify-between px-16 z-40 pointer-events-none">
        <div className="flex items-center gap-5 pointer-events-auto group cursor-pointer hover:bg-[#F8F8F8] px-5 py-3 rounded-[24px] transition-all">
          <div className="w-[48px] h-[48px] bg-black rounded-[16px] flex items-center justify-center text-white shadow-xl shadow-black/20">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-black tracking-tight">未命名项目</h1>
            <svg className="w-5 h-5 text-[#D0D0D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5"><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        
        {/* 缩放控制器 */}
        <div className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-100/50 shadow-[0_15px_50px_rgba(0,0,0,0.05)] h-[60px] pointer-events-auto">
          <button onClick={() => workspaceManager.adjustZoom(-5)} className="w-11 h-11 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-2xl transition-all">−</button>
          <span className="text-[16px] font-black text-black min-w-[72px] text-center select-none tracking-tight">{zoom}%</span>
          <button onClick={() => workspaceManager.adjustZoom(5)} className="w-11 h-11 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-2xl transition-all">+</button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas />
        
        {/* 中心占位 */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="w-[450px] h-[450px] text-[#F7F7F7] relative flex items-center justify-center">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[165px] bg-gradient-to-br from-[#FF9D4D] via-[#BD5AFF] to-[#00C2FF] rounded-[32px] shadow-2xl shadow-blue-500/10 border-[4px] border-white/50" />
          </div>
          <p className="text-center font-black tracking-[1.2em] -mt-6 text-[#EEEEEE] text-[20px] uppercase">Ready to shoot</p>
        </div>
      </main>

      <AgentPanel />

      {/* 极简页脚按钮 */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none flex items-center justify-end px-16 z-40 pb-6">
        <button className="w-12 h-12 bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[16px] flex items-center justify-center pointer-events-auto hover:bg-gray-50 transition-all">
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
        </button>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <PresenterProvider>
    <AppContent />
  </PresenterProvider>
);

export default App;
