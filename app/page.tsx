"use client";

import React, { useState } from 'react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

const services: Service[] = [
  {
    title: "Intaglio Artistico",
    description: "Sculture e decorazioni in legno realizzate a mano con maestria e precisione artigianale.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    )
  },
  {
    title: "Intarsio & Marquetry",
    description: "Composizioni artistiche con legni pregiati, create secondo antiche tecniche di intarsio.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1 3 3 0 011 1v1a3 3 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1 3 3 0 011 1v1a3 3 0 01-1 1h-1a1 1 0 01-1-1V5zM4 15a1 1 0 011-1 3 3 0 011 1v1a3 3 0 01-1 1H5a1 1 0 01-1-1v-1zM14 15a1 1 0 011-1 3 3 0 011 1v1a3 3 0 01-1 1h-1a1 1 0 01-1-1v-1z" />
      </svg>
    )
  },
  {
    title: "Restauro Oggetti Antichi",
    description: "Recupero e conservazione di mobili e oggetti d'arte con tecniche rispettose della storia.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    )
  },
  {
    title: "Mobili su Misura",
    description: "Progettazione e realizzazione di arredi personalizzati in legno massello e finiture pregiate.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    )
  },
  {
    title: "Porte & Infissi Artistici",
    description: "Porte d'ingresso, portoncini e infissi in legno con dettagli intagliati e finiture esclusive.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V3.545M5.25 3.545V21M3 7.5h18" />
      </svg>
    )
  },
  {
    title: "Progettazione su Misura",
    description: "Consulenza personalizzata e progettazione di soluzioni artigianali per interni ed esterni.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  }
];

// Gallery temporarily empty - waiting for your photos of the "Giardini del Salento" exhibition
const galleryImages: GalleryImage[] = [];

export default function SanteseArtWebsite() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Richiesta informazioni da ${formData.name}`;
    const body = `Nome: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessaggio:%0A${formData.message}`;
    const mailtoLink = `mailto:rocco.santese@pec.it?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    // Show success state
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  const openPhone = () => {
    window.location.href = 'mailto:rocco.santese@pec.it';
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Elegant Minimal Navbar - Mobile First (desktop only for now) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo with official brand mark */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img 
              src="/logo_santeseart.svg" 
              alt="Santese Art - Ebanisteria & Falegnameria Artistica" 
              className="h-9 w-auto transition-transform group-hover:scale-[1.02]" 
            />
            <div className="hidden sm:block">
              <div className="font-serif text-2xl tracking-[-1.5px] font-medium text-black group-hover:text-gray-800 transition-colors">SANTESE ART</div>
              <div className="text-[10px] text-gray-500 -mt-1 tracking-[2px]">EBANISTERIA ARTISTICA</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
            <button onClick={() => scrollToSection('chi-siamo')} className="nav-link">Chi siamo</button>
            <button onClick={() => scrollToSection('servizi')} className="nav-link">Servizi</button>
            <button onClick={() => scrollToSection('galleria')} className="nav-link">Galleria</button>
            <button onClick={() => scrollToSection('contatti')} className="nav-link">Contatti</button>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contatti')}
              className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium tracking-wide flex items-center gap-2"
            >
              CONTATTACI
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Focused on Giardini del Salento exhibition (good as is) */}
      <section className="relative h-[100dvh] min-h-[640px] flex items-center justify-center pt-20">
        <div className="hero-bg absolute inset-0 z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs tracking-[4px] font-medium">
              MOSTRA ATTUALE • GIARDINI DEL SALENTO
            </div>
          </div>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-[-3.5px] leading-[0.9] mb-6">
            GIARDINI<br />DEL SALENTO
          </h1>
          
          <p className="text-xl md:text-2xl tracking-tight text-white/90 mb-4 font-light">
            di Rocco Santese
          </p>
          
          <p className="max-w-lg mx-auto text-lg text-white/80 mb-10 tracking-tight">
            Opere d’arte in legno per giardini e spazi esterni.<br />Intaglio, sculture e installazioni artistiche.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('galleria')}
              className="px-8 py-4 rounded-full text-sm font-medium tracking-widest border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              SCOPRI LE OPERE
            </button>
            <button 
              onClick={() => scrollToSection('contatti')}
              className="px-8 py-4 rounded-full text-sm font-medium tracking-widest bg-white text-black hover:bg-gray-100 transition-all"
            >
              PRENOTA UN APPUNTAMENTO
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-xs tracking-[2px]">
          <span>SCROLL</span>
          <div className="h-px w-8 bg-white/40 mt-2" />
        </div>
      </section>

      {/* CHI SIAMO - Ebanisteria first, exhibition second */}
      <section id="chi-siamo" className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-12 gap-x-12 items-center">
          <div className="md:col-span-7">
            <div className="uppercase text-xs tracking-[3px] text-gray-500 mb-3">DAL 1980 • ORIA — PUGLIA</div>
            <h2 className="font-serif text-6xl md:text-7xl tracking-[-2.5px] leading-none mb-8">
              Ebanisteria<br />artistica<br />di tradizione<br />pugliese.
            </h2>
          </div>
          
          <div className="md:col-span-5 text-lg leading-relaxed text-gray-600">
            <p className="mb-6">
              <span className="font-medium text-black">Santese Art</span> è l’ebanisteria artistica di Rocco Santese a Oria. Da oltre 40 anni realizziamo intagli, intarsi, restauri e mobili su misura con tecniche artigianali tramandate nel tempo.
            </p>
            <p className="mb-6">
              Attualmente esponiamo una selezione di opere dedicate ai <span className="font-medium text-black">Giardini del Salento</span>: intagli e installazioni artistiche pensate per giardini, terrazzi e spazi esterni.
            </p>
            <p>
              Ogni pezzo è unico, realizzato a mano con legni pregiati italiani.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-medium mb-1 tracking-wide">ROCCO SANTese</div>
            <div className="text-gray-500">Maestro ebanista</div>
          </div>
          <div>
            <div className="font-medium mb-1 tracking-wide">MOSTRA ATTUALE</div>
            <div className="text-gray-500">Giardini del Salento</div>
          </div>
          <div>
            <div className="font-medium mb-1 tracking-wide">MATERIALI</div>
            <div className="text-gray-500">Legni pregiati italiani</div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* SERVIZI */}
      <section id="servizi" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">ARTIGIANATO D'ECCELLENZA</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">I nostri servizi</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card group bg-white p-8 rounded-3xl flex flex-col">
              <div className="text-black mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {service.icon}
              </div>
              <h3 className="font-serif text-3xl tracking-tight mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-1">{service.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100 text-xs tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">
                SU MISURA
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* GALLERIA */}
      <section id="galleria" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-gray-500">IL NOSTRO LAVORO</div>
            <h2 className="font-serif text-6xl tracking-[-2px]">Galleria — Giardini del Salento</h2>
          </div>
          <p className="hidden md:block max-w-xs text-right text-sm text-gray-500">
            Le opere esposte nella mostra dedicata ai giardini del Salento.
          </p>
        </div>

        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <a 
                key={index} 
                href={image.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 block"
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="gallery-img absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-sm tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                    {image.caption}
                  </p>
              </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-300 rounded-3xl">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl tracking-tight mb-2">Foto in arrivo</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Le immagini delle opere della mostra <span className="font-medium">Giardini del Salento</span> saranno caricate a breve.
            </p>
          </div>
        )}
        
        <p className="text-center text-xs text-gray-400 mt-8 tracking-widest">
          OPERE REALIZZATE PER LA MOSTRA GIARDINI DEL SALENTO
        </p>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* CONTATTI */}
      <section id="contatti" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">VENITE A TROVARCI</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">Contatti</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-x-16 gap-y-12">
          {/* Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <div className="text-xs tracking-[2px] text-gray-500 mb-2">SEDE</div>
              <div className="font-medium text-xl leading-tight">
                Via Torre Santa Susanna, 124<br />
                72024 Oria (BR) — Puglia
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[2px] text-gray-500 mb-2">ORARI DI APERTURA</div>
              <div className="space-y-1 text-[15px]">
                <div className="flex justify-between"><span>Lunedì — Venerdì</span> <span className="font-mono text-gray-500">08:00 — 13:00</span></div>
                <div className="flex justify-between"><span></span> <span className="font-mono text-gray-500">16:00 — 20:00</span></div>
                <div className="flex justify-between pt-1"><span>Sabato</span> <span className="font-mono text-gray-500">08:00 — 13:00</span></div>
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[2px] text-gray-500 mb-3">CONTATTO DIRETTO</div>
              <button 
                onClick={openPhone}
                className="flex items-center gap-3 text-left group"
              >
                <div className="h-12 w-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium tracking-tight">rocco.santese@pec.it</div>
                  <div className="text-xs text-gray-500">PEC • Scrivici per un preventivo</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
              <h3 className="font-serif text-4xl tracking-tight mb-2">Richiedi informazioni</h3>
              <p className="text-gray-600 mb-8 text-sm">Compila il form. Ti risponderemo al più presto.</p>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-black text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <p className="font-medium text-xl">Grazie! Il tuo client email si aprirà a breve.</p>
                  <p className="text-sm text-gray-500 mt-1">O contattaci direttamente via PEC.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs tracking-widest text-gray-500 block mb-1.5">NOME E COGNOME</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormChange} 
                        required 
                        className="form-input w-full rounded-2xl px-5 py-3.5 bg-white text-base placeholder:text-gray-400" 
                        placeholder="Mario Rossi" 
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-gray-500 block mb-1.5">EMAIL</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange} 
                        required 
                        className="form-input w-full rounded-2xl px-5 py-3.5 bg-white text-base placeholder:text-gray-400" 
                        placeholder="mario@email.com" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs tracking-widest text-gray-500 block mb-1.5">MESSAGGIO</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleFormChange} 
                      required 
                      rows={5} 
                      className="form-input w-full rounded-3xl px-5 py-4 bg-white text-base resize-y min-h-[120px] placeholder:text-gray-400" 
                      placeholder="Descrivici il tuo progetto o la richiesta..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-[2px] mt-2"
                  >
                    INVIA RICHIESTA
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-400 tracking-widest pt-1">
                    VERRAI REINDIRIZZATO ALLA TUA APP DI POSTA
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-y-3">
          <div>© {new Date().getFullYear()} Santese Art — Rocco Santese. Tutti i diritti riservati.</div>
          <div className="flex gap-x-6">
            <span>Oria, Brindisi — Puglia, Italia</span>
            <span className="hidden md:inline">•</span>
            <span>Artigianato italiano di eccellenza</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
