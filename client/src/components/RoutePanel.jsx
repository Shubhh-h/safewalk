import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

const RoutePanel = () => {
  const { setRouteStart, setRouteEnd, routeMode, setRouteMode, routeScore, routeDistance } = useContext(AppContext);
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const geocode = async (query) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      return null;
    } catch(e) {
      console.error('Geocoding failed', e);
      return null;
    }
  };

  const handleFindRoute = async () => {
    if (!startText || !endText) return;
    setLoading(true);
    const startCoords = await geocode(startText);
    const endCoords = await geocode(endText);
    if (startCoords && endCoords) {
      setRouteStart(startCoords);
      setRouteEnd(endCoords);
    } else {
      alert("Could not find one of the locations. Please try again.");
    }
    setLoading(false);
  };
  
  return (
    <div className="glass-panel slide-in-panel" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, padding: '20px', width: '320px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ margin: 0 }}>Safe Route Planner</h3>
      
      <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-surface)', padding: '5px', borderRadius: '10px' }}>
        <button 
          onClick={() => setRouteMode('walk')}
          className="hover-glow"
          style={{ flex: 1, padding: '8px', borderRadius: '8px', background: routeMode === 'walk' ? 'var(--primary)' : 'transparent', color: routeMode === 'walk' ? 'white' : 'var(--text-secondary)' }}
        >
          🚶 Walk
        </button>
        <button 
          onClick={() => setRouteMode('bike')}
          className="hover-glow"
          style={{ flex: 1, padding: '8px', borderRadius: '8px', background: routeMode === 'bike' ? 'var(--primary)' : 'transparent', color: routeMode === 'bike' ? 'white' : 'var(--text-secondary)' }}
        >
          🚲 Bike
        </button>
        <button 
          onClick={() => setRouteMode('cab')}
          className="hover-glow"
          style={{ flex: 1, padding: '8px', borderRadius: '8px', background: routeMode === 'cab' ? 'var(--primary)' : 'transparent', color: routeMode === 'cab' ? 'white' : 'var(--text-secondary)' }}
        >
          🚕 Cab
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Start location (e.g. Connaught Place)" 
        value={startText}
        onChange={(e) => setStartText(e.target.value)}
      />
      <button 
        className="hover-glow" 
        style={{ fontSize: '12px', color: 'var(--accent)', textAlign: 'right' }}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(pos => {
             setRouteStart({ lat: pos.coords.latitude, lng: pos.coords.longitude });
             setStartText("My Location");
          });
        }}
      >
        Use my location
      </button>
      
      <input 
        type="text" 
        placeholder="Destination (e.g. India Gate)" 
        value={endText}
        onChange={(e) => setEndText(e.target.value)}
      />
      
      <button 
        className="hover-glow" 
        onClick={handleFindRoute}
        disabled={loading}
        style={{ background: 'var(--primary)', padding: '12px', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}
      >
        {loading ? 'Calculating...' : 'Find Safest Route'}
      </button>

      {(routeScore !== null || routeDistance !== null) && (
        <div style={{ marginTop: '10px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Route Analysis</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: routeScore > 75 ? 'var(--safety-green)' : routeScore > 40 ? 'var(--warning-amber)' : 'var(--danger-red)' }}>
            Safety Score: {routeScore}/100
          </div>
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            Distance: {routeDistance} km
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePanel;
