import React, { useState, useRef } from 'react';

const TestVoice: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permission, setPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermission('granted');
      return true;
    } catch (err) {
      console.error('Нет доступа к микрофону:', err);
      setPermission('denied');
      return false;
    }
  };

  const startRecording = async () => {
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      alert('Нужен доступ к микрофону для записи');
      return;
    }

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
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setServerResponse(null); // сбрасываем старый ответ
        chunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      
    } catch (err) {
      console.error('Ошибка при записи:', err);
      alert('Не удалось начать запись');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToServer = async () => {
    if (!audioUrl) return;
    
    setIsSending(true);
    
    try {
      // ПОКА ЧТО ИМИТИРУЕМ ОТПРАВКУ
      // Потом заменишь на настоящий fetch к бэку
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Фейковый ответ от сервера
      const fakeResponse = {
        status: 'ok',
        message: 'Голосовое сообщение получено',
        text: 'Распознанный текст: "Какой-то текст из голоса"',
        duration: '2.5 секунды'
      };
      
      setServerResponse(JSON.stringify(fakeResponse, null, 2));
      
      /* РАСКОММЕНТИРУЙ, КОГДА БУДЕТ НАСТОЯЩИЙ БЭК
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      
      const res = await fetch('http://localhost:5000/voice', {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        const data = await res.json();
        setServerResponse(JSON.stringify(data, null, 2));
      } else {
        setServerResponse('Ошибка на сервере: ' + res.status);
      }
      */
      
    } catch (err) {
      console.error('Ошибка:', err);
      setServerResponse('Ошибка при отправке: ' + (err instanceof Error ? err.message : 'неизвестная ошибка'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Тест записи голоса</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-red-600"
          >
            {isRecording ? '🔴 Запись...' : '🎤 Начать запись'}
          </button>
          
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-gray-600"
          >
            ⏹ Стоп
          </button>
        </div>

        {audioUrl && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <audio src={audioUrl} controls className="w-full" />
            
            <button
              onClick={sendToServer}
              disabled={isSending}
              className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300"
            >
              {isSending ? '⏳ Отправка...' : '📤 Отправить на сервер'}
            </button>
          </div>
        )}

        {serverResponse && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-700 mb-2">✅ Ответ от сервера:</div>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {serverResponse}
            </pre>
          </div>
        )}

        {permission === 'denied' && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
            ❌ Нет доступа к микрофону. Проверь разрешения в браузере.
          </div>
        )}

        <div className="text-xs text-gray-400 mt-4">
          ⚡ Сейчас работаем в режиме демо — ответ от сервера фейковый
        </div>
      </div>
    </div>
  );
};

export default TestVoice;