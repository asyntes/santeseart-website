"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { HeroMosaic } from "@/components/HeroMosaic";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LogoMonochrome } from "@/components/LogoMonochrome";
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
  price: number;
}

function formatExhibitPrice(price: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getExhibitTitle(exhibit: Exhibit) {
  return exhibit.titleIt;
}

function getExhibitDescription(exhibit: Exhibit, locale: Locale) {
  return locale === "it" ? exhibit.descriptionIt : exhibit.descriptionEn;
}

// Prezzi indicativi: tipologia/dimensioni + radica (+15-25%) + intarsio/intaglio + LED + sconto set.
const exhibits: Exhibit[] = [
  { id: 1, titleIt: "Lampada Wormhole", titleEn: "Wormhole Lamp", dimensions: "25 cm Ø × 16.5 cm h", descriptionIt: "Lampada Wormhole in frassino con inserti di noce mansonia e base in noce nazionale ebanizzato. La radica centrale emette una luce blu che fuoriesce anche dalla base. Un portale di luce e legno tra i mondi.", descriptionEn: "Wormhole lamp in ash with mansonia walnut inlays and ebonized national walnut base. The central burl emits blue light that also glows from under the base. A portal of light and wood between worlds.", image: "lampada-wormhole.jpg", price: 680 },
  { id: 2, titleIt: "Tris di Radiche", titleEn: "Trio of Burls", dimensions: "25 cm Ø × 16 cm h (max)", descriptionIt: "Trio di lampade in radica di ulivo con coni in noce nazionale ebanizzato. Una presenta inserti di gelso e pero. La radica si libra sospesa in un abbraccio di luce e ombra.", descriptionEn: "Trio of lamps in olive burl with ebonized national walnut cones. One features inlays of mulberry and pear. The burl floats suspended in an embrace of light and shadow.", image: "tris-di-radiche.jpg", price: 1150 },
  { id: 3, titleIt: "Centrotavola di Radiche", titleEn: "Olive Burl Centerpiece", dimensions: "24 cm Ø × 12 cm h", descriptionIt: "Centrotavola in radica di ulivo con bordo a segmenti di paduk, noce nazionale, limone e wengé. Le venature della radica centrale danzano con i colori del bordo. Un cerchio di essenze che celebra il Salento.", descriptionEn: "Centerpiece in olive burl with segmented rim in paduk, national walnut, lemon and wengé. The central burl grains dance with the colors of the rim. A circle of essences celebrating Salento.", image: "centrotavola-di-radiche.jpg", price: 420 },
  { id: 4, titleIt: "Raggiera Solare", titleEn: "Solar Sunburst Bowl", dimensions: "38 cm Ø × 9 cm h", descriptionIt: "Ciotola con spettacolare raggiera di intarsi in ulivo, frassino, limone, pero, noce nazionale e ciliegio. Il motivo centrale scolpito esalta le venature fluide del legno. Un inno alla luce e alla materia dei giardini del Salento.", descriptionEn: "Bowl featuring a spectacular sunburst inlay of olive, ash, lemon, pear, national walnut and cherry. The carved central motif highlights the flowing wood grains. An ode to the light and matter of the Salento gardens.", image: "raggiera-solare.jpg", price: 520 },
  { id: 5, titleIt: "Tris di Fiori", titleEn: "Trio of Flower Holders", dimensions: "11 cm Ø × 30 cm h (max)", descriptionIt: "Trio di porta fiori in noce nazionale con inserti circolari di gelso. I due più grandi accolgono fiori secchi mediterranei, il piccolo una candela. Un inno alla semplicità e alla luce del Salento.", descriptionEn: "Trio of flower holders in national walnut with circular inlays of mulberry. The two larger ones hold dried Mediterranean flowers, the small one a candle. An ode to simplicity and light of Salento.", image: "tris-di-fiori.jpg", price: 380 },
  { id: 6, titleIt: "Saturno di Radiche", titleEn: "Saturn of Burls", dimensions: "16 cm Ø × 20 cm h", descriptionIt: "Porta gioie a forma di Saturno in ulivo e pero, con anello in radica di ulivo. La sfera centrale ruota delicatamente tra le braccia della radica. Un piccolo universo di legno sospeso tra luce e memoria.", descriptionEn: "Saturn-shaped jewelry holder in olive and pear wood, with ring in olive burl. The central sphere rotates gently within the arms of the burl. A small wooden universe suspended between light and memory.", image: "saturno-di-radiche.jpg", price: 195 },
  { id: 7, titleIt: "Quintetto di Essenze", titleEn: "Quintet of Essences", dimensions: "36 cm Ø × 9 cm h", descriptionIt: "Ciotola tornita con intarsi di ulivo, noce nazionale, limone e albicocca; fondo in frassino. Le venature fluide celebrano l'armonia delle essenze mediterranee.", descriptionEn: "Turned bowl with inlays of olive, national walnut, lemon and apricot; ash base. Fluid grains celebrate the harmony of Mediterranean essences.", image: "quintetto-di-essenze.jpg", price: 390 },
  { id: 8, titleIt: "Scrigno di Radiche", titleEn: "Burl Treasure Chest", dimensions: "27 cm Ø × 20 cm h", descriptionIt: "Cofanetto in radica di ulivo con coperchio in noce nazionale e raffinati inserti circolari di ulivo, paduk, gelso e noce. Pomolo in radice di ulivo. Un dialogo tra radica e noce ispirato ai giardini del Salento.", descriptionEn: "Lidded vessel in olive burl with national walnut lid featuring refined circular inlays of olive, paduk, mulberry and walnut. Turned knob in olive root. A dialogue between burl and walnut inspired by the gardens of Salento.", image: "scrigno-di-radiche.jpg", price: 620 },
  { id: 9, titleIt: "Quartetto di Radiche", titleEn: "Quartet of Burls", dimensions: "8 cm Ø × 24 cm h (max)", descriptionIt: "Quartetto di portagioie in radica di ulivo, noce ebanizzato e limone. Ogni pezzo racconta una storia diversa di forma e venature. Un inno alla varietà e alla poesia del legno del Salento.", descriptionEn: "Quartet of jewelry holders in olive burl, ebonized walnut and lemon wood. Each piece tells a different story of form and grain. An ode to the variety and poetry of Salento wood.", image: "quartetto-di-radiche.jpg", price: 320 },
  { id: 10, titleIt: "Cerchi di Luce", titleEn: "Circles of Light", dimensions: "28 cm Ø × 10 cm h", descriptionIt: "Lampada in noce nazionale di recupero con base decorata da raffinati inserti circolari di paduk e gelso. Le venature antiche si fondono con i cerchi da cui filtra la luce. Un gioco di luce tra le venature del legno recuperato.", descriptionEn: "Lamp in reclaimed national walnut with base decorated by refined circular inlays of paduk and mulberry. The ancient wood grains blend with the circles through which light filters. A play of light through the grains of the reclaimed wood.", image: "cerchi-di-luce.jpg", price: 480 },
  { id: 11, titleIt: "Abbraccio di Luce", titleEn: "Embrace of Light", dimensions: "38 cm Ø", descriptionIt: "Inserto per porta in noce chiaro con Sole e Luna intagliati a rilievo. I due volti si guardano in un eterno abbraccio di luce e ombra. Un portale di poesia tra il giorno e la notte del Salento.", descriptionEn: "Door insert in light walnut with high-relief Sun and Moon carving. The two faces gaze at each other in an eternal embrace of light and shadow. A portal of poetry between day and night of Salento.", image: "abbraccio-di-luce.jpg", price: 850 },
  { id: 12, titleIt: "Aurora Rustica", titleEn: "Rustic Dawn", dimensions: "22 cm Ø × 33 cm h", descriptionIt: "Lampada Aurora Rustica in ulivo con base in radica e LED ricaricabile. La luce in cima annuncia l'aurora come un nuovo giorno nel bosco. Un inno alla rinascita e alla luce del Salento.", descriptionEn: "Rustic Dawn lamp in olive with burl base and rechargeable LED. The light at the top announces the dawn like a new day in the forest. An ode to rebirth and the light of Salento.", image: "aurora-rustica.jpg", price: 380 },
  { id: 13, titleIt: "Calice Selvaggio", titleEn: "Wild Chalice", dimensions: "26 cm Ø × 31 cm h", descriptionIt: "Lampada Calice Selvaggio in ulivo con base in radica e LED ricaricabile. La luce illumina dal basso il calice come un'offerta nel bosco. Un inno alla natura selvaggia e alla luce del Salento.", descriptionEn: "Wild Chalice lamp in olive with burl base and rechargeable LED. The light glows from below the chalice like an offering in the forest. An ode to wild nature and the light of Salento.", image: "calice-selvaggio.jpg", price: 420 },
  { id: 14, titleIt: "Cavalli del Tempo", titleEn: "Horses of Time", dimensions: "38 cm Ø × 29 cm h", descriptionIt: "Orologio in noce scuro intagliato a mano con teste di cavallo in stile Liberty. Le volute e i cavalli sembrano danzare intorno al tempo. Un inno alla libertà e alla tradizione del Salento.", descriptionEn: "Hand-carved dark walnut clock with Liberty-style horse heads. Scrolls and horses seem to dance around time. An ode to freedom and the tradition of Salento.", image: "cavalli-del-tempo.jpg", price: 980 },
  { id: 15, titleIt: "Cimasa di Fiori", titleEn: "Floral Cornice", dimensions: "108 cm Ø × 21.5 cm h", descriptionIt: "Cimasa in castagno con ricchi motivi floreali intagliati a mano. I fiori e le volute si aprono ai lati in un inno alla natura e alla tradizione del Salento.", descriptionEn: "Cimasa in chestnut with richly hand-carved floral motifs. Flowers and scrolls unfold on the sides in an ode to nature and the tradition of Salento.", image: "cimasa-di-fiori.jpg", price: 2400 },
  { id: 16, titleIt: "Corona di Fuoco", titleEn: "Crown of Fire", dimensions: "23 cm Ø × 30 cm h", descriptionIt: "Lampada Corona di Fuoco in ulivo con base in radica e LED ricaricabile. La fiamma interna illumina la corona come un fuoco nel bosco. Un inno alla forza e alla luce del Salento.", descriptionEn: "Crown of Fire lamp in olive with burl base and rechargeable LED. The inner flame lights the crown like a fire in the forest. An ode to strength and the light of Salento.", image: "corona-di-fuoco.jpg", price: 380 },
  { id: 17, titleIt: "Essenza Antica", titleEn: "Ancient Essence", dimensions: "40 cm Ø × 150 cm h", descriptionIt: "Piantana Essenza Antica in ulivo. La luce filtra attraverso la piega della lampada come l'essenza antica del bosco. Un inno alla memoria e alla luce del Salento.", descriptionEn: "Floor lamp Ancient Essence in olive. The light filters through the pleats of the shade like the ancient essence of the forest. An ode to memory and the light of Salento.", image: "essenza-antica.jpg", price: 980 },
  { id: 18, titleIt: "Fenice d'Ulivo", titleEn: "Olive Phoenix", dimensions: "22 cm Ø × 37 cm h", descriptionIt: "Lampada in radica di ulivo con LED ricaricabile. La fiamma interna illumina la fenice che risorge dal legno. Un inno alla rinascita e alla memoria del Salento.", descriptionEn: "Lamp in olive burl with rechargeable LED. The inner flame lights the phoenix rising from the wood. An ode to rebirth and the memory of Salento.", image: "fenice-dulivo.jpg", price: 390 },
  { id: 19, titleIt: "Fiammella del Bosco", titleEn: "Little Flame of the Forest", dimensions: "12 cm Ø × 17 cm h", descriptionIt: "Portacandela Fiammella del Bosco in radica di ulivo. La candela accesa illumina come una piccola fiamma nel bosco. Un sussurro di luce e quiete tra le radici del Salento.", descriptionEn: "Little Flame of the Forest candle holder in olive burl. The lit candle glows like a small flame in the forest. A whisper of light and quiet among the roots of Salento.", image: "fiammella-del-bosco.jpg", price: 95 },
  { id: 20, titleIt: "Fiori e Luce", titleEn: "Flowers and Light", dimensions: "9 cm Ø × 16 cm h (max)", descriptionIt: "Coppia di portafiori in ulivo con inserti in gelso. Nel vaso alto fiori secchi mediterranei, nel piccolo una candela accesa che illumina dolcemente. Un gioco di natura e luce tra le mani del Salento.", descriptionEn: "Pair of flower holders in olive with mulberry inserts. In the tall vase dried Mediterranean flowers, in the small one a lit candle that glows softly. A play of nature and light in the hands of Salento.", image: "fiori-e-luce.jpg", price: 165 },
  { id: 21, titleIt: "La Druida", titleEn: "The Druid", dimensions: "22 cm Ø × 28 cm h", descriptionIt: "Lampada La Druida in ulivo con base in radica e LED ricaricabile. La luce in cima veglia come una druida del bosco. Un sussurro di saggezza e luce tra le radici del Salento.", descriptionEn: "The Druid lamp in olive with burl base and rechargeable LED. The light at the top watches like a druid of the forest. A whisper of wisdom and light among the roots of Salento.", image: "la-druida.jpg", price: 380 },
  { id: 22, titleIt: "Lanterna del Viandante", titleEn: "Wayfarer's Lantern", dimensions: "12 cm Ø × 32 cm h", descriptionIt: "Lanterna in ulivo con LED ricaricabile. La fiamma scolpita illumina il cammino del viandante. Un sussurro di luce che guida tra le ombre del Salento.", descriptionEn: "Lantern in olive wood with rechargeable LED. The carved flame lights the wayfarer's path. A whisper of light that guides through the shadows of Salento.", image: "lanterna-del-viandante.jpg", price: 240 },
  { id: 23, titleIt: "Luce dell'Ulivo", titleEn: "Olive Light", dimensions: "7 cm Ø × 15 cm h (ciascuno)", descriptionIt: "Coppia di porta candele in ulivo e noce con fori decorativi. La luce delle candele basse illumina verso l'esterno creando un caldo bagliore. Un gioco di luce che danza tra i fori dell'ulivo.", descriptionEn: "Pair of candle holders in olive and walnut with decorative holes. The light from the low candles shines outward creating a warm glow. A play of light that dances through the holes of the olive wood.", image: "luce-dellulivo.jpg", price: 145 },
  { id: 24, titleIt: "L'alba del legno", titleEn: "The Dawn of Wood", dimensions: "40 cm Ø × 56.5 cm h", descriptionIt: "Lume elettrico L'alba del legno in ulivo. La luce filtra attraverso la piega della lampada come l'aurora che nasce nel bosco. Un inno alla luce e alla bellezza del Salento.", descriptionEn: "Electric lamp The Dawn of Wood in olive. The light filters through the pleats of the shade like the dawn rising in the forest. An ode to light and the beauty of Salento.", image: "lalba-del-legno.jpg", price: 850 },
  { id: 25, titleIt: "Regno delle Due Sicilie", titleEn: "Kingdom of the Two Sicilies", dimensions: "120 cm Ø × 80 cm h", descriptionIt: "Tavolo Regno delle Due Sicilie intarsiato in noce nazionale, mogano, pero, wenge, ramino, ciliegio, paduk, noce daniele e noce mansonia. La mappa dell'antico regno racconta storie di gloria e memoria. Un inno alla tradizione e alla bellezza del Salento.", descriptionEn: "Kingdom of the Two Sicilies table inlaid in national walnut, mahogany, pear, wenge, ramino, cherry, paduk, danish walnut and mansonia walnut. The map of the ancient kingdom tells stories of glory and memory. An ode to tradition and the beauty of Salento.", image: "regno-delle-due-sicilie.jpg", price: 7200 },
  { id: 26, titleIt: "Sentinella del Bosco", titleEn: "Sentinel of the Forest", dimensions: "25 cm Ø × 34 cm h", descriptionIt: "Lampada in radica di ulivo con LED ricaricabile. La luce in cima veglia come una sentinella del bosco. Un sussurro di quiete e forza tra le radici del Salento.", descriptionEn: "Lamp in olive burl with rechargeable LED. The light at the top watches over like a sentinel of the forest. A whisper of quiet strength among the roots of Salento.", image: "sentinella-del-bosco.jpg", price: 380 },
  { id: 27, titleIt: "Torre di Ulivo", titleEn: "Olive Tower", dimensions: "20 cm Ø × 36 cm h", descriptionIt: "Portagioie in ulivo con grande corpo scolpito e alto fuso sormontato da sfera. Le venature sembrano danzare intorno al tempo. Un piccolo monumento di luce e legno del Salento.", descriptionEn: "Jewelry holder in olive wood with large sculpted body and tall finial topped by a sphere. The grains seem to dance around time. A small monument of light and wood from Salento.", image: "torre-di-ulivo.jpg", price: 265 },
];

const MOSAIC_EXCLUDED_IMAGES = new Set(["tris-di-radiche.jpg"]);

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
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const closeExhibitModal = () => {
    setIsImageEnlarged(false);
    setSelectedExhibit(null);
  };

  useEffect(() => {
    if (!selectedExhibit) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isImageEnlarged) setIsImageEnlarged(false);
      else closeExhibitModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedExhibit, isImageEnlarged]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const nav = document.querySelector<HTMLElement>(".site-nav");
      const offset = nav?.getBoundingClientRect().height ?? 80;
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

  useLayoutEffect(() => {
    const nav = document.querySelector<HTMLElement>(".site-nav");
    if (!nav) return;

    const syncHeaderOffset = () => {
      const height = Math.ceil(nav.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-offset", `${height}px`);
    };

    syncHeaderOffset();

    const observer = new ResizeObserver(syncHeaderOffset);
    observer.observe(nav);

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", syncHeaderOffset);
    visualViewport?.addEventListener("scroll", syncHeaderOffset);
    window.addEventListener("orientationchange", syncHeaderOffset);

    return () => {
      observer.disconnect();
      visualViewport?.removeEventListener("resize", syncHeaderOffset);
      visualViewport?.removeEventListener("scroll", syncHeaderOffset);
      window.removeEventListener("orientationchange", syncHeaderOffset);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <nav className="site-nav fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="site-nav-inner max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMobileMenu();
            }}
            className="flex items-center cursor-pointer group"
          >
            <LogoMonochrome className="site-nav-logo transition-transform group-hover:scale-[1.02]" />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
              <button onClick={() => scrollToSection("chi-siamo")} className="nav-link">{t.nav.about}</button>
              <button onClick={() => scrollToSection("servizi")} className="nav-link">{t.nav.services}</button>
              <button onClick={() => scrollToSection("galleria")} className="nav-link">{t.nav.gallery}</button>
              <button onClick={() => scrollToSection("contatti")} className="nav-link">{t.nav.contact}</button>
            </div>

            <div className="hidden md:flex items-center">
              <LocaleSwitcher />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <LocaleSwitcher />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-1">
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div className="mobile-menu-backdrop fixed inset-0 bg-black/10 z-30 md:hidden" onClick={closeMobileMenu} />
            <div className="mobile-menu-panel md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 z-40 mobile-menu shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-y-1 text-base font-medium">
                <button onClick={() => scrollToSection("chi-siamo")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.about}</button>
                <button onClick={() => scrollToSection("servizi")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.services}</button>
                <button onClick={() => scrollToSection("galleria")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.gallery}</button>
                <button onClick={() => scrollToSection("contatti")} className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none">{t.nav.contact}</button>
              </div>
            </div>
          </>
        )}
      </nav>

      <section className="hero-section">
        <div className="hero-layout flex flex-1 min-h-0 w-full">
          <HeroMosaic
            initialImages={heroCollageImages}
            imagePool={exhibits
              .map((exhibit) => exhibit.image)
              .filter((image) => !MOSAIC_EXCLUDED_IMAGES.has(image))}
            exhibits={exhibits}
          />

          <div className="hero-content">
            <div className="hero-content-inner">
              <div className="hero-badge-wrap">
                <div className="hero-badge">
                  {t.hero.badge}
                </div>
              </div>
              <h1 className="hero-title font-serif text-black">
                {t.hero.titleLine1}<br />{t.hero.titleLine2}
              </h1>
              <p className="hero-subtitle tracking-tight text-gray-600 font-light">
                {t.hero.subtitle}
              </p>
              <p className="hero-event text-[#8B5E3C] font-medium tracking-wide text-sm md:text-base mb-3">
                {t.hero.event}
              </p>
              <p className="hero-description text-gray-500 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="hero-actions">
                <button onClick={() => scrollToSection("galleria")} className="btn-primary hero-cta rounded-full font-medium">
                  {t.hero.ctaGallery}
                </button>
                <button onClick={() => scrollToSection("contatti")} className="hero-cta hero-cta-outline rounded-full font-medium border border-black text-black hover:bg-black hover:text-white transition-all">
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
            <p className="font-serif italic text-xl md:text-2xl text-[#8B5E3C] mb-5 tracking-wide">{t.brand.motto}</p>
            <h2 className="font-serif text-[clamp(2.125rem,8vw,3.75rem)] md:text-7xl tracking-[-1.5px] md:tracking-[-2.5px] leading-none mb-8 text-balance">
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
            <p className="mt-3 text-[#8B5E3C] font-medium tracking-wide text-sm">{t.gallery.eventInfo}</p>
          </div>
          <p className="max-w-md text-sm text-gray-500">{t.gallery.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...exhibits]
            .sort((a, b) =>
              getExhibitTitle(a).localeCompare(getExhibitTitle(b), "it")
            )
            .map((exhibit) => (
            <div key={exhibit.id} onClick={() => setSelectedExhibit(exhibit)} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <img src={`/exhibition/${exhibit.image}`} alt={getExhibitTitle(exhibit)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="font-serif text-[21px] leading-[1.1] tracking-[-0.4px] mb-2.5 pr-1">{getExhibitTitle(exhibit)}</h3>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-xs tracking-widest text-gray-500">{exhibit.dimensions}</p>
                    <p className="font-serif text-lg tracking-tight text-[#8B5E3C] shrink-0">{formatExhibitPrice(exhibit.price, locale)}</p>
                  </div>
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
          <LogoMonochrome className="h-28 md:h-40 w-auto mb-6" />
          <p className="font-serif italic text-lg md:text-xl text-[#8B5E3C] mb-10 tracking-wide">{t.brand.motto}</p>
          <div className="text-xs text-gray-500 flex flex-col md:flex-row items-center gap-y-3 md:gap-x-6">
            <span>© {new Date().getFullYear()} Santese Art — Rocco Santese. {t.footer.rights}</span>
            <span className="hidden md:inline">•</span>
            <span>{t.footer.location}</span>
          </div>
        </div>
      </footer>

      {selectedExhibit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-8" onClick={closeExhibitModal}>
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeExhibitModal}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black transition-colors"
              aria-label={t.gallery.closeAria}
            >
              <span className="text-lg leading-none" aria-hidden>✕</span>
            </button>
            <div className="p-8 md:p-12 pt-14 md:pt-16 overflow-auto max-h-[92vh]">
              <div className="mb-8 pr-12">
                <div className="inline-block px-4 py-1 rounded-full bg-[#f5f0e6] text-[#8B5E3C] text-xs tracking-[3px] mb-4">{t.gallery.modalBadge}</div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <h3 className="font-serif text-4xl md:text-[42px] tracking-[-1.8px] leading-none">{getExhibitTitle(selectedExhibit)}</h3>
                  <div className="sm:text-right shrink-0">
                    <div className="uppercase tracking-[2.5px] text-[10px] text-gray-500 mb-1">{t.gallery.priceLabel}</div>
                    <p className="font-serif text-3xl md:text-4xl tracking-tight text-[#8B5E3C] leading-none">{formatExhibitPrice(selectedExhibit.price, locale)}</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImageEnlarged(true)}
                className="group mb-6 rounded-2xl overflow-hidden bg-gray-50 aspect-[16/10] relative w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2"
                aria-label={t.gallery.zoomImageAria}
              >
                <img
                  src={`/exhibition/${selectedExhibit.image}`}
                  alt={getExhibitTitle(selectedExhibit)}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </span>
              </button>
              <div className="mb-8">
                <span className="inline-block font-mono text-sm tracking-widest bg-gray-100 px-5 py-2 rounded-2xl text-gray-600">{selectedExhibit.dimensions}</span>
              </div>
              <div className="text-[15px] leading-[1.65]">
                <div className="uppercase tracking-[2.5px] text-xs text-gray-500 mb-4">{t.gallery.modalDescription}</div>
                <p className="text-gray-700">{getExhibitDescription(selectedExhibit, locale)}</p>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <button onClick={() => { closeExhibitModal(); setTimeout(() => scrollToSection("contatti"), 100); }} className="btn-primary flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px]">{t.gallery.modalCta}</button>
                <button onClick={closeExhibitModal} className="flex-1 py-4 rounded-2xl text-sm font-medium tracking-[2px] border border-gray-300 hover:bg-gray-50 transition-colors">{t.gallery.modalClose}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedExhibit && isImageEnlarged && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/92 p-4 md:p-8"
          onClick={() => setIsImageEnlarged(false)}
          role="dialog"
          aria-modal="true"
          aria-label={getExhibitTitle(selectedExhibit)}
        >
          <div className="relative inline-flex max-w-full max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsImageEnlarged(false)}
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors backdrop-blur-sm"
              aria-label={t.gallery.closeAria}
            >
              <span className="text-lg leading-none" aria-hidden>✕</span>
            </button>
            <img
              src={`/exhibition/${selectedExhibit.image}`}
              alt={getExhibitTitle(selectedExhibit)}
              className="max-w-full max-h-[92vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
