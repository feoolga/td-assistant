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
export type LoadingType = 'text' | 'image' | 'voice' | 'idle';

export type LoadingStatus = {
  type: LoadingType;
  message: string;
  isLoading: boolean;
}

// Типы для API запросов
export type ChatRequest = {
  message: string;
  threshold: number;  // threshold оставляем, это настройка поиска
}

export type ChatResponse = {
  answer: string;
  sources: Source[];
}