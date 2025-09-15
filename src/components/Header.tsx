// src/components/Header.tsx
"use client"; // Directiva para habilitar la interactividad

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo'; // Importamos nuestro nuevo componente de logo
import { Menu, X } from 'lucide-react'; // Íconos para abrir y cerrar

export function Header() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Logo />
          <span className="text-xl font-bold text-blue-900">
            VAE
          </span>
        </Link>
        
        {/* Navegación para pantallas grandes */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/como-votar" className="hover:text-blue-600 transition-colors">Cómo Votar</Link>
          <Link href="/normativa" className="hover:text-blue-600 transition-colors">Normativa</Link>
          <Link href="/novedades" className="hover:text-blue-600 transition-colors">Novedades</Link>
          <Link href="/resultados" className="hover:text-blue-600 transition-colors">Resultados</Link>
        </nav>
        
        {/* Botón del menú para pantallas pequeñas */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Cambia el estado al hacer clic
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/como-votar" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Cómo Votar</Link>
            <Link href="/normativa" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Normativa</Link>
            <Link href="/novedades" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Novedades</Link>
            <Link href="/resultados" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Resultados</Link>
          </nav>
        </div>
      )}
    </header>
  );
}