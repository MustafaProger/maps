import React from 'react';
import { Wifi, Antenna, Cpu } from 'lucide-react';

const DeviceMapLegend: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
      <h3 className="text-lg font-semibold mb-3">Legend</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Device Models</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="device-marker device-marker--basic mr-2 w-6 h-6">
                <Wifi size={14} className="text-white" />
              </div>
              <span>Basic</span>
            </div>
            <div className="flex items-center">
              <div className="device-marker device-marker--advanced mr-2 w-6 h-6">
                <Antenna size={14} className="text-white" />
              </div>
              <span>Advanced</span>
            </div>
            <div className="flex items-center">
              <div className="device-marker device-marker--special mr-2 w-6 h-6">
                <Cpu size={14} className="text-white" />
              </div>
              <span>Special</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="status-indicator status-indicator--on mr-2"></span>
              <span>Online</span>
            </div>
            <div className="flex items-center">
              <span className="status-indicator status-indicator--off mr-2"></span>
              <span>Offline</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Special Indicators</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="device-marker device-marker--advanced draggable-marker mr-2 w-6 h-6">
                <Antenna size={14} className="text-white" />
              </div>
              <span>Draggable Device</span>
            </div>
            <div className="flex items-center">
              <div className="device-marker device-marker--basic child-marker mr-2 w-4 h-4">
                <Wifi size={10} className="text-white" />
              </div>
              <span>Child Device</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Double-click on map to zoom in at that location</p>
        <p>Click on any marker to see device details</p>
      </div>
    </div>
  );
};

export default DeviceMapLegend;