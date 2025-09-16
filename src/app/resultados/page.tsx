// src/app/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';

// Hacemos que la página se actualice dinámicamente
export const revalidate = 0;

export default async function ResultadosPage() {
  const { data: resultados, error } = await supabase
    .from('resultados_historicos')
    .select('*')
    .order('ano', { ascending: false })
    .order('pais', { ascending: true })
    .order('votos', { ascending: false });

  if (error) {
    return <p className="text-center text-red-500 py-10">Error al cargar los resultados.</p>;
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900">Resultados Históricos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Resultados de elecciones pasadas de argentinos en el exterior.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
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
                  resultados.map((resultado) => (
                    <tr key={resultado.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{resultado.ano}</td>
                      <td className="px-6 py-4">{resultado.pais}</td>
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