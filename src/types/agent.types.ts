// =============================================
// Типы: agent.types
// Путь: src/types/agent.types.ts
// Назначение: Общие типы для агентов и сообщений
// =============================================

export type Source = {
  text: string;
  score?: number;
  documentId?: string;
}

export type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  sources?: Source[];
  timestamp: string;
}

// Типы для статусов агентов
export type AgentType = 'rag' | 'vision' | 'web' | 'idle';

export type AgentStatus = {
  type: AgentType;
  message: string;
  isLoading: boolean;
}

// Типы для API запросов
export type ChatRequest = {
  message: string;
  agent_type: AgentType;
  threshold: number;
}

export type ChatResponse = {
  answer: string;
  sources: Source[];
}