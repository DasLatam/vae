// src/app/admin/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Definimos los 'tipos' para nuestros datos para que el código sea más robusto
type Suscriptor = any;
type Respuesta = any;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [suscriptores, setSuscriptores] = useState<Suscriptor[]>([]);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Comparamos la contraseña ingresada con la variable de entorno
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true'); // Guardamos el estado para no pedir la clave en cada recarga
    } else {
      alert('Clave incorrecta.');
    }
  };

  useEffect(() => {
    // Chequeamos si el usuario ya se autenticó en esta sesión del navegador
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Si el usuario está autenticado, cargamos los datos de Supabase
    if (isAuthenticated) {
      setLoading(true);
      const fetchData = async () => {
        const { data: suscriptoresData } = await supabase.from('suscriptores').select('*').order('created_at', { ascending: false }).limit(20);
        const { data: respuestasData } = await supabase.from('respuestas_encuesta').select('*').order('created_at', { ascending: false }).limit(20);
        setSuscriptores(suscriptoresData || []);
        setRespuestas(respuestasData || []);
        setLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated]);

  // Si no está autenticado, mostramos el formulario de login
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Acceso de Administrador</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresá la clave"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button type="submit" className="w-full bg-slate-800 text-white font-bold py-2 rounded-md hover:bg-black">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostramos los datos
  return (
    <div className="bg-slate-50 p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        {loading ? <p>Cargando datos...</p> : (
          <div className="space-y-12">
            {/* Tabla de Suscriptores */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Últimos Suscriptores</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow border"><table className="min-w-full text-sm">
                <thead className="bg-slate-100"><tr>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">País</th>
                </tr></thead>
                <tbody>{suscriptores.map(s => (
                  <tr key={s.id} className="border-b"><td className="p-3">{new Date(s.created_at).toLocaleString('es-AR')}</td><td className="p-3">{s.email}</td><td className="p-3">{s.nombre} {s.apellido}</td><td className="p-3">{s.pais}</td></tr>
                ))}</tbody>
              </table></div>
            </div>

            {/* Tabla de Respuestas de Encuesta */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Últimas Respuestas de la Encuesta</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow border"><table className="min-w-full text-sm">
                <thead className="bg-slate-100"><tr>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Partido</th>
                  <th className="p-3 text-left">Provincia</th>
                  <th className="p-3 text-left">País</th>
                  <th className="p-3 text-left">Edad</th>
                </tr></thead>
                <tbody>{respuestas.map(r => (
                  <tr key={r.id} className="border-b"><td className="p-3">{new Date(r.created_at).toLocaleString('es-AR')}</td><td className="p-3">{r.partido_politico}</td><td className="p-3">{r.ultima_provincia}</td><td className="p-3">{r.pais_residencia}</td><td className="p-3">{r.rango_edad}</td></tr>
                ))}</tbody>
              </table></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}