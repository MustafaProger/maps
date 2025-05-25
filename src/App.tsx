import React, { useState, useEffect } from 'react';
import DeviceMap from './components/DeviceMap/DeviceMap';
import DeviceMapLegend from './components/DeviceMapLegend';
import { IDevice } from './types/Device';
import { MapPinned } from 'lucide-react';

function App() {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState<boolean>(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // In a real-world application, this would be an API call
        // Here we're importing the JSON data directly
        const deviceData = await import('./data/devices.json');
        setDevices(deviceData.default);
        setLoading(false);
      } catch (err) {
        console.error('Error loading device data:', err);
        setError('Failed to load device data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading device data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold">Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPinned size={24} />
            <h1 className="text-xl font-semibold">Device Tracker</h1>
          </div>
          <button 
            onClick={toggleLegend}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            {showLegend ? 'Hide Legend' : 'Show Legend'}
          </button>
        </div>
      </header>
      
      <main className="flex-1 relative">
        <DeviceMap devices={devices} />
        
        {showLegend && (
          <div className="absolute bottom-4 right-4 z-[1000]">
            <DeviceMapLegend />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;