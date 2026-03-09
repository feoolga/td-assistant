import { useState } from 'react';
import type { AgentType, AgentStatus } from '../types/agent.types';

export const useAgentStatus = () => {
  const [status, setStatus] = useState<AgentStatus>({
    type: 'idle',
    message: '',
    isLoading: false
  });

  const startAgent = (type: AgentType, customMessage?: string) => {
    const messages = {
      rag: 'Ищу информацию в технической документации...',
      vision: 'Анализирую загруженное изображение...',
      web: 'Проверяю открытые источники...',
      idle: ''
    };

    setStatus({
      type,
      message: customMessage || messages[type],
      isLoading: true
    });
  };

  const stopAgent = () => {
    setStatus({
      type: 'idle',
      message: '',
      isLoading: false
    });
  };

  return {
    status,
    startAgent,
    stopAgent
  };
};