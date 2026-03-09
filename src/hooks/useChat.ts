import { useState } from 'react';
import { api } from '../api/endpoints';
import type { Message, Source } from '../types/agent.types';
import { useAgentStatus } from './useAgentStatus';

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
  const { status, startLoading, stopLoading } = useAgentStatus();

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

  // Отправка текстового сообщения
  const sendMessage = async (question: string) => {
    if (!question.trim()) return;

    // Добавляем сообщение пользователя
    addMessage('user', question);
    
    setIsLoading(true);
    startLoading('text');

    try {
      const response = await api.sendMessage({
        message: question,
        threshold: initialThreshold / 100,
      });

      addMessage('bot', response.answer, response.sources);
      
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      addMessage('bot', 
        'Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.'
      );
    } finally {
      setIsLoading(false);
      stopLoading();
    }
  };

  // Отправка изображения
  const sendImage = async (file: File, question: string = 'Что на этом изображении?') => {
    // Добавляем сообщение пользователя с пометкой, что это изображение
    addMessage('user', `🖼️ ${question}`);
    
    setIsLoading(true);
    startLoading('image');

    try {
      const response = await api.analyzeImage(file, question, initialThreshold / 100);
      addMessage('bot', response.answer, response.sources);
    } catch (error) {
      console.error('Ошибка при анализе изображения:', error);
      addMessage('bot', 
        'Извините, не удалось проанализировать изображение. Пожалуйста, попробуйте другое фото или проверьте формат файла.'
      );
    } finally {
      setIsLoading(false);
      stopLoading();
    }
  };

  // Отправка голосового сообщения
  const sendVoice = async (audioBlob: Blob) => {
    // Добавляем сообщение пользователя с пометкой, что это голос
    addMessage('user', '🎤 Голосовое сообщение');
    
    setIsLoading(true);
    startLoading('voice');

    try {
      const response = await api.processVoice(audioBlob, initialThreshold / 100);
      addMessage('bot', response.answer, response.sources);
    } catch (error) {
      console.error('Ошибка при обработке голоса:', error);
      addMessage('bot', 
        'Извините, не удалось обработать голосовое сообщение. Пожалуйста, попробуйте еще раз.'
      );
    } finally {
      setIsLoading(false);
      stopLoading();
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
    stopLoading();
  };

  return {
    messages,
    isLoading,
    loadingStatus: status,
    sendMessage,
    sendImage,
    sendVoice,
    resetChat,
  };
};