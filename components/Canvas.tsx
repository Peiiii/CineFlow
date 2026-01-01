
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Asset, AssetType } from '../types';

interface CanvasProps {
  assets: Asset[];
  selectedIds: string[];
  zoom: number; // 这里的 zoom 是百分比
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

  // 计算世界坐标转换
  const screenToWorld = useCallback((clientX: number, clientY: number, currentZoom: number, currentOffset: { x: number; y: number }) => {
    const scale = currentZoom / 100;
    return {
      x: (clientX - currentOffset.x) / scale,
      y: (clientY - currentOffset.y) / scale
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation();
    // 鼠标中键或 Alt 拖拽背景平移
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

  // 核心：以特定点为中心的缩放逻辑
  const zoomAtPoint = useCallback((clientX: number, clientY: number, delta: number) => {
    const factor = delta > 0 ? 1.1 : 0.9;
    const oldScale = zoom / 100;
    const newZoom = Math.min(Math.max(zoom * factor, 10), 400);
    const newScale = newZoom / 100;

    // 缩放点在画布内的位置不应该改变
    // Offset_new = MousePos - (WorldPos * Scale_new)
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
      if (e.ctrlKey || e.metaKey) {
        // 缩放
        zoomAtPoint(e.clientX, e.clientY, -e.deltaY);
      } else {
        // 平移
        setCanvasOffset(prev => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY
        }));
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [zoomAtPoint]);

  // 处理触控手势
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.pageX - t2.pageX, t1.pageY - t2.pageY);
      const centerX = (t1.pageX + t2.pageX) / 2;
      const centerY = (t1.pageY + t2.pageY) / 2;

      if (lastTouchRef.current) {
        const delta = dist - lastTouchRef.current.distance;
        if (Math.abs(delta) > 2) {
          zoomAtPoint(centerX, centerY, delta);
        }
        // 同时支持双指平移
        setCanvasOffset(prev => ({
          x: prev.x + (centerX - lastTouchRef.current!.center.x),
          y: prev.y + (centerY - lastTouchRef.current!.center.y)
        }));
      }
      lastTouchRef.current = { distance: dist, center: { x: centerX, y: centerY } };
    }
  };

  useEffect(() => {
    if (draggingId || isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
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
      onTouchMove={onTouchMove}
      onTouchEnd={() => { lastTouchRef.current = null; }}
      onClick={() => onSelect('', false)}
      onMouseDown={(e) => { if (e.button === 1) setIsPanning(true); }}
    >
      {/* 动态网格底层 */}
      <div 
        className="dynamic-grid"
        style={{
          backgroundSize: `${24 * scale}px ${24 * scale}px`,
          backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
        }}
      />

      {/* 资产渲染层 */}
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
            {asset.type === AssetType.IMAGE ? (
              <div className="w-full h-full group relative">
                <img src={asset.content} alt={asset.title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] font-bold tracking-widest uppercase truncate">{asset.title}</p>
                </div>
              </div>
            ) : (
              <div className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{asset.type}</span>
                  </div>
                  <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-2">{asset.title}</h4>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4 font-light">{asset.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
