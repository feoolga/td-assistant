import type { Source } from '../../types/agent.types';

interface SourcesListProps {
  sources: Source[];
}

const SourcesList = ({ sources }: SourcesListProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="text-sm font-medium text-gray-600 mb-2">
        <i className="fas fa-book-open mr-1"></i> Использованные источники:
      </div>
      <div className="space-y-2">
        {sources.map((source, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 text-sm">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-gray-700">Источник {idx + 1}</span>
              {source.score && (
                <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full">
                  Релевантность: {(source.score * 100).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="text-gray-600">
              {source.text.substring(0, 200)}
              {source.text.length > 200 ? '...' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesList;