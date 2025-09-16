// src/app/novedades/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export const revalidate = 0;

export default async function NovedadesPage() {
  const { data: novedades, error } = await supabase
    .from('novedades')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="text-center text-red-500 py-10">Error al cargar las noticias.</p>;
  }
  
  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900">Novedades</h1>
            <p className="text-lg text-slate-600 mt-2">
              Mantente al día con la información más reciente sobre el voto argentino en el exterior.
            </p>
          </div>

          {(!novedades || novedades.length === 0) ? (
            <p className="text-center text-slate-500">Aún no hay noticias publicadas.</p>
          ) : (
            <div className="space-y-8">
              {novedades.map((noticia) => (
                // Ahora cada tarjeta es un enlace a su propia página
                <Link key={noticia.id} href={`/novedades/${noticia.id}`} className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all">
                  <p className="text-sm text-slate-500 mb-2">
                    {new Date(noticia.created_at).toLocaleDateString('es-AR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">{noticia.titulo}</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">{noticia.bajada}</p>
                  <span className="font-semibold text-blue-600 hover:text-blue-800">
                    Leer más →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}