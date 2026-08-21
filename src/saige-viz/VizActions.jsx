import React from 'react';

const GREEN = '#3D6B34';
const BORDER = '#c7dfc2';
const MUTED = '#6b7280';
const FONT = 'Montserrat, system-ui, sans-serif';

/** Action-link row shared by every card. Green button style, matches
 * the proposal "Approve" button on SaigePage. Renders nothing if the
 * spec has no actions. */
export function VizActions({ spec }) {
  const actions = Array.isArray(spec?.actions) ? spec.actions : [];
  const valid = actions.filter((a) => a && a.href && a.label);
  if (valid.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
      {valid.map((action, i) => (
        <a
          key={i}
          href={action.href}
          style={{
            fontSize: 12,
            padding: '5px 10px',
            borderRadius: 8,
            border: 'none',
            background: GREEN,
            color: '#fff',
            fontWeight: 600,
            fontFamily: FONT,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}

/** Shared empty state: title + "No data yet" + first action if any.
 * Used by every card when its spec.data has nothing to show. */
export function VizEmpty({ spec }) {
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
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{spec?.title}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>No data yet</div>
      <VizActions spec={spec} />
    </div>
  );
}
