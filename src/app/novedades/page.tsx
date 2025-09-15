// src/app/novedades/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

// Hacemos que la página se actualice dinámicamente
export const revalidate = 0;

export default async function NovedadesPage() {
  // 1. Pedimos las noticias a Supabase, ordenadas por fecha de creación
  const { data: novedades, error } = await supabase
    .from('novedades')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Manejo de errores o si no hay noticias
  if (error) {
    return <p className="text-center text-red-500">Error al cargar las noticias.</p>;
  }
  if (!novedades || novedades.length === 0) {
    return <p className="text-center text-gray-500">Aún no hay noticias publicadas.</p>;
  }

  // 3. Mostramos las noticias
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900">Novedades</h1>
            <p className="text-lg text-gray-600 mt-2">
              Mantente al día con la información más reciente sobre el voto argentino en el exterior.
            </p>
          </div>

          <div className="space-y-8">
            {novedades.map((noticia) => (
              <div key={noticia.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(noticia.created_at).toLocaleDateString('es-AR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{noticia.titulo}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{noticia.bajada}</p>
                {/* Por ahora, no enlazamos a ningún lado, pero preparamos el botón */}
                <a className="font-semibold text-blue-600 hover:text-blue-800">
                  Leer más →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}