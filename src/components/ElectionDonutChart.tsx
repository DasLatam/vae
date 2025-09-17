// src/components/ElectionDonutChart.tsx
"use client";

import { DonutChart, Legend } from '@tremor/react';

type ChartData = {
  lista_titulo: string;
  votos: number;
};

type ElectionDonutChartProps = {
  data: ChartData[];
  title: string;
};

export function ElectionDonutChart({ data, title }: ElectionDonutChartProps) {
  const valueFormatter = (number: number) => `${new Intl.NumberFormat('es-AR').format(number).toString()} votos`;
  
  const chartData = data.map(item => ({
    name: item.lista_titulo,
    value: item.votos
  }));

  const totalVotos = data.reduce((sum, item) => sum + item.votos, 0);

  const colorPalette = [
    "blue", "cyan", "sky", "indigo", "violet", "purple",
    "fuchsia", "rose", "red", "orange", "amber", "yellow",
    "lime", "green", "emerald", "teal", "slate"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">
          Total: {valueFormatter(totalVotos)}
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center my-4">
        <DonutChart
          data={chartData}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          colors={colorPalette}
          showAnimation={true}
          // Usamos 'donut' en lugar de 'pie' para un look más moderno
        />
      </div>
      
      <Legend
        categories={chartData.map(item => item.name)}
        colors={colorPalette}
        className="max-w-xs mx-auto"
      />
    </div>
  );
}