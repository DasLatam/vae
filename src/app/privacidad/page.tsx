// src/app/privacidad/page.tsx
export default function PrivacidadPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg prose-slate text-justify">
          <h1>Política de Privacidad</h1>
          <p className="lead">Última actualización: 16 de septiembre de 2025</p>

          <p>
            Bienvenido a VAE - Voto Argentino en el Exterior. Tu privacidad es de suma importancia para nosotros. Esta Política de Privacidad describe qué datos personales recopilamos y cómo los utilizamos.
          </p>

          <h2>1. Información que Recopilamos</h2>
          <p>
            Recopilamos información que nos proporcionas directamente al registrarte en nuestro formulario de novedades. Los datos solicitados pueden incluir:
          </p>
          <ul>
            <li>Nombre y Apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>País de residencia y provincia de origen</li>
            <li>Número de celular y fecha de nacimiento</li>
          </ul>

          <h2>2. Uso de la Información</h2>
          <p>
            La información recopilada se utiliza con los siguientes propósitos:
          </p>
          <ul>
            <li>Para enviar comunicaciones, alertas y recordatorios sobre fechas del calendario electoral.</li>
            <li>Para informar sobre novedades y actualizaciones relacionadas con el voto en el exterior.</li>
            <li>Para notificar sobre posibles necesidades de validación de datos en el padrón electoral.</li>
          </ul>
          <p>
            No compartiremos tu información personal con terceros sin tu consentimiento explícito, excepto cuando sea requerido por ley.
          </p>

          <h2>3. Almacenamiento y Seguridad de Datos</h2>
          <p>
            Tus datos son almacenados de forma segura en una base de datos gestionada por nuestro proveedor de servicios de backend (Supabase). Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra el acceso no autorizado, la alteración o la destrucción.
          </p>

          <h2>4. Tus Derechos</h2>
          <p>
            Tenés derecho a acceder, rectificar o eliminar tu información personal de nuestra base de datos en cualquier momento. Para ejercer estos derechos, por favor, contactanos a través de nuestro correo oficial: <a href="mailto:republiaami@gmail.com">republiaami@gmail.com</a>.
          </p>

          <h2>5. Cambios en esta Política</h2>
          <p>
            Podemos actualizar nuestra Política de Privacidad periódicamente. Te notificaremos de cualquier cambio publicando la nueva política en esta página. Se te aconseja revisar esta página periódicamente para cualquier cambio.
          </p>
        </div>
      </div>
    </div>
  );
}