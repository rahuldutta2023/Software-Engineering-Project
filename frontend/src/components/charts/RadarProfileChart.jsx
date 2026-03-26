import React from "react";
import { Radar } from 'react-chartjs-2';
import ChartCard from './ChartCard';
import { t } from "../../i18n";

const IDEAL_RICE = { N: 80, P: 45, K: 45, temperature: 25, humidity: 80, ph: 6.5, rainfall: 200 };
const LABELS = ['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall'];
const KEYS   = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];

const RadarProfileChart = ({ inputs, theme = "light", lang = "en" }) => {
  const isDark = theme === "dark";
  const textSecondary = isDark ? "#a0b09e" : "#5a5a52";
  const gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(128,128,128,0.2)";

  const data = {
    labels: LABELS,
    datasets: [
      {
        label: 'Your Input',
        data: KEYS.map(k => inputs[k]),
        backgroundColor: 'rgba(74,124,89,0.15)',
        borderColor: '#4a7c59',
        pointBackgroundColor: '#4a7c59',
        borderWidth: 4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Ideal — Rice',
        data: KEYS.map(k => IDEAL_RICE[k]),
        backgroundColor: 'rgba(58,110,168,0.10)',
        borderColor: '#3a6ea8',
        pointBackgroundColor: '#3a6ea8',
        borderWidth: 4,
        borderDash: [5, 3],
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      datalabels: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        angleLines: { color: gridColor },
        grid: { color: gridColor },
        pointLabels: { font: { size: 12 }, color: textSecondary },
      },
    },
  };

  return (
    <ChartCard
      title={t(lang, "chartRadarTitle")}
      subtitle={t(lang, "chartRadarSub")}
    >
      <Radar data={data} options={options} />
    </ChartCard>
  );
};

export default RadarProfileChart;
