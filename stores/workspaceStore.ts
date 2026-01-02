
import { create } from 'zustand';
import { Asset } from '../types';

interface WorkspaceState {
  assets: Asset[];
  selectedAssetIds: string[];
  zoom: number;
  canvasOffset: { x: number; y: number };
  setAssets: (assets: Asset[] | ((prev: Asset[]) => Asset[])) => void;
  setSelectedAssetIds: (ids: string[]) => void;
  setZoom: (zoom: number) => void;
  setCanvasOffset: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  assets: [
    {
      id: 'ref-1',
      type: 'IMAGE' as any,
      title: '初始分镜预览',
      content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      position: { x: 400, y: 200 },
      width: 480, height: 320
    }
  ],
  selectedAssetIds: [],
  zoom: 33,
  canvasOffset: { x: 0, y: 0 },
  setAssets: (updater) => set((state) => ({ 
    assets: typeof updater === 'function' ? updater(state.assets) : updater 
  })),
  setSelectedAssetIds: (ids) => set({ selectedAssetIds: ids }),
  setZoom: (zoom) => set({ zoom }),
  setCanvasOffset: (updater) => set((state) => ({ 
    canvasOffset: typeof updater === 'function' ? updater(state.canvasOffset) : updater 
  })),
}));
