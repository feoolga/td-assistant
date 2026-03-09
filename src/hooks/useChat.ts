import { useState } from 'react';
import { api } from '../api/endpoints';
import type { Message, Source, AgentType } from '../types/agent.types';
import { useAgentStatus } from './useAgentStatus';

// Добавляем параметр threshold в хук
export const useChat = (initialThreshold: number = 50) => {
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

  // Теперь sendMessage принимает вопрос и тип агента
  const sendMessage = async (question: string, agentType: AgentType = 'rag') => {
    if (!question.trim()) return;

    // Добавляем сообщение пользователя
    addMessage('user', question);
    
    setIsLoading(true);
    startAgent(agentType);

    try {
      // 🔥 ИСПОЛЬЗУЕМ threshold из параметров хука
      const response = await api.sendMessage({
        message: question,
        agent_type: agentType,
        threshold: initialThreshold / 100, // конвертируем проценты в 0-1
      });

      addMessage('bot', response.answer, response.sources);
      
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
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