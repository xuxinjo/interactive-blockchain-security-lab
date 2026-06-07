import type { ChartIncidentValue } from "@/lib/types";

interface IncidentChartsProps {
  values: ChartIncidentValue[];
}

const maxValue = 650;
const chartWidth = 760;
const chartHeight = 360;

function layerStroke(layer: ChartIncidentValue["layer"]) {
  return layer === "protocol" ? "#94a3b8" : "#2dd4bf";
}

export function IncidentBarChart({ values }: IncidentChartsProps) {
  const left = 96;
  const top = 32;
  const barHeight = 34;
  const gap = 24;
  const scale = 560 / maxValue;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby="fig7-title fig7-desc" className="w-full">
      <title id="fig7-title">Figure 7 style bar chart</title>
      <desc id="fig7-desc">Approximate value involved by incident, excluding Parity because funds were frozen rather than stolen.</desc>
      <rect width={chartWidth} height={chartHeight} fill="#f8fafc" />
      <line x1={left} y1={top + 250} x2={left + 580} y2={top + 250} stroke="#334155" strokeWidth="1" />
      {[0, 200, 400, 600].map((tick) => (
        <g key={tick}>
          <line x1={left + tick * scale} y1={top} x2={left + tick * scale} y2={top + 250} stroke="#cbd5e1" strokeWidth="1" />
          <text x={left + tick * scale} y={top + 275} fill="#0f172a" fontSize="12" textAnchor="middle">
            {tick}
          </text>
        </g>
      ))}
      <text x={left + 290} y={top + 310} fill="#0f172a" fontSize="13" textAnchor="middle">
        Approximate USD millions
      </text>
      {values.map((value, index) => {
        const y = top + index * (barHeight + gap);
        const width = value.usdMillions * scale;
        return (
          <g key={value.label}>
            <text x={left - 10} y={y + 22} fill="#0f172a" fontSize="13" textAnchor="end">
              {value.label}
            </text>
            <rect x={left} y={y} width={width} height={barHeight} fill={layerStroke(value.layer)} opacity="0.82" />
            <rect x={left} y={y} width={width} height={barHeight} fill="none" stroke="#0f172a" strokeWidth="1" />
            <text x={left + width + 8} y={y + 22} fill="#0f172a" fontSize="13">
              ${value.usdMillions}M
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function IncidentTimelineChart({ values }: IncidentChartsProps) {
  const left = 76;
  const bottom = 286;
  const yearMin = 2016;
  const yearMax = 2022;
  const xScale = 600 / (yearMax - yearMin);
  const yScale = 220 / maxValue;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby="fig8-title fig8-desc" className="w-full">
      <title id="fig8-title">Figure 8 style timeline chart</title>
      <desc id="fig8-desc">Documented loss over time from 2016 to 2022, patterned by protocol or application layer.</desc>
      <defs>
        <pattern id="protocolPattern" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0" stroke="#475569" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width={chartWidth} height={chartHeight} fill="#f8fafc" />
      <line x1={left} y1={bottom} x2={left + 620} y2={bottom} stroke="#334155" />
      <line x1={left} y1={bottom} x2={left} y2={bottom - 240} stroke="#334155" />
      {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => {
        const x = left + (year - yearMin) * xScale;
        return (
          <g key={year}>
            <line x1={x} y1={bottom} x2={x} y2={bottom + 6} stroke="#334155" />
            <text x={x} y={bottom + 24} fill="#0f172a" fontSize="12" textAnchor="middle">
              {year}
            </text>
          </g>
        );
      })}
      {[0, 200, 400, 600].map((tick) => (
        <g key={tick}>
          <line x1={left - 5} y1={bottom - tick * yScale} x2={left + 620} y2={bottom - tick * yScale} stroke="#cbd5e1" />
          <text x={left - 12} y={bottom - tick * yScale + 4} fill="#0f172a" fontSize="12" textAnchor="end">
            {tick}
          </text>
        </g>
      ))}
      {values.map((value, index) => {
        const offset = value.year === 2022 ? index * 12 - 42 : 0;
        const x = left + (value.year - yearMin) * xScale + offset;
        const y = bottom - value.usdMillions * yScale;
        return (
          <g key={`${value.label}-${value.year}`}>
            <line x1={x} y1={bottom} x2={x} y2={y} stroke={layerStroke(value.layer)} strokeWidth="3" />
            <circle
              cx={x}
              cy={y}
              r="8"
              fill={value.layer === "protocol" ? "url(#protocolPattern)" : "#2dd4bf"}
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <text x={x} y={y - 14} fill="#0f172a" fontSize="12" textAnchor="middle">
              {value.label}
            </text>
          </g>
        );
      })}
      <text x={left + 305} y="340" fill="#0f172a" fontSize="13" textAnchor="middle">
        Year
      </text>
      <text x="18" y="160" fill="#0f172a" fontSize="13" transform="rotate(-90 18 160)" textAnchor="middle">
        USD millions
      </text>
    </svg>
  );
}
