// =============================================
// Компонент: VoiceButton
// Путь: src/components/Inputs/VoiceButton.tsx
// Назначение: Кнопка записи голоса
// =============================================

import { useRef, useState } from 'react';

interface VoiceButtonProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  onRecordingStateChange?: (isRecording: boolean) => void;  // новый пропс
  disabled?: boolean;
}

const VoiceButton = ({ onRecordingComplete, onRecordingStateChange, disabled = false }: VoiceButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>(([]));

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete?.(blob);
        chunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      onRecordingStateChange?.(true);  // сообщаем родителю
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
      alert('Не удалось получить доступ к микрофону');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      onRecordingStateChange?.(false);
    }
  };

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
      className={`p-3 rounded-lg transition-colors ${
        isRecording 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isRecording ? 'Остановить запись' : 'Записать голос'}
    >
      <i className={`fas fa-${isRecording ? 'stop' : 'microphone'} text-xl`}></i>
    </button>
  );
};

export default VoiceButton;