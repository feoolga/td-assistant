import { useState } from 'react';
import type { Message, Source, AgentType } from '../types/agent.types';
import { useAgentStatus } from './useAgentStatus';  // новый импорт

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
  const { status, startAgent, stopAgent } = useAgentStatus();  // добавляем статусы

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
    
    // Запускаем нужного агента
    setIsLoading(true);
    startAgent(agentType);
    
    // Пока имитируем ответ через секунду
    setTimeout(() => {
      const testSources = [
        {
          text: 'Согласно технической документации ГОСТ 1234-2020, допустимые параметры работы оборудования составляют от -20°C до +50°C при влажности не более 80%.',
          score: 0.95
        },
        {
          text: 'В разделе 3.2 инструкции по эксплуатации указано, что при температурах ниже -10°C рекомендуется использовать предварительный прогрев в течение 15 минут.',
          score: 0.82
        }
      ];

      addMessage('bot', 
        'На основе технической документации, оборудование может работать при температурах от -20°C до +50°C.',
        testSources
      );
      
      // Останавливаем агента
      setIsLoading(false);
      stopAgent();
    }, 2000);
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
    stopAgent(); // сбрасываем статус при очистке чата
  };

  return {
    messages,
    isLoading,
    agentStatus: status,  // добавляем статус в возвращаемые значения
    sendMessage,
    resetChat,
  };
};