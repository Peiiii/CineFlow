
import { create } from 'zustand';
import { Message } from '../types';

interface AgentState {
  messages: Message[];
  input: string;
  loading: boolean;
  setInput: (input: string) => void;
  setLoading: (loading: boolean) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  messages: [],
  input: '',
  loading: false,
  setInput: (input) => set({ input }),
  setLoading: (loading) => set({ loading }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
