import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Home, 
  Filter,
  Layers
} from 'lucide-react';

interface DeviceMapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleFilters: () => void;
  isFilterActive: boolean;
}

const DeviceMapControls: React.FC<DeviceMapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleFilters,
  isFilterActive
}) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <button 
          onClick={onZoomIn}
          className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button 
          onClick={onZoomOut}
          className="p-2 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-200"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button 
          onClick={onReset}
          className="p-2 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-200"
          title="Reset View"
        >
          <Home size={20} />
        </button>
        <button 
          onClick={onToggleFilters}
          className={`p-2 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-200 rounded-b-lg ${
            isFilterActive ? 'bg-blue-100 text-blue-600' : ''
          }`}
          title="Toggle Filters"
        >
          <Filter size={20} />
        </button>
      </div>
    </div>
  );
};

export default DeviceMapControls;