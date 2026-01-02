
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useWorkspaceStore } from '../stores/workspaceStore';
import { usePresenter } from '../PresenterContext';
import { AssetType } from '../types';

const Canvas: React.FC = () => {
  const { workspaceManager } = usePresenter();
  const assets = useWorkspaceStore(s => s.assets);
  const selectedIds = useWorkspaceStore(s => s.selectedAssetIds);
  const zoom = useWorkspaceStore(s => s.zoom);
  const canvasOffset = useWorkspaceStore(s => s.canvasOffset);
  
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const screenToWorld = useCallback((clientX: number, clientY: number, currentZoom: number, currentOffset: { x: number; y: number }) => {
    const scale = currentZoom / 100;
    return { x: (clientX - currentOffset.x) / scale, y: (clientY - currentOffset.y) / scale };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, asset: any) => {
    e.stopPropagation();
    if (e.button === 1 || e.altKey) { setIsPanning(true); return; }
    workspaceManager.selectAsset(asset.id, e.shiftKey || e.metaKey);
    setDraggingId(asset.id);
    const worldPos = screenToWorld(e.clientX, e.clientY, zoom, canvasOffset);
    setDragOffset({ x: worldPos.x - asset.position.x, y: worldPos.y - asset.position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingId) {
      const worldPos = screenToWorld(e.clientX, e.clientY, zoom, canvasOffset);
      workspaceManager.moveAsset(draggingId, worldPos.x - dragOffset.x, worldPos.y - dragOffset.y);
    } else if (isPanning) {
      workspaceManager.setCanvasOffset(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
    }
  }, [draggingId, dragOffset, workspaceManager, isPanning, zoom, canvasOffset, screenToWorld]);

  const handleMouseUp = useCallback(() => { setDraggingId(null); setIsPanning(false); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const factor = e.deltaY > 0 ? -5 : 5;
        workspaceManager.adjustZoom(factor);
      } else {
        workspaceManager.setCanvasOffset(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [workspaceManager]);

  useEffect(() => {
    if (draggingId || isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, isPanning, handleMouseMove, handleMouseUp]);

  const scale = zoom / 100;

  return (
    <div 
      ref={containerRef}
      className={`canvas-container overflow-hidden select-none ${isPanning ? 'cursor-grabbing' : 'cursor-auto'}`}
      onClick={() => workspaceManager.selectAsset('', false)}
    >
      <div 
        className="dynamic-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#E8E8E8 0.75px, transparent 0.75px)`,
          backgroundSize: `${24 * scale}px ${24 * scale}px`,
          backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {assets.map((asset) => (
          <div
            key={asset.id}
            className={`absolute pointer-events-auto rounded-[28px] overflow-hidden bg-white/40 backdrop-blur-lg border border-white/60 transition-shadow duration-200 ${
              selectedIds.includes(asset.id) ? 'ring-2 ring-blue-500/50 shadow-2xl z-20' : 'z-10 shadow-sm'
            }`}
            style={{ left: asset.position.x, top: asset.position.y, width: asset.width, height: asset.height }}
            onMouseDown={(e) => handleMouseDown(e, asset)}
          >
             {asset.type === AssetType.IMAGE && (
              <img src={asset.content} className="w-full h-full object-cover pointer-events-none" />
            )}
            {(asset.type === AssetType.TEXT || asset.type === AssetType.CHARACTER || asset.type === AssetType.SCENE) && (
              <div className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{asset.type}</span>
                  </div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">{asset.title}</h4>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">{asset.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
