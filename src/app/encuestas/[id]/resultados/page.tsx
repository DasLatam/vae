// src/app/encuestas/[id]/resultados/page.tsx
import { supabase } from '@/lib/supabaseClient';

async function getResultados(encuestaId: string) {
    const { data, error } = await supabase
        .from('respuestas_encuesta')
        .select('partido_politico')
        .eq('encuesta_id', encuestaId);

    if (error) return null;

    const conteo = data.reduce((acc, { partido_politico }) => {
        acc[partido_politico] = (acc[partido_politico] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const totalVotos = data.length;
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

    if (!data) return <p>Error al cargar resultados.</p>;

    const { resultados, totalVotos } = data;

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-lg border">
                    <h1 className="text-3xl font-bold text-center mb-2">Resultados de la Encuesta</h1>
                    <p className="text-slate-600 text-center mb-8">Total de votos: {totalVotos}</p>
                    <div className="space-y-4">
                        {resultados.map(({ partido, votos, porcentaje }) => (
                            <div key={partido}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-semibold text-slate-700">{partido}</span>
                                    <span className="text-sm text-slate-500">{votos} votos ({porcentaje.toFixed(1)}%)</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-4">
                                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}