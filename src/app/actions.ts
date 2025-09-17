// src/app/actions.ts
"use server";

import { supabase } from '@/lib/supabaseClient';

// --- Función de suscripción (sin cambios) ---
export async function suscribirNovedades(formData: FormData) {
  const email = formData.get('email') as string;
  const nombre = formData.get('nombre') as string;
  // ... (resto de la función como estaba)
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


// --- Función de la encuesta (MODIFICADA CON DEPURACIÓN) ---
export async function enviarRespuestaEncuesta(formData: FormData) {
  console.log('[ACCIÓN DE SERVIDOR INICIADA]: Se recibió una petición para guardar una respuesta.');

  try {
    const encuestaId = formData.get('encuesta_id') as string;
    const rawData = {
      partido_politico: formData.get('partido_politico') as string,
      pais_residencia: formData.get('pais_residencia') as string,
      ultima_provincia: formData.get('ultima_provincia') as string,
      rango_edad: formData.get('rango_edad') as string,
    };

    console.log('[DATOS RECIBIDOS]:', rawData);

    if (!rawData.partido_politico || !rawData.ultima_provincia || !rawData.rango_edad) {
      console.error('[VALIDACIÓN FALLIDA]: Faltan campos requeridos.');
      return { success: false, message: 'Por favor, completa todos los campos requeridos.' };
    }

    const datosAInsertar = {
      encuesta_id: parseInt(encuestaId),
      ...rawData
    };

    console.log('[INTENTANDO INSERTAR]: Se van a guardar estos datos en Supabase:', datosAInsertar);

    const { error } = await supabase
      .from('respuestas_encuesta')
      .insert(datosAInsertar);

    if (error) {
      console.error('[ERROR DE SUPABASE]: La base de datos devolvió un error:', error);
      return { success: false, message: `Hubo un error al enviar tu respuesta. Código: ${error.code}` };
    }

    console.log('[ÉXITO]: La respuesta fue guardada correctamente en la base de datos.');
    return { success: true, message: '¡Gracias por participar!' };

  } catch (e) {
    console.error('[ERROR INESPERADO]: Ocurrió una excepción en la acción del servidor:', e);
    return { success: false, message: 'Ocurrió un error inesperado en el servidor.' };
  }
}