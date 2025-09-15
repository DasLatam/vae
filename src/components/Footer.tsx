// src/components/Footer.tsx
import Link from 'next/link';
import { Mail, Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">VAE</h3>
            <p className="text-gray-400">Asesorando a los argentinos en el exterior para garantizar su derecho a votar.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Secciones</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/como-votar" className="hover:text-white">Cómo Votar</Link></li>
              <li><Link href="/normativa" className="hover:text-white">Normativa</Link></li>
              <li><Link href="/novedades" className="hover:text-white">Novedades</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Información y Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center justify-center md:justify-start">
                <Info size={16} className="mr-2" />
                <a href="https://www.electoral.gob.ar/votoexterior/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Sitio Oficial Electoral
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2" />
                <span>contacto@vae.ar (ejemplo)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} VAE - Voto Argentino en el Exterior. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}