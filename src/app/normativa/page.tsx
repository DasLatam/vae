// src/app/normativa/page.tsx
import { FileText, Landmark } from 'lucide-react';

// Componente para mostrar la información de forma ordenada
function InfoCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">{title}</h3>
      <div className="space-y-3 text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function NormativaPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Normativa del Voto Argentino en el Exterior
            </h1>
            <p className="text-lg text-gray-600">
              Conocé las leyes y decretos que garantizan tu derecho a votar desde cualquier parte del mundo.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-center space-x-4">
              <FileText size={40} className="text-gray-500" />
              <h2 className="text-3xl font-bold text-gray-800">Ley 24.007</h2>
            </div>
            <InfoCard title="¿Qué establece esta ley?">
              <p>
                [cite_start]Es la ley fundamental que **creó el Registro de Electores Residentes en el Exterior**[cite: 338]. [cite_start]Reconoce que la ciudadanía no se pierde por vivir fuera del país y, por lo tanto, garantiza el derecho al voto de los argentinos en el extranjero en elecciones nacionales[cite: 46, 337].
              </p>
            </InfoCard>
            <InfoCard title="Puntos Clave de la Ley">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  [cite_start]**Dos Formas de Votar:** La ley, con sus modificaciones más recientes, permite a los electores optar libremente entre el **voto presencial** en sedes consulares y el **voto por correo postal**[cite: 347].
                </li>
                <li>
                  [cite_start]**Boleta Única:** Se utiliza el sistema de Boleta Única de Papel, que es idéntica para todos los países, simplificando el proceso[cite: 346].
                </li>
              </ul>
            </InfoCard>

            <hr className="my-8" />

            <div className="flex items-center justify-center space-x-4">
              <Landmark size={40} className="text-gray-500" />
              <h2 className="text-3xl font-bold text-gray-800">Decreto 239/2025</h2>
            </div>
            <InfoCard title="¿Cuál es el objetivo de este decreto?">
              <p>
                [cite_start]Este decreto **reglamenta la Ley 24.007**[cite: 56]. Su principal objetivo es facilitar el voto, poniendo especial énfasis en el **voto por correo postal**. [cite_start]Reconoce que muchos argentinos viven lejos de los consulados, y esta modalidad garantiza que puedan ejercer su derecho de manera más fácil, rápida y gratuita[cite: 48, 49].
              </p>
            </InfoCard>
            <InfoCard title="Puntos Clave del Decreto">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  [cite_start]**Voto Optativo:** Se reafirma que el voto para los residentes en el exterior es de carácter **optativo**[cite: 75].
                </li>
                <li>
                  [cite_start]**Requisitos para Votar:** Para poder votar, un ciudadano debe tener **16 años o más** y haber registrado su **domicilio en el exterior en su DNI**[cite: 67, 71].
                </li>
                <li>
                  [cite_start]**Documentación para Voto Postal:** El decreto detalla todo lo que el elector recibe en su domicilio para votar por correo: la Boleta Única, un sobre de resguardo para garantizar el secreto del voto, un formulario de declaración de identidad, un instructivo claro y el sobre de envío postal gratuito[cite: 240].
                </li>
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}