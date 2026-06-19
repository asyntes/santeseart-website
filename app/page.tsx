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

// Exhibition pieces from "Giardini del Salento" show - complete bilingual content from the official cards
const exhibits: Exhibit[] = [
  {
    id: 1,
    titleIt: "Lampada Wormhole",
    titleEn: "Wormhole Lamp",
    dimensions: "25 cm Ø × 16.5 cm h",
    descriptionIt: "Lampada Wormhole in frassino con inserti di noce mansonia e base in noce nazionale ebanizzato. La radica centrale emette una luce blu che fuoriesce anche dalla base. Un portale di luce e legno tra i mondi.",
    descriptionEn: "Wormhole lamp in ash with mansonia walnut inlays and ebonized national walnut base. The central burl emits blue light that also glows from under the base. A portal of light and wood between worlds."
  },
  {
    id: 2,
    titleIt: "Tris di Radiche",
    titleEn: "Trio of Burls",
    dimensions: "25 cm Ø × 16 cm h (max)",
    descriptionIt: "Trio di lampade in radica di ulivo con coni in noce nazionale ebanizzato. Una presenta inserti di gelso e pero. La radica si libra sospesa in un abbraccio di luce e ombra.",
    descriptionEn: "Trio of lamps in olive burl with ebonized national walnut cones. One features inlays of mulberry and pear. The burl floats suspended in an embrace of light and shadow."
  },
  {
    id: 3,
    titleIt: "Centrotavola di Radiche",
    titleEn: "Olive Burl Centerpiece",
    dimensions: "24 cm Ø × 12 cm h",
    descriptionIt: "Centrotavola in radica di ulivo con bordo a segmenti di paduk, noce nazionale, limone e wengé. Le venature della radica centrale danzano con i colori del bordo. Un cerchio di essenze che celebra il Salento.",
    descriptionEn: "Centerpiece in olive burl with segmented rim in paduk, national walnut, lemon and wengé. The central burl grains dance with the colors of the rim. A circle of essences celebrating Salento."
  },
  {
    id: 4,
    titleIt: "Raggiera Solare",
    titleEn: "Solar Sunburst Bowl",
    dimensions: "38 cm Ø × 9 cm h",
    descriptionIt: "Ciotola con spettacolare raggiera di intarsi in ulivo, frassino, limone, pero, noce nazionale e ciliegio. Il motivo centrale scolpito esalta le venature fluide del legno. Un inno alla luce e alla materia dei giardini del Salento.",
    descriptionEn: "Bowl featuring a spectacular sunburst inlay of olive, ash, lemon, pear, national walnut and cherry. The carved central motif highlights the flowing wood grains. An ode to the light and matter of the Salento gardens."
  },
  {
    id: 5,
    titleIt: "Tris di Fiori",
    titleEn: "Trio of Flower Holders",
    dimensions: "11 cm Ø × 30 cm h (max)",
    descriptionIt: "Trio di porta fiori in noce nazionale con inserti circolari di gelso. I due più grandi accolgono fiori secchi mediterranei, il piccolo una candela. Un inno alla semplicità e alla luce del Salento.",
    descriptionEn: "Trio of flower holders in national walnut with circular inlays of mulberry. The two larger ones hold dried Mediterranean flowers, the small one a candle. An ode to simplicity and light of Salento."
  },
  {
    id: 6,
    titleIt: "Saturno di Radiche",
    titleEn: "Saturn of Burls",
    dimensions: "16 cm Ø × 20 cm h",
    descriptionIt: "Porta gioie a forma di Saturno in ulivo e pero, con anello in radica di ulivo. La sfera centrale ruota delicatamente tra le braccia della radica. Un piccolo universo di legno sospeso tra luce e memoria.",
    descriptionEn: "Saturn-shaped jewelry holder in olive and pear wood, with ring in olive burl. The central sphere rotates gently within the arms of the burl. A small wooden universe suspended between light and memory."
  },
  {
    id: 7,
    titleIt: "Quintetto di Essenze",
    titleEn: "Quintet of Essences",
    dimensions: "36 cm Ø × 9 cm h",
    descriptionIt: "Ciottola tornita con intarsi di ulivo, noce nazionale, limone e albicocca; fondo in frassino. Le venature fluide celebrano l'armonia delle essenze mediterranee.",
    descriptionEn: "Turned bowl with inlays of olive, national walnut, lemon and apricot; ash base. Fluid grains celebrate the harmony of Mediterranean essences."
  },
  {
    id: 8,
    titleIt: "Scrigno di Radiche",
    titleEn: "Burl Treasure Chest",
    dimensions: "27 cm Ø × 20 cm h",
    descriptionIt: "Cofanetto in radica di ulivo con coperchio in noce nazionale e raffinati inserti circolari di ulivo, paduk, gelso e noce. Pomolo in radice di ulivo. Un dialogo tra radica e noce ispirato ai giardini del Salento.",
    descriptionEn: "Lidded vessel in olive burl with national walnut lid featuring refined circular inlays of olive, paduk, mulberry and walnut. Turned knob in olive root. A dialogue between burl and walnut inspired by the gardens of Salento."
  },
  {
    id: 9,
    titleIt: "Quartetto di Radiche",
    titleEn: "Quartet of Burls",
    dimensions: "8 cm Ø × 24 cm h (max)",
    descriptionIt: "Quartetto di portagioie in radica di ulivo, noce ebanizzato e limone. Ogni pezzo racconta una storia diversa di forma e venature. Un inno alla varietà e alla poesia del legno del Salento.",
    descriptionEn: "Quartet of jewelry holders in olive burl, ebonized walnut and lemon wood. Each piece tells a different story of form and grain. An ode to the variety and poetry of Salento wood."
  },
  {
    id: 10,
    titleIt: "Cerchi di Luce",
    titleEn: "Circles of Light",
    dimensions: "28 cm Ø × 10 cm h",
    descriptionIt: "Lampada in noce nazionale di recupero con base decorata da raffinati inserti circolari di paduk e gelso. Le venature antiche si fondono con i cerchi da cui filtra la luce. Un gioco di luce tra le venature del legno recuperato.",
    descriptionEn: "Lamp in reclaimed national walnut with base decorated by refined circular inlays of paduk and mulberry. The ancient wood grains blend with the circles through which light filters. A play of light through the grains of the reclaimed wood."
  }
];

// Note: High-res product photos extracted from the official 14x14cm cards are available in /home/workdir/artifacts/exhibition_images/
// TODO: Upload them to public/exhibition/ (e.g. lampada-wormhole.jpg) and update cards to use <img src=...> for rich visual gallery.

export default function SanteseArtWebsite() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
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
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  const openEmail = () => {
    window.location.href = 'mailto:rocco.santese@pec.it';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Elegant Minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobileMenu(); }}
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

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
              <button onClick={() => scrollToSection('chi-siamo')} className="nav-link">Chi siamo</button>
              <button onClick={() => scrollToSection('servizi')} className="nav-link">Servizi</button>
              <button onClick={() => scrollToSection('galleria')} className="nav-link">Galleria</button>
              <button onClick={() => scrollToSection('contatti')} className="nav-link">Contatti</button>
            </div>

            <div className="hidden md:block">
              <button 
                onClick={() => scrollToSection('contatti')}
                className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium tracking-wide flex items-center gap-2"
              >
                CONTATTACI
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-1 text-black hover:text-gray-700 transition-colors"
              aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/10 z-30 md:hidden" 
              style={{ top: '80px' }}
              onClick={closeMobileMenu}
            />
            <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 z-40 mobile-menu shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-y-1 text-base font-medium">
                <button onClick={() => scrollToSection('chi-siamo')} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">Chi siamo</button>
                <button onClick={() => scrollToSection('servizi')} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">Servizi</button>
                <button onClick={() => scrollToSection('galleria')} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">Galleria</button>
                <button onClick={() => scrollToSection('contatti')} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">Contatti</button>
                <div className="pt-6 mt-2">
                  <button onClick={() => scrollToSection('contatti')} className="btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-[2px]">CONTATTACI</button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* HERO SECTION */}
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-xs tracking-[2px]">
          <span>SCROLL</span>
          <div className="h-px w-8 bg-white/40 mt-2" />
        </div>
      </section>

      {/* CHI SIAMO */}
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

      {/* GALLERIA - Now the main exhibition content with all 10 pieces */}
      <section id="galleria" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-4 mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-gray-500">IL NOSTRO LAVORO</div>
            <h2 className="font-serif text-5xl md:text-6xl tracking-[-2px]">Galleria — Giardini del Salento</h2>
          </div>
          <p className="max-w-md text-sm text-gray-500">
            Dieci opere uniche in legno mediterraneo. Ogni pezzo racconta una storia di luce, materia e memoria del Salento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exhibits.map((exhibit) => (
            <div 
              key={exhibit.id}
              onClick={() => setSelectedExhibit(exhibit)}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Elegant visual placeholder - replace with real photo */}
              <div className="aspect-[16/10] bg-gradient-to-br from-[#f8f1e3] via-[#f4ebdf] to-[#f8f1e3] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#c9b896_0.6px,transparent_1px)] bg-[length:3.5px_3.5px] opacity-40"></div>
                <div className="relative z-10 text-center px-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B5E3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="text-[10px] tracking-[3px] text-[#8B5E3C]/60 font-medium">OPERA UNICA • SALENTO</div>
                </div>
                <div className="absolute top-4 right-4 px-3.5 py-1 bg-white/95 text-xs tracking-widest rounded-full text-gray-600 font-mono shadow-sm">
                  {exhibit.dimensions}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="font-serif text-[21px] leading-[1.1] tracking-[-0.4px] mb-1 pr-1">{exhibit.titleIt}</h3>
                  <p className="text-xs uppercase tracking-[1.5px] text-gray-400">{exhibit.titleEn}</p>
                </div>
                
                <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-4 flex-1">
                  {exhibit.descriptionIt}
                </p>

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs tracking-[2px] text-gray-400 group-hover:text-[#8B5E3C] transition-colors">VEDI DETTAGLI</span>
                  <span className="text-[#8B5E3C] text-lg leading-none group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-10 tracking-widest">
          TUTTE LE OPERE SONO REALIZZATE A MANO CON LEGNI PREGIATI DEL SALENTO • PEZZI UNICI
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
                onClick={openEmail}
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

      {/* Modal for selected exhibit - main detailed view */}
      {selectedExhibit && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-8" 
          onClick={() => setSelectedExhibit(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12 overflow-auto max-h-[92vh]">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-[#f5f0e6] text-[#8B5E3C] text-xs tracking-[3px] mb-3">GIARDINI DEL SALENTO</div>
                  <h3 className="font-serif text-4xl md:text-[42px] tracking-[-1.8px] leading-none">{selectedExhibit.titleIt}</h3>
                  <p className="mt-2 text-xl text-gray-500 tracking-tight">{selectedExhibit.titleEn}</p>
                </div>
                <button 
                  onClick={() => setSelectedExhibit(null)}
                  className="mt-1 p-3 text-gray-400 hover:text-black transition-colors"
                  aria-label="Chiudi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <span className="inline-block font-mono text-sm tracking-widest bg-gray-100 px-5 py-2 rounded-2xl text-gray-600">{selectedExhibit.dimensions}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 text-[15px] leading-[1.65]">
                <div>
                  <div className="uppercase tracking-[2.5px] text-xs text-gray-500 mb-4">DESCRIZIONE ITALIANO</div>
                  <p className="text-gray-700">{selectedExhibit.descriptionIt}</p>
                </div>
                <div className="md:pl-8 md:border-l border-gray-100">
                  <div className="uppercase tracking-[2.5px] text-xs text-gray-500 mb-4">ENGLISH DESCRIPTION</div>
                  <p className="text-gray-700">{selectedExhibit.descriptionEn}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    setSelectedExhibit(null);
                    setTimeout(() => scrollToSection('contatti'), 100);
                  }}
                  className="btn-primary flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px]"
                >
                  RICHIEDI INFO O PREVENTIVO PER QUESTO PEZZO
                </button>
                <button 
                  onClick={() => setSelectedExhibit(null)}
                  className="flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px] border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  CHIUDI SCHEDA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
