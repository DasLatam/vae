// src/components/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
          <Logo />
          <span className="text-xl font-bold text-blue-900">
            VAE
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/como-votar" className="hover:text-blue-600 transition-colors">Cómo Votar</Link>
          <Link href="/normativa" className="hover:text-blue-600 transition-colors">Normativa</Link>
          <Link href="/novedades" className="hover:text-blue-600 transition-colors">Novedades</Link>
          <Link href="/resultados" className="hover:text-blue-600 transition-colors">Resultados</Link>
        </nav>
        
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

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