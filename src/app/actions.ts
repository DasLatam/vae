// src/app/actions.ts
"use server";

import { supabase } from '@/lib/supabaseClient';

export async function suscribirNovedades(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { success: false, message: 'Por favor, ingresa un correo válido.' };
  }

  const { error } = await supabase
    .from('suscriptores')
    .insert({ email: email });

  if (error) {
    // Manejo de error para correos duplicados
    if (error.code === '23505') {
      return { success: false, message: 'Este correo ya está registrado.' };
    }
    return { success: false, message: 'Hubo un error. Intenta de nuevo.' };
  }

  return { success: true, message: '¡Gracias por suscribirte!' };
}