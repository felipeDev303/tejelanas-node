import React, { useState } from "react";

export default function HeaderReact() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-[1440px] mx-auto px-6 py-3 bg-white/80 backdrop-blur-md shadow-lg rounded-b-2xl flex items-center justify-between sticky top-0 z-50 transition-all border-b border-pink-100">
      <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img src="/favicon.svg" alt="Logo" className="w-10 h-10 drop-shadow-md" style={{ width: 40, height: 40 }} />
        <span className="text-2xl font-extrabold text-pink-700 tracking-tight whitespace-nowrap font-sans">tejelanasvivi.cl</span>
      </a>
      <nav className="hidden md:flex gap-8 text-lg">
        <a href="/#sobre-nosotros" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors">Sobre Nosotros</a>
        <a href="/#productos" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors">Productos</a>
        <a href="/#contacto" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors">Contacto</a>
        <a href="/faq" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors">Preguntas frecuentes</a>
      </nav>
      <button
        className="md:hidden flex items-center justify-center w-12 h-12 rounded-lg hover:bg-pink-50 transition"
        aria-label="Abrir menú"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="w-7 h-7 text-pink-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {open && (
        <nav className="absolute top-full left-0 w-full bg-white/95 shadow-lg rounded-b-2xl flex flex-col items-center gap-4 py-6 md:hidden animate-fade-in z-50">
          <a href="/#sobre-nosotros" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors" onClick={() => setOpen(false)}>Sobre Nosotros</a>
          <a href="/#productos" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors" onClick={() => setOpen(false)}>Productos</a>
          <a href="/#contacto" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors" onClick={() => setOpen(false)}>Contacto</a>
          <a href="/faq" className="text-gray-700 hover:text-pink-700 font-semibold transition-colors" onClick={() => setOpen(false)}>Preguntas frecuentes</a>
        </nav>
      )}
    </header>
  );
}
