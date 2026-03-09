import { useState } from 'react';
import type { LoadingType, LoadingStatus } from '../types/agent.types';  // ← новые имена

export const useAgentStatus = () => {
  const [status, setStatus] = useState<LoadingStatus>({
    type: 'idle',
    message: '',
    isLoading: false
  });

  // Теперь эта функция только для UI, никак не связана с бэком
  const startLoading = (type: LoadingType, customMessage?: string) => {
    const messages = {
      text: 'Ищу информацию в технической документации...',
      image: 'Анализирую изображение...',
      voice: 'Обрабатываю голосовое сообщение...',
      idle: ''
    };

    setStatus({
      type,
      message: customMessage || messages[type],
      isLoading: true
    });
  };

  const stopLoading = () => {
    setStatus({
      type: 'idle',
      message: '',
      isLoading: false
    });
  };

  return {
    status,
    startLoading,  // ← переименовали
    stopLoading    // ← переименовали
  };
};