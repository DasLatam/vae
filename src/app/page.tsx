// src/app/page.tsx
import Link from 'next/link';
import { CheckCircle, ExternalLink, Archive, Mail } from 'lucide-react';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function HomePage() {
  return (
    <>
      {/* Sección Hero */}
      <section className="bg-white text-center py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4">
            Tu Voto, Tu Voz, Donde Estés
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 mb-8">
            Te guiamos paso a paso para que puedas ejercer tu derecho a votar desde cualquier parte del mundo en las elecciones argentinas.
          </p>
          <Link href="/como-votar" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block">
            Empezá Ahora
          </Link>
        </div>
      </section>

      {/* Sección CTA 2027 */}
      <section className="bg-amber-400 text-slate-900 text-center py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">¿NO PODÉS VOTAR EN 2025?</h2>
          <p className="text-xl mt-2 mb-4 font-semibold">¡ASEGURÁ TU VOTO PARA 2027!</p>
          <p className="max-w-2xl mx-auto">
            El padrón para las elecciones de medio término ya está cerrado. El paso más importante que podés dar ahora es actualizar tu domicilio en el DNI. ¡Hacelo y preparate para las próximas elecciones presidenciales!
          </p>
        </div>
      </section>
      
      {/* Sección de Información Clave */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">El Proceso en 3 Pasos Simples</h2>
            <p className="text-slate-600 mt-2">Votar desde el exterior es más fácil de lo que pensás.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <InfoCard icon={<CheckCircle />} title="1. Actualizá tu DNI">
              Registrá tu domicilio en el exterior. Este simple trámite te inscribe automáticamente en el padrón de residentes en el extranjero.
            </InfoCard>
            <InfoCard icon={<CheckCircle />} title="2. Elegí cómo Votar">
              Podés optar por el nuevo y sencillo sistema de **voto por correo postal** o votar de forma presencial en tu consulado más cercano.
            </InfoCard>
            <InfoCard icon={<CheckCircle />} title="3. ¡Votá!">
              Recibirás la boleta en tu casa o podrás acercarte a la sede diplomática. ¡Tu participación fortalece nuestra democracia!
            </InfoCard>
          </div>
        </div>
      </section>
      
      {/* Sección de Suscripción */}
      <section className="bg-white py-20 sm:py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Recibí Alertas Electorales</h2>
          <p className="text-slate-600 mt-2 mb-8 max-w-2xl mx-auto">
            Registrate para recibir recordatorios de fechas clave, novedades y alertas sobre el padrón electoral. No te quedes afuera.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

// Componente auxiliar para las tarjetas de información
function InfoCard({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
      <div className="text-green-500 w-12 h-12 mx-auto mb-4 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{children}</p>
    </div>
  );
}