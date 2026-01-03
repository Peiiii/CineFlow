
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
      {/* 顶部导航 - 右侧间距从 540px 调整为 400px */}
      <header className="fixed top-0 left-0 right-[400px] h-[100px] flex items-center justify-between px-16 z-40 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer hover:bg-[#F8F8F8] px-4 py-2.5 rounded-[20px] transition-all">
          <div className="w-[42px] h-[42px] bg-black rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-black/20">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[18px] font-black tracking-tight">未命名项目</h1>
            <svg className="w-4 h-4 text-[#D0D0D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        
        {/* 缩放控制器 - 尺寸微调 */}
        <div className="flex items-center bg-white rounded-full px-2.5 py-1.5 border border-gray-100/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] h-[54px] pointer-events-auto">
          <button onClick={() => workspaceManager.adjustZoom(-5)} className="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-xl transition-all">−</button>
          <span className="text-[14px] font-black text-black min-w-[64px] text-center select-none tracking-tight">{zoom}%</span>
          <button onClick={() => workspaceManager.adjustZoom(5)} className="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-gray-50 font-black text-xl transition-all">+</button>
        </div>
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas />
        
        {/* 中心占位 - 视觉微调 */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="w-[380px] h-[380px] text-[#F9F9F9] relative flex items-center justify-center">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[140px] bg-gradient-to-br from-[#FF9D4D] via-[#BD5AFF] to-[#00C2FF] rounded-[28px] shadow-2xl shadow-blue-500/10 border-[3px] border-white/50" />
          </div>
          <p className="text-center font-black tracking-[1em] -mt-5 text-[#F0F0F0] text-[16px] uppercase">Ready to shoot</p>
        </div>
      </main>

      <AgentPanel />

      {/* 极简页脚按钮 - 右侧间距适配 */}
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
