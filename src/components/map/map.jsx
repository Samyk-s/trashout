import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Import the leaflet-defaulticon-compatibility package for default icons
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MyMaps = () => {
  const [userLocation, setUserLocation] = useState(null);

  // Use useEffect to fetch user's location once component is mounted
  useEffect(() => {
    // Check if geolocation is available in the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the user's latitude and longitude
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          // Handle error if geolocation fails
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!userLocation) {
    return <div>Loading map...</div>; // Show loading until the location is fetched
  }

  return (
    <div style={{ height: '50vh' }}>
      <MapContainer
        center={userLocation}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en" // Added lang=en for English
        />
        <Marker position={userLocation}>
          <Popup>
            You are here! <br /> This is your current location.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMaps;
