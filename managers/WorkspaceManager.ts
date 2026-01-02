
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
    setZoom(Math.min(Math.max(zoom + delta, 10), 400));
  };

  setCanvasOffset = (offset: { x: number; y: number } | ((p:any)=>any)) => {
    useWorkspaceStore.getState().setCanvasOffset(offset);
  };
}
