// src/app/encuestas/[id]/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Mail, ArrowLeftCircle } from 'lucide-react'; // Importamos icono
import Link from 'next/link';

export const revalidate = 0;

// Tipos adaptados a los nombres genéricos
type ResultadoGenerico = {
    respuesta: string; // Sea partido o valoración
    votos: number;
    porcentaje: number;
};

type RespuestaDataGenerica = {
    partido_politico: string | null; // Columna donde guardamos la respuesta principal
};

async function getEncuestaInfo(encuestaId: string) {
    const { data, error } = await supabase
        .from('encuestas')
        .select('titulo, descripcion')
        .eq('id', encuestaId)
        .single();
    return error ? null : data;
}

async function getResultados(encuestaId: string) {
    const { data, error, count } = await supabase
        .from('respuestas_encuesta')
        .select('partido_politico', { count: 'exact' }) // Leemos la columna reutilizada
        .eq('encuesta_id', encuestaId);

    if (error) {
        console.error("Error fetching results:", error);
        return null;
    }

    const conteo = (data as RespuestaDataGenerica[]).reduce((acc: Record<string, number>, respuesta) => {
        const valor = respuesta.partido_politico;
        if (valor) {
            acc[valor] = (acc[valor] || 0) + 1;
        }
        return acc;
    }, {});

    const totalVotos = count || 0;
    
    // Usamos el tipo genérico
    const resultados: ResultadoGenerico[] = Object.entries(conteo)
        .map(([respuesta, votos]) => ({
            respuesta, 
            votos,
            porcentaje: totalVotos > 0 ? (votos / totalVotos) * 100 : 0
        }))
        // Ordenamos por votos descendente como default
        .sort((a, b) => b.votos - a.votos);

    // Si es la encuesta 2 (comunicación), intentamos ordenar por lógica
    if (encuestaId === '2') {
         resultados.sort((a, b) => {
            const order = ["Buena - Llega información clara", "Regular - Podría ser mejor", "Mala - No me siento informado", "No sabe / No contesta"];
            const indexA = order.indexOf(a.respuesta);
            const indexB = order.indexOf(b.respuesta);
            // Si ambos están en el orden, usa ese orden. Si no, va al final.
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return b.votos - a.votos; // Ordena los "otros" por votos
         });
    }


    return { resultados, totalVotos };
}

export default async function ResultadosPage({ params }: { params: { id: string } }) {
    const encuestaInfo = await getEncuestaInfo(params.id);
    const data = await getResultados(params.id);

    if (!data || !encuestaInfo) return <p className="text-center py-10">Error al cargar resultados o información de la encuesta.</p>;

    const { resultados, totalVotos } = data;
    const idEncuestaAnterior = 1;

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-lg border">
                    <h1 className="text-3xl font-bold text-center mb-2">Resultados: {encuestaInfo.titulo}</h1>
                    <p className="text-slate-600 text-center mb-8">Total de respuestas recibidas: {totalVotos}</p>
                    <div className="space-y-4">
                        {resultados.length > 0 ? (
                            resultados.map(({ respuesta, votos, porcentaje }) => ( 
                                <div key={respuesta}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold text-slate-700">{respuesta}</span>
                                        <span className="text-sm text-slate-500">{votos} respuesta(s) ({porcentaje.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-4">
                                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 py-4">Aún no se han registrado respuestas para esta encuesta.</p>
                        )}
                    </div>
                     {/* --- Enlace a resultados anteriores MÁS VISIBLE --- */}
                     <div className="text-center mt-10 pt-6 border-t">
                        <Link href={`/encuestas/${idEncuestaAnterior}/resultados`} className="inline-flex items-center text-sm text-blue-600 hover:underline">
                           <ArrowLeftCircle size={16} className="mr-2"/> Ver resultados de la encuesta anterior (Intención de Voto 2025)
                        </Link>
                     </div>
                </div>

                <div id="formulario-suscripcion" className="bg-white p-8 rounded-lg shadow-lg border text-center">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">¿Querés recibir los resultados finales?</h2>
                    <p className="text-slate-600 mt-2 mb-6 max-w-2xl mx-auto">
                        Suscribite a nuestras alertas y te enviaremos un correo con el informe final cuando la encuesta termine.
                    </p>
                    <div className="max-w-lg mx-auto">
                        <NewsletterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}