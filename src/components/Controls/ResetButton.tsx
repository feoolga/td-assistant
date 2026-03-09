// =============================================
// Компонент: ResetButton
// Путь: src/components/Controls/ResetButton.tsx
// Назначение: Кнопка сброса диалога
// Пропсы:
//   - onReset: () => void (функция, вызываемая при клике)
// =============================================

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  return (
    <div className="flex justify-end mb-3">
      <button 
        onClick={onReset}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
      >
        <i className="fas fa-redo mr-2"></i>
        Новый диалог
      </button>
    </div>
  );
};

export default ResetButton;