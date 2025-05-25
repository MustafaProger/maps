import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Laptop, Cpu, ServerOff, Antenna, Wifi } from 'lucide-react';
import { IDevice } from '../../types/Device';
import DevicePopup from './DevicePopup';

interface DeviceMarkerProps {
  device: IDevice;
  isChild?: boolean;
  isDraggable?: boolean;
  onDragEnd?: (id: string, position: { lat: number; lng: number }) => void;
}

const DeviceMarker: React.FC<DeviceMarkerProps> = ({
  device,
  isChild = false,
  isDraggable = false,
  onDragEnd,
}) => {
  const getDeviceIcon = () => {
    let IconComponent;
    
    switch (device.model) {
      case 'basic':
        IconComponent = Wifi;
        break;
      case 'advanced':
        IconComponent = Antenna;
        break;
      case 'special':
        IconComponent = Cpu;
        break;
      default:
        IconComponent = Laptop;
    }
    
    const statusClass = device.status === 'on' ? 'text-white' : 'text-gray-300';
    const modelClass = `device-marker--${device.model}`;
    const childClass = isChild ? 'child-marker' : '';
    const draggableClass = isDraggable ? 'draggable-marker' : '';
    const statusModifier = device.status === 'off' ? 'device-marker--off' : '';
    
    const html = document.createElement('div');
    html.className = `device-marker ${modelClass} ${childClass} ${draggableClass} ${statusModifier}`;
    
    // Render the icon into the HTML string
    const iconSize = isChild ? 14 : 18;
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${statusClass}">
      ${IconComponent === Wifi ? 
        '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>' : 
      IconComponent === Antenna ? 
        '<path d="M12 5v14"/><path d="M18 12H6"/><circle cx="12" cy="12" r="7"/>' :
      IconComponent === Cpu ? 
        '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>' :
      '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/>'
      }
    </svg>`;
    
    html.innerHTML = iconSvg;
    
    return divIcon({
      html: html,
      className: 'device-marker-icon',
      iconSize: [isChild ? 20 : 30, isChild ? 20 : 30],
      iconAnchor: [isChild ? 10 : 15, isChild ? 10 : 15],
    });
  };

  const handleDragEnd = (e: any) => {
    if (isDraggable && onDragEnd) {
      const { lat, lng } = e.target.getLatLng();
      onDragEnd(device.id, { lat, lng });
    }
  };

  return (
    <>
      <Marker
        position={[device.lat, device.lon]}
        icon={getDeviceIcon()}
        draggable={isDraggable}
        eventHandlers={
          isDraggable
            ? {
                dragend: handleDragEnd,
              }
            : undefined
        }
      >
        <Popup>
          <DevicePopup device={device} />
        </Popup>
      </Marker>

      {device.children?.map((child) => (
        <DeviceMarker key={child.id} device={child} isChild={true} />
      ))}
    </>
  );
};

export default DeviceMarker;