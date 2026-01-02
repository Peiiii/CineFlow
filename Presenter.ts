
import { WorkspaceManager } from './managers/WorkspaceManager';
import { AgentManager } from './managers/AgentManager';

export class Presenter {
  workspaceManager = new WorkspaceManager();
  agentManager = new AgentManager();

  // 可在此添加全局协调逻辑或跨模块通信
  log = (msg: string) => console.log(`[Presenter]: ${msg}`);
}

export const presenter = new Presenter();
