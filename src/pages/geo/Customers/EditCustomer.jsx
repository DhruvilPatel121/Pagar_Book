import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaSearch, FaSave } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon with animation effect
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  className: 'pulse-marker'
});

// Component to set the map view based on position
function SetViewOnChange({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

// Search location component with improved styling
function SearchControl({ onLocationFound }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Using Nominatim API for geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onLocationFound([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="absolute top-2 left-2 z-[1000] bg-white rounded-md shadow-lg p-2 flex">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location..."
        className="px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        disabled={searching}
        className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
      >
        {searching ? (
          <div className="w-4 h-4 border-t-2 border-white rounded-full anima{/* te-spin"></div>
        ) : (
          <FaSearch size={14} />
        )}
      </button>
    </div>
  );
}

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    contactName: '',
    number: '',
    address: '',
    email: '',
    city: '',
    pincode: '',
    addedBy: '',
    visibleTo: '',
    addedOn: '',
    canChangeAddress: 'yes',
    coordinates: [22.2994, 73.1883] // Default coordinates for Vadodara
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [mapKey, setMapKey] = useState(Date.now()); // For map refresh

  useEffect(() => {
    // In a real app, you would fetch the customer data from an API
    // For now, we'll simulate this with localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    const foundCustomer = storedCustomers.find(c => c.id === parseInt(id));

    if (foundCustomer) {
      // If customer doesn't have coordinates, add default ones
      if (!foundCustomer.coordinates) {
        foundCustomer.coordinates = [22.2994, 73.1883]; // Default coordinates for Vadodara
      }
      setCustomer(foundCustomer);
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    setCustomer({
      ...customer,
      canChangeAddress: e.target.value
    });
  };

  const handleMarkerDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setCustomer({
      ...customer,
      coordinates: [lat, lng]
    });
  };

  const handleLocationFound = (coordinates) => {
    setCustomer({
      ...customer,
      coordinates
    });
    setMapKey(Date.now()); // Force map refresh
  };

  const handleSave = () => {
    setSaveStatus('saving');

    // In a real app, you would send this data to an API
    // For now, we'll update localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    const updatedCustomers = storedCustomers.map(c =>
      c.id === parseInt(id) ? customer : c
    );

    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      setSaveStatus('saved');

      // Navigate back after a brief delay to show success message
      setTimeout(() => {
        navigate('/geo/customers');
      }, 800);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="p-6 pt-4 overflow-y-auto flex-grow pb-20">
        <button
          onClick={() => navigate('/geo/customers')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Customers
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Edit Customer</h1>
          <p className="text-sm text-indigo-600">Update customer information and location</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Customer Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={customer.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={customer.number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Can Employee Change Customer Address
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canChangeAddress"
                      value="yes"
                      checked={customer.canChangeAddress === 'yes'}
                      onChange={handleRadioChange}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canChangeAddress"
                      value="no"
                      checked={customer.canChangeAddress === 'no'}
                      onChange={handleRadioChange}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visible to
                </label>
                <select
                  name="visibleTo"
                  value={customer.visibleTo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="Selected staff">Selected staff</option>
                  <option value="HIREN BARIYA">HIREN BARIYA</option>
                  <option value="RAUNAKBHAI TANNA">RAUNAKBHAI TANNA</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Address & Location</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customer.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={customer.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff
                </label>
                <select
                  name="addedBy"
                  value={customer.addedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="HIREN BARIYA">HIREN BARIYA</option>
                  <option value="RAUNAKBHAI TANNA">RAUNAKBHAI TANNA</option>
                </select>
              </div>

              {/* Enhanced Leaflet Map */}
              <div className="relative h-72 rounded-lg mb-2 overflow-hidden border border-indigo-200 shadow-md">
                {customer.coordinates && (
                  <MapContainer
                    key={mapKey}
                    center={customer.coordinates}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={customer.coordinates}
                      draggable={true}
                      icon={customIcon}
                      eventHandlers={{
                        dragend: handleMarkerDrag
                      }}
                    />
                    <ZoomControl position="bottomright" />
                    <SetViewOnChange coords={customer.coordinates} />
                    <SearchControl onLocationFound={handleLocationFound} />
                  </MapContainer>
                )}

                <div className="absolute bottom-2 right-2 z-[1000] bg-indigo-600 text-white rounded-full p-2 shadow-md">
                  <div className="flex items-center text-xs">
                    <FaMapMarkerAlt className="text-white mr-1" />
                    {customer.coordinates[0].toFixed(4)}, {customer.coordinates[1].toFixed(4)}
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center text-sm text-indigo-600 mb-4 bg-indigo-50 p-2 rounded-md">
                <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                <p>Drag the marker or use the search box to set the exact location</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Fixed Save Button */}
      <div className="fixed mr-12 ml-85 bottom-0 pl-80 left-0 right-0 bg-white border-t border-indigo-100 p-4 flex justify-between items-center shadow-md z-5000">
        <div className="text-sm text-indigo-600">
          {customer.name && <span>Editing: <span className="font-medium">{customer.name}</span></span>}
        </div>

        <div className="flex items-center">
          {saveStatus === 'saved' && (
            <div className="mr-4 text-green-600 flex items-center bg-green-50 px-3 py-1 rounded-md border border-green-200">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Changes saved successfully!
            </div>
          )}
          {/* <button
            onClick={() => navigate('/geo/customers')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md mr-3 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button> */}
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium transition-colors flex items-center ${saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {saveStatus === 'saving' ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;