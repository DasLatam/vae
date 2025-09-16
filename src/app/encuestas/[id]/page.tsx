// src/app/encuestas/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { enviarRespuestaEncuesta } from '@/app/actions';
import Link from 'next/link';
import { listaDePaises, provinciasArgentinas, partidosPorProvincia } from '@/lib/datosElectorales';

type Encuesta = {
  id: number;
  titulo: string;
  descripcion: string;
};

export default function EncuestaPage({ params }: { params: { id: string } }) {
  const [encuesta, setEncuesta] = useState<Encuesta | null>(null);
  const [haVotado, setHaVotado] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // 1. Nuevo estado para "enviando"
  
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
  const [partidosDisponibles, setPartidosDisponibles] = useState<string[]>([]);

  const idEncuesta = params.id;
  const storageKey = `haVotadoEncuesta_${idEncuesta}`;

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      setHaVotado(true);
    } else {
      setHaVotado(false);
    }

    async function cargarEncuesta() {
      const { data } = await supabase.from('encuestas').select('*').eq('id', idEncuesta).single();
      setEncuesta(data);
      setCargando(false);
    }
    cargarEncuesta();
  }, [idEncuesta, storageKey]);

  useEffect(() => {
    if (provinciaSeleccionada && partidosPorProvincia[provinciaSeleccionada]) {
      setPartidosDisponibles(partidosPorProvincia[provinciaSeleccionada]);
    } else {
      setPartidosDisponibles([]);
    }
  }, [provinciaSeleccionada]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true); // 2. Indicar que el envío comenzó
    const resultado = await enviarRespuestaEncuesta(formData);
    setMensaje(resultado.message);
    if (resultado.success) {
      localStorage.setItem(storageKey, 'true');
      setHaVotado(true);
    }
    setIsSubmitting(false); // 3. Indicar que el envío terminó
  }

  if (cargando) return <div className="text-center py-20">Cargando encuesta...</div>;
  if (!encuesta) return <div className="text-center py-20">Encuesta no encontrada.</div>;

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h1 className="text-3xl font-bold text-center mb-2">{encuesta.titulo}</h1>
          <p className="text-slate-600 text-center mb-8">{encuesta.descripcion}</p>

          {haVotado ? (
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800">{mensaje || '¡Gracias por participar!'}</h2>
              <p className="text-slate-600 mt-2">Tu opinión es muy importante para nuestra comunidad.</p>
              <Link href={`/encuestas/${idEncuesta}/resultados`} className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700">
                Ver Resultados
              </Link>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <input type="hidden" name="encuesta_id" value={encuesta.id} />
              
              <div>
                <label className="font-semibold">Última provincia donde viviste en Argentina: *</label>
                <select 
                  name="ultima_provincia" 
                  required 
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  value={provinciaSeleccionada}
                  onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                >
                  <option value="">Selecciona una provincia</option>
                  {provinciasArgentinas.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold">¿A qué partido político votarías? *</label>
                <select 
                  name="partido_politico" 
                  required 
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  disabled={!provinciaSeleccionada}
                >
                  <option value="">{provinciaSeleccionada ? "Selecciona una opción" : "Primero elegí una provincia"}</option>
                  {partidosDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                  <option>Otro</option>
                  <option>En Blanco / No sabe</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">País donde vivís actualmente:</label>
                <select name="pais_residencia" className="mt-2 block w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Selecciona un país</option>
                  {listaDePaises.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
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

              {/* 4. Botón actualizado */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Voto'}
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