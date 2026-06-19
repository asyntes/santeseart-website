"use client";

import React, { useState } from 'react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Exhibit {
  id: number;
  titleIt: string;
  titleEn: string;
  dimensions: string;
  descriptionIt: string;
  descriptionEn: string;
  image: string;
}

const services: Service[] = [ /* ... same services ... */ ];

const exhibits: Exhibit[] = [ /* ... same exhibits with images ... */ ];

export default function SanteseArtWebsite() {
  // all states and functions same as last full version
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);

  const scrollToSection = (id: string) => { /* same */ };
  const handleFormChange = (e) => { /* same */ };
  const handleFormSubmit = (e) => { /* same */ };
  const openEmail = () => { /* same */ };
  const closeMobileMenu = () => { /* same */ };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Navbar - ONLY LOGO, no text repetition, all black */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobileMenu(); }}
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/logo_santeseart.svg" 
              alt="Santese Art" 
              className="h-9 w-auto transition-transform group-hover:scale-[1.02] brightness-0" // forced black
            />
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
              <button onClick={() => scrollToSection('chi-siamo')} className="nav-link">Chi siamo</button>
              <button onClick={() => scrollToSection('servizi')} className="nav-link">Servizi</button>
              <button onClick={() => scrollToSection('galleria')} className="nav-link">Galleria</button>
              <button onClick={() => scrollToSection('contatti')} className="nav-link">Contatti</button>
            </div>

            <div className="hidden md:block">
              <button onClick={() => scrollToSection('contatti')} className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium tracking-wide">CONTATTACI</button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 -mr-1">
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu same */}
        {isMobileMenuOpen && ( /* ... same mobile menu ... */ )}
      </nav>

      {/* HERO same with collage */}
      {/* CHI SIAMO same with ROCCO SANTESE */}
      {/* SERVIZI same */}
      {/* GALLERIA same with real images */}
      {/* CONTATTI same */}
      {/* FOOTER same */}
      {/* MODAL same */}
    </div>
  );
}
