import React from 'react';

interface GaugeChartProps {
  value: number;
  label: string;
  max?: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, label, max = 2 }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const rotation = (percentage / 100) * 180; // 0 to 180 degrees

  return (
    <div className="glass glass-noise p-4 flex flex-col items-center justify-between h-full text-center">
       <div className="glass-specular"></div>
       <div className="glass-glare"></div>
      <h3 className="font-semibold text-text-strong mb-2">{label}</h3>
      <div className="relative w-full max-w-[200px]" style={{ aspectRatio: '2 / 1' }}>
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--danger)" />
              <stop offset="50%" stopColor="var(--warning)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>
          {/* Background Arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="var(--glass-border)" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Value Arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="125.66"
            strokeDashoffset={125.66 - (percentage / 100) * 125.66}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          {/* Needle */}
          <g transform={`rotate(${rotation} 50 50)`} style={{ transition: 'transform 0.5s ease' }}>
             <line x1="50" y1="50" x2="50" y2="15" stroke="var(--text-strong)" strokeWidth="2" strokeLinecap="round" />
             <circle cx="50" cy="50" r="3" fill="var(--text-strong)" />
          </g>
        </svg>

        <div className="absolute bottom-0 w-full">
            <div className="text-4xl font-bold text-text-strong venki-value">{value.toFixed(2)}</div>
             <div className="flex justify-between w-full text-xs text-text-muted px-1">
                <span>0</span>
                <span>{max}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;