// src/app/como-votar/page.tsx
import { HelpCircle } from "lucide-react";

export default function ComoVotarPage() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
            Cómo Votar desde el Exterior
          </h1>
          <p className="text-lg text-gray-600 mb-10 text-center">
            Aquí encontrarás las respuestas a las preguntas más frecuentes sobre el voto por correo postal, basado en la información oficial.
          </p>

          <div className="space-y-8">
            <QuestionAnswer
              question="¿Qué se vota en las elecciones de 2025?"
              answer="Los argentinos residentes en el exterior votan para elegir Diputados Nacionales de todo el país y Senadores Nacionales de las provincias que renuevan sus bancas (Chaco, Entre Ríos, Neuquén, Río Negro, Salta, Santiago del Estero, Tierra del Fuego) y de Capital Federal."
            />
            <QuestionAnswer
              question="¿Es obligatorio votar si vivo en el exterior?"
              answer="No, el voto para los electores residentes en el exterior es de carácter optativo."
            />
            <QuestionAnswer
              question="¿Qué requisitos debo cumplir para votar por correo postal?"
              answer={
                <ul className="list-disc list-inside space-y-2">
                  [cite_start]<li>Tener 16 años o más[cite: 327].</li>
                  [cite_start]<li>Tener el domicilio en el exterior asentado en tu DNI (con una antigüedad de al menos 180 días antes de la elección)[cite: 328].</li>
                  [cite_start]<li>Estar incluido en el padrón electoral de residentes en el exterior[cite: 329].</li>
                  [cite_start]<li>Inscribirte en el registro para votar por correo postal en las fechas habilitadas[cite: 330].</li>
                </ul>
              }
            />
            <QuestionAnswer
              question="¿Cuándo y cómo me inscribo para votar por correo?"
              [cite_start]answer="La inscripción se realiza en un formulario online en la web de la Cámara Nacional Electoral. Para las elecciones de 2025, el período de inscripción fue del 29 de mayo al 28 de junio[cite: 325, 333]. Es crucial estar atento a estas fechas para futuras elecciones."
            />
            <QuestionAnswer
              question="Si me inscribí para voto postal, ¿puedo votar en el consulado?"
              answer="No. [cite_start]La inscripción para el voto postal te excluye del padrón presencial en la sede diplomática[cite: 335]."
            />
             <QuestionAnswer
              question="¿Cuáles son los pasos para votar una vez que recibo la documentación?"
              answer={
                <ol className="list-decimal list-inside space-y-2">
                  [cite_start]<li>Marcá en la Boleta Única de Papel (BUP) la opción de tu preferencia[cite: 345].</li>
                  [cite_start]<li>Introducí la boleta en el 'sobre de resguardo' y cerralo bien[cite: 346].</li>
                  [cite_start]<li>Completá y firmá el formulario de declaración jurada de identidad[cite: 347].</li>
                  [cite_start]<li>Colocá el 'sobre de resguardo' y la declaración jurada dentro del 'sobre de envío' y cerralo[cite: 348].</li>
                  [cite_start]<li>Envialo por correo (es gratis) o depositalo en los buzones de tu consulado[cite: 349].</li>
                </ol>
              }
            />
            <QuestionAnswer
              question="¿Hasta cuándo tengo tiempo de enviar mi voto?"
              [cite_start]answer="Tu voto debe ser recibido en la representación diplomática o consular, a más tardar, el último día hábil anterior a la fecha de la elección en Argentina. ¡Asegúrate de enviarlo con suficiente anticipación! [cite: 351]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para mostrar las preguntas y respuestas
function QuestionAnswer({ question, answer }: { question: string, answer: string | React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start">
        <HelpCircle className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{question}</h3>
          <div className="text-gray-700 leading-relaxed">{answer}</div>
        </div>
      </div>
    </div>
  );
}