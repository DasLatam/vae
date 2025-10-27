// src/app/page.tsx
import Link from 'next/link';
import { CheckCircle, Archive, Mail, ClipboardList } from 'lucide-react';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function HomePage() {
  const idNuevaEncuesta = 2; // ID de la encuesta activa

  return (
    <>
      {/* Sección Hero */}
      <section className="bg-white text-center py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4"><h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4">Tu Voto, Tu Voz, Donde Estés</h1><p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 mb-8">Te guiamos paso a paso para que puedas ejercer tu derecho a votar desde cualquier parte del mundo en las elecciones argentinas.</p><Link href="/como-votar" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block">Empezá Ahora</Link></div>
      </section>

      {/* Sección CTA */}
      <section className="bg-amber-400 text-slate-900 text-center py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">¿NO PUDISTE VOTAR EN 2025?</h2>
          <p className="text-xl mt-2 mb-4 font-semibold">¡PREPARÁ TU VOTO PARA 2027!</p>
          <p className="max-w-2xl mx-auto">
            El paso fundamental es asegurarte de tener tu domicilio en el exterior actualizado en tu DNI antes de <strong>Agosto de 2026</strong> (fecha estimada).{' '}
            <Link href="/como-votar" className="font-bold underline hover:text-blue-800">
              ¡Hacelo ahora y no te quedes afuera de las próximas elecciones presidenciales!
            </Link>
          </p>
        </div>
      </section>

      {/* --- Sección de Información Clave con Textos Mejorados --- */}
      <section className="py-20 sm:py-24">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">El Proceso para Votar en 2027</h2>
                <p className="text-slate-600 mt-2">Fechas estimadas. <Link href="/#formulario-suscripcion" className="text-blue-600 hover:underline font-semibold">Suscribite</Link> para recibir confirmaciones.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                    <div className="text-green-500 w-12 h-12 mx-auto mb-4 flex items-center justify-center"><CheckCircle size={48} /></div>
                    <h3 className="text-xl font-semibold mb-2">1. Actualizá tu DNI</h3>
                    <p className="text-slate-600">Registrá tu domicilio en el exterior. La fecha límite estimada es <strong>Agosto de 2026</strong>. Este paso es clave para figurar en el padrón.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                    <div className="text-green-500 w-12 h-12 mx-auto mb-4 flex items-center justify-center"><CheckCircle size={48} /></div>
                    <h3 className="text-xl font-semibold mb-2">2. Verificá Padrones</h3>
                    <p className="text-slate-600">Revisá el padrón provisorio, disponible aproximadamente en <strong>Febrero de 2027</strong>, y el definitivo, cerca de <strong>Abril de 2027</strong>. Si elegís voto postal, inscribite durante el período estimado de <strong>Mayo de 2027</strong>.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                    <div className="text-green-500 w-12 h-12 mx-auto mb-4 flex items-center justify-center"><CheckCircle size={48} /></div>
                    <h3 className="text-xl font-semibold mb-2">3. ¡Votá!</h3>
                    <p className="text-slate-600">Si votás por correo, recibirás la boleta aproximadamente en <strong>Septiembre de 2027</strong>. Si votás presencial, acercate al consulado el día de la elección, estimado para <strong>Octubre de 2027</strong>.</p>
                </div>
            </div>
         </div>
      </section>

      {/* Sección de Resultados */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 text-center"><Archive className="w-12 h-12 text-blue-800 mx-auto mb-4" /><h2 className="text-3xl font-bold text-slate-800">Consultá Elecciones Pasadas</h2><p className="text-slate-600 mt-2 mb-6 max-w-2xl mx-auto">Explorá los resultados históricos del voto de los argentinos residentes en el exterior.</p><Link href="/resultados" className="bg-slate-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-colors">Ver Resultados Históricos</Link></div>
      </section>

      {/* Sección de Encuesta */}
      <section className="bg-white py-16 border-t">
        <div className="container mx-auto px-4 text-center">
          <ClipboardList className="w-12 h-12 text-blue-800 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-800">Participá: Comunicación Electoral</h2>
          <p className="text-slate-600 mt-2 mb-6 max-w-2xl mx-auto">¿Llegan bien los mensajes de los candidatos a los argentinos en el exterior? Danos tu opinión.</p>
          <Link href={`/encuestas/${idNuevaEncuesta}`} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Ir a la Encuesta
          </Link>
        </div>
      </section>

      {/* Sección de Suscripción */}
      <section id="formulario-suscripcion" className="bg-slate-50 py-20 sm:py-24 border-t">
        <div className="container mx-auto px-4 flex flex-col items-center text-center"><Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" /><h2 className="text-3xl font-bold">Recibí Alertas Electorales</h2><p className="text-slate-600 mt-2 mb-8 max-w-2xl mx-auto">Registrate para recibir recordatorios de fechas importantes, novedades y alertas sobre el padrón electoral.</p><NewsletterForm /></div>
      </section>
    </>
  );
}