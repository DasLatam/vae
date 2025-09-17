// src/components/ElectionDonutChart.tsx
"use client";

import { DonutChart, Legend } from '@tremor/react';

// Definimos el tipo de datos que espera el gráfico
type ChartData = {
  lista_titulo: string;
  votos: number;
};

type ElectionDonutChartProps = {
  data: ChartData[];
  title: string;
};

export function ElectionDonutChart({ data, title }: ElectionDonutChartProps) {
  // Damos formato a los números para que se vean mejor
  const valueFormatter = (number: number) => `${new Intl.NumberFormat('es-AR').format(number).toString()} votos`;
  
  // Transformamos los datos al formato que espera el componente DonutChart
  const chartData = data.map(item => ({
    name: item.lista_titulo,
    value: item.votos
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 text-center">{title}</h3>
      <DonutChart
        className="mt-6"
        data={chartData}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={["blue", "cyan", "indigo", "violet", "slate", "amber"]}
        showAnimation={true}
      />
      <Legend
        categories={chartData.map(item => item.name)}
        colors={["blue", "cyan", "indigo", "violet", "slate", "amber"]}
        className="mt-4 max-w-xs mx-auto"
      />
    </div>
  );
}