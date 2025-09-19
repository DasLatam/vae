// src/app/novedades/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination } from '@/components/Pagination';
import { Newspaper } from 'lucide-react'; // Ícono para noticias sin imagen

export const revalidate = 0;

export default async function NovedadesPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const itemsPerPage = 6;
  const currentPage = parseInt(searchParams.page || '1', 10);
  
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { count, error: countError } = await supabase
    .from('novedades')
    .select('*', { count: 'exact', head: true });

  const { data: novedades, error } = await supabase
    .from('novedades')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error || countError) {
    return <p className="text-center text-red-500 py-10">Error al cargar las noticias.</p>;
  }
  
  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900">Novedades</h1>
            <p className="text-lg text-slate-600 mt-2">
              Mantente al día con la información más reciente sobre el voto argentino en el exterior.
            </p>
          </div>

          {(!novedades || novedades.length === 0) ? (
            <p className="text-center text-slate-500">Aún no hay noticias publicadas.</p>
          ) : (
            // --- NUEVA GRILLA DE 2 COLUMNAS ---
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {novedades.map((noticia) => (
                <Link key={noticia.id} href={`/novedades/${noticia.id}`} className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col overflow-hidden group">
                  
                  {/* Sección de la Imagen con Placeholder si no existe */}
                  <div className="relative w-full h-48 bg-slate-200">
                    {noticia.imagen_destacada_url ? (
                      <Image
                        src={noticia.imagen_destacada_url}
                        alt={`Imagen para ${noticia.titulo}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Newspaper className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Sección del Contenido */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-slate-500 mb-2">
                      {new Date(noticia.created_at).toLocaleDateString('es-AR', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                    <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                      {noticia.titulo}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm mb-4 flex-grow">
                      {noticia.bajada}
                    </p>
                    <span className="font-semibold text-blue-600 mt-auto">
                      Leer más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/novedades" />
        </div>
      </div>
    </div>
  );
}