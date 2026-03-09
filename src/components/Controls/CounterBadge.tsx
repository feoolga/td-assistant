// =============================================
// Компонент: CounterBadge
// Путь: src/components/Controls/CounterBadge.tsx
// Назначение: Отображение счетчика заданных вопросов
// Пропсы:
//   - count: number (количество вопросов)
// =============================================

interface CounterBadgeProps {
  count: number;
}

const CounterBadge = ({ count }: CounterBadgeProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-right">
        <div className="text-sm text-gray-500">Вопросов задано:</div>
        <div className="text-2xl font-bold text-cyan-600">{count}</div>
      </div>
    </div>
  );
};

export default CounterBadge;