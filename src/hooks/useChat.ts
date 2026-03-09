import { useState } from 'react';
import { api } from '../api/endpoints';  // ← импортируем API
import type { Message, Source, AgentType } from '../types/agent.types';
import { useAgentStatus } from './useAgentStatus';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Здравствуйте! Я помогу вам найти информацию в технической документации.\nЗадайте свой вопрос.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { status, startAgent, stopAgent } = useAgentStatus();

  const addMessage = (sender: 'user' | 'bot', text: string, sources?: Source[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      sources,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async (question: string, agentType: AgentType = 'rag') => {
    if (!question.trim()) return;

    // Добавляем сообщение пользователя
    addMessage('user', question);
    
    // Показываем индикатор загрузки
    setIsLoading(true);
    startAgent(agentType);

    try {
      // 🔥 РЕАЛЬНЫЙ ВЫЗОВ API
      const response = await api.sendMessage({
        message: question,
        agent_type: agentType,
        threshold: 0.5, // позже возьмем из слайдера
      });

      // Добавляем ответ бота
      addMessage('bot', response.answer, response.sources);
      
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      
      // Показываем сообщение об ошибке
      addMessage('bot', 
        'Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.'
      );
    } finally {
      setIsLoading(false);
      stopAgent();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Здравствуйте! Я помогу вам найти информацию в технической документации.\nЗадайте свой вопрос.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    stopAgent();
  };

  return {
    messages,
    isLoading,
    agentStatus: status,
    sendMessage,
    resetChat,
  };
};