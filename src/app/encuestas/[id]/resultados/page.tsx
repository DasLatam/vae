// src/app/encuestas/[id]/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Mail } from 'lucide-react';
import Link from 'next/link'; // Importar Link

export const revalidate = 0;

type Resultado = {
    partido: string; // Mantenemos el nombre pero ahora contiene la valoración
    votos: number;
    porcentaje: number;
};

type RespuestaData = {
    partido_politico: string | null;
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
        .select('partido_politico', { count: 'exact' })
        .eq('encuesta_id', encuestaId);

    if (error) {
        console.error("Error fetching results:", error);
        return null;
    }

    const conteo = (data as RespuestaData[]).reduce((acc: Record<string, number>, respuesta) => {
        const valoracion = respuesta.partido_politico; // Ahora es la valoración
        if (valoracion) {
            acc[valoracion] = (acc[valoracion] || 0) + 1;
        }
        return acc;
    }, {});

    const totalVotos = count || 0;
    
    // Mapeamos los resultados. La variable se sigue llamando 'partido' internamente
    const resultados: Resultado[] = Object.entries(conteo)
        .map(([valoracion, votos]) => ({
            partido: valoracion, 
            votos,
            porcentaje: totalVotos > 0 ? (votos / totalVotos) * 100 : 0
        }))
        // Ordenamos por un orden lógico de valoración si es posible
        .sort((a, b) => {
            const order = ["Muy Buena", "Buena", "Regular", "Mala", "Muy Mala", "No sabe / No contesta"];
            return (order.indexOf(a.partido) - order.indexOf(b.partido)) || (b.votos - a.votos); // Si no está en la lista, ordena por votos
         });

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
                    {/* Usamos el título de la encuesta */}
                    <h1 className="text-3xl font-bold text-center mb-2">Resultados: {encuestaInfo.titulo}</h1>
                    <p className="text-slate-600 text-center mb-8">Total de respuestas recibidas: {totalVotos}</p>
                    <div className="space-y-4">
                        {resultados.length > 0 ? (
                            resultados.map(({ partido: valoracion, votos, porcentaje }) => ( // Renombramos la variable para claridad
                                <div key={valoracion}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold text-slate-700">{valoracion}</span>
                                        <span className="text-sm text-slate-500">{votos} respuesta(s) ({porcentaje.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-4">
                                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 py-4">Aún no se han registrado respuestas.</p>
                        )}
                    </div>
                     {/* --- Enlace condicional a resultados anteriores --- */}
                    {params.id === '2' && ( 
                        <div className="text-center mt-8">
                            <Link href={`/encuestas/${idEncuestaAnterior}/resultados`} className="text-sm text-blue-600 hover:underline">
                                Ver resultados de la encuesta anterior (Intención de Voto 2025)
                            </Link>
                        </div>
                     )}
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