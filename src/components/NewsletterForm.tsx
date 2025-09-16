// src/components/NewsletterForm.tsx
"use client";

import { useState, useRef } from 'react';
import { suscribirNovedades } from '@/app/actions';

export function NewsletterForm() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await suscribirNovedades(formData);
    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      formRef.current?.reset(); // Limpia el formulario si fue exitoso
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form ref={formRef} action={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Tu correo electrónico"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white font-bold py-3 px-6 rounded-md hover:bg-black transition-colors"
        >
          Suscribirme
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm text-center sm:text-left ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}