import { apiClient } from './client';
import type { ChatRequest, ChatResponse } from '../types/agent.types';

export const api = {
  // Для текста
  sendMessage: (data: ChatRequest) => 
    apiClient.post<ChatResponse>('/chat', data),  // ← без третьего аргумента
    
  // Для картинок
  analyzeImage: (file: File, question: string, threshold: number) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('question', question);
    formData.append('threshold', threshold.toString());
    // Передаем true как часть data, указывая что это FormData
    return apiClient.post<ChatResponse>('/process', formData);
  },
  
  // Для голоса
  processVoice: (audioBlob: Blob, threshold: number) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('threshold', threshold.toString());
    return apiClient.post<ChatResponse>('/process', formData);
  }
};