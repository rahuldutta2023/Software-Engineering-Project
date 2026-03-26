import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from './ChartCard';
import mockData from '../../crop_data.json';
import { t } from "../../i18n";

const PestIndexChart = ({ dynamicData, theme = "light", lang = "en" }) => {
  const initial = useMemo(() => {
    const labels = [...new Set(mockData.map(d => d.label))];
    return {
      labels,
      datasets: [{
        label: 'Pest Index',
        data: labels.map(l => {
          const rows = mockData.filter(d => d.label === l);
          return (rows.reduce((s, d) => s + d.Pest_Index, 0) / rows.length).toFixed(2);
        }),
        backgroundColor: '#d44a2acc',
        borderColor: '#d44a2a',
        borderWidth: 3,
        borderRadius: 6,
      }],
    };
  }, []);

  const isDark = theme === "dark";
  const textSecondary = isDark ? "#a0b09e" : "#5a5a52";
  const gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(128,128,128,0.15)";

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
        formatter: v => v,
        color: textSecondary,
        font: { size: 10 },
      },
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: 'Index Value', color: textSecondary }, grid: { color: gridColor }, ticks: { color: textSecondary } },
      y: { grid: { display: false }, ticks: { font: { size: 11 }, color: textSecondary } },
    },
    layout: { padding: { right: 30 } },
  };

  return (
    <ChartCard
      title={t(lang, "chartPestTitle")}
      subtitle={dynamicData ? 'Filtered to recommended crops' : 'All crops in dataset'}
    >
      <Bar data={dynamicData || initial} options={options} />
    </ChartCard>
  );
};

export default PestIndexChart;
