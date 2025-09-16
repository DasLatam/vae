// src/components/Footer.tsx
import Link from 'next/link';
import { Mail, Info } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <span className="text-xl font-bold text-slate-800">VAE - Voto Argentino en el Exterior</span>
            </div>
            <p className="text-slate-600 max-w-md">
              Plataforma de asesoramiento para facilitar el ejercicio del derecho al voto de los ciudadanos argentinos residentes en el extranjero.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Navegación</h3>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/como-votar" className="hover:text-blue-600">Cómo Votar</Link></li>
              <li><Link href="/normativa" className="hover:text-blue-600">Normativa</Link></li>
              <li><Link href="/novedades" className="hover:text-blue-600">Novedades</Link></li>
              <li><Link href="/resultados" className="hover:text-blue-600">Resultados</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Recursos</h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="https://www.electoral.gob.ar/votoexterior/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center">
                  <Info size={16} className="mr-2" /> Sitio Oficial
                </a>
              </li>
              <li>
                <a href="https://www.padron.gov.ar/cne_care/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center">
                  <Info size={16} className="mr-2" /> Consultar Padrón
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} VAE. Un proyecto cívico independiente.</p>
        </div>
      </div>
    </footer>
  );
}