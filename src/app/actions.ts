// src/app/actions.ts
"use server";

import { supabase } from '@/lib/supabaseClient';

export async function suscribirNovedades(formData: FormData) {
  // Extraer todos los datos del formulario
  const email = formData.get('email') as string;
  const nombre = formData.get('nombre') as string;
  const apellido = formData.get('apellido') as string;
  const fecha_nacimiento = formData.get('fecha_nacimiento') as string;
  const pais = formData.get('pais') as string;
  const provincia = formData.get('provincia') as string;
  const celular = formData.get('celular') as string;

  // Validación básica
  if (!email || !email.includes('@') || !nombre || !apellido) {
    return { success: false, message: 'Por favor, completa los campos obligatorios (nombre, apellido y correo).' };
  }

  // Objeto con los datos a insertar
  const nuevoSuscriptor = {
    email,
    nombre,
    apellido,
    fecha_nacimiento: fecha_nacimiento || null, // Guardar null si está vacío
    pais: pais || null,
    provincia: provincia || null,
    celular: celular || null,
  };

  const { error } = await supabase
    .from('suscriptores')
    .insert(nuevoSuscriptor);

  if (error) {
    if (error.code === '23505') { // Error de email duplicado
      return { success: false, message: 'Este correo ya está registrado.' };
    }
    console.error('Error de Supabase:', error);
    return { success: false, message: 'Hubo un error al registrar los datos. Intenta de nuevo.' };
  }

  return { success: true, message: '¡Gracias por registrarte! Tus datos han sido guardados.' };
}