// =============================================
// Хук: useChat
// Путь: src/hooks/useChat.ts
// Назначение: Управление состоянием чата
// =============================================

import { useState } from 'react';
import type { Message, Source } from '../types/agent.types';

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

  const sendMessage = async (question: string) => {
    if (!question.trim()) return;

    // Добавляем сообщение пользователя
    addMessage('user', question);
    
    // Здесь позже будет вызов API
    setIsLoading(true);
    
    // Пока имитируем ответ с источниками через секунду
    setTimeout(() => {
      // Тестовые данные с источниками
      const testSources = [
        {
          text: 'Согласно технической документации ГОСТ 1234-2020, допустимые параметры работы оборудования составляют от -20°C до +50°C при влажности не более 80%.',
          score: 0.95
        },
        {
          text: 'В разделе 3.2 инструкции по эксплуатации указано, что при температурах ниже -10°C рекомендуется использовать предварительный прогрев в течение 15 минут.',
          score: 0.82
        },
        {
          text: 'Технический паспорт изделия, страница 7: "Устройство сохраняет работоспособность при кратковременном (до 1 часа) воздействии температур до -30°C".',
          score: 0.78
        }
      ];

      addMessage('bot', 
        'На основе технической документации, оборудование может работать при температурах от -20°C до +50°C. При сильных морозах рекомендуется предварительный прогрев.',
        testSources  // ← передаем источники третьим аргументом
      );
      setIsLoading(false);
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
  };

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
  };
};