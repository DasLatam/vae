// src/app/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { ElectionDonutChart } from '@/components/ElectionDonutChart'; // 1. Importar el nuevo componente

export const revalidate = 0;

export default async function ResultadosPage() {
  const { data: resultados, error } = await supabase
    .from('resultados_historicos')
    .select('ano, nombre_eleccion, lista_titulo, votos')
    .order('ano', { ascending: false });

  if (error) {
    return <p className="text-center text-red-500 py-10">Error al cargar los resultados.</p>;
  }
  
  // 2. Agrupar los resultados por elección (ej: "2023 - Elecciones Presidenciales")
  const groupedResults = resultados.reduce((acc, resultado) => {
    const key = `${resultado.ano} - ${resultado.nombre_eleccion}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(resultado);
    return acc;
  }, {} as Record<string, typeof resultados>);


  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900">Resultados Históricos</h1>
          <p className="text-lg text-slate-600 mt-2">
            Visualización de elecciones pasadas de argentinos en el exterior.
          </p>
        </div>
        
        {/* 3. Sección de Gráficos */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {Object.entries(groupedResults).map(([title, data]) => (
            <ElectionDonutChart key={title} title={title} data={data} />
          ))}
        </div>

        {/* 4. Tabla de Datos Detallados (se mantiene como antes) */}
        <div className="max-w-5xl mx-auto mt-12">
           <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Datos Detallados</h2>
           <div className="overflow-x-auto bg-white rounded-lg shadow border">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Año</th>
                  <th scope="col" className="px-6 py-3">País</th>
                  <th scope="col" className="px-6 py-3">Título de la Lista</th>
                  <th scope="col" className="px-6 py-3 text-right">Votos</th>
                </tr>
              </thead>
              <tbody>
                {resultados && resultados.length > 0 ? (
                  resultados.map((resultado, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{resultado.ano}</td>
                      <td className="px-6 py-4">Global</td> {/* Recordar que este dato es global */}
                      <td className="px-6 py-4">{resultado.lista_titulo}</td>
                      <td className="px-6 py-4 text-right font-semibold">{resultado.votos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      Aún no hay resultados cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}