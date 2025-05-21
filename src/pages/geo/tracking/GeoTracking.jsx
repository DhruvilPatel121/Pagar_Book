import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch, FaFilter } from 'react-icons/fa';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Fix for default marker icons in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoTracking = () => {
  const [locations] = useState([
    { id: 1, name: 'Main Office', position: [22.3072, 73.1812], radius: 100, staffCount: 15 },
    { id: 2, name: 'Site A', position: [22.3169, 73.1748], radius: 50, staffCount: 8 },
  ]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Search and Filter Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center flex-1 min-w-[200px]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search locations or staff..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <FaFilter className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[22.3072, 73.1812]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <Circle
                center={location.position}
                radius={location.radius}
                pathOptions={{ color: '#4F46E5', fillColor: '#4F46E5', fillOpacity: 0.1 }}
              />
              <Marker position={location.position}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-600">Staff: {location.staffCount}</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeoTracking