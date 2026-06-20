import React from "react";

/** Touch / mobile: raster PNG avoids WebKit SVG mask misalignment on pinch-zoom. */
const MOBILE_LOGO_MEDIA =
  "(max-width: 767px), ((hover: none) and (pointer: coarse))";

type LogoMonochromeProps = {
  className?: string;
};

export function LogoMonochrome({ className }: LogoMonochromeProps) {
  return (
    <picture>
      <source
        media={MOBILE_LOGO_MEDIA}
        srcSet="/logo-monochrome.png 800w, /logo-monochrome@2x.png 1600w"
      />
      <img
        src="/logo-full-black.svg"
        alt="Santese Art"
        className={className}
        decoding="async"
      />
    </picture>
  );
}
