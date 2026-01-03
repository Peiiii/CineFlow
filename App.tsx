
import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import ProjectHeader from './components/layout/ProjectHeader';
import ZoomControls from './components/layout/ZoomControls';
import { PresenterProvider, usePresenter } from './PresenterContext';
import { useWorkspaceStore } from './stores/workspaceStore';

const AppContent: React.FC = () => {
  const { workspaceManager } = usePresenter();
  const zoom = useWorkspaceStore(s => s.zoom);

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] overflow-hidden text-black">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-[400px] h-[100px] flex items-center justify-between px-16 z-40 pointer-events-none">
        <ProjectHeader />
        <ZoomControls zoom={zoom} onZoom={workspaceManager.adjustZoom} />
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas />
        
        {/* 画布中心占位 */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="w-[380px] h-[380px] text-[#F9F9F9] relative flex items-center justify-center">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[140px] bg-gradient-to-br from-[#FF9D4D] via-[#BD5AFF] to-[#00C2FF] rounded-[28px] shadow-2xl shadow-blue-500/10 border-[3px] border-white/50" />
          </div>
          <p className="text-center font-black tracking-[1em] -mt-5 text-[#F0F0F0] text-[16px] uppercase">Ready to shoot</p>
        </div>
      </main>

      <AgentPanel />

      {/* 极简页脚 */}
      <footer className="fixed bottom-0 left-0 right-[400px] h-20 pointer-events-none flex items-center justify-end px-16 z-40 pb-6">
        <button className="w-11 h-11 bg-white border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] rounded-[14px] flex items-center justify-center pointer-events-auto hover:bg-gray-50 transition-all">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
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
