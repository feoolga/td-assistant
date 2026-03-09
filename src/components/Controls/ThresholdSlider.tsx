// =============================================
// Компонент: ThresholdSlider
// Путь: src/components/Controls/ThresholdSlider.tsx
// Назначение: Ползунок для настройки энциклопедичности
// Пропсы:
//   - value: number (текущее значение)
//   - onChange: (value: number) => void (функция при изменении)
// =============================================

interface ThresholdSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ThresholdSlider = ({ value, onChange }: ThresholdSliderProps) => {
  return (
    <div className="flex-1">
      <label className="block mb-2">
        <span className="text-lg font-semibold text-gray-700">
          Энциклопедичность ответа
        </span>
        <span className="ml-2 text-cyan-600 font-bold">{value}%</span>
      </label>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">Свободно</span>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: '#e5e7eb',
            backgroundImage: `linear-gradient( #a5e8fa, #0d95ba)`,
            backgroundSize: `${value}% 100%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
        <span className="text-sm text-gray-500 whitespace-nowrap">Строго</span>
      </div>
    </div>
  );
};

export default ThresholdSlider;