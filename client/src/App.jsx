import React, { useState, useEffect } from 'react';
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
import NationalCrimeData from './components/NationalCrimeData';

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
  const [routeMode, setRouteMode] = useState('walk');
  const [routeScore, setRouteScore] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);

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
    userLocation, setUserLocation,
    routeMode, setRouteMode,
    routeScore, setRouteScore,
    routeDistance, setRouteDistance
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
        {activePanel === 'crime-data' && <NationalCrimeData />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
