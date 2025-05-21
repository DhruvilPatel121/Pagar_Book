import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { FaCalendarAlt, FaShare, FaLayerGroup, FaExpand } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { componentStyles } from '../../../theme';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TimelineView = () => {
  const [selectedStaff, setSelectedStaff] = useState('HIREN BARIYA');
  const [selectedDate, setSelectedDate] = useState('19 May 2025');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const calendarRef = useRef(null);

  // Route coordinates for the map
  const routePoints = [
    [22.3072, 73.1812], // Starting point
    [22.3169, 73.1748], // Via points
    [22.3115, 73.1845],
    [22.3095, 73.1789],
    [22.3072, 73.1812], // End point
  ];

  const timelineData = {
    staffName: 'HIREN BARIYA',
    location: 'Asia/Kolkata',
    totalDistance: '26.82 km',
    totalDuration: '3h 47m',
    activities: [
      { time: '09:28 AM', type: 'start', label: 'Tracking Started' },
      { time: '09:28 AM', type: 'drive', distance: '6.15 km', duration: '17m' },
      { time: '09:46 AM', type: 'walk', distance: '0 km', duration: '15m' },
      { time: '10:01 AM', type: 'drive', distance: '1 km', duration: '4m' },
      { time: '10:06 AM', type: 'stop', duration: '1m', location: 'Vadodara, Vadodara Rural Taluka, Vadodara District, Gujarat, 390001, India' },
    ]
  };

  // Custom marker icons
  const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = () => {
    // Implement share functionality
    navigator.share({
      title: `${selectedStaff}'s Timeline`,
      text: `Timeline for ${selectedStaff} on ${selectedDate}`,
      url: window.location.href,
    }).catch(console.error);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <select 
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-[250px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>{selectedStaff}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <span className="text-gray-700">{selectedDate}</span>
                <FaCalendarAlt className="text-gray-500" />
              </button>
              {isCalendarOpen && (
                <Calendar 
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }}
                />
              )}
            </div>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Timeline Panel */}
        <div className="w-[400px] border-r border-gray-200 overflow-y-auto">
          <div className="p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Timeline</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Activity</span>
                <button 
                  onClick={() => setShowActivity(!showActivity)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${showActivity ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${showActivity ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{timelineData.staffName}</span>
                <span className="text-gray-500">{timelineData.location}</span>
              </div>
              <div className="text-right">
                <span className="block">{timelineData.totalDistance}</span>
                <span className="block text-green-600">{timelineData.totalDuration}</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {timelineData.activities.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="w-20 text-sm text-gray-500">{activity.time}</div>
                  <div className="w-8 relative flex justify-center">
                    <div className="absolute w-0.5 bg-gray-200 h-full top-6" />
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                      {activity.type === 'start' && '▶️'}
                      {activity.type === 'drive' && '🚗'}
                      {activity.type === 'walk' && '👣'}
                      {activity.type === 'stop' && '⏸️'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {activity.label || activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </span>
                      {activity.distance && (
                        <span className="text-sm text-gray-600">{activity.distance}</span>
                      )}
                      {activity.duration && (
                        <span className="text-sm text-green-600">{activity.duration}</span>
                      )}
                    </div>
                    {activity.location && (
                      <p className="text-sm text-gray-500 mt-1">{activity.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Panel */}
        <div className="flex-1 relative">
          <MapContainer
            center={[22.3072, 73.1812]}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={routePoints[0]} icon={startIcon}>
              <Popup>Start Point</Popup>
            </Marker>
            <Marker position={routePoints[routePoints.length - 1]} icon={endIcon}>
              <Popup>End Point</Popup>
            </Marker>
            <Polyline
              positions={routePoints}
              pathOptions={{ color: '#3B82F6', weight: 4 }}
            />
          </MapContainer>
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50">
              <FaLayerGroup className="text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50">
              <FaExpand className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Calendar component before TimelineView component
const Calendar = ({ selectedDate, onDateSelect }) => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const changeMonth = (increment) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + increment);
    setViewDate(newDate);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formattedDate = `${day} ${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    onDateSelect(formattedDate);
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8" />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = new Date().getDate() === day;
    const isSelected = selectedDate === `${day} ${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    
    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
          ${isToday ? 'bg-blue-100 text-blue-600' : ''}
          ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-64 z-[1000]">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
        <button onClick={() => changeMonth(-1)} className="text-white hover:text-gray-200">
          <FaChevronLeft />
        </button>
        <span className="font-medium">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)} className="text-white hover:text-gray-200">
          <FaChevronRight />
        </button>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    </div>
  );
};

export default TimelineView