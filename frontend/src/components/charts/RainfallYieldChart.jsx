import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import ChartCard from './ChartCard';
import mockData from '../../crop_data.json';

import { t } from "../../i18n";

const RainfallYieldChart = ({ theme = "light", lang = "en" }) => {
  const isDark = theme === "dark";
  const textSecondary = isDark ? "#a0b09e" : "#5a5a52";
  const gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(128, 128, 128, 0.15)";
  const titleColor = isDark ? "#e8ede6" : "#1a1a14";

  const { labels, yieldVals, rainfallVals } = useMemo(() => {
    const cropLabels = [...new Set(mockData.map(d => d.label))];
    const agg = cropLabels.map(label => {
      const rows = mockData.filter(d => d.label === label);
      return {
        label,
        avgRainfall: (rows.reduce((s, d) => s + d.rainfall, 0) / rows.length).toFixed(1),
        avgYield:    (rows.reduce((s, d) => s + d.Yield_t_ha, 0) / rows.length).toFixed(2),
      };
    });
    return {
      labels:      agg.map(d => d.label),
      yieldVals:   agg.map(d => d.avgYield),
      rainfallVals: agg.map(d => d.avgRainfall),
    };
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Yield (t/ha)',
        data: yieldVals,
        borderColor: '#4a7c59',
        backgroundColor: 'rgba(74,124,89,0.16)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        yAxisID: 'y-yield',
      },
      {
        label: 'Avg Rainfall (mm)',
        data: rainfallVals,
        borderColor: '#3a6ea8',
        backgroundColor: 'rgba(58,110,168,0.16)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        yAxisID: 'y-rainfall',
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
      'y-yield': {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Yield (t/ha)', color: titleColor },
        grid: { color: gridColor },
        ticks: { color: textSecondary },
      },
      'y-rainfall': {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Rainfall (mm)', color: titleColor },
        grid: { drawOnChartArea: false },
        ticks: { color: textSecondary },
      },
      x: { ticks: { maxRotation: 45, color: textSecondary }, grid: { display: false } },
    },
  };

  return (
    <ChartCard title={t(lang, "chartRainYieldTitle")} subtitle={t(lang, "chartRainYieldSub")}>
      <Line data={data} options={options} />
    </ChartCard>
  );
};

export default RainfallYieldChart;
