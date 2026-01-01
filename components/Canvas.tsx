
import React, { useState, useEffect, useCallback } from 'react';
import { Asset, AssetType } from '../types';

interface CanvasProps {
  assets: Asset[];
  selectedIds: string[];
  onSelect: (id: string, multi: boolean) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ assets, selectedIds, onSelect, onMove }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation();
    onSelect(asset.id, e.shiftKey || e.metaKey);
    setDraggingId(asset.id);
    setDragOffset({
      x: e.clientX - asset.position.x,
      y: e.clientY - asset.position.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingId) {
      onMove(draggingId, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }
  }, [draggingId, dragOffset, onMove]);

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  useEffect(() => {
    if (draggingId) {
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
  }, [draggingId, handleMouseMove, handleMouseUp]);

  return (
    <div 
      className="w-full h-full canvas-grid relative overflow-hidden select-none"
      onClick={() => onSelect('', false)}
    >
      {assets.map((asset) => (
        <div
          key={asset.id}
          className={`absolute asset-transition rounded-3xl overflow-hidden glass-card soft-shadow ${
            selectedIds.includes(asset.id) ? 'ring-2 ring-blue-500 active-shadow scale-[1.01] z-20' : 'z-10 hover:shadow-md'
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
            <div className="w-full h-full group">
              <img src={asset.content} alt={asset.title} className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[11px] font-medium tracking-tight truncate">{asset.title}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{asset.type}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 leading-snug">{asset.title}</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{asset.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
