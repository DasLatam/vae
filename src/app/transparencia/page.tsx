// src/app/transparencia/page.tsx
import { DollarSign, Server, Megaphone, Users, Code, ShieldCheck } from 'lucide-react';
import { ShareButtons } from '@/components/ShareButtons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Transparencia de Fondos | VAE",
  description: "Detalle de cómo se invierten las colaboraciones para mantener y hacer crecer el proyecto VAE - Voto Argentino en el Exterior.",
};

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
  const shareTitle = "Transparencia de Fondos - VAE";
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/transparencia`;

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Transparencia de Fondos
            </h1>
            <p className="text-lg text-slate-600">
              Creemos en la transparencia total. Aquí detallamos en qué se invierte cada colaboración que recibimos para mantener y hacer crecer este proyecto.
            </p>
          </div>

          <div className="space-y-8">
            {/* --- Secciones reordenadas y actualizadas --- */}
            
            <GastoCard icon={<Megaphone size={32} />} title="Campañas de Difusión" amount="USD 200 al mes">
              <p>
                Para alcanzar a la mayor cantidad posible de argentinos en el exterior, invertimos en dos campañas publicitarias principales con un presupuesto de USD 100 cada una. El objetivo principal de ambas es generar más visitas al sitio web[cite: 47, 161]. Estas campañas están cuidadosamente segmentadas para llegar a personas que han vivido previamente en Argentina y ahora residen en países clave como Estados Unidos, España, Brasil, Italia, entre otros[cite: 94, 95, 174].
              </p>
              <p>
                La campaña en Facebook e Instagram busca un alcance estimado de entre 49.000 y 130.000 personas por mes[cite: 190], con el fin de informar sobre los plazos y facilitar el acceso a la información. Con esta inversión sostenida, proyectamos alcanzar a más de 1.3 millones de personas en los próximos 24 meses, maximizando así la participación electoral desde el extranjero.
              </p>
            </GastoCard>
            
            <GastoCard icon={<Users size={32} />} title="Administración" amount="USD 1.200 al mes">
              <p>
                Con un objetivo de crecimiento que apunta a 60.000 nuevos registros mensuales, la carga de trabajo administrativo aumenta considerablemente. Este costo cubre las horas dedicadas a la gestión de la base de datos de suscriptores, la respuesta a consultas, la actualización constante de la normativa y la carga de noticias.
              </p>
              <p>
                Una administración eficiente es vital para mantener la confianza de la comunidad. Garantiza que cada consulta sea atendida y que la información del sitio sea precisa y actual, especialmente durante los períodos electorales críticos, donde la velocidad y la exactitud son fundamentales.
              </p>
            </GastoCard>

            <GastoCard icon={<Code size={32} />} title="WebMaster" amount="USD 300 al mes">
              <p>
                El crecimiento proyectado a 60.000 registros mensuales exige una mayor dedicación técnica para el mantenimiento, la seguridad y la optimización del sitio. Este monto cubre el desarrollo de nuevas funcionalidades, la automatización de procesos y la supervisión constante del rendimiento de la plataforma.
              </p>
              <p>
                La inversión en el rol de WebMaster asegura que el sitio pueda manejar un alto volumen de tráfico sin caídas, que los datos de los usuarios estén protegidos contra vulnerabilidades y que la experiencia de navegación sea rápida y fluida en cualquier dispositivo. Es la garantía de que la plataforma no solo funcione, sino que evolucione.
              </p>
            </GastoCard>
            
            <GastoCard icon={<ShieldCheck size={32} />} title="Hosting, Dominio Web y SSL" amount="USD 60 al año">
              <p>
                Para soportar una base de datos con decenas de miles de registros y un alto tráfico de visitas, es necesario contar con un servicio de hosting robusto. Este costo anual unificado cubre el alojamiento en servidores de alto rendimiento, la renovación del dominio y el certificado de seguridad SSL que encripta la información.
              </p>
              <p>
                Esta infraestructura es la base sobre la que se construye todo el proyecto. Una inversión adecuada en hosting y seguridad garantiza que el sitio sea confiable, proteja los datos de los usuarios y esté siempre disponible, especialmente en los momentos de mayor demanda informativa.
              </p>
            </GastoCard>

          </div>

          <div className="mt-12 py-6 border-t border-slate-200">
            <ShareButtons title={shareTitle} url={shareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}