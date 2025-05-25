import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { LatLngBounds, LatLngTuple } from 'leaflet';
import { IDevice, IMarkerPosition } from '../../types/Device';
import DeviceMarker from './DeviceMarker';
import DeviceMapControls from './DeviceMapControls';
import FilterPanel from './FilterPanel';
import '../../styles/leaflet.css';

interface DeviceMapProps {
  devices: IDevice[];
  center?: [number, number];
  zoom?: number;
}

// Helper component to handle map events
const MapEventHandler: React.FC<{
  onDblClick: (lat: number, lng: number) => void;
}> = ({ onDblClick }) => {
  const map = useMapEvents({
    dblclick: (e) => {
      const { lat, lng } = e.latlng;
      onDblClick(lat, lng);
    },
  });
  
  return null;
};

// Helper component to control map
const MapController: React.FC<{
  center?: [number, number];
  zoom?: number;
  fitBounds?: LatLngBounds;
}> = ({ center, zoom, fitBounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    } else if (fitBounds) {
      map.fitBounds(fitBounds);
    }
  }, [map, center, zoom, fitBounds]);
  
  return null;
};

const DeviceMap: React.FC<DeviceMapProps> = ({
  devices,
  center = [51.505, -0.09],
  zoom = 13,
}) => {
  const [activeCenter, setActiveCenter] = useState<LatLngTuple | undefined>(
    center as LatLngTuple
  );
  const [activeZoom, setActiveZoom] = useState<number | undefined>(zoom);
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>(devices);
  const [modelFilter, setModelFilter] = useState<string[]>(['basic', 'advanced', 'special']);
  const [statusFilter, setStatusFilter] = useState<string[]>(['on', 'off']);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [draggablePosition, setDraggablePosition] = useState<IMarkerPosition | null>(null);
  const mapRef = useRef<any>(null);

  // Find the draggable device
  const draggableDevice = devices.find(device => device.id === 'd006');

  useEffect(() => {
    // Apply filters
    const filtered = devices.filter(
      (device) =>
        modelFilter.includes(device.model) && statusFilter.includes(device.status)
    );
    
    setFilteredDevices(filtered);
  }, [devices, modelFilter, statusFilter]);

  const handleModelFilterChange = (model: string) => {
    setModelFilter((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleDoubleClick = (lat: number, lng: number) => {
    setActiveCenter([lat, lng]);
    setActiveZoom((prev) => (prev ? prev + 1 : 15));
  };

  const handleZoomIn = () => {
    setActiveZoom((prev) => (prev ? prev + 1 : 15));
  };

  const handleZoomOut = () => {
    setActiveZoom((prev) => (prev ? prev - 1 : 11));
  };

  const handleReset = () => {
    setActiveCenter(center as LatLngTuple);
    setActiveZoom(zoom);
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleDragEnd = (id: string, position: IMarkerPosition) => {
    console.log(`Device ${id} moved to:`, position);
    setDraggablePosition(position);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredDevices.map((device) => {
          // Skip children as they are rendered by their parent component
          if (device.id.includes('-')) return null;
          
          const isDraggable = device.id === 'd006';
          
          return (
            <DeviceMarker
              key={device.id}
              device={device}
              isDraggable={isDraggable}
              onDragEnd={handleDragEnd}
            />
          );
        })}
        
        <MapEventHandler onDblClick={handleDoubleClick} />
        <MapController center={activeCenter} zoom={activeZoom} />
      </MapContainer>
      
      <DeviceMapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleFilters={handleToggleFilters}
        isFilterActive={showFilters}
      />
      
      {showFilters && (
        <FilterPanel
          modelFilter={modelFilter}
          statusFilter={statusFilter}
          onModelFilterChange={handleModelFilterChange}
          onStatusFilterChange={handleStatusFilterChange}
        />
      )}
      
      {draggablePosition && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold mb-2">Draggable Device Position</h3>
          <p className="text-xs font-mono">
            Lat: {draggablePosition.lat.toFixed(6)}<br />
            Lng: {draggablePosition.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeviceMap;