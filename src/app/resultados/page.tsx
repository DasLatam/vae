// src/app/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { ElectionBarChart } from '@/components/ElectionBarChart';
import { ExternalLink, AlertCircle } from 'lucide-react';

export const revalidate = 0;

export default async function ResultadosPage() {
  const { data: resultados, error } = await supabase
    .from('resultados_historicos')
    .select('*')
    .order('ano', { ascending: false });

  if (error) {
    return <p className="text-center text-red-500 py-10">Error al cargar los resultados.</p>;
  }

  const groupedResults = resultados.reduce((acc, resultado) => {
    const key = `${resultado.ano} - ${resultado.nombre_eleccion}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(resultado);
    return acc;
  }, {} as Record<string, typeof resultados>);

  const getSortOrder = (title: string) => {
    if (title.includes('Ballotage')) return 3;
    if (title.includes('2023')) return 2;
    if (title.includes('2019')) return 1;
    return 0;
  };
  const sortedElectionTitles = Object.keys(groupedResults).sort((a, b) => getSortOrder(b) - getSortOrder(a));

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900">Resultados Históricos</h1>
          <p className="text-lg text-slate-600 mt-2">
            Visualización de elecciones pasadas de argentinos en el exterior.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* --- Marcador Actualizado para 2025 --- */}
          <div className="bg-amber-100 p-6 rounded-lg border border-amber-300 text-center">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-amber-800">Resultados Elecciones 2025</h3>
            <p className="text-amber-700 mt-1">A la espera de los resultados definitivos oficiales.</p>
          </div>

          {sortedElectionTitles.map((title) => (
            <ElectionBarChart key={title} title={title} data={groupedResults[title]} />
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-16">
           <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Datos Detallados</h2>
           <div className="overflow-x-auto bg-white rounded-lg shadow border"><table className="min-w-full text-sm text-left text-gray-700"><thead className="bg-gray-100 text-xs text-gray-700 uppercase"><tr><th scope="col" className="px-6 py-3">Año</th><th scope="col" className="px-6 py-3">País</th><th scope="col" className="px-6 py-3">Lista / Candidato</th><th scope="col" className="px-6 py-3 text-right">Votos</th></tr></thead><tbody>{resultados && resultados.length > 0 ? (resultados.map((resultado) => (<tr key={resultado.id} className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">{resultado.ano}</td><td className="px-6 py-4">{resultado.pais}</td><td className="px-6 py-4">{resultado.lista_titulo}</td><td className="px-6 py-4 text-right font-semibold">{resultado.votos.toLocaleString('es-AR')}</td></tr>))) : (<tr><td colSpan={4} className="text-center py-10 text-gray-500">Aún no hay resultados cargados.</td></tr>)}</tbody></table></div>
        </div>

        <div className="text-center mt-12"><a href="https://www.argentina.gob.ar/sites/default/files/2024/08/informe_argentinos_en_el_exterior.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors">Fuente de la Información<ExternalLink className="ml-2" size={20} /></a></div>
      </div>
    </div>
  );
}