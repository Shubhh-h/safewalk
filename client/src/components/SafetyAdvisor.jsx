import React, { useContext } from 'react';
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
