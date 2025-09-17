// src/app/encuestas/[id]/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { NewsletterForm } from '@/components/NewsletterForm'; // Importamos el formulario
import { Mail } from 'lucide-react'; // Importamos el ícono

// Con esta línea, forzamos a que la página siempre pida los datos más recientes
export const revalidate = 0;

async function getResultados(encuestaId: string) {
    const { data, error, count } = await supabase
        .from('respuestas_encuesta')
        .select('*', { count: 'exact' }) // Usamos count: 'exact' para obtener el total
        .eq('encuesta_id', encuestaId);

    if (error) return null;

    // Contamos los votos por partido
    const conteo = data.reduce((acc, { partido_politico }) => {
        if (partido_politico) {
            acc[partido_politico] = (acc[partido_politico] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const totalVotos = count || 0;
    
    const resultados = Object.entries(conteo)
        .map(([partido, votos]) => ({
            partido,
            votos,
            porcentaje: totalVotos > 0 ? (votos / totalVotos) * 100 : 0
        }))
        .sort((a, b) => b.votos - a.votos);

    return { resultados, totalVotos };
}

export default async function ResultadosPage({ params }: { params: { id: string } }) {
    const data = await getResultados(params.id);

    if (!data) return <p className="text-center py-10">Error al cargar resultados.</p>;

    const { resultados, totalVotos } = data;

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl space-y-12">
                {/* Sección de Resultados */}
                <div className="bg-white p-8 rounded-lg shadow-lg border">
                    <h1 className="text-3xl font-bold text-center mb-2">Resultados Parciales de la Encuesta</h1>
                    <p className="text-slate-600 text-center mb-8">Total de votos recibidos hasta ahora: {totalVotos}</p>
                    <div className="space-y-4">
                        {resultados.length > 0 ? (
                            resultados.map(({ partido, votos, porcentaje }) => (
                                <div key={partido}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold text-slate-700">{partido}</span>
                                        <span className="text-sm text-slate-500">{votos} voto(s) ({porcentaje.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-4">
                                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 py-4">Aún no se han registrado votos. ¡Sé el primero!</p>
                        )}
                    </div>
                </div>

                {/* Sección de Suscripción */}
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