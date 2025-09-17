// src/app/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { ElectionBarChart } from '@/components/ElectionBarChart'; // Importamos el nuevo componente

export const revalidate = 0;

export default async function ResultadosPage() {
  const { data: resultados, error } = await supabase
    .from('resultados_historicos')
    .select('ano, nombre_eleccion, lista_titulo, votos');

  if (error) {
    return <p className="text-center text-red-500 py-10">Error al cargar los resultados.</p>;
  }
  
  // Agrupamos los resultados por elección
  const groupedResults = resultados.reduce((acc, resultado) => {
    const key = `${resultado.ano} - ${resultado.nombre_eleccion}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(resultado);
    return acc;
  }, {} as Record<string, typeof resultados>);

  // Ordenamos los grupos de elecciones por año, del más reciente al más antiguo
  const sortedElectionTitles = Object.keys(groupedResults).sort((a, b) => {
    const yearA = parseInt(a.split(' - ')[0]);
    const yearB = parseInt(b.split(' - ')[0]);
    return yearB - yearA;
  });

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900">Resultados Históricos</h1>
          <p className="text-lg text-slate-600 mt-2">
            Visualización de elecciones pasadas de argentinos en el exterior.
          </p>
        </div>
        
        {/* Sección de Gráficos de Barras */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sortedElectionTitles.map((title) => (
            <ElectionBarChart key={title} title={title} data={groupedResults[title]} />
          ))}
        </div>

      </div>
    </div>
  );
}