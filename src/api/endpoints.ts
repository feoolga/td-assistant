import { apiClient } from './client';
import type { ChatRequest, ChatResponse } from '../types/agent.types';

export const api = {
  // Отправка сообщения в чат
  sendMessage: (data: ChatRequest) => 
    apiClient.post<ChatResponse>('/chat', data),

  // Позже добавим другие методы
  // uploadImage: (file: File) => ...
  // searchWeb: (query: string) => ...
};