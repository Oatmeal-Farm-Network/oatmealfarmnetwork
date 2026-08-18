import React from 'react';

const GREEN = '#3D6B34';
const LIGHT = '#f0f7ee';
const BORDER = '#c7dfc2';
const MUTED = '#6b7280';
const FONT = 'Montserrat, system-ui, sans-serif';

const KNOWN_TYPES = [
  'kpi',
  'line_chart',
  'bar_chart',
  'table',
  'alert_card',
  'timeline',
  'progress',
];

function PlaceholderCard({ spec, label }) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: '12px 14px',
        fontFamily: FONT,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        {spec.type}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginTop: 4 }}>
        {spec.title}
      </div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function VizRenderer({ spec }) {
  if (!spec || !spec.type) return null;

  switch (spec.type) {
    case 'kpi':
      return <PlaceholderCard spec={spec} label="KPI placeholder" />;
    case 'alert_card':
      return <PlaceholderCard spec={spec} label="Alert placeholder" />;
    case 'table':
      return <PlaceholderCard spec={spec} label="Table placeholder" />;
    case 'progress':
      return <PlaceholderCard spec={spec} label="Progress placeholder" />;
    case 'timeline':
      return <PlaceholderCard spec={spec} label="Timeline placeholder" />;
    case 'line_chart':
      return <PlaceholderCard spec={spec} label="Line chart placeholder" />;
    case 'bar_chart':
      return <PlaceholderCard spec={spec} label="Bar chart placeholder" />;
    default:
      return (
        <div
          style={{
            background: LIGHT,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            padding: '12px 14px',
            fontFamily: FONT,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{spec.title}</div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>Chart coming soon</div>
        </div>
      );
  }
}

export { KNOWN_TYPES };
