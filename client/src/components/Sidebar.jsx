import React, { useState } from 'react';

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
