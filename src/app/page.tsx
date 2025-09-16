// src/app/page.tsx
import Link from 'next/link';
import { CheckCircle, ExternalLink, Archive } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Sección Hero */}
      <section className="bg-blue-600 text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tu Voto, Tu Voz, Donde Estés</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Te guiamos paso a paso para que puedas votar desde cualquier parte del mundo en las elecciones argentinas.
          </p>
          <Link href="/como-votar" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
            Empezá ahora
          </Link>
        </div>
      </section>

      {/* Sección CTA 2027 */}
      <section className="bg-yellow-400 text-gray-900 text-center py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">¿NO PODÉS VOTAR EN 2025?</h2>
          <p className="text-xl mt-2 mb-4">¡ASEGURÁ TU VOTO PARA 2027!</p>
          <p className="max-w-2xl mx-auto">
            El padrón para 2025 ya está cerrado. El paso más importante es tener tu domicilio en el exterior actualizado en tu DNI. ¡Hacelo ahora y preparate para las próximas elecciones!
          </p>
        </div>
      </section>
      
      {/* Sección de Información Clave */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">¿Cómo es el proceso?</h2>
            <p className="text-gray-600 mt-2">Votar desde el exterior es más fácil de lo que pensás. La nueva normativa simplifica todo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Actualizá tu DNI</h3>
              <p className="text-gray-600">El primer paso es registrar tu domicilio en el exterior en tu DNI. Esto te inscribe automáticamente en el padrón de residentes en el exterior.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Elegí cómo votar</h3>
              <p className="text-gray-600">Podés optar por el nuevo y sencillo sistema de **voto por correo postal** o votar de forma presencial en tu consulado.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. ¡Votá!</h3>
              <p className="text-gray-600">Recibirás la boleta única en tu casa o podrás acercarte a la sede diplomática el día de la elección. ¡Tu participación es importante!</p>
            </div>
          </div>
          <div className="text-center mt-12">
             <a href="https://www.padron.gov.ar/cne_care/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors">
              Consultá el Padrón de Residentes en el Exterior
              <ExternalLink className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN PARA RESULTADOS --- */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <Archive className="w-12 h-12 text-blue-800 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Consultá Elecciones Pasadas</h2>
          <p className="text-gray-600 mt-2 mb-6 max-w-2xl mx-auto">
            Explorá los resultados históricos del voto de los argentinos residentes en el exterior.
          </p>
          <Link href="/resultados" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-colors">
            Ver Resultados Históricos
          </Link>
        </div>
      </section>
    </>
  );
}