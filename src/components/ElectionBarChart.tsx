// src/components/ElectionBarChart.tsx

type ResultData = {
  lista_titulo: string;
  votos: number;
};

type ElectionBarChartProps = {
  data: ResultData[];
  title: string;
};

// Mapeo de partidos a colores de Tailwind CSS
const colorMap: Record<string, string> = {
  "Unión por la Patria": "bg-sky-600",
  "La Libertad Avanza": "bg-purple-600",
  "Juntos por el Cambio": "bg-yellow-400 text-black", // Texto negro para mejor contraste
  "Frente de Izquierda": "bg-red-600",
  "Hacemos por Nuestro País": "bg-sky-400",
  "Frente de Todos": "bg-sky-600",
  "Consenso Federal": "bg-sky-400",
  "Unite por la Libertad y el Trabajo": "bg-green-500",
  "Frente NOS": "bg-teal-500",
};

export function ElectionBarChart({ data, title }: ElectionBarChartProps) {
  const totalVotos = data.reduce((sum, item) => sum + item.votos, 0);
  const sortedData = [...data].sort((a, b) => b.votos - a.votos);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 w-full">
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">Total: {totalVotos.toLocaleString('es-AR')} votos</p>
      
      <div className="space-y-4">
        {sortedData.map((result) => {
          const percentage = totalVotos > 0 ? (result.votos / totalVotos) * 100 : 0;
          const colorClasses = colorMap[result.lista_titulo] || "bg-slate-400";
          const threshold = 18; // Umbral para decidir si el texto va adentro o afuera

          return (
            <div key={result.lista_titulo} className="grid grid-cols-10 gap-2 items-center text-sm">
              <div className="col-span-6">
                <div className="w-full bg-slate-200 rounded-full h-7 flex items-center">
                  <div
                    className={`${colorClasses} h-7 rounded-full text-white font-bold flex items-center justify-end pr-2 transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  >
                    {/* El porcentaje se muestra DENTRO si la barra es suficientemente larga */}
                    {percentage >= threshold && <span>{percentage.toFixed(1)}%</span>}
                  </div>
                  {/* El porcentaje se muestra AFUERA (en la parte gris) si la barra es muy corta */}
                  {percentage < threshold && (
                    <span className="pl-2 font-bold text-slate-600">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-4 font-medium text-slate-700">
                {result.lista_titulo}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}