// src/components/NewsletterForm.tsx
"use client";

import { useState, useRef } from 'react';
import { suscribirNovedades } from '@/app/actions';

export function NewsletterForm() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await suscribirNovedades(formData);
    setMessage(result.message);
    setIsSuccess(result.success);
    setIsSubmitting(false);

    if (result.success) {
      formRef.current?.reset();
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border">
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 text-left">Nombre *</label>
            <input type="text" name="nombre" id="nombre" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 text-left">Apellido *</label>
            <input type="text" name="apellido" id="apellido" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">Correo Electrónico *</label>
          <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 text-left">Fecha de Nacimiento</label>
            <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            {/* --- LÍNEA CORREGIDA --- */}
            <label htmlFor="celular" className="block text-sm font-medium text-gray-700 text-left">Celular</label>
            <input type="tel" name="celular" id="celular" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pais" className="block text-sm font-medium text-gray-700 text-left">País de Residencia</label>
            <input type="text" name="pais" id="pais" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 text-left">Provincia de Origen (Argentina)</label>
            <input type="text" name="provincia" id="provincia" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Enviando...' : 'Registrarme'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}