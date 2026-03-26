import React from "react";
import { Bar } from 'react-chartjs-2';
import ChartCard from './ChartCard';
import { t } from "../../i18n";

const COLORS = ["#4a7c59", "#3a6ea8", "#c8860a", "#9b59b6", "#d44a2a"];

const CropRecommendationChart = ({ cropResult, theme = "light", lang = "en" }) => {
  const isDark = theme === "dark";
  const textSecondary = isDark ? "#a0b09e" : "#5a5a52";
  const gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(128, 128, 128, 0.15)";
  const titleColor = isDark ? "#e8ede6" : "#1a1a14";

  if (!cropResult?.top_crops) {
    return (
      <ChartCard
        title={t(lang, "chartTopCropTitle")}
        subtitle={t(lang, "chartTopCropSub")}
      />
    );
  }

  const crops = cropResult.top_crops;
  const base = COLORS.slice(0, crops.length);
  const data = {
    labels: crops.map(c => c.crop.charAt(0).toUpperCase() + c.crop.slice(1)),
    datasets: [{
      label: 'Match (%)',
      data: crops.map(c => c.probability.toFixed(2)),
      backgroundColor: base.map(c => c + "cc"),
      borderColor: base.map(c => c + "f0"),
      borderWidth: 2.5,
      borderRadius: 10,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ` ${ctx.parsed.y}% match` }
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        formatter: v => v + '%',
        color: textSecondary,
        font: { weight: '600', size: 11 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Probability (%)', color: titleColor },
        ticks: { color: textSecondary },
        grid: { color: gridColor },
      },
      x: { grid: { display: false }, ticks: { color: textSecondary } },
    },
  };

  return (
    <ChartCard
      title={t(lang, "chartTopCropTitle")}
      subtitle={t(lang, "chartTopCropSub")}
    >
      <Bar data={data} options={options} />
    </ChartCard>
  );
};

export default CropRecommendationChart;
