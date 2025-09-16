# VAE - Voto Argentino en el Exterior 🗳️🇦🇷

## Sobre el Proyecto

**VAE** es una plataforma web cívica e independiente diseñada para informar, asesorar y facilitar el ejercicio del derecho al voto de los ciudadanos argentinos que residen en el extranjero. El sitio busca centralizar la información sobre normativas, procedimientos y fechas clave del calendario electoral, con un enfoque en la simplicidad y la claridad.

Este proyecto fue construido desde cero con el objetivo de ser un recurso confiable y accesible para la diáspora argentina, promoviendo la participación democrática sin importar las distancias.

## ✨ Características Principales

El sitio web cuenta con las siguientes funcionalidades:

* **Guías Detalladas:** Secciones informativas como "Cómo Votar" y "Normativa" que explican el proceso y el marco legal de forma didáctica.
* **Contenido Dinámico:** Una sección de "Novedades" gestionada a través de una base de datos, con paginación para una navegación fluida.
* **Resultados Electorales:** Visualización de resultados históricos de elecciones pasadas.
* **Formulario de Suscripción:** Un formulario de registro para que los usuarios reciban alertas sobre el calendario electoral, novedades y validación de datos.
* **Transparencia y Colaboración:** Una página de "Transparencia" que detalla los gastos del proyecto y un botón de "Colaborar" para recibir apoyo de la comunidad.
* **Páginas Legales:** Secciones de "Política de Privacidad" y "Términos y Condiciones" para cumplir con las buenas prácticas.
* **Diseño Profesional:** Una interfaz de usuario limpia, moderna y completamente responsiva (adaptable a celulares, tablets y computadoras).

---

## 🚀 Stack Tecnológico

Este proyecto fue construido utilizando un stack de tecnologías modernas, eficientes y escalables:

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Base de Datos y Backend:** [Supabase](https://supabase.com/)
* **Hosting:** [Vercel](https://vercel.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)

---

## 🛠️ Cómo Iniciar el Proyecto Localmente

Si querés correr este proyecto en tu propia máquina, seguí estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/DasLatam/vae.git](https://github.com/DasLatam/vae.git)
    cd vae
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    Creá un archivo llamado `.env.local` en la raíz del proyecto y agregá las siguientes variables. Necesitarás una cuenta de Supabase para obtener estas claves.
    ```
    NEXT_PUBLIC_SUPABASE_URL=TU_URL_DE_PROYECTO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_ANON_PUBLICA_DE_SUPABASE
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

## 🌐 Despliegue

El sitio está configurado para un despliegue continuo en **Vercel**. Cada vez que se hace un `push` a la rama `main`, Vercel automáticamente construye y despliega la nueva versión.

**Importante:** No olvides configurar las mismas variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) en el panel de configuración de tu proyecto en Vercel.

---

## 📧 Contacto

Para cualquier consulta o sugerencia, podés escribir a: **republiaami@gmail.com**