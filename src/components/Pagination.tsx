// src/components/Pagination.tsx
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null; // No mostrar paginación si solo hay una página
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav className="flex items-center justify-center space-x-4 mt-12" aria-label="Paginación">
      {prevPage ? (
        <Link href={`${basePath}?page=${prevPage}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100">
          <ChevronLeft className="mr-2 h-5 w-5" />
          Anterior
        </Link>
      ) : (
        <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-md cursor-not-allowed">
          <ChevronLeft className="mr-2 h-5 w-5" />
          Anterior
        </span>
      )}
      
      <span className="text-sm text-slate-700">
        Página {currentPage} de {totalPages}
      </span>

      {nextPage ? (
        <Link href={`${basePath}?page=${nextPage}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100">
          Siguiente
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      ) : (
        <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-md cursor-not-allowed">
          Siguiente
          <ChevronRight className="ml-2 h-5 w-5" />
        </span>
      )}
    </nav>
  );
}