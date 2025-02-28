import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import Modal from 'react-modal';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Dynamically import Leaflet components to prevent SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const locationMapping = {
  "Venus - Fossa": [-10.5, 140.2],
  "Orokin Void": [5.1, -73.2],
  "Plains of Eidolon": [-3.5, 39.7],
  "Sedna - Hydron": [-15.0, 100.5],
  "Deimos - Cambion Drift": [-7.5, 50.3]
};

// Custom icons for different item types
const icons = {
  warframe: new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-red.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  relic: new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-blue.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  resource: new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-green.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  default: new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

Modal.setAppElement('#root');

function FarmingMap() {
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(3);
  const [farmingSpots, setFarmingSpots] = useState([]);
  const [userSpots, setUserSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  
  useEffect(() => {
    const userSpotsRef = ref(database, 'userSpots');
    onValue(userSpotsRef, (snapshot) => {
      const data = snapshot.val() || [];
      setUserSpots(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
    });
  }, []);

  const openModal = (spot) => {
    setEditingSpot(spot);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditingSpot(null);
    setModalIsOpen(false);
  };

  const updateUserSpot = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const location = e.target.location.value;
    const coords = [parseFloat(e.target.lat.value), parseFloat(e.target.lng.value)];
    
    if (editingSpot) {
      update(ref(database, `userSpots/${editingSpot.id}`), { name, location, coords });
      closeModal();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for an item or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <div style={{ height: '600px', width: '100%' }}>
        <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userSpots.map((spot) => (
            <Marker key={spot.id} position={spot.coords} icon={icons.default}>
              <Popup>
                <strong>{spot.name}</strong>
                <br /> <b>Location:</b> {spot.location || 'Unknown'}
                <br /><button onClick={() => openModal(spot)}>Edit</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Edit Spot">
        <h2>Edit Farming Spot</h2>
        {editingSpot && (
          <form onSubmit={updateUserSpot}>
            <input type="text" name="name" defaultValue={editingSpot.name} required />
            <input type="text" name="location" defaultValue={editingSpot.location} required />
            <input type="number" step="0.01" name="lat" defaultValue={editingSpot.coords[0]} required />
            <input type="number" step="0.01" name="lng" defaultValue={editingSpot.coords[1]} required />
            <button type="submit">Update Spot</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default FarmingMap;