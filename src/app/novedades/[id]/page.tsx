// src/app/novedades/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const revalidate = 60; // Revalida la página cada 60 segundos

// Props para recibir el ID de la URL
type NoticiaPageProps = {
  params: {
    id: string;
  }
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  // Pedimos a Supabase solo la noticia con el ID que viene en la URL
  const { data: noticia, error } = await supabase
    .from('novedades')
    .select('*')
    .eq('id', params.id)
    .single();

  // Si no se encuentra la noticia o hay un error, mostramos página 404
  if (error || !noticia) {
    notFound();
  }

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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

          {/* Usamos prose para dar estilos automáticos al contenido del post */}
          <div className="prose prose-lg max-w-none text-justify">
            {noticia.contenido}
          </div>
        </div>
      </div>
    </article>
  );
}