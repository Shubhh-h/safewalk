import React, { useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-routing-machine';
import { AppContext } from '../App';
import { crimeData } from '../data/seedCrimeData';
import { calculateSafetyScore } from '../utils/safetyScoring';

// Custom Marker
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236C5CE7" width="24px" height="24px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
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
      if (map.hasLayer(heatLayerRef.current)) {
        map.removeLayer(heatLayerRef.current);
      }
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
  }, [map, setSelectedLocation, setSafetyScore]);
  return null;
};

const RoutingLayer = () => {
  const map = useMap();
  const { routeStart, routeEnd, routeMode, setRouteScore, setRouteDistance } = useContext(AppContext);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!routeStart || !routeEnd) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const profile = routeMode === 'walk' ? 'foot' : routeMode === 'bike' ? 'bike' : 'driving';

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(routeStart.lat, routeStart.lng),
        L.latLng(routeEnd.lat, routeEnd.lng)
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: profile
      }),
      lineOptions: {
        styles: [{ color: '#00D2FF', weight: 6, opacity: 0.8 }] // Safe Cyan
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true
    }).addTo(map);

    routingControlRef.current.on('routesfound', async function(e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      setRouteDistance((summary.totalDistance / 1000).toFixed(2));
      
      const coords = routes[0].coordinates;
      const step = Math.floor(coords.length / 5) || 1;
      let totalScore = 0;
      let scoreCount = 0;
      
      for (let i = 0; i < coords.length; i += step) {
         try {
           const res = await fetch('http://localhost:3001/api/safety/score', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ lat: coords[i].lat, lng: coords[i].lng })
           });
           const data = await res.json();
           totalScore += data.score;
           scoreCount++;
         } catch(err) {
           console.error(err);
         }
      }
      setRouteScore(scoreCount > 0 ? Math.round(totalScore / scoreCount) : 100);
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, routeStart, routeEnd, routeMode]);

  return null;
};

const MapView = () => {
  const { heatmapVisible, userLocation } = useContext(AppContext);

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="Dark Mode">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Transit & Roads (OSM)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        
        <HeatmapLayer data={crimeData} visible={heatmapVisible} />
        <RoutingLayer />
        <MapEvents />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
