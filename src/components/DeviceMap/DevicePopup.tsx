import React from 'react';
import { IDevice } from '../../types/Device';

interface DevicePopupProps {
  device: IDevice;
}

const DevicePopup: React.FC<DevicePopupProps> = ({ device }) => {
  return (
    <div className="device-popup min-w-[220px]">
      <div className="device-popup__header text-lg font-semibold">{device.name}</div>
      
      <div className="space-y-2 mt-2">
        <div className="device-popup__row">
          <span className="device-popup__label">ID:</span>
          <span className="device-popup__value font-mono text-sm">{device.id}</span>
        </div>
        
        <div className="device-popup__row">
          <span className="device-popup__label">Model:</span>
          <span className="device-popup__value capitalize">{device.model}</span>
        </div>
        
        <div className="device-popup__row">
          <span className="device-popup__label">Status:</span>
          <span className="device-popup__value flex items-center">
            <span className={`status-indicator status-indicator--${device.status}`}></span>
            {device.status === 'on' ? 'Online' : 'Offline'}
          </span>
        </div>
        
        <div className="device-popup__row">
          <span className="device-popup__label">Location:</span>
          <span className="device-popup__value font-mono text-sm">
            {device.lat.toFixed(6)}, {device.lon.toFixed(6)}
          </span>
        </div>
        
        {device.children && device.children.length > 0 && (
          <div className="mt-2">
            <div className="font-medium mb-1">Child Devices:</div>
            <ul className="text-sm">
              {device.children.map(child => (
                <li key={child.id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                  <span>{child.name}</span>
                  <span className={`status-indicator status-indicator--${child.status} inline-block`}></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicePopup;