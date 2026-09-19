import React, { useContext } from 'react';
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
        <button onClick={() => setActivePanel('crime-data')}>🚨 Crime Data</button>
        <button onClick={() => setActivePanel('advisor')}>AI Advisor</button>
        <button onClick={() => setActivePanel('reports')}>Reports</button>
        <button onClick={() => setActivePanel('contacts')}>Contacts</button>
      </div>
    </nav>
  );
};

export default Navbar;
