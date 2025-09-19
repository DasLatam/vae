// src/components/TableauMap.tsx
"use client";

import { useEffect } from 'react';

export function TableauMap() {
  useEffect(() => {
    // Este código se ejecuta solo en el navegador, después de que la página ha cargado.
    const divElement = document.getElementById('viz1758244005299');
    if (divElement) {
      const vizElement = divElement.getElementsByTagName('object')[0];
      if (vizElement) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode?.insertBefore(scriptElement, vizElement);
      }
    }
  }, []); // El array vacío asegura que este código se ejecute solo una vez.

  return (
    <div className='tableauPlaceholder' id='viz1758244005299' style={{ position: 'relative', width: '100%' }}>
      <noscript>
        <a href='#'>
          <img alt='DMapaDistrito ' src='https://public.tableau.com/static/images/KP/KPSYF74PJ/1_rss.png' style={{ border: 'none' }} />
        </a>
      </noscript>
      <object className='tableauViz' style={{ display: 'none' }}>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='path' value='shared/KPSYF74PJ' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https://public.tableau.com/static/images/KP/KPSYF74PJ/1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='es-ES' />
      </object>
    </div>
  );
}