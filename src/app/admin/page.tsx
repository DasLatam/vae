// src/app/admin/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ITEMS_PER_PAGE = 20;

type Suscriptor = any;
type Respuesta = any;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [suscriptores, setSuscriptores] = useState<Suscriptor[]>([]);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  
  const [suscriptoresCount, setSuscriptoresCount] = useState(0);
  const [respuestasCount, setRespuestasCount] = useState(0);

  const [suscriptoresPage, setSuscriptoresPage] = useState(1);
  const [respuestasPage, setRespuestasPage] = useState(1);

  const [showAllSuscriptores, setShowAllSuscriptores] = useState(false);
  const [showAllRespuestas, setShowAllRespuestas] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert('Clave incorrecta.');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      const fetchData = async () => {
        // --- CARGA DE SUSCRIPTORES ---
        const { count: sCount } = await supabase.from('suscriptores').select('*', { count: 'exact', head: true });
        setSuscriptoresCount(sCount || 0);

        let suscriptoresQuery = supabase.from('suscriptores').select('*').order('created_at', { ascending: false });
        if (!showAllSuscriptores) {
          const from = (suscriptoresPage - 1) * ITEMS_PER_PAGE;
          suscriptoresQuery = suscriptoresQuery.range(from, from + ITEMS_PER_PAGE - 1);
        }
        const { data: suscriptoresData } = await suscriptoresQuery;
        setSuscriptores(suscriptoresData || []);

        // --- CARGA DE RESPUESTAS ---
        const { count: rCount } = await supabase.from('respuestas_encuesta').select('*', { count: 'exact', head: true });
        setRespuestasCount(rCount || 0);
        
        let respuestasQuery = supabase.from('respuestas_encuesta').select('*').order('created_at', { ascending: false });
        if (!showAllRespuestas) {
            const from = (respuestasPage - 1) * ITEMS_PER_PAGE;
            respuestasQuery = respuestasQuery.range(from, from + ITEMS_PER_PAGE - 1);
        }
        const { data: respuestasData } = await respuestasQuery;
        setRespuestas(respuestasData || []);
        
        setLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated, suscriptoresPage, showAllSuscriptores, respuestasPage, showAllRespuestas]);

  const totalSuscriptoresPages = Math.ceil(suscriptoresCount / ITEMS_PER_PAGE);
  const totalRespuestasPages = Math.ceil(respuestasCount / ITEMS_PER_PAGE);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Acceso de Administrador</h1>
          <form onSubmit={handleLogin}><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresá la clave" className="w-full px-4 py-2 border rounded-md mb-4" /><button type="submit" className="w-full bg-slate-800 text-white font-bold py-2 rounded-md hover:bg-black">Entrar</button></form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 sm:p-8 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        {loading ? <p>Cargando datos...</p> : (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Últimos Suscriptores ({suscriptoresCount} en total)</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow border"><table className="min-w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3 text-left">Fecha</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Nombre</th><th className="p-3 text-left">País</th></tr></thead>
                <tbody>{suscriptores.map(s => (
                  <tr key={s.id} className="border-b"><td className="p-3">{new Date(s.created_at).toLocaleString('es-AR')}</td><td className="p-3">{s.email}</td><td className="p-3">{s.nombre} {s.apellido}</td><td className="p-3">{s.pais}</td></tr>
                ))}</tbody>
              </table></div>
              {/* Paginación de Suscriptores */}
              <div className="flex items-center justify-between mt-4 text-sm">
                {!showAllSuscriptores ? (
                  <div className="flex gap-2">
                    <button onClick={() => setSuscriptoresPage(p => p - 1)} disabled={suscriptoresPage <= 1} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">Anterior</button>
                    <span>Página {suscriptoresPage} de {totalSuscriptoresPages}</span>
                    <button onClick={() => setSuscriptoresPage(p => p + 1)} disabled={suscriptoresPage >= totalSuscriptoresPages} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">Siguiente</button>
                  </div>
                ) : (
                  <button onClick={() => setShowAllSuscriptores(false)} className="px-3 py-1 border rounded-md bg-white font-semibold">Mostrar Paginado</button>
                )}
                <button onClick={() => setShowAllSuscriptores(true)} className="px-3 py-1 border rounded-md bg-white font-semibold">Ver Todos</button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Últimas Respuestas de la Encuesta ({respuestasCount} en total)</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow border"><table className="min-w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3 text-left">Fecha</th><th className="p-3 text-left">Partido</th><th className="p-3 text-left">Provincia</th><th className="p-3 text-left">País</th><th className="p-3 text-left">Edad</th></tr></thead>
                <tbody>{respuestas.map(r => (
                  <tr key={r.id} className="border-b"><td className="p-3">{new Date(r.created_at).toLocaleString('es-AR')}</td><td className="p-3">{r.partido_politico}</td><td className="p-3">{r.ultima_provincia}</td><td className="p-3">{r.pais_residencia}</td><td className="p-3">{r.rango_edad}</td></tr>
                ))}</tbody>
              </table></div>
              {/* Paginación de Respuestas */}
              <div className="flex items-center justify-between mt-4 text-sm">
                {!showAllRespuestas ? (
                  <div className="flex gap-2">
                    <button onClick={() => setRespuestasPage(p => p - 1)} disabled={respuestasPage <= 1} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">Anterior</button>
                    <span>Página {respuestasPage} de {totalRespuestasPages}</span>
                    <button onClick={() => setRespuestasPage(p => p + 1)} disabled={respuestasPage >= totalRespuestasPages} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">Siguiente</button>
                  </div>
                ) : (
                    <button onClick={() => setShowAllRespuestas(false)} className="px-3 py-1 border rounded-md bg-white font-semibold">Mostrar Paginado</button>
                )}
                <button onClick={() => setShowAllRespuestas(true)} className="px-3 py-1 border rounded-md bg-white font-semibold">Ver Todos</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}