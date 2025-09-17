// src/app/actions.ts
"use server";

import { supabase } from '@/lib/supabaseClient';

// --- Función de suscripción (sin cambios) ---
export async function suscribirNovedades(formData: FormData) {
  const email = formData.get('email') as string;
  const nombre = formData.get('nombre') as string;
  const apellido = formData.get('apellido') as string;
  const fecha_nacimiento = formData.get('fecha_nacimiento') as string;
  const pais = formData.get('pais') as string;
  const provincia = formData.get('provincia') as string;
  const celular = formData.get('celular') as string;

  if (!email || !email.includes('@') || !nombre || !apellido) {
    return { success: false, message: 'Por favor, completa los campos obligatorios (nombre, apellido y correo).' };
  }

  const nuevoSuscriptor = {
    email,
    nombre,
    apellido,
    fecha_nacimiento: fecha_nacimiento || null,
    pais: pais || null,
    provincia: provincia || null,
    celular: celular || null,
  };

  const { error } = await supabase
    .from('suscriptores')
    .insert(nuevoSuscriptor);

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'Este correo ya está registrado.' };
    }
    console.error('Error de Supabase:', error);
    return { success: false, message: 'Hubo un error al registrar los datos. Intenta de nuevo.' };
  }

  return { success: true, message: '¡Gracias por registrarte! Tus datos han sido guardados.' };
}


// --- Función de la encuesta (CORREGIDA Y FINAL) ---
export async function enviarRespuestaEncuesta(formData: FormData) {
  try {
    const encuestaIdStr = formData.get('encuesta_id') as string;
    
    // --- NUEVA VALIDACIÓN ---
    // Verificamos que el ID de la encuesta sea un número válido antes de continuar.
    const encuestaId = parseInt(encuestaIdStr);
    if (isNaN(encuestaId)) {
      console.error('[VALIDACIÓN FALLIDA]: El ID de la encuesta no es un número válido. Valor recibido:', encuestaIdStr);
      return { success: false, message: 'Error: ID de encuesta inválido.' };
    }
    // --- FIN DE LA VALIDACIÓN ---

    const rawData = {
      partido_politico: formData.get('partido_politico') as string,
      pais_residencia: formData.get('pais_residencia') as string,
      ultima_provincia: formData.get('ultima_provincia') as string,
      rango_edad: formData.get('rango_edad') as string,
    };

    if (!rawData.partido_politico || !rawData.ultima_provincia || !rawData.rango_edad) {
      return { success: false, message: 'Por favor, completa todos los campos requeridos.' };
    }

    const datosAInsertar = {
      encuesta_id: encuestaId,
      ...rawData
    };

    const { error } = await supabase
      .from('respuestas_encuesta')
      .insert(datosAInsertar);

    if (error) {
      console.error('[ERROR DE SUPABASE]:', error);
      return { success: false, message: `Hubo un error al guardar los datos. Código: ${error.code}` };
    }

    return { success: true, message: '¡Gracias por participar!' };

  } catch (e) {
    console.error('[ERROR INESPERADO]:', e);
    return { success: false, message: 'Ocurrió un error inesperado en el servidor.' };
  }
}