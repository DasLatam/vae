// src/app/transparencia/page.tsx
import { DollarSign, Server, Megaphone, Users, Code } from 'lucide-react';

function GastoCard({ icon, title, amount, children }: { icon: React.ReactNode, title: string, amount: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-start">
        <div className="text-blue-600 mr-4 flex-shrink-0 mt-1">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-lg font-semibold text-blue-700 mb-3">{amount}</p>
          <div className="text-slate-600 space-y-3 text-justify">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function TransparenciaPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Transparencia de Fondos
            </h1>
            <p className="text-lg text-slate-600">
              Creemos en la transparencia total. Aquí detallamos en qué se invierte cada colaboración que recibimos para mantener este proyecto en funcionamiento.
            </p>
          </div>

          <div className="space-y-8">
            <GastoCard icon={<DollarSign size={32} />} title="Dominio Web" amount="USD 15 al año">
              <p>El dominio es nuestra dirección en internet: `voto-argentino-exterior.vercel.app`. Este costo anual nos asegura ser fácilmente localizables y mantener una identidad reconocible en la web.</p>
              <p>Tener un dominio propio es el primer paso para construir una presencia online seria y confiable, permitiendo que los ciudadanos nos encuentren a través de una URL simple y memorable.</p>
            </GastoCard>
            
            <GastoCard icon={<Server size={32} />} title="Hosting" amount="USD 20 al año">
              <p>El hosting es el servicio que almacena todos los archivos del sitio web y los mantiene online 24/7. Utilizamos una plataforma moderna (Vercel) que garantiza velocidad y seguridad, pero su plan Pro, necesario para un tráfico considerable, tiene un costo asociado.</p>
              <p>Esta inversión es crucial para que el sitio cargue rápidamente desde cualquier parte del mundo y pueda soportar los picos de visitas que ocurren cerca de las fechas electorales, asegurando que la información esté siempre disponible cuando más se necesita.</p>
            </GastoCard>

            <GastoCard icon={<Megaphone size={32} />} title="Campañas de Difusión" amount="USD 50 al mes">
              <p>Para llegar a la mayor cantidad posible de argentinos en el exterior, invertimos en campañas de difusión en redes sociales y buscadores. Esto nos permite alcanzar a quienes aún no conocen la plataforma o los nuevos requisitos para votar.</p>
              <p>Estos fondos se destinan a anuncios segmentados geográficamente, asegurando que nuestro mensaje llegue a las comunidades de argentinos en países clave. El objetivo es maximizar la participación electoral informando a tiempo sobre plazos y procedimientos.</p>
            </GastoCard>

            <GastoCard icon={<Users size={32} />} title="Administración" amount="USD 100 al mes">
              <p>Mantener la información actualizada, responder consultas y gestionar el contenido requiere tiempo y dedicación. Este costo cubre las horas de trabajo administrativo necesarias para asegurar que los datos sean precisos y que la comunidad reciba el soporte que necesita.</p>
              <p>Incluye la carga de noticias, la moderación de comentarios (si se habilita), la actualización de las secciones de normativa y la gestión de la base de datos de suscriptores, garantizando que la plataforma sea un recurso confiable y vigente.</p>
            </GastoCard>

            <GastoCard icon={<Code size={32} />} title="WebMaster" amount="USD 30 al mes">
              <p>Cubre el mantenimiento técnico, las actualizaciones de seguridad y las mejoras funcionales del sitio. Un webmaster se encarga de que la plataforma funcione sin problemas, solucionando errores y aplicando las últimas tecnologías.</p>
              <p>Esta inversión asegura que el sitio sea seguro, rápido y compatible con todos los dispositivos. Permite implementar nuevas funcionalidades, como los formularios de administración, y garantiza la protección de los datos de nuestros suscriptores.</p>
            </GastoCard>
          </div>
        </div>
      </div>
    </div>
  );
}