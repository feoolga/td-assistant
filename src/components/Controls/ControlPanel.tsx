// =============================================
// Компонент: ControlPanel
// Путь: src/components/Controls/ControlPanel.tsx
// Назначение: Панель управления (ползунок + счетчик)
// Пропсы:
//   - threshold: number
//   - onThresholdChange: (value: number) => void
//   - questionCount: number
// =============================================

import ThresholdSlider from './ThresholdSlider';
import CounterBadge from './CounterBadge';

interface ControlPanelProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  questionCount: number;
}

const ControlPanel = ({ threshold, onThresholdChange, questionCount }: ControlPanelProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <ThresholdSlider 
          value={threshold} 
          onChange={onThresholdChange} 
        />
        <CounterBadge count={questionCount} />
      </div>
    </div>
  );
};

export default ControlPanel;