// src/app/como-votar/page.tsx
import { HelpCircle } from "lucide-react";
import Link from 'next/link';
import { ShareButtons } from '@/components/ShareButtons';

export default function ComoVotarPage() {
  const linkStyles = "text-blue-600 font-semibold underline hover:text-blue-800 transition-colors";

  const shareTitle = "Cómo Votar desde el Exterior - Elecciones 2027";
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/como-votar`;

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
            Cómo Votar desde el Exterior (Elecciones 2027)
          </h1>
          <p className="text-lg text-slate-600 mb-10 text-center">
            Anticipate y prepará todo para participar en las próximas elecciones presidenciales de 2027. Aquí las respuestas clave y el cronograma estimado.
          </p>

          <div className="space-y-8">
             <QuestionAnswer
              question="¿Qué se vota en las elecciones de 2027?"
              answer="En las elecciones nacionales de Octubre de 2027, los argentinos residentes en el exterior votarán para elegir Presidente y Vicepresidente, Parlamentarios del Mercosur, y renovarán bancas de Diputados y Senadores Nacionales (según corresponda a su distrito)."
            />
            <QuestionAnswer
              question="¿Es obligatorio votar si vivo en el exterior?"
              answer="No, el voto para los electores residentes en el exterior es de carácter optativo."
            />
            <QuestionAnswer
              question="Cronograma Estimado Elecciones 2027"
              answer={
                <>
                  <p className="mb-2"><strong>Importante:</strong> Estas son fechas estimadas basadas en ciclos anteriores. Las fechas oficiales serán confirmadas por la Cámara Nacional Electoral.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Agosto 2026 (Estimado):</strong> Fecha límite para tener tu domicilio en el exterior actualizado en el DNI.</li>
                    <li><strong>Febrero 2027 (Estimado):</strong> Publicación del padrón provisorio. Momento para verificar tus datos y reclamar si hay errores.</li>
                    <li><strong>Abril 2027 (Estimado):</strong> Publicación del padrón definitivo. Confirma tu lugar de votación (si es presencial).</li>
                    <li><strong>Mayo 2027 (Estimado):</strong> Período para inscribirte si elegís votar por correo postal (el link oficial se habilitará cerca de la fecha en el <a href="https://www.padron.gov.ar/cne_care/" target="_blank" rel="noopener noreferrer" className={linkStyles}>sitio de la CNE</a>).</li>
                    <li><strong>Septiembre 2027 (Estimado):</strong> Recepción del kit electoral en tu domicilio si optaste por voto postal.</li>
                    <li><strong>Principios de Octubre 2027 (Estimado):</strong> Fecha límite para enviar tu voto por correo postal.</li>
                    <li><strong>Fines de Octubre 2027 (Estimado):</strong> Día de la elección presencial en consulados.</li>
                  </ul>
                  <p className="mt-4">
                    <Link href="/#formulario-suscripcion" className={linkStyles}>
                      ¡No te pierdas ninguna fecha! Suscribite a las alertas aquí.
                    </Link>
                  </p>
                </>
              }
            />
            <QuestionAnswer
              question="¿Cuáles son los requisitos fundamentales para votar?"
              answer={
                <ul className="list-disc list-inside space-y-2">
                  <li>Tener 16 años o más el día de la elección.</li>
                  <li>Haber actualizado tu domicilio en el exterior en el DNI antes de la fecha límite (estimado Agosto 2026).</li>
                  <li>Figurar correctamente en el <a href="https://www.padron.gov.ar/" target="_blank" rel="noopener noreferrer" className={linkStyles}>padrón definitivo</a>.</li>
                </ul>
              }
            />
            <QuestionAnswer
              question="¿Cómo funciona el Voto por Correo Postal?"
              answer={
                <>
                  <p>Es la opción más cómoda si vivís lejos del consulado. Los pasos principales son:</p>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>Inscribirte online durante el período habilitado (estimado Mayo 2027).</li>
                    <li>Recibir el kit con la boleta y los sobres en tu domicilio (estimado Septiembre 2027).</li>
                    <li>Marcar tu voto, firmar la declaración jurada y meter todo en el sobre de envío pre-pago.</li>
                    <li>Enviar el sobre por correo o depositarlo en el consulado antes de la fecha límite (principios de Octubre 2027).</li>
                  </ol>
                </>
              }
            />
             <QuestionAnswer
              question="¿Cómo funciona el Voto Presencial?"
              answer="Si no te inscribiste para voto postal y estás correctamente en el padrón definitivo con tu domicilio actualizado, simplemente te presentás el día de la elección (estimado fines de Octubre 2027) en la embajada o consulado que te corresponda con tu DNI argentino vigente. Allí te indicarán tu mesa y votarás con la Boleta Única de Papel."
             />
          </div>

          <div className="mt-12 py-6 border-t border-slate-200">
            <ShareButtons title={shareTitle} url={shareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionAnswer({ question, answer }: { question: string, answer: React.ReactNode }) { return ( <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"> <div className="flex items-start"> <HelpCircle className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" /> <div> <h3 className="text-xl font-semibold text-slate-800 mb-2">{question}</h3> <div className="text-slate-700 leading-relaxed">{answer}</div> </div> </div> </div> ); }