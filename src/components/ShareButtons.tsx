// src/components/ShareButtons.tsx
"use client";

import { useState } from 'react';
import { LinkIcon, Check, Twitter, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const text = `${title} | VAE - Voto Argentino en el Exterior`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // El mensaje "¡Copiado!" desaparece después de 2 segundos
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="font-semibold text-slate-700">Compartir en:</span>
      <div className="flex items-center gap-2">
        <a href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Twitter size={20} className="text-slate-600" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Facebook size={20} className="text-slate-600" />
        </a>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Linkedin size={20} className="text-slate-600" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <MessageCircle size={20} className="text-slate-600" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
          <Instagram size={20} className="text-slate-600" />
        </a>
        <button onClick={copyToClipboard} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center">
          {copied ? <Check size={20} className="text-green-600" /> : <LinkIcon size={20} className="text-slate-600" />}
        </button>
      </div>
      {copied && <span className="text-sm text-green-600 font-medium">¡Enlace copiado!</span>}
    </div>
  );
}