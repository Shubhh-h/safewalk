import React, { useContext } from 'react';
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
