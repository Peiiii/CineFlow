
export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  CHARACTER = 'CHARACTER',
  SCENE = 'SCENE'
}

export interface Asset {
  id: string;
  type: AssetType;
  content: string; // URL for images/videos, string for text
  title: string;
  description?: string;
  position: { x: number; y: number };
  width: number;
  height: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  attachments?: string[]; // IDs of assets included as context
  isGenerating?: boolean;
}

export interface WorkspaceState {
  assets: Asset[];
  selectedAssetIds: string[];
  zoom: number;
}
