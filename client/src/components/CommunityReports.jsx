import React, { useContext } from 'react';
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
