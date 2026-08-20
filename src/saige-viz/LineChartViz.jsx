import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const GREEN = '#3D6B34';
const BORDER = '#c7dfc2';
const MUTED = '#6b7280';
const FONT = 'Montserrat, system-ui, sans-serif';

const cardStyle = {
  background: '#fff',
  border: `1px solid ${BORDER}`,
  borderRadius: 12,
  padding: '12px 14px',
  fontFamily: FONT,
};

function formatTick(value) {
  const s = String(value ?? '');
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(5);
  return s;
}

/** G7 will replace this with the shared empty + VizActions. */
export function ChartEmpty({ spec }) {
  const action = spec?.actions?.[0];
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{spec?.title}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>No data yet</div>
      {action?.href && action?.label && (
        <a
          href={action.href}
          style={{ display: 'inline-block', marginTop: 8, fontSize: 12, color: GREEN, fontWeight: 600 }}
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

export default function LineChartViz({ spec }) {
  const data = spec?.data || {};
  const series = Array.isArray(data.series) ? data.series : [];
  const xKey = data.xKey || 'date';
  const yKey = data.yKey || 'value';
  const unit = data.unit || '';

  if (series.length < 2) return <ChartEmpty spec={spec} />;

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        {spec.type}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginTop: 4, marginBottom: 8 }}>
        {spec.title}
      </div>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={series} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11 }} tickFormatter={formatTick} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value) => {
                const n = typeof value === 'number' ? value : Number(value);
                const shown = Number.isFinite(n) ? n : value;
                const label = unit ? `${shown} ${unit}` : shown;
                return [label, spec.title || yKey];
              }}
              labelFormatter={(label) => formatTick(label)}
            />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={GREEN}
              strokeWidth={2.5}
              dot={{ fill: GREEN, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
