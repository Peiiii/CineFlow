
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Asset, AssetType } from '../types';

interface CanvasProps {
  assets: Asset[];
  selectedIds: string[];
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onSelect: (id: string, multi: boolean) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ assets, selectedIds, zoom, onZoomChange, onSelect, onMove }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ distance: number; center: { x: number; y: number } } | null>(null);

  const screenToWorld = useCallback((clientX: number, clientY: number, currentZoom: number, currentOffset: { x: number; y: number }) => {
    const scale = currentZoom / 100;
    return {
      x: (clientX - currentOffset.x) / scale,
      y: (clientY - currentOffset.y) / scale
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation();
    if (e.button === 1 || e.altKey) {
      setIsPanning(true);
      return;
    }
    
    onSelect(asset.id, e.shiftKey || e.metaKey);
    setDraggingId(asset.id);
    
    const worldPos = screenToWorld(e.clientX, e.clientY, zoom, canvasOffset);
    setDragOffset({
      x: worldPos.x - asset.position.x,
      y: worldPos.y - asset.position.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingId) {
      const worldPos = screenToWorld(e.clientX, e.clientY, zoom, canvasOffset);
      onMove(draggingId, worldPos.x - dragOffset.x, worldPos.y - dragOffset.y);
    } else if (isPanning) {
      setCanvasOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [draggingId, dragOffset, onMove, isPanning, zoom, canvasOffset, screenToWorld]);

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
    setIsPanning(false);
  }, []);

  const zoomAtPoint = useCallback((clientX: number, clientY: number, delta: number) => {
    const factor = delta > 0 ? 1.1 : 0.9;
    const oldScale = zoom / 100;
    const newZoom = Math.min(Math.max(zoom * factor, 10), 400);
    const newScale = newZoom / 100;
    const worldPos = screenToWorld(clientX, clientY, zoom, canvasOffset);
    const newOffsetX = clientX - worldPos.x * newScale;
    const newOffsetY = clientY - worldPos.y * newScale;
    setCanvasOffset({ x: newOffsetX, y: newOffsetY });
    onZoomChange(Math.round(newZoom));
  }, [zoom, canvasOffset, onZoomChange, screenToWorld]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) zoomAtPoint(e.clientX, e.clientY, -e.deltaY);
      else setCanvasOffset(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [zoomAtPoint]);

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
      onClick={() => onSelect('', false)}
      onMouseDown={(e) => { if (e.button === 1) setIsPanning(true); }}
    >
      <div 
        className="dynamic-grid"
        style={{
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
            className={`absolute pointer-events-auto rounded-[28px] overflow-hidden glass-card transition-shadow duration-200 ${
              selectedIds.includes(asset.id) ? 'ring-2 ring-blue-500/50 active-shadow z-20' : 'z-10 soft-shadow border border-white/40'
            }`}
            style={{
              left: asset.position.x,
              top: asset.position.y,
              width: asset.width,
              height: asset.height,
              cursor: draggingId === asset.id ? 'grabbing' : 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, asset)}
          >
            {asset.type === AssetType.IMAGE && (
              <div className="w-full h-full group relative">
                <img src={asset.content} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] font-bold tracking-widest uppercase truncate">{asset.title}</p>
                </div>
              </div>
            )}
            {asset.type === AssetType.VIDEO && (
              <div className="w-full h-full group relative bg-black">
                <video src={asset.content} controls loop className="w-full h-full object-contain pointer-events-none" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Veo Render</div>
              </div>
            )}
            {(asset.type === AssetType.TEXT || asset.type === AssetType.CHARACTER || asset.type === AssetType.SCENE) && (
              <div className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${asset.type === AssetType.CHARACTER ? 'bg-orange-500' : asset.type === AssetType.SCENE ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{asset.type}</span>
                  </div>
                  <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-2">{asset.title}</h4>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4 font-light italic">"{asset.content}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
