// src/app/normativa/page.tsx
import { FileText, Landmark, ExternalLink } from 'lucide-react';
import { ShareButtons } from '@/components/ShareButtons'; // 1. Importar

export default function NormativaPage() {
  // 2. Definir título y URL
  const shareTitle = "Normativa del Voto Argentino en el Exterior";
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/normativa`;

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Normativa del Voto Argentino en el Exterior
            </h1>
            <p className="text-lg text-slate-600">
              Conocé las leyes y decretos que garantizan tu derecho a votar desde cualquier parte del mundo.
            </p>
          </div>

          <div className="space-y-12">
            {/* Contenido de la Ley y el Decreto no cambia... */}
            <section>
              <div className="text-center mb-8">
                <FileText size={40} className="text-slate-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-slate-800">Ley 24.007</h2>
                <p className="text-slate-500">La Piedra Fundacional del Voto Exterior</p>
              </div>
              <div className="space-y-6">
                 <InfoCard title="¿Qué establece esta ley?">
                  <p>Sancionada en 1991, la Ley 24.007 es el marco legal que por primera vez reconoció formalmente el derecho al voto de los ciudadanos argentinos que residen fuera del territorio nacional. Su principio fundamental es que la ciudadanía y los derechos políticos que de ella emanan no se extinguen por el hecho de vivir en el extranjero, sentando las bases para la participación electoral de la diáspora argentina.</p>
                  <p>Para materializar este derecho, la ley ordena la creación del <strong>Registro de Electores Residentes en el Exterior</strong>. Este padrón, administrado por la Cámara Nacional Electoral, es la herramienta que permite organizar y validar a los votantes en el extranjero. La inscripción en este registro es el paso formal que habilita a un ciudadano a sufragar desde su país de residencia.</p>
                  <p>Un aspecto crucial de la ley es que el voto emitido desde el exterior no es meramente simbólico. Se adjudica al distrito electoral correspondiente al último domicilio que el ciudadano tuvo en la República Argentina. De esta manera, cada voto cuenta y tiene un impacto directo en la conformación de la representación política del distrito de origen del votante.</p>
                </InfoCard>
                <InfoCard title="Puntos Clave de la Ley">
                  <ul className="list-disc list-inside space-y-3">
                    <li><strong>Dos Formas de Votar:</strong> Gracias a sus modificaciones más recientes, la ley ofrece flexibilidad. Permite a los electores optar libremente entre el tradicional <strong>voto presencial</strong>, que se realiza en las embajadas y consulados, y el moderno <strong>voto por correo postal</strong>, pensado para quienes viven lejos de las sedes diplomáticas.</li>
                    <li><strong>Boleta Única:</strong> Se establece el uso del sistema de Boleta Única de Papel. Este formato es idéntico para todos los países y contiene toda la oferta electoral en una sola hoja, lo que simplifica enormemente la logística de la elección y facilita al votante la emisión de su sufragio de una manera clara y estandarizada.</li>
                  </ul>
                </InfoCard>
                <a href="https://www.argentina.gob.ar/normativa/nacional/ley-24007-406" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors inline-flex items-center justify-center w-full sm:w-auto"><ExternalLink className="mr-2" size={20} />Ver Texto Completo de la Ley 24.007</a>
              </div>
            </section>
            
            <hr className="my-8 border-slate-300" />
            
            <section>
               <div className="text-center mb-8">
                <Landmark size={40} className="text-slate-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-slate-800">Decreto 239/2025</h2>
                <p className="text-slate-500">La Guía Práctica para Votar</p>
              </div>
              <div className="space-y-6">
                <InfoCard title="¿Cuál es el objetivo de este decreto?">
                  <p>Si la Ley 24.007 es el "qué", este decreto es el "cómo". Su función es reglamentar la ley, es decir, establecer los procedimientos y detalles para que el derecho al voto se pueda ejercer de manera efectiva. El objetivo, tal como lo establece la ley, es asegurar un trámite <strong>sencillo, rápido y gratuito</strong> para todos los ciudadanos.</p>
                  <p>El decreto pone un fuerte énfasis en facilitar y promover el <strong>voto por correo postal</strong>. La normativa reconoce explícitamente que las "distancias a menudo insalvables" entre el lugar de residencia de un ciudadano y la sede consular más cercana representan una barrera significativa. El voto por correo se presenta como la solución para garantizar que la geografía no sea un impedimento para la participación democrática.</p>
                  <p>Esta reglamentación actualiza y reemplaza decretos anteriores para adaptarse a los cambios tecnológicos y a las nuevas modalidades como la Boleta Única. Representa el esfuerzo más reciente del Estado por modernizar el proceso electoral y hacerlo más accesible para la creciente comunidad de argentinos en el mundo.</p>
                </InfoCard>
                <InfoCard title="Puntos Clave del Decreto">
                  <ul className="list-disc list-inside space-y-3">
                    <li><strong>Voto Optativo:</strong> A diferencia del voto obligatorio para quienes residen en Argentina, el decreto reafirma que para los residentes en el exterior, el sufragio es un derecho y no una obligación, es decir, es de carácter <strong>optativo</strong>.</li>
                    <li><strong>Requisitos para Votar:</strong> Define claramente quién es considerado elector en el exterior: todo ciudadano argentino a partir de los <strong>16 años</strong> que tenga registrado su domicilio en el extranjero en su Documento Nacional de Identidad (DNI).</li>
                    <li><strong>Kit de Voto Postal:</strong> Detalla minuciosamente el contenido del paquete que el elector recibe en su casa. Este incluye la Boleta Única, un sobre de resguardo para asegurar el secreto del voto, un sobre de envío con franqueo pagado, un formulario de Declaración Jurada de Identidad y un instructivo con indicaciones claras para cada paso del proceso.</li>
                  </ul>
                </InfoCard>
                <a href="https://www.argentina.gob.ar/normativa/nacional/decreto-239-2025-411116" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors inline-flex items-center justify-center w-full sm:w-auto"><ExternalLink className="mr-2" size={20} />Ver Texto Completo del Decreto 239/2025</a>
              </div>
            </section>
          </div>

          {/* 3. Añadir la botonera al final */}
          <div className="mt-12 py-6 border-t border-slate-200">
            <ShareButtons title={shareTitle} url={shareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">{title}</h3>
      <div className="space-y-4 text-slate-700 leading-relaxed text-justify">{children}</div>
    </div>
  );
}