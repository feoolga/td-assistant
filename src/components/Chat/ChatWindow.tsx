// =============================================
// Компонент: ChatWindow
// Путь: src/components/Chat/ChatWindow.tsx
// Назначение: Основное окно чата (сообщения + ввод)
// Пропсы:
//   - messages: Message[]
//   - isLoading: boolean
//   - onSendMessage: (message: string) => void
// =============================================

import { useEffect, useRef } from 'react';
import type { Message } from '../../types/agent.types';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatWindow = ({ messages, isLoading, onSendMessage }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[400px]">
      {/* Заголовок чата */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <i className="fas fa-comments mr-2"></i> Диалог с ассистентом
        </h2>
      </div>

      {/* Окно сообщений */}
      <div className="flex-1 overflow-y-auto p-4 chat-scrollbar bg-gray-50 min-h-[300px]">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            {message.sender === 'user' ? (
              // Сообщение пользователя
              <div className="flex justify-end">
                <div className="bg-cyan-100 rounded-2xl rounded-br-none p-4 max-w-3xl">
                  <p className="text-gray-700">{message.text}</p>
                  <div className="text-xs opacity-80 mt-2 text-right">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ) : (
              // Сообщение бота
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <i className="fas fa-robot text-gray-600"></i>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 border border-cyan-300 rounded-2xl p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.text}</p>
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Индикатор печатания */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <i className="fas fa-robot text-gray-600"></i>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 border border-cyan-300 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span>Ищу информацию в технической документации...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Невидимый элемент для автоскролла */}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <MessageInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;