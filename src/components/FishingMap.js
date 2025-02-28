import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to prevent server-side rendering issues (window not defined)
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function FishingMap() {
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to New York (change to a specific location)
  const [zoom, setZoom] = useState(13);

  // Sample fishing spots data
  const fishingSpots = [
    { id: 1, name: 'Fishing Spot 1', coords: [40.7128, -74.0060] },
    { id: 2, name: 'Fishing Spot 2', coords: [40.7238, -74.0110] }
  ];

  // Adjust Leaflet icon to avoid issues with the default icon (missing image)
  const icon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {fishingSpots.map((spot) => (
          <Marker key={spot.id} position={spot.coords} icon={icon}>
            <Popup>{spot.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default FishingMap;
