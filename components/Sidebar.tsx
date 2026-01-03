
import React, { useState } from 'react';
import { usePresenter } from '../PresenterContext';
import IconButton from './common/IconButton';

const tools = [
  { id: 'cursor', title: '选择', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5' },
  { id: 'plus', title: '新增', icon: 'M12 4v16m8-8H4' },
  { id: 'square', title: '矩形', icon: 'M4 4h16v16H4z' },
  { id: 'text', title: '文本', icon: 'M4 7V4h16v3M9 20h6M12 4v16' },
  { id: 'pen', title: '画笔', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { id: 'image', title: '素材', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'play', title: '放映', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' }
];

const Sidebar: React.FC = () => {
  const { workspaceManager } = usePresenter();
  const [activeTool, setActiveTool] = useState('cursor');

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white rounded-full border border-gray-100/60 p-2 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
        {tools.map((t) => (
          <IconButton
            key={t.id}
            title={t.title}
            active={activeTool === t.id}
            variant="sidebar"
            size="lg" // 侧边栏稍大，更易点击
            icon={
              <svg 
                className={`${t.id === 'play' ? 'w-3 h-3' : 'w-5 h-5'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={activeTool === t.id ? "2.5" : "1.8"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
            }
            onClick={() => {
              setActiveTool(t.id);
              if (t.id === 'plus') workspaceManager.addAsset({});
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
