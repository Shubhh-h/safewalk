import React, { useContext } from 'react';
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
