"use client";

import React, { useState } from "react";
import { ServiceIcon } from "@/components/ServiceIcons";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/lib/i18n";

interface Exhibit {
  id: number;
  titleIt: string;
  titleEn: string;
  dimensions: string;
  descriptionIt: string;
  descriptionEn: string;
  image: string;
}

function getExhibitTitle(exhibit: Exhibit, locale: Locale) {
  return locale === "it" ? exhibit.titleIt : exhibit.titleEn;
}

function getExhibitDescription(exhibit: Exhibit, locale: Locale) {
  return locale === "it" ? exhibit.descriptionIt : exhibit.descriptionEn;
}

const exhibits: Exhibit[] = [
  { id: 1, titleIt: "Lampada Wormhole", titleEn: "Wormhole Lamp", dimensions: "25 cm Ø × 16.5 cm h", descriptionIt: "Lampada Wormhole in frassino con inserti di noce mansonia e base in noce nazionale ebanizzato. La radica centrale emette una luce blu che fuoriesce anche dalla base. Un portale di luce e legno tra i mondi.", descriptionEn: "Wormhole lamp in ash with mansonia walnut inlays and ebonized national walnut base. The central burl emits blue light that also glows from under the base. A portal of light and wood between worlds.", image: "lampada-wormhole.jpg" },
  { id: 2, titleIt: "Tris di Radiche", titleEn: "Trio of Burls", dimensions: "25 cm Ø × 16 cm h (max)", descriptionIt: "Trio di lampade in radica di ulivo con coni in noce nazionale ebanizzato. Una presenta inserti di gelso e pero. La radica si libra sospesa in un abbraccio di luce e ombra.", descriptionEn: "Trio of lamps in olive burl with ebonized national walnut cones. One features inlays of mulberry and pear. The burl floats suspended in an embrace of light and shadow.", image: "tris-di-radiche.jpg" },
  { id: 3, titleIt: "Centrotavola di Radiche", titleEn: "Olive Burl Centerpiece", dimensions: "24 cm Ø × 12 cm h", descriptionIt: "Centrotavola in radica di ulivo con bordo a segmenti di paduk, noce nazionale, limone e wengé. Le venature della radica centrale danzano con i colori del bordo. Un cerchio di essenze che celebra il Salento.", descriptionEn: "Centerpiece in olive burl with segmented rim in paduk, national walnut, lemon and wengé. The central burl grains dance with the colors of the rim. A circle of essences celebrating Salento.", image: "centrotavola-di-radiche.jpg" },
  { id: 4, titleIt: "Raggiera Solare", titleEn: "Solar Sunburst Bowl", dimensions: "38 cm Ø × 9 cm h", descriptionIt: "Ciotola con spettacolare raggiera di intarsi in ulivo, frassino, limone, pero, noce nazionale e ciliegio. Il motivo centrale scolpito esalta le venature fluide del legno. Un inno alla luce e alla materia dei giardini del Salento.", descriptionEn: "Bowl featuring a spectacular sunburst inlay of olive, ash, lemon, pear, national walnut and cherry. The carved central motif highlights the flowing wood grains. An ode to the light and matter of the Salento gardens.", image: "raggiera-solare.jpg" },
  { id: 5, titleIt: "Tris di Fiori", titleEn: "Trio of Flower Holders", dimensions: "11 cm Ø × 30 cm h (max)", descriptionIt: "Trio di porta fiori in noce nazionale con inserti circolari di gelso. I due più grandi accolgono fiori secchi mediterranei, il piccolo una candela. Un inno alla semplicità e alla luce del Salento.", descriptionEn: "Trio of flower holders in national walnut with circular inlays of mulberry. The two larger ones hold dried Mediterranean flowers, the small one a candle. An ode to simplicity and light of Salento.", image: "tris-di-fiori.jpg" },
  { id: 6, titleIt: "Saturno di Radiche", titleEn: "Saturn of Burls", dimensions: "16 cm Ø × 20 cm h", descriptionIt: "Porta gioie a forma di Saturno in ulivo e pero, con anello in radica di ulivo. La sfera centrale ruota delicatamente tra le braccia della radica. Un piccolo universo di legno sospeso tra luce e memoria.", descriptionEn: "Saturn-shaped jewelry holder in olive and pear wood, with ring in olive burl. The central sphere rotates gently within the arms of the burl. A small wooden universe suspended between light and memory.", image: "saturno-di-radiche.jpg" },
  { id: 7, titleIt: "Quintetto di Essenze", titleEn: "Quintet of Essences", dimensions: "36 cm Ø × 9 cm h", descriptionIt: "Ciottola tornita con intarsi di ulivo, noce nazionale, limone e albicocca; fondo in frassino. Le venature fluide celebrano l'armonia delle essenze mediterranee.", descriptionEn: "Turned bowl with inlays of olive, national walnut, lemon and apricot; ash base. Fluid grains celebrate the harmony of Mediterranean essences.", image: "quintetto-di-essenze.jpg" },
  { id: 8, titleIt: "Scrigno di Radiche", titleEn: "Burl Treasure Chest", dimensions: "27 cm Ø × 20 cm h", descriptionIt: "Cofanetto in radica di ulivo con coperchio in noce nazionale e raffinati inserti circolari di ulivo, paduk, gelso e noce. Pomolo in radice di ulivo. Un dialogo tra radica e noce ispirato ai giardini del Salento.", descriptionEn: "Lidded vessel in olive burl with national walnut lid featuring refined circular inlays of olive, paduk, mulberry and walnut. Turned knob in olive root. A dialogue between burl and walnut inspired by the gardens of Salento.", image: "scrigno-di-radiche.jpg" },
  { id: 9, titleIt: "Quartetto di Radiche", titleEn: "Quartet of Burls", dimensions: "8 cm Ø × 24 cm h (max)", descriptionIt: "Quartetto di portagioie in radica di ulivo, noce ebanizzato e limone. Ogni pezzo racconta una storia diversa di forma e venature. Un inno alla varietà e alla poesia del legno del Salento.", descriptionEn: "Quartet of jewelry holders in olive burl, ebonized walnut and lemon wood. Each piece tells a different story of form and grain. An ode to the variety and poetry of Salento wood.", image: "quartetto-di-radiche.jpg" },
  { id: 10, titleIt: "Cerchi di Luce", titleEn: "Circles of Light", dimensions: "28 cm Ø × 10 cm h", descriptionIt: "Lampada in noce nazionale di recupero con base decorata da raffinati inserti circolari di paduk e gelso. Le venature antiche si fondono con i cerchi da cui filtra la luce. Un gioco di luce tra le venature del legno recuperato.", descriptionEn: "Lamp in reclaimed national walnut with base decorated by refined circular inlays of paduk and mulberry. The ancient wood grains blend with the circles through which light filters. A play of light through the grains of the reclaimed wood.", image: "cerchi-di-luce.jpg" },
];

const heroCollageImages = [
  "lampada-wormhole.jpg",
  "raggiera-solare.jpg",
  "scrigno-di-radiche.jpg",
  "cerchi-di-luce.jpg",
  "tris-di-fiori.jpg",
  "saturno-di-radiche.jpg",
];

const CONTACT_EMAIL = "santesearts@gmail.com";
const CONTACT_PHONE = "+39 329 215 1568";
const CONTACT_PHONE_TEL = "+393292151568";
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/santeseart/" },
  { label: "X", href: "https://x.com/santeseart" },
  { label: "Facebook", href: "https://www.facebook.com/santeserocco" },
];

export default function SanteseArtWebsite() {
  const { locale, t } = useLocale();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${t.contact.formSubject} ${formData.name}`;
    const body = `Nome: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessaggio:%0A${formData.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2500);
  };

  const openEmail = () => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };
  const openPhone = () => {
    window.location.href = `tel:${CONTACT_PHONE_TEL}`;
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const heroCollage = heroCollageImages.map((image) => {
    const exhibit = exhibits.find((item) => item.image === image);
    return {
      image,
      alt: exhibit ? getExhibitTitle(exhibit, locale) : image,
    };
  });

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMobileMenu();
            }}
            className="flex items-center cursor-pointer group"
          >
            <img
              src="/logo_santeseart.svg"
              alt="Santese Art"
              className="h-14 w-auto transition-transform group-hover:scale-[1.02] brightness-0"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
              <button onClick={() => scrollToSection("chi-siamo")} className="nav-link">{t.nav.about}</button>
              <button onClick={() => scrollToSection("servizi")} className="nav-link">{t.nav.services}</button>
              <button onClick={() => scrollToSection("galleria")} className="nav-link">{t.nav.gallery}</button>
              <button onClick={() => scrollToSection("contatti")} className="nav-link">{t.nav.contact}</button>
            </div>

            <div className="hidden md:block">
              <button onClick={() => scrollToSection("contatti")} className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium tracking-wide">{t.nav.contactUs}</button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 -mr-1">
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/10 z-30 md:hidden" style={{ top: "80px" }} onClick={closeMobileMenu} />
            <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 z-40 mobile-menu shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-y-1 text-base font-medium">
                <button onClick={() => scrollToSection("chi-siamo")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.about}</button>
                <button onClick={() => scrollToSection("servizi")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.services}</button>
                <button onClick={() => scrollToSection("galleria")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.gallery}</button>
                <button onClick={() => scrollToSection("contatti")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.contact}</button>
                <div className="pt-6 mt-2">
                  <button onClick={() => scrollToSection("contatti")} className="btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-[2px]">{t.nav.contactUs}</button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <section className="hero-section relative h-[100dvh] flex flex-col pt-20 overflow-hidden bg-[#faf8f5]">
        <div className="hero-layout flex flex-1 min-h-0 w-full">
          <div className="hero-mosaic">
            {heroCollage.map((piece, index) => (
              <div key={piece.image} className={`hero-mosaic-cell hero-mosaic-cell-${index + 1}`}>
                <img src={`/exhibition/${piece.image}`} alt={piece.alt} loading={index < 2 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>

          <div className="hero-content">
            <div className="hero-content-inner">
              <div className="hero-badge-wrap">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#f5f0e6] text-[#8B5E3C] text-xs tracking-[3px] font-medium">
                  {t.hero.badge}
                </div>
              </div>
              <h1 className="hero-title font-serif tracking-[-2.5px] leading-[0.92] text-black">
                {t.hero.titleLine1}<br />{t.hero.titleLine2}
              </h1>
              <p className="hero-subtitle tracking-tight text-gray-600 font-light">
                {t.hero.subtitle}
              </p>
              <p className="hero-description text-gray-500 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="hero-actions">
                <button onClick={() => scrollToSection("galleria")} className="btn-primary px-7 py-3.5 rounded-full text-sm font-medium tracking-widest">
                  {t.hero.ctaGallery}
                </button>
                <button onClick={() => scrollToSection("contatti")} className="px-7 py-3.5 rounded-full text-sm font-medium tracking-widest border border-black text-black hover:bg-black hover:text-white transition-all">
                  {t.hero.ctaContact}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 text-xs tracking-[2px] pointer-events-none">
          <span>{t.hero.scroll}</span>
          <div className="h-px w-8 bg-gray-300 mt-2" />
        </div>
      </section>

      <section id="chi-siamo" className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-12 gap-x-12 items-center">
          <div className="md:col-span-7">
            <div className="uppercase text-xs tracking-[3px] text-gray-500 mb-3">{t.about.eyebrow}</div>
            <h2 className="font-serif text-6xl md:text-7xl tracking-[-2.5px] leading-none mb-8">
              {t.about.titleLine1}<br />{t.about.titleLine2}<br />{t.about.titleLine3}<br />{t.about.titleLine4}
            </h2>
          </div>
          <div className="md:col-span-5 text-lg leading-relaxed text-gray-600">
            <p className="mb-6"><span className="font-medium text-black">{t.about.brand}</span> {t.about.p1}</p>
            <p className="mb-6">{t.about.p2} <span className="font-medium text-black">{t.about.p2Highlight}</span>{t.about.p2End}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>
        <div className="mt-16 pt-12 border-t border-gray-200 grid md:grid-cols-3 gap-8 text-sm">
          <div><div className="font-medium mb-1 tracking-wide">{t.about.stat1Label}</div><div className="text-gray-500">{t.about.stat1Value}</div></div>
          <div><div className="font-medium mb-1 tracking-wide">{t.about.stat2Label}</div><div className="text-gray-500">{t.about.stat2Value}</div></div>
          <div><div className="font-medium mb-1 tracking-wide">{t.about.stat3Label}</div><div className="text-gray-500">{t.about.stat3Value}</div></div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section id="servizi" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">{t.services.eyebrow}</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">{t.services.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, index) => (
            <div key={index} className="service-card group bg-white p-8 rounded-3xl flex flex-col">
              <ServiceIcon index={index} />
              <h3 className="font-serif text-3xl tracking-tight mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-1">{service.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100 text-xs tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">{t.services.customLabel}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section id="galleria" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-4 mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-gray-500">{t.gallery.eyebrow}</div>
            <h2 className="font-serif text-5xl md:text-6xl tracking-[-2px]">{t.gallery.title}</h2>
          </div>
          <p className="max-w-md text-sm text-gray-500">{t.gallery.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exhibits.map((exhibit) => (
            <div key={exhibit.id} onClick={() => setSelectedExhibit(exhibit)} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <img src={`/exhibition/${exhibit.image}`} alt={getExhibitTitle(exhibit, locale)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute top-4 right-4 px-3.5 py-1 bg-white/95 text-xs tracking-widest rounded-full text-gray-600 font-mono shadow-sm">{exhibit.dimensions}</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="font-serif text-[21px] leading-[1.1] tracking-[-0.4px] mb-1 pr-1">{getExhibitTitle(exhibit, locale)}</h3>
                </div>
                <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-4 flex-1">{getExhibitDescription(exhibit, locale)}</p>
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs tracking-[2px] text-gray-400 group-hover:text-[#8B5E3C] transition-colors">{t.gallery.viewDetails}</span>
                  <span className="text-[#8B5E3C] text-lg leading-none group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-10 tracking-widest">{t.gallery.footer}</p>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section id="contatti" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">{t.contact.eyebrow}</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">{t.contact.title}</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-x-16 gap-y-12">
          <div className="md:col-span-2 space-y-10">
            <div><div className="text-xs tracking-[2px] text-gray-500 mb-2">{t.contact.locationLabel}</div><div className="font-medium text-xl leading-tight">Via Torre Santa Susanna, 124<br />72024 Oria (BR) — Puglia</div></div>
            <div><div className="text-xs tracking-[2px] text-gray-500 mb-2">{t.contact.hoursLabel}</div><div className="space-y-1 text-[15px]"><div className="flex justify-between"><span>{t.contact.weekdays}</span> <span className="font-mono text-gray-500">{t.contact.morningHours}</span></div><div className="flex justify-between"><span></span> <span className="font-mono text-gray-500">{t.contact.afternoonHours}</span></div><div className="flex justify-between pt-1"><span>{t.contact.saturday}</span> <span className="font-mono text-gray-500">{t.contact.morningHours}</span></div></div></div>
            <div>
              <div className="text-xs tracking-[2px] text-gray-500 mb-3">{t.contact.directLabel}</div>
              <div className="space-y-4">
                <button onClick={openEmail} className="flex items-center gap-3 text-left group w-full">
                  <div className="h-12 w-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" /></svg>
                  </div>
                  <div>
                    <div className="font-medium tracking-tight">{CONTACT_EMAIL}</div>
                    <div className="text-xs text-gray-500">{t.contact.emailHint}</div>
                  </div>
                </button>
                <button onClick={openPhone} className="flex items-center gap-3 text-left group w-full">
                  <div className="h-12 w-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <div className="font-medium tracking-tight">{CONTACT_PHONE}</div>
                    <div className="text-xs text-gray-500">{t.contact.phoneHint}</div>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <div className="text-xs tracking-[2px] text-gray-500 mb-3">{t.contact.socialLabel}</div>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-12 px-5 rounded-full border border-black flex items-center justify-center gap-2 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-all"
                  >
                    {social.label === "Instagram" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={1.75} /><circle cx="12" cy="12" r="4" strokeWidth={1.75} /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                    )}
                    {social.label === "X" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    )}
                    {social.label === "Facebook" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    )}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
              <h3 className="font-serif text-4xl tracking-tight mb-2">{t.contact.formTitle}</h3>
              <p className="text-gray-600 mb-8 text-sm">{t.contact.formSubtitle}</p>
              {isSubmitted ? (
                <div className="py-12 text-center"><div className="mx-auto mb-4 h-16 w-16 rounded-full bg-black text-white flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></div><p className="font-medium text-xl">{t.contact.successTitle}</p><p className="text-sm text-gray-500 mt-1">{t.contact.successSubtitle}</p></div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="text-xs tracking-widest text-gray-500 block mb-1.5">{t.contact.formName}</label><input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="form-input w-full rounded-2xl px-5 py-3.5 bg-white text-base placeholder:text-gray-400" placeholder={t.contact.formNamePlaceholder} /></div>
                    <div><label className="text-xs tracking-widest text-gray-500 block mb-1.5">{t.contact.formEmail}</label><input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="form-input w-full rounded-2xl px-5 py-3.5 bg-white text-base placeholder:text-gray-400" placeholder={t.contact.formEmailPlaceholder} /></div>
                  </div>
                  <div><label className="text-xs tracking-widest text-gray-500 block mb-1.5">{t.contact.formMessage}</label><textarea name="message" value={formData.message} onChange={handleFormChange} required rows={5} className="form-input w-full rounded-3xl px-5 py-4 bg-white text-base resize-y min-h-[120px] placeholder:text-gray-400" placeholder={t.contact.formMessagePlaceholder} /></div>
                  <button type="submit" className="btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-[2px] mt-2">{t.contact.formSubmit}</button>
                  <p className="text-[10px] text-center text-gray-400 tracking-widest pt-1">{t.contact.formNote}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <img
            src="/logo_santeseart.svg"
            alt="Santese Art"
            className="h-28 md:h-40 w-auto brightness-0 mb-10"
          />
          <div className="text-xs text-gray-500 flex flex-col md:flex-row items-center gap-y-3 md:gap-x-6">
            <span>© {new Date().getFullYear()} Santese Art — Rocco Santese. {t.footer.rights}</span>
            <span className="hidden md:inline">•</span>
            <span>{t.footer.location}</span>
            <span className="hidden md:inline">•</span>
            <span>{t.footer.tagline}</span>
          </div>
        </div>
      </footer>

      {selectedExhibit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-8" onClick={() => setSelectedExhibit(null)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 md:p-12 overflow-auto max-h-[92vh]">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-[#f5f0e6] text-[#8B5E3C] text-xs tracking-[3px] mb-3">{t.gallery.modalBadge}</div>
                  <h3 className="font-serif text-4xl md:text-[42px] tracking-[-1.8px] leading-none">{getExhibitTitle(selectedExhibit, locale)}</h3>
                </div>
                <button onClick={() => setSelectedExhibit(null)} className="mt-1 p-3 text-gray-400 hover:text-black" aria-label={t.gallery.closeAria}>✕</button>
              </div>
              <div className="mb-8 rounded-2xl overflow-hidden bg-gray-50 aspect-[16/10] relative">
                <img
                  src={`/exhibition/${selectedExhibit.image}`}
                  alt={getExhibitTitle(selectedExhibit, locale)}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <div className="mb-8"><span className="inline-block font-mono text-sm tracking-widest bg-gray-100 px-5 py-2 rounded-2xl text-gray-600">{selectedExhibit.dimensions}</span></div>
              <div className="text-[15px] leading-[1.65]">
                <div className="uppercase tracking-[2.5px] text-xs text-gray-500 mb-4">{t.gallery.modalDescription}</div>
                <p className="text-gray-700">{getExhibitDescription(selectedExhibit, locale)}</p>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <button onClick={() => { setSelectedExhibit(null); setTimeout(() => scrollToSection("contatti"), 100); }} className="btn-primary flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px]">{t.gallery.modalCta}</button>
                <button onClick={() => setSelectedExhibit(null)} className="flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px] border border-gray-300 hover:bg-gray-50 transition-colors">{t.gallery.modalClose}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
