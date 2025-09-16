// src/components/ShareButtons.tsx
"use client";

import { useState } from 'react';
import { LinkIcon, Check, Twitter, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copyMessage, setCopyMessage] = useState('');

  const textToShare = `${title} | VAE - Voto Argentino en el Exterior`;

  const copyToClipboard = (message: string) => {
    navigator.clipboard.writeText(url);
    setCopyMessage(message);
    setTimeout(() => setCopyMessage(''), 3000); // El mensaje desaparece después de 3 segundos
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="font-semibold text-slate-700">Compartir en:</span>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Enlace de X (Twitter) - Correcto */}
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(textToShare)}`} target="_blank" rel="noopener noreferrer" title="Compartir en X" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Twitter size={20} className="text-slate-600" />
        </a>
        
        {/* Enlace de Facebook - CORREGIDO */}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" title="Compartir en Facebook" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Facebook size={20} className="text-slate-600" />
        </a>

        {/* Enlace de LinkedIn - Correcto */}
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" title="Compartir en LinkedIn" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Linkedin size={20} className="text-slate-600" />
        </a>

        {/* Enlace de WhatsApp - Correcto */}
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare + ' ' + url)}`} target="_blank" rel="noopener noreferrer" title="Compartir en WhatsApp" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <MessageCircle size={20} className="text-slate-600" />
        </a>
        
        {/* Botón de Instagram - MEJORADO */}
        <button onClick={() => copyToClipboard('¡Enlace copiado para Instagram!')} title="Copiar enlace para Instagram" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Instagram size={20} className="text-slate-600" />
        </button>

        {/* Botón de Copiar Link - Mejorado */}
        <button onClick={() => copyToClipboard('¡Enlace copiado!')} title="Copiar enlace" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center">
          {copyMessage ? <Check size={20} className="text-green-600" /> : <LinkIcon size={20} className="text-slate-600" />}
        </button>
      </div>
      {copyMessage && <span className="text-sm text-green-600 font-medium">{copyMessage}</span>}
    </div>
  );
}