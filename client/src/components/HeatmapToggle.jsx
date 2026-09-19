import React, { useContext } from 'react';
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
