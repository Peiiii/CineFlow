
import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPanel from './components/AgentPanel';
import ProjectHeader from './components/layout/ProjectHeader';
import ZoomControls from './components/layout/ZoomControls';
import CanvasPlaceholder from './components/layout/CanvasPlaceholder';
import IconButton from './components/common/IconButton';
import { PresenterProvider, usePresenter } from './PresenterContext';
import { useWorkspaceStore } from './stores/workspaceStore';

const AppContent: React.FC = () => {
  const { workspaceManager } = usePresenter();
  const zoom = useWorkspaceStore(s => s.zoom);
  const assets = useWorkspaceStore(s => s.assets);

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] overflow-hidden text-black">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-[400px] h-[100px] flex items-center justify-between px-16 z-40 pointer-events-none">
        <ProjectHeader />
        <ZoomControls 
          zoom={zoom} 
          onZoom={workspaceManager.adjustZoom} 
          onReset={workspaceManager.resetZoom}
          onFit={workspaceManager.fitToView}
        />
      </header>

      <main className="flex-1 relative">
        <Sidebar />
        <Canvas />
        
        {assets.length === 0 && <CanvasPlaceholder />}
      </main>

      <AgentPanel />

      {/* 极简页脚 */}
      <footer className="fixed bottom-0 left-0 right-[400px] h-20 pointer-events-none flex items-center justify-end px-16 z-40 pb-6">
        <IconButton 
          variant="subtle"
          size="xl"
          rounded="14"
          className="pointer-events-auto"
          icon={
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          }
        />
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
