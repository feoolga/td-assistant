// =============================================
// Компонент: AttachButton
// Путь: src/components/Inputs/AttachButton.tsx
// Назначение: Кнопка прикрепления файлов
// Пропсы:
//   - onFileSelect: (file: File) => void
//   - disabled?: boolean
// =============================================

import { useRef } from 'react';

interface AttachButtonProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const AttachButton = ({ onFileSelect, disabled = false }: AttachButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверка типа (картинки)
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }
      
      // Проверка размера (10MB максимум)
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл слишком большой. Максимум 10MB');
        return;
      }

      onFileSelect(file);
    }
    // Сбрасываем input, чтобы можно было выбрать тот же файл повторно
    e.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Прикрепить изображение"
      >
        <i className="fas fa-paperclip text-xl"></i>
      </button>
    </>
  );
};

export default AttachButton;