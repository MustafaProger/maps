import React from 'react';

interface FilterPanelProps {
  modelFilter: string[];
  statusFilter: string[];
  onModelFilterChange: (model: string) => void;
  onStatusFilterChange: (status: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  modelFilter,
  statusFilter,
  onModelFilterChange,
  onStatusFilterChange,
}) => {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-md p-4 w-64">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Device Model</h4>
        <div className="space-y-2">
          {['basic', 'advanced', 'special'].map((model) => (
            <div key={model} className="flex items-center">
              <input
                type="checkbox"
                id={`model-${model}`}
                checked={modelFilter.includes(model)}
                onChange={() => onModelFilterChange(model)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <label htmlFor={`model-${model}`} className="capitalize">{model}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Status</h4>
        <div className="space-y-2">
          {['on', 'off'].map((status) => (
            <div key={status} className="flex items-center">
              <input
                type="checkbox"
                id={`status-${status}`}
                checked={statusFilter.includes(status)}
                onChange={() => onStatusFilterChange(status)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <label htmlFor={`status-${status}`}>
                {status === 'on' ? 'Online' : 'Offline'}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;