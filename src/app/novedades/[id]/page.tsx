// src/app/novedades/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

export const revalidate = 60; // Revalida la página cada 60 segundos

type NoticiaPageProps = {
  params: {
    id: string;
  }
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  // 1. Obtenemos la lista completa de noticias, ordenadas por fecha
  const { data: todasLasNovedades } = await supabase
    .from('novedades')
    .select('id')
    .order('created_at', { ascending: false });

  // 2. Obtenemos la noticia actual
  const { data: noticia, error } = await supabase
    .from('novedades')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !noticia || !todasLasNovedades) {
    notFound();
  }

  // 3. Encontramos la posición de la noticia actual en la lista
  const currentIndex = todasLasNovedades.findIndex(item => item.id === noticia.id);
  const prevNoticia = currentIndex > 0 ? todasLasNovedades[currentIndex - 1] : null;
  const nextNoticia = currentIndex < todasLasNovedades.length - 1 ? todasLasNovedades[currentIndex + 1] : null;

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Contenido de la noticia */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {noticia.titulo}
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            {noticia.bajada}
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Publicado el {new Date(noticia.created_at).toLocaleDateString('es-AR', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
          
          {noticia.imagen_destacada_url && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={noticia.imagen_destacada_url} 
                alt={`Imagen destacada para ${noticia.titulo}`}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-justify" dangerouslySetInnerHTML={{ __html: noticia.contenido.replace(/\n/g, '<br />') }}>
            {/* El contenido se inserta aquí para interpretar saltos de línea */}
          </div>

          {/* Menú de Navegación de Noticias */}
          <hr className="my-12 border-slate-300" />
          <nav className="flex justify-between items-center">
            <div>
              {prevNoticia && (
                <Link href={`/novedades/${prevNoticia.id}`} className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowLeftCircle className="mr-2" size={20} />
                  Noticia Anterior
                </Link>
              )}
            </div>
            <div>
              {nextNoticia && (
                <Link href={`/novedades/${nextNoticia.id}`} className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                  Próxima Noticia
                  <ArrowRightCircle className="ml-2" size={20} />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </article>
  );
}