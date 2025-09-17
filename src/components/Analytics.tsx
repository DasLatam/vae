// src/components/Analytics.tsx
"use client";

import Script from 'next/script';

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // No renderizar nada si el ID de Google Analytics no está configurado
  if (!gaId) {
    return null;
  }

  return (
    <>
      {/* Carga el script principal de gtag.js */}
      <Script 
        strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} 
      />
      
      {/* Script en línea para configurar gtag */}
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}