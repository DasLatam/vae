// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/logo-vae.png" alt="Logo VAE" width={50} height={50} />
            <span className="text-xl font-bold text-blue-900">
            VAE <span className="hidden sm:inline">- Voto Argentino en el Exterior</span>
            </span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/como-votar" className="hover:text-blue-600 transition-colors">Cómo Votar</Link>
          <Link href="/normativa" className="hover:text-blue-600 transition-colors">Normativa</Link>
          <Link href="/novedades" className="hover:text-blue-600 transition-colors">Novedades</Link>
          <Link href="/resultados" className="hover:text-blue-600 transition-colors">Resultados</Link>
        </nav>
        <button className="md:hidden text-gray-700">
          {/* Icono de Menú para móviles (lo haremos funcional más adelante) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}