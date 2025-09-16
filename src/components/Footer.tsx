// src/components/Footer.tsx
import Link from 'next/link';
import { Info, Twitter, Youtube, Facebook } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Columna principal con el logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <span className="text-xl font-bold text-slate-800">VAE</span>
            </div>
            <p className="text-slate-600 max-w-md text-sm">
              Plataforma de asesoramiento para facilitar el ejercicio del derecho al voto de los ciudadanos argentinos residentes en el extranjero.
            </p>
          </div>
          
          {/* Columna de Navegación */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Navegación</h3>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/como-votar" className="hover:text-blue-600">Cómo Votar</Link></li>
              <li><Link href="/normativa" className="hover:text-blue-600">Normativa</Link></li>
              <li><Link href="/novedades" className="hover:text-blue-600">Novedades</Link></li>
              <li><Link href="/resultados" className="hover:text-blue-600">Resultados</Link></li>
            </ul>
          </div>

          {/* Columna de Recursos */}
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
          
          {/* --- NUEVA COLUMNA DE REDES SOCIALES --- */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Seguinos</h3>
            <div className="flex items-center space-x-4">
              <a href="https://x.com/RepublicanosAmi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-500 hover:text-slate-900 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://www.youtube.com/@AmigosRepublicanos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-500 hover:text-red-600 transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://www.facebook.com/AmigosRepublicanos" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-500 hover:text-blue-700 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} VAE - Voto Argentino en el Exterior - Un proyecto cívico independiente - Power By Asado Patrio 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}