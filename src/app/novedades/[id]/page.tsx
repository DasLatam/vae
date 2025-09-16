// src/app/novedades/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { ShareButtons } from '@/components/ShareButtons'; // Importamos el nuevo componente

export const revalidate = 60;

type NoticiaPageProps = {
  params: {
    id: string;
  }
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { data: todasLasNovedades } = await supabase
    .from('novedades')
    .select('id')
    .order('created_at', { ascending: false });

  const { data: noticia, error } = await supabase
    .from('novedades')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !noticia || !todasLasNovedades) {
    notFound();
  }

  const currentIndex = todasLasNovedades.findIndex(item => item.id === noticia.id);
  const prevNoticia = currentIndex > 0 ? todasLasNovedades[currentIndex - 1] : null;
  const nextNoticia = currentIndex < todasLasNovedades.length - 1 ? todasLasNovedades[currentIndex + 1] : null;

  // Construimos la URL completa para compartir
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/novedades/${noticia.id}`;

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

          <div className="prose prose-lg max-w-none text-justify" dangerouslySetInnerHTML={{ __html: noticia.contenido.replace(/\n/g, '<br />') }}>
          </div>

          {/* --- BOTONERA PARA COMPARTIR AÑADIDA --- */}
          <div className="mt-12 py-6 border-t border-slate-200">
            <ShareButtons title={noticia.titulo} url={fullUrl} />
          </div>

          {/* Menú de Navegación de Noticias */}
          <nav className="flex justify-between items-center border-t border-slate-200 pt-6">
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