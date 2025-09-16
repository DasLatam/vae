// src/components/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
          <Logo />
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            VAE
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2 text-slate-600 font-medium">
          <Link href="/como-votar" className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">Cómo Votar</Link>
          <Link href="/normativa" className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">Normativa</Link>
          <Link href="/novedades" className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">Novedades</Link>
          <Link href="/resultados" className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">Resultados</Link>
        </nav>
        
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <nav className="flex flex-col items-center space-y-2 py-4">
            <Link href="/como-votar" className="w-full text-center py-2 text-slate-700 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>Cómo Votar</Link>
            <Link href="/normativa" className="w-full text-center py-2 text-slate-700 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>Normativa</Link>
            <Link href="/novedades" className="w-full text-center py-2 text-slate-700 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>Novedades</Link>
            <Link href="/resultados" className="w-full text-center py-2 text-slate-700 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>Resultados</Link>
          </nav>
        </div>
      )}
    </header>
  );
}