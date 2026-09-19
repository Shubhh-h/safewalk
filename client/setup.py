import os
from pathlib import Path

BASE_DIR = Path(r"C:\Users\shubh\.gemini\antigravity\scratch\safewalk\client")

files = {}

files["index.html"] = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="SafeWalk — AI-powered personal safety navigation web app" />
    <title>SafeWalk — Your Safety-First Navigation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>"""

files["src/index.css"] = """:root {
  --bg-primary: #0A0E1A;
  --bg-secondary: #111827;
  --bg-surface: rgba(255, 255, 255, 0.05);
  --bg-surface-hover: rgba(255, 255, 255, 0.08);
  --text-primary: #F0F0F0;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  --primary: #6C5CE7;
  --primary-glow: rgba(108, 92, 231, 0.3);
  --accent: #00D2FF;
  --accent-glow: rgba(0, 210, 255, 0.3);
  --safety-green: #00E676;
  --safety-green-glow: rgba(0, 230, 118, 0.3);
  --danger-red: #FF1744;
  --danger-red-glow: rgba(255, 23, 68, 0.4);
  --warning-amber: #FFAB00;
  --border: rgba(255, 255, 255, 0.08);
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
}

.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--bg-surface-hover);
  border-radius: 4px;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  color: inherit;
  transition: all 0.3s ease;
}

input, textarea, select {
  font-family: inherit;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 10px 14px;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
}

@keyframes pulse-sos {
  0% { box-shadow: 0 0 0 0 rgba(255, 23, 68, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(255, 23, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 23, 68, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.leaflet-container {
  background: var(--bg-primary);
  font-family: 'Inter', sans-serif;
}
"""

files["src/main.jsx"] = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""

files["src/App.css"] = """.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.main-content {
  display: flex;
  flex: 1;
  position: relative;
  height: 100%;
}

.map-area {
  flex: 1;
  position: relative;
}
"""

files["src/App.jsx"] = """import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import RoutePanel from './components/RoutePanel';
import HeatmapToggle from './components/HeatmapToggle';
import SOSButton from './components/SOSButton';
import SOSActiveScreen from './components/SOSActiveScreen';
import EmergencyContacts from './components/EmergencyContacts';
import CommunityReports from './components/CommunityReports';
import ReportModal from './components/ReportModal';
import SafetyAdvisor from './components/SafetyAdvisor';
import SafetyScore from './components/SafetyScore';

export const AppContext = React.createContext();

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routeStart, setRouteStart] = useState(null);
  const [routeEnd, setRouteEnd] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [safetyScore, setSafetyScore] = useState(null);
  const [communityReports, setCommunityReports] = useState([]);
  const [heatmapVisible, setHeatmapVisible] = useState(true);
  const [reportsVisible, setReportsVisible] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const contextValue = {
    selectedLocation, setSelectedLocation,
    routeStart, setRouteStart,
    routeEnd, setRouteEnd,
    activePanel, setActivePanel,
    sosActive, setSosActive,
    safetyScore, setSafetyScore,
    communityReports, setCommunityReports,
    heatmapVisible, setHeatmapVisible,
    reportsVisible, setReportsVisible,
    userLocation, setUserLocation
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app-container">
        {sosActive && <SOSActiveScreen />}
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="map-area">
            <MapView />
            <RoutePanel />
            <HeatmapToggle />
            <SOSButton />
            {safetyScore && <SafetyScore score={safetyScore} />}
          </div>
        </div>
        {activePanel === 'contacts' && <EmergencyContacts />}
        {activePanel === 'reports' && <CommunityReports />}
        {activePanel === 'add-report' && <ReportModal />}
        {activePanel === 'advisor' && <SafetyAdvisor />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
"""

files["src/data/seedCrimeData.js"] = """
// Delhi bounding box approx: lat 28.4 to 28.8, lng 76.9 to 77.4
const types = ['theft', 'assault', 'harassment', 'robbery', 'vandalism', 'suspicious_activity'];

function generateRandomPoint(latMin, latMax, lngMin, lngMax) {
  return {
    lat: latMin + Math.random() * (latMax - latMin),
    lng: lngMin + Math.random() * (lngMax - lngMin),
  };
}

const generateCrimes = () => {
  const data = [];
  // Old Delhi / Paharganj (Higher crime)
  for (let i=0; i<80; i++) {
    const pt = generateRandomPoint(28.64, 28.66, 77.20, 77.23);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*3)+3, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // Connaught Place (Medium)
  for (let i=0; i<50; i++) {
    const pt = generateRandomPoint(28.62, 28.64, 77.20, 77.22);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*3)+2, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // South Delhi (Lower crime)
  for (let i=0; i<30; i++) {
    const pt = generateRandomPoint(28.53, 28.57, 77.22, 77.26);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*2)+1, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // Random spread
  for (let i=0; i<40; i++) {
    const pt = generateRandomPoint(28.4, 28.8, 76.9, 77.4);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*5)+1, timestamp: Date.now() - Math.random()*10000000000 });
  }
  return data;
};

export const crimeData = generateCrimes();

export const landmarks = [
  { lat: 28.6139, lng: 77.2090, type: 'police', name: 'Parliament Street Police Station' },
  { lat: 28.5678, lng: 77.2100, type: 'hospital', name: 'AIIMS' },
];
"""

files["src/utils/geolocation.js"] = """
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err)
    );
  });
};

export const watchPosition = (callback) => {
  if (!navigator.geolocation) return null;
  const id = navigator.geolocation.watchPosition(
    pos => callback({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    err => console.error(err)
  );
  return () => navigator.geolocation.clearWatch(id);
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
"""

files["src/utils/safetyScoring.js"] = """
import { calculateDistance } from './geolocation';

export const getNearbyIncidents = (lat, lng, crimeData, radiusKm = 2) => {
  return crimeData.filter(c => calculateDistance(lat, lng, c.lat, c.lng) <= radiusKm);
};

export const calculateSafetyScore = (lat, lng, crimeData, timeOfDay = new Date().getHours()) => {
  const nearby = getNearbyIncidents(lat, lng, crimeData, 2);
  const severitySum = nearby.reduce((acc, c) => acc + c.severity, 0);
  
  let baseScore = 100 - (severitySum * 0.5);
  if (timeOfDay < 6 || timeOfDay > 20) {
    baseScore -= 15;
  }
  return Math.max(0, Math.min(100, Math.round(baseScore)));
};

export const getScoreColor = (score) => {
  if (score < 26) return 'var(--danger-red)';
  if (score < 51) return 'var(--warning-amber)';
  if (score < 76) return 'yellowgreen';
  return 'var(--safety-green)';
};

export const getScoreLabel = (score) => {
  if (score < 26) return 'Dangerous';
  if (score < 51) return 'Caution';
  if (score < 76) return 'Safe';
  return 'Very Safe';
};
"""

files["src/utils/sosService.js"] = """
export const generateShareUrl = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;

export const formatPhoneForSMS = (phone) => {
  return phone.replace(/[^0-9+]/g, '');
};

export const generateSOSMessage = (contacts, locationUrl) => {
  return `EMERGENCY! I need help. My current location is: ${locationUrl}`;
};

export const triggerSOS = (contacts, position) => {
  const url = generateShareUrl(position.lat, position.lng);
  const msg = generateSOSMessage(contacts, url);
  
  if (contacts && contacts.length > 0) {
    const phone = formatPhoneForSMS(contacts[0].phone);
    window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`);
  }
};
"""

files["src/components/MapView.jsx"] = """import React, { useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { AppContext } from '../App';
import { crimeData } from '../data/seedCrimeData';
import { calculateSafetyScore } from '../utils/safetyScoring';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HeatmapLayer = ({ data, visible }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    if (!heatLayerRef.current) {
      const points = data.map(p => [p.lat, p.lng, p.severity * 0.2]);
      heatLayerRef.current = L.heatLayer(points, { radius: 25, blur: 15, maxZoom: 17 });
    }
    
    if (visible) {
      heatLayerRef.current.addTo(map);
    } else {
      map.removeLayer(heatLayerRef.current);
    }

    return () => {
      if (heatLayerRef.current && map.hasLayer(heatLayerRef.current)) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, data, visible]);

  return null;
};

const MapEvents = () => {
  const map = useMap();
  const { setSelectedLocation, setSafetyScore } = useContext(AppContext);
  
  useEffect(() => {
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setSelectedLocation({ lat, lng });
      setSafetyScore(calculateSafetyScore(lat, lng, crimeData));
    });
  }, [map]);
  return null;
};

const MapView = () => {
  const { heatmapVisible, userLocation } = useContext(AppContext);

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />
        <HeatmapLayer data={crimeData} visible={heatmapVisible} />
        <MapEvents />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
"""

files["src/components/RoutePanel.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const RoutePanel = () => {
  const { routeStart, setRouteStart, routeEnd, setRouteEnd } = useContext(AppContext);
  
  return (
    <div className="glass-panel" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, padding: '20px', width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ margin: 0 }}>Route Planning</h3>
      <input type="text" placeholder="Start location" />
      <button style={{ fontSize: '12px', color: 'var(--accent)', textAlign: 'right' }}>Use my location</button>
      <input type="text" placeholder="Destination" />
      <button style={{ background: 'var(--primary)', padding: '10px', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>Find Safest Route</button>
    </div>
  );
};

export default RoutePanel;
"""

files["src/components/SafetyScore.jsx"] = """import React from 'react';
import { getScoreColor, getScoreLabel } from '../utils/safetyScoring';

const SafetyScore = ({ score }) => {
  const color = getScoreColor(score);
  return (
    <div className="glass-panel" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '20px', animation: 'slideUp 0.3s ease' }}>
      <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: `4px solid ${color}` }}>
        <h2 style={{ margin: 0, color }}>{score}</h2>
      </div>
      <div>
        <h3 style={{ margin: 0 }}>Area Safety</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{getScoreLabel(score)}</p>
      </div>
    </div>
  );
};

export default SafetyScore;
"""

files["src/components/SOSButton.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const SOSButton = () => {
  const { setSosActive } = useContext(AppContext);
  
  return (
    <button
      onClick={() => setSosActive(true)}
      style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        zIndex: 100,
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--danger-red)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        animation: 'pulse-sos 2s infinite',
        border: '4px solid white',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}
    >
      SOS
    </button>
  );
};

export default SOSButton;
"""

files["src/components/SOSActiveScreen.jsx"] = """import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const SOSActiveScreen = () => {
  const { setSosActive } = useContext(AppContext);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 23, 68, 0.95)',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', animation: 'fadeIn 0.5s infinite alternate' }}>EMERGENCY MODE ACTIVE</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Active for: {Math.floor(timer/60)}:{(timer%60).toString().padStart(2, '0')}</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ background: 'white', color: 'var(--danger-red)', padding: '15px 30px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Call 112
        </button>
        <button style={{ background: 'rgba(0,0,0,0.5)', color: 'white', padding: '15px 30px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Share Location
        </button>
      </div>

      <button onClick={() => setSosActive(false)} style={{ background: 'transparent', border: '2px solid white', padding: '10px 20px', borderRadius: '20px', marginTop: 'auto' }}>
        I'm Safe (Deactivate)
      </button>
    </div>
  );
};

export default SOSActiveScreen;
"""

files["src/components/EmergencyContacts.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const EmergencyContacts = () => {
  const { setActivePanel } = useContext(AppContext);
  
  return (
    <div className="glass-panel" style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '90%', maxWidth: '400px', zIndex: 100, padding: '30px',
      display: 'flex', flexDirection: 'column', gap: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Emergency Contacts</h2>
        <button onClick={() => setActivePanel(null)} style={{ fontSize: '1.5rem' }}>&times;</button>
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>No contacts configured yet.</p>
      <input type="text" placeholder="Name" />
      <input type="tel" placeholder="Phone Number" />
      <button style={{ background: 'var(--primary)', padding: '12px', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>Add Contact</button>
    </div>
  );
};

export default EmergencyContacts;
"""

files["src/components/CommunityReports.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const CommunityReports = () => {
  const { setActivePanel } = useContext(AppContext);
  return (
    <div className="glass-panel" style={{
      position: 'fixed', right: '0', top: '60px', bottom: '0',
      width: '320px', zIndex: 50, padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '20px',
      animation: 'slideInRight 0.3s ease',
      borderRight: 'none', borderTop: 'none', borderBottom: 'none'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Reports</h2>
        <button onClick={() => setActivePanel(null)}>&times;</button>
      </div>
      <button onClick={() => setActivePanel('add-report')} style={{ background: 'var(--primary)', padding: '10px', borderRadius: '8px', color: 'white' }}>+ Add Report</button>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No recent reports in this area.</p>
      </div>
    </div>
  );
};

export default CommunityReports;
"""

files["src/components/ReportModal.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const ReportModal = () => {
  const { setActivePanel } = useContext(AppContext);
  return (
    <div className="glass-panel" style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '90%', maxWidth: '400px', zIndex: 100, padding: '30px',
      display: 'flex', flexDirection: 'column', gap: '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Report Incident</h2>
        <button onClick={() => setActivePanel('reports')}>&times;</button>
      </div>
      <select>
        <option>Poorly Lit</option>
        <option>Suspicious Activity</option>
        <option>Safe Area</option>
        <option>Harassment</option>
        <option>Other</option>
      </select>
      <textarea placeholder="Describe what happened..." rows="4" />
      <button style={{ background: 'var(--safety-green)', padding: '12px', borderRadius: '8px', color: 'black', fontWeight: 'bold' }}>Submit Report</button>
    </div>
  );
};

export default ReportModal;
"""

files["src/components/SafetyAdvisor.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const SafetyAdvisor = () => {
  const { setActivePanel } = useContext(AppContext);
  return (
    <div className="glass-panel" style={{
      position: 'fixed', right: '0', top: '60px', bottom: '0',
      width: '350px', zIndex: 50, padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '20px',
      animation: 'slideInRight 0.3s ease',
      borderRight: 'none', borderTop: 'none', borderBottom: 'none'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>AI Safety Advisor</h2>
        <button onClick={() => setActivePanel(null)}>&times;</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          Hello! I am your SafeWalk AI advisor. How can I help you navigate safely today?
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
        <button style={{ background: 'var(--bg-surface-hover)', padding: '5px 10px', borderRadius: '15px', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>Is it safe here?</button>
        <button style={{ background: 'var(--bg-surface-hover)', padding: '5px 10px', borderRadius: '15px', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>Best time to walk?</button>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Ask anything..." style={{ flex: 1 }} />
        <button style={{ background: 'var(--primary)', padding: '0 15px', borderRadius: '8px' }}>&rarr;</button>
      </div>
    </div>
  );
};

export default SafetyAdvisor;
"""

files["src/components/HeatmapToggle.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const HeatmapToggle = () => {
  const { heatmapVisible, setHeatmapVisible, reportsVisible, setReportsVisible } = useContext(AppContext);
  return (
    <div className="glass-panel" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px', padding: '10px' }}>
      <button 
        onClick={() => setHeatmapVisible(!heatmapVisible)}
        style={{ padding: '8px 16px', borderRadius: '20px', background: heatmapVisible ? 'var(--primary)' : 'var(--bg-surface)' }}
      >
        Crime Heatmap
      </button>
      <button 
        onClick={() => setReportsVisible(!reportsVisible)}
        style={{ padding: '8px 16px', borderRadius: '20px', background: reportsVisible ? 'var(--accent)' : 'var(--bg-surface)', color: reportsVisible ? 'black' : 'white' }}
      >
        Reports
      </button>
    </div>
  );
};

export default HeatmapToggle;
"""

files["src/components/Navbar.jsx"] = """import React, { useContext } from 'react';
import { AppContext } from '../App';

const Navbar = () => {
  const { setActivePanel } = useContext(AppContext);
  return (
    <nav className="glass-panel" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 60, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        🚶‍♀️ SafeWalk
      </div>
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 20px' }}>
        <input type="text" placeholder="Search areas..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }} />
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button onClick={() => setActivePanel('advisor')}>AI Advisor</button>
        <button onClick={() => setActivePanel('reports')}>Reports</button>
        <button onClick={() => setActivePanel('contacts')}>Contacts</button>
      </div>
    </nav>
  );
};

export default Navbar;
"""

files["src/components/Sidebar.jsx"] = """import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  if (collapsed) {
    return (
      <div className="glass-panel" style={{ width: '50px', height: '100%', borderRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
        <button onClick={() => setCollapsed(false)}>&rarr;</button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ width: '320px', height: '100%', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderBottom: 'none', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Area Info</h3>
        <button onClick={() => setCollapsed(true)}>&larr;</button>
      </div>
      <div style={{ background: 'var(--bg-surface)', padding: '15px', borderRadius: '10px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Quick Stats</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Total Reports</span>
          <span>124</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginTop: '5px' }}>
          <span>Safe Zones</span>
          <span>12</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Recent Activity</h4>
        <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Safe zone verified near Connaught Place</p>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2 hours ago</span>
        </div>
        <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Poor lighting reported in Karol Bagh</p>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>5 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
"""

files["src/components/LoadingOverlay.jsx"] = """import React from 'react';

const LoadingOverlay = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10, 14, 26, 0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'float 2s ease-in-out infinite', fontSize: '3rem' }}>
        🚶‍♀️
      </div>
    </div>
  );
};

export default LoadingOverlay;
"""

for path_str, content in files.items():
    p = BASE_DIR / path_str
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding='utf-8')
    print(f"Created {path_str}")

print("All files created successfully.")
