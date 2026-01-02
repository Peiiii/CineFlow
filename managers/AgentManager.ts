
import { useAgentStore } from '../stores/agentStore';
import { useWorkspaceStore } from '../stores/workspaceStore';
import { geminiService } from '../services/geminiService';

export class AgentManager {
  sendMessage = async () => {
    const { input, setInput, setLoading, addMessage } = useAgentStore.getState();
    const { assets, selectedAssetIds } = useWorkspaceStore.getState();
    
    if (!input.trim()) return;

    const selectedAssets = assets.filter(a => selectedAssetIds.includes(a.id));
    const userMsg = { id: Date.now().toString(), role: 'user' as const, text: input };
    addMessage(userMsg);
    
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await geminiService.generateWithTools(currentInput, selectedAssets);
      if (res.text) {
        addMessage({ id: 'a' + Date.now(), role: 'assistant' as const, text: res.text });
      }
    } catch (e) {
      console.error("Agent logic failed", e);
    } finally {
      setLoading(false);
    }
  };

  updateInput = (val: string) => {
    useAgentStore.getState().setInput(val);
  };
}
