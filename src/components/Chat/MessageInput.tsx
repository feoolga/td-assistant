// =============================================
// Компонент: MessageInput
// Путь: src/components/Chat/MessageInput.tsx
// Назначение: Поле ввода с кнопками
// =============================================

import { useState } from 'react';
import type { FormEvent } from 'react';
import VoiceButton from '../Inputs/VoiceButton';
import AttachButton from '../Inputs/AttachButton';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendFile?: (file: File) => void;  // новый пропс для отправки файлов
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, onSendFile, disabled = false }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled && !isRecording) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log('Запись готова, размер:', audioBlob.size);
    setIsRecording(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Создаем превью для картинки
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSendFile = () => {
    if (selectedFile && onSendFile) {
      onSendFile(selectedFile);
      // Очищаем
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="border-gray-300 border-t p-4 bg-white">
      {/* Превью выбранного файла */}
      {selectedFile && previewUrl && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center gap-3">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1 text-sm text-gray-600">
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSendFile}
              className="px-3 py-1 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600"
            >
              Отправить
            </button>
            <button
              type="button"
              onClick={handleCancelFile}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Кнопка прикрепления */}
        <AttachButton 
          onFileSelect={handleFileSelect}
          disabled={disabled || isRecording || !!selectedFile}
        />
        
        {/* Поле ввода */}
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled || isRecording || !!selectedFile}
            placeholder={
              selectedFile 
                ? 'Файл выбран. Нажмите "Отправить" под превью' 
                : isRecording 
                  ? 'Идет запись...' 
                  : 'Вопрос ассистенту'
            }
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>

        {/* Кнопка микрофона */}
        <VoiceButton 
          onRecordingComplete={handleRecordingComplete}
          onRecordingStateChange={setIsRecording}
          disabled={disabled || !!selectedFile}
        />

        {/* Кнопка отправки текста */}
        <button 
          type="submit"
          disabled={disabled || !inputValue.trim() || isRecording || !!selectedFile}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <i className="fas fa-paper-plane"></i>
          <span className="hidden md:inline">Отправить</span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;