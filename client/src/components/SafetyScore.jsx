import React from 'react';
import { getScoreColor, getScoreLabel } from '../utils/safetyScoring';

const SafetyScore = ({ score }) => {
  const color = getScoreColor(score);
  return (
    <div className="glass-panel" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '20px', animation: 'slideUp 0.3s ease' }}>
      <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: `4px solid ${color}` }}>
        <h2 style={{ margin: 0, color }}>{score}</h2>
      </div>
      <div>
        <h3 style={{ margin: 0 }}>Area Safety</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{getScoreLabel(score)}</p>
      </div>
    </div>
  );
};

export default SafetyScore;
