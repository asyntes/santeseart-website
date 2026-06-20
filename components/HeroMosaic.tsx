"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type ExhibitLike = {
  image: string;
  titleIt: string;
  titleEn: string;
};

const ROTATION_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 600;

function getAlt(exhibits: ExhibitLike[], image: string, locale: Locale) {
  const exhibit = exhibits.find((item) => item.image === image);
  return exhibit ? (locale === "it" ? exhibit.titleIt : exhibit.titleEn) : image;
}

function pickReplacement(current: string[], cellIndex: number, pool: string[]): string {
  const used = new Set(current.filter((_, i) => i !== cellIndex));
  const available = pool.filter((img) => !used.has(img));
  const options = available.length > 0 ? available : pool.filter((img) => img !== current[cellIndex]);
  return options[Math.floor(Math.random() * options.length)];
}

interface HeroMosaicProps {
  initialImages: string[];
  imagePool: string[];
  exhibits: ExhibitLike[];
  locale: Locale;
}

export function HeroMosaic({ initialImages, imagePool, exhibits, locale }: HeroMosaicProps) {
  const [images, setImages] = useState(initialImages);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      const current = imagesRef.current;
      const cellIndex = Math.floor(Math.random() * current.length);
      const nextImage = pickReplacement(current, cellIndex, imagePool);
      if (nextImage === current[cellIndex]) return;

      setImages((prev) => {
        const next = [...prev];
        next[cellIndex] = nextImage;
        return next;
      });
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [imagePool]);

  return (
    <div className="hero-mosaic">
      {images.map((image, index) => (
        <MosaicCell
          key={index}
          image={image}
          alt={getAlt(exhibits, image, locale)}
          index={index}
          eager={index < 2}
        />
      ))}
    </div>
  );
}

function MosaicCell({
  image,
  alt,
  index,
  eager,
}: {
  image: string;
  alt: string;
  index: number;
  eager: boolean;
}) {
  const [src, setSrc] = useState(image);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (image === src) return;
    setVisible(false);
    const timer = setTimeout(() => {
      setSrc(image);
      setVisible(true);
    }, FADE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [image, src]);

  return (
    <div className={`hero-mosaic-cell hero-mosaic-cell-${index + 1}`}>
      <img
        src={`/exhibition/${src}`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={visible ? undefined : "hero-mosaic-fade-out"}
      />
    </div>
  );
}
