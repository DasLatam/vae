// src/app/mapa-votantes/page.tsx
import { TableauMap } from '@/components/TableauMap';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mapa de Votantes en el Exterior | VAE",
  description: "Visualización interactiva de la distribución de electores argentinos registrados para votar desde el extranjero.",
};

export default function MapaVotantesPage() {
  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">Mapa de Votantes en el Exterior</h1>
          <p className="text-lg text-slate-600 mt-2 max-w-3xl mx-auto">
            Este mapa interactivo muestra la distribución de los electores argentinos registrados para votar desde el extranjero, según datos oficiales.
          </p>
        </div>
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg border">
          <TableauMap />
        </div>
      </div>
    </div>
  );
}