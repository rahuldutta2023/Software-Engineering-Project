import React from "react";
import { Bar } from 'react-chartjs-2';
import ChartCard from './ChartCard';
import { t } from "../../i18n";

const NPKChart = ({ inputs, theme = "light", lang = "en" }) => {
  const isDark = theme === "dark";
  const textSecondary = isDark ? "#a0b09e" : "#5a5a52";
  const gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(128, 128, 128, 0.15)";
  const titleColor = isDark ? "#e8ede6" : "#1a1a14";

  const data = {
    labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)'],
    datasets: [{
      label: 'kg/ha',
      data: [inputs.N, inputs.P, inputs.K],
      backgroundColor: ['rgba(74,124,89,0.35)', 'rgba(58,110,168,0.35)', 'rgba(200,134,10,0.35)'],
      borderColor: ['#4a7c59', '#3a6ea8', '#c8860a'],
      borderWidth: 2.5,
      borderRadius: 10,
    }],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        formatter: v => v + ' kg/ha',
        color: textSecondary,
        font: { weight: '600', size: 11 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 300,
        title: { display: true, text: 'Concentration (kg/ha)', color: titleColor },
        ticks: { color: textSecondary },
        grid: { color: gridColor },
      },
      y: { grid: { display: false }, ticks: { color: textSecondary } },
    },
    layout: { padding: { right: 60 } },
  };

  return (
    <ChartCard title={t(lang, "chartNpkTitle")} subtitle={t(lang, "chartNpkSub")}>
      <Bar data={data} options={options} />
    </ChartCard>
  );
};

export default NPKChart;
