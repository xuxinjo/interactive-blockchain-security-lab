import type { ChartIncidentValue } from "@/lib/types";

interface IncidentChartsProps {
  values: ChartIncidentValue[];
  selectedLabel?: string;
  onSelect?: (label: string) => void;
}

const maxValue = 650;
const chartWidth = 760;
const chartHeight = 360;

function layerStroke(layer: ChartIncidentValue["layer"]) {
  return layer === "protocol" ? "#94a3b8" : "#2dd4bf";
}

export function IncidentBarChart({ values, selectedLabel, onSelect }: IncidentChartsProps) {
  const left = 96;
  const top = 32;
  const bottom = 312;
  const barHeight = 34;
  const gap = 24;
  const scale = 560 / maxValue;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role={onSelect ? "group" : "img"} aria-labelledby="fig7-title fig7-desc" className="w-full min-w-[40rem]">
      <title id="fig7-title">Figure 7 style bar chart</title>
      <desc id="fig7-desc">Approximate value involved by incident, excluding Parity because funds were frozen rather than stolen.</desc>
      <rect width={chartWidth} height={chartHeight} fill="#080f1e" />
      <line x1={left} y1={bottom} x2={left + 580} y2={bottom} stroke="#334155" strokeWidth="1" />
      {[0, 200, 400, 600].map((tick) => (
        <g key={tick}>
          <line x1={left + tick * scale} y1={top} x2={left + tick * scale} y2={bottom} stroke="#263448" strokeWidth="1" />
          <text x={left + tick * scale} y={bottom + 19} fill="#cbd5e1" fontSize="12" textAnchor="middle">
            {tick}
          </text>
        </g>
      ))}
      <text x={left + 290} y={bottom + 42} fill="#cbd5e1" fontSize="13" textAnchor="middle">
        Approximate USD millions
      </text>
      {values.map((value, index) => {
        const y = top + index * (barHeight + gap);
        const width = value.usdMillions * scale;
        return (
          <g key={value.label} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={onSelect ? `${value.label}, approximately ${value.usdMillions} million dollars` : undefined} aria-pressed={onSelect ? selectedLabel === value.label : undefined} onClick={() => onSelect?.(value.label)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect?.(value.label); } }} style={{ cursor: onSelect ? "pointer" : undefined, opacity: selectedLabel && selectedLabel !== value.label ? 0.55 : 1 }}>
            <text x={left - 10} y={y + 22} fill="#cbd5e1" fontSize="13" textAnchor="end">
              {value.label}
            </text>
            <rect x={left} y={y} width={width} height={barHeight} fill={layerStroke(value.layer)} opacity="0.82" />
            <rect x={left} y={y} width={width} height={barHeight} fill="none" stroke="#94a3b8" strokeWidth="1" />
            <text x={left + width + 8} y={y + 22} fill="#cbd5e1" fontSize="13">
              ${value.usdMillions}M
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function IncidentTimelineChart({ values, selectedLabel, onSelect }: IncidentChartsProps) {
  const left = 76;
  const bottom = 286;
  const yearMin = 2016;
  const yearMax = 2022;
  const xScale = 600 / (yearMax - yearMin);
  const yScale = 220 / maxValue;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role={onSelect ? "group" : "img"} aria-labelledby="fig8-title fig8-desc" className="w-full min-w-[40rem]">
      <title id="fig8-title">Figure 8 style timeline chart</title>
      <desc id="fig8-desc">Documented loss over time from 2016 to 2022, patterned by protocol or application layer.</desc>
      <defs>
        <pattern id="protocolPattern" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0" stroke="#475569" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width={chartWidth} height={chartHeight} fill="#080f1e" />
      <line x1={left} y1={bottom} x2={left + 620} y2={bottom} stroke="#334155" />
      <line x1={left} y1={bottom} x2={left} y2={bottom - 240} stroke="#334155" />
      {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => {
        const x = left + (year - yearMin) * xScale;
        return (
          <g key={year}>
            <line x1={x} y1={bottom} x2={x} y2={bottom + 6} stroke="#334155" />
            <text x={x} y={bottom + 24} fill="#cbd5e1" fontSize="12" textAnchor="middle">
              {year}
            </text>
          </g>
        );
      })}
      {[0, 200, 400, 600].map((tick) => (
        <g key={tick}>
          <line x1={left - 5} y1={bottom - tick * yScale} x2={left + 620} y2={bottom - tick * yScale} stroke="#263448" />
          <text x={left - 12} y={bottom - tick * yScale + 4} fill="#cbd5e1" fontSize="12" textAnchor="end">
            {tick}
          </text>
        </g>
      ))}
      {values.map((value) => {
        const sameYear = values.filter((item) => item.year === value.year);
        const offset = (sameYear.indexOf(value) - (sameYear.length - 1) / 2) * 28;
        const x = left + (value.year - yearMin) * xScale + offset;
        const y = bottom - value.usdMillions * yScale;
        return (
          <g key={`${value.label}-${value.year}`} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={onSelect ? `${value.label}, ${value.year}, approximately ${value.usdMillions} million dollars` : undefined} aria-pressed={onSelect ? selectedLabel === value.label : undefined} onClick={() => onSelect?.(value.label)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect?.(value.label); } }} style={{ cursor: onSelect ? "pointer" : undefined, opacity: selectedLabel && selectedLabel !== value.label ? 0.55 : 1 }}>
            <circle cx={x} cy={y} r="24" fill="transparent" />
            <line x1={x} y1={bottom} x2={x} y2={y} stroke={layerStroke(value.layer)} strokeWidth="3" />
            <circle
              cx={x}
              cy={y}
              r="8"
              fill={value.layer === "protocol" ? "url(#protocolPattern)" : "#2dd4bf"}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <text x={x} y={y - 14} fill="#cbd5e1" fontSize="12" textAnchor="middle">
              {value.label}
            </text>
          </g>
        );
      })}
      <text x={left + 305} y="340" fill="#cbd5e1" fontSize="13" textAnchor="middle">
        Year
      </text>
      <text x="18" y="160" fill="#cbd5e1" fontSize="13" transform="rotate(-90 18 160)" textAnchor="middle">
        USD millions
      </text>
    </svg>
  );
}
