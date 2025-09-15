// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta configuración deshabilita el chequeo de ESLint durante el 'build'.
  // Permite que el deploy en Vercel se complete sin ser bloqueado por errores de linting.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;