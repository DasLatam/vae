// src/app/encuestas/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { enviarRespuestaEncuesta } from '@/app/actions';
import Link from 'next/link';

type Encuesta = {
  id: number;
  titulo: string;
  descripcion: string;
  activa: boolean;
};

export default function EncuestaPage({ params }: { params: { id: string } }) {
  const [encuesta, setEncuesta] = useState<Encuesta | null>(null);
  const [haVotado, setHaVotado] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const idEncuesta = params.id;
  const storageKey = `haVotadoEncuesta_${idEncuesta}`;
  const idEncuestaAnterior = 1; // ID de la encuesta de partidos

  useEffect(() => {
    if (localStorage.getItem(storageKey)) setHaVotado(true); else setHaVotado(false);
    async function cargarEncuesta() {
      const { data } = await supabase.from('encuestas').select('id, titulo, descripcion, activa').eq('id', idEncuesta).single();
      setEncuesta(data);
      setCargando(false);
    }
    cargarEncuesta();
  }, [idEncuesta, storageKey]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.append('ultima_provincia', '-'); // Placeholder
    formData.append('rango_edad', '-'); // Placeholder
    const resultado = await enviarRespuestaEncuesta(formData);
    setMensaje(resultado.message);
    if (resultado.success) {
      localStorage.setItem(storageKey, 'true');
      setHaVotado(true);
    }
    setIsSubmitting(false);
  }

  if (cargando) return <div className="text-center py-20">Cargando encuesta...</div>;
  if (!encuesta) return <div className="text-center py-20">Encuesta no encontrada.</div>;
  if (!encuesta.activa && !haVotado) return <div className="text-center py-20">Esta encuesta ya no está activa.</div>;

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h1 className="text-3xl font-bold text-center mb-2">{encuesta.titulo}</h1>
          <p className="text-slate-600 text-center mb-8">{encuesta.descripcion}</p>

          {haVotado ? (
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800">{mensaje || '¡Gracias por participar!'}</h2>
              <p className="text-slate-600 mt-2">Tu opinión nos ayuda a mejorar la comunicación.</p>
              {/* --- Enlace a resultados anteriores --- */}
              {encuesta.id === 2 && ( // Mostrar solo si es la nueva encuesta
                 <Link href={`/encuestas/${idEncuestaAnterior}/resultados`} className="mt-6 inline-block text-sm text-blue-600 hover:underline">
                   Ver resultados de la encuesta anterior (Elecciones 2025)
                 </Link>
              )}
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <input type="hidden" name="encuesta_id" value={encuesta.id} />

              {/* --- Pregunta Actualizada --- */}
              <div>
                <label className="font-semibold block mb-2">¿Cómo calificás la comunicación de los precandidatos presidenciales hacia los argentinos en el exterior? *</label>
                <select
                  name="partido_politico" // Reutilizamos este campo
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona una valoración</option>
                  <option value="Muy Buena">Muy Buena</option>
                  <option value="Buena">Buena</option>
                  <option value="Regular">Regular</option>
                  <option value="Mala">Mala</option>
                  <option value="Muy Mala">Muy Mala</option>
                  <option value="No sabe / No contesta">No sabe / No contesta</option>
                </select>
              </div>

              {/* --- Campos Opcionales --- */}
              <div>
                <label className="font-semibold">País donde vivís actualmente (Opcional):</label>
                <input type="text" name="pais_residencia" className="mt-1 block w-full p-3 border border-gray-300 rounded-md" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
              </button>
            </form>
          )}
           <p className="text-xs text-slate-400 mt-4 text-center">
             Nota: Para evitar respuestas duplicadas, esta encuesta utiliza el almacenamiento local de tu navegador.
           </p>
        </div>
      </div>
    </div>
  );
}