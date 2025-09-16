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
};

export default function EncuestaPage({ params }: { params: { id: string } }) {
  const [encuesta, setEncuesta] = useState<Encuesta | null>(null);
  const [haVotado, setHaVotado] = useState(true); // Empezamos asumiendo que ya votó
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  const idEncuesta = params.id;
  const storageKey = `haVotadoEncuesta_${idEncuesta}`;

  useEffect(() => {
    // Verificar si ya votó en el almacenamiento local
    if (localStorage.getItem(storageKey)) {
      setHaVotado(true);
    } else {
      setHaVotado(false);
    }

    // Cargar los datos de la encuesta
    async function cargarEncuesta() {
      const { data } = await supabase
        .from('encuestas')
        .select('*')
        .eq('id', idEncuesta)
        .single();
      setEncuesta(data);
      setCargando(false);
    }
    cargarEncuesta();
  }, [idEncuesta, storageKey]);

  async function handleSubmit(formData: FormData) {
    const resultado = await enviarRespuestaEncuesta(formData);
    setMensaje(resultado.message);
    if (resultado.success) {
      localStorage.setItem(storageKey, 'true'); // Marcar como votado
      setHaVotado(true);
    }
  }

  if (cargando) {
    return <div className="text-center py-20">Cargando encuesta...</div>;
  }
  
  if (!encuesta) {
    return <div className="text-center py-20">Encuesta no encontrada.</div>;
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h1 className="text-3xl font-bold text-center mb-2">{encuesta.titulo}</h1>
          <p className="text-slate-600 text-center mb-8">{encuesta.descripcion}</p>

          {haVotado ? (
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800">
                {mensaje || '¡Gracias por participar!'}
              </h2>
              <p className="text-slate-600 mt-2">Tu opinión es muy importante para nuestra comunidad.</p>
              <Link href={`/encuestas/${idEncuesta}/resultados`} className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700">
                Ver Resultados
              </Link>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <input type="hidden" name="encuesta_id" value={encuesta.id} />
              
              {/* Aquí van las preguntas */}
              <div>
                <label className="font-semibold">¿A qué partido político votarías? *</label>
                <select name="partido_politico" required className="mt-2 block w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Selecciona una opción</option>
                  <option>La Libertad Avanza</option>
                  <option>Juntos por el Cambio</option>
                  <option>Unión por la Patria</option>
                  <option>Frente de Izquierda</option>
                  <option>Otro</option>
                  <option>No sabe / No contesta</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">País donde vivís actualmente:</label>
                <input type="text" name="pais_residencia" className="mt-2 block w-full p-3 border border-gray-300 rounded-md" />
              </div>

              <div>
                <label className="font-semibold">Última provincia donde viviste en Argentina: *</label>
                <input type="text" name="ultima_provincia" required className="mt-2 block w-full p-3 border border-gray-300 rounded-md" />
              </div>

              <div>
                <label className="font-semibold">¿Cuál es tu rango de edad? *</label>
                <select name="rango_edad" required className="mt-2 block w-full p-3 border border-gray-300 rounded-md">
                    <option value="">Selecciona tu edad</option>
                    <option>16-25</option>
                    <option>26-40</option>
                    <option>41-60</option>
                    <option>+61</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black">
                Enviar Voto
              </button>
            </form>
          )}
           <p className="text-xs text-slate-400 mt-4 text-center">
            Nota: Para evitar votos duplicados, esta encuesta utiliza el almacenamiento local de tu navegador. Esto no es un método 100% seguro, sino una medida para encuestas informales.
           </p>
        </div>
      </div>
    </div>
  );
}