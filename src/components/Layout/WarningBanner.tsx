// =============================================
// Компонент: WarningBanner
// Путь: src/components/Layout/WarningBanner.tsx
// Назначение: Предупреждение о том, что история не сохраняется
// =============================================

const WarningBanner = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-triangle text-yellow-400"></i>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-800">
            <strong>Внимание:</strong> История не сохраняется. 
            При закрытии или перезагрузке страницы все данные будут удалены.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBanner;