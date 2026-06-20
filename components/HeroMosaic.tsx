"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type ExhibitLike = {
  image: string;
  titleIt: string;
  titleEn: string;
};

const ROTATION_INTERVAL_MS = 5000;

function getAlt(exhibits: ExhibitLike[], image: string, locale: Locale) {
  const exhibit = exhibits.find((item) => item.image === image);
  return exhibit ? (locale === "it" ? exhibit.titleIt : exhibit.titleEn) : image;
}

function nextImageInPool(
  pool: string[],
  used: Set<string>,
  current: string,
  poolIndex: number,
): { image: string; nextIndex: number } {
  if (pool.length === 0) return { image: current, nextIndex: poolIndex };

  for (let i = 0; i < pool.length; i++) {
    const index = (poolIndex + i) % pool.length;
    const candidate = pool[index];
    if (!used.has(candidate) && candidate !== current) {
      return { image: candidate, nextIndex: index + 1 };
    }
  }

  for (let i = 0; i < pool.length; i++) {
    const index = (poolIndex + i) % pool.length;
    const candidate = pool[index];
    if (candidate !== current) {
      return { image: candidate, nextIndex: index + 1 };
    }
  }

  return { image: current, nextIndex: poolIndex + 1 };
}

interface HeroMosaicProps {
  initialImages: string[];
  imagePool: string[];
  exhibits: ExhibitLike[];
  locale: Locale;
}

export function HeroMosaic({ initialImages, imagePool, exhibits, locale }: HeroMosaicProps) {
  const [images, setImages] = useState(initialImages);
  const poolRef = useRef(imagePool);
  const poolIndexRef = useRef(0);
  const cellIndexRef = useRef(0);

  useEffect(() => {
    poolRef.current = imagePool;
  }, [imagePool]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      const pool = poolRef.current;
      if (pool.length === 0) return;

      setImages((prev) => {
        const cell = cellIndexRef.current;
        const used = new Set(prev.filter((_, i) => i !== cell));
        const { image, nextIndex } = nextImageInPool(
          pool,
          used,
          prev[cell],
          poolIndexRef.current,
        );

        poolIndexRef.current = nextIndex;
        cellIndexRef.current = (cell + 1) % prev.length;

        if (image === prev[cell]) return prev;

        const next = [...prev];
        next[cell] = image;
        return next;
      });
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

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
  return (
    <div className={`hero-mosaic-cell hero-mosaic-cell-${index + 1}`}>
      <img
        key={image}
        src={`/exhibition/${image}`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="hero-mosaic-cell-img"
      />
    </div>
  );
}
