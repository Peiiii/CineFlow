
import { useWorkspaceStore } from '../stores/workspaceStore';
import { Asset } from '../types';

export class WorkspaceManager {
  addAsset = (asset: Partial<Asset>) => {
    const { setAssets } = useWorkspaceStore.getState();
    setAssets(prev => [...prev, {
      id: Date.now().toString(),
      type: asset.type || 'IMAGE' as any,
      title: asset.title || '新资产',
      content: asset.content || '',
      position: asset.position || { x: 500, y: 300 },
      width: asset.width || 340, height: 220
    }]);
  };

  moveAsset = (id: string, x: number, y: number) => {
    const { setAssets } = useWorkspaceStore.getState();
    setAssets(prev => prev.map(a => a.id === id ? { ...a, position: { x, y } } : a));
  };

  selectAsset = (id: string, multi: boolean) => {
    const { selectedAssetIds, setSelectedAssetIds } = useWorkspaceStore.getState();
    if (!id) {
      setSelectedAssetIds([]);
      return;
    }
    setSelectedAssetIds(multi ? [...selectedAssetIds, id] : [id]);
  };

  adjustZoom = (delta: number) => {
    const { zoom, setZoom } = useWorkspaceStore.getState();
    setZoom(Math.min(Math.max(zoom + delta, 5), 400));
  };

  setCanvasOffset = (offset: { x: number; y: number } | ((p:any)=>any)) => {
    useWorkspaceStore.getState().setCanvasOffset(offset);
  };

  resetZoom = () => {
    const { setZoom, setCanvasOffset } = useWorkspaceStore.getState();
    setZoom(100);
    setCanvasOffset({ x: 0, y: 0 });
  };

  fitToView = () => {
    const { assets, setZoom, setCanvasOffset } = useWorkspaceStore.getState();
    if (assets.length === 0) {
      this.resetZoom();
      return;
    }

    // 1. 计算资产包围盒
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    assets.forEach(a => {
      minX = Math.min(minX, a.position.x);
      minY = Math.min(minY, a.position.y);
      maxX = Math.max(maxX, a.position.x + a.width);
      maxY = Math.max(maxY, a.position.y + a.height);
    });

    const contentW = maxX - minX;
    const contentH = maxY - minY;

    // 2. 获取视口大小 (减去侧边栏和 AgentPanel 的预估宽度)
    const viewportW = window.innerWidth - 100 - 400; 
    const viewportH = window.innerHeight - 100;

    // 3. 计算缩放比 (留出 15% 的边距)
    const padding = 0.85;
    const scaleX = (viewportW * padding) / contentW;
    const scaleY = (viewportH * padding) / contentH;
    const newZoom = Math.min(scaleX, scaleY, 2) * 100; // 最大不超过 200%

    // 4. 计算中心偏移
    const centerX = 100 + (viewportW / 2); // 100 是侧边栏侧的预留
    const centerY = window.innerHeight / 2;
    
    const worldCenterX = minX + (contentW / 2);
    const worldCenterY = minY + (contentH / 2);

    const scale = newZoom / 100;
    const newOffsetX = centerX - (worldCenterX * scale);
    const newOffsetY = centerY - (worldCenterY * scale);

    setZoom(Math.floor(newZoom));
    setCanvasOffset({ x: newOffsetX, y: newOffsetY });
  };
}
