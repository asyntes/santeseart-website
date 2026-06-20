import React from "react";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
  "aria-hidden": true,
};

function CarvingIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 24h14" />
      <path d="M8 24v-2" />
      <path d="M18 24v-2" />
      <path d="M6 22h14" />
      <path d="M8 18c2-1.5 4-1.5 6 0s4 1.5 6 0" />
      <path d="M9 14c1.5-1 3-1 4.5 0" />
      <path d="M22 8l6 6-4 4-6-6z" />
      <path d="M18 12l-2 2" />
      <circle cx="25" cy="7" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InlayIcon() {
  return (
    <svg {...iconProps}>
      <rect x="5" y="5" width="22" height="22" rx="1.5" />
      <path d="M5 16h22M16 5v22" />
      <path d="M5 5l11 11M16 5l11 11M5 16l11 11M16 16l11 11" />
      <circle cx="10.5" cy="10.5" r="2" />
      <circle cx="21.5" cy="10.5" r="2" />
      <circle cx="10.5" cy="21.5" r="2" />
      <circle cx="21.5" cy="21.5" r="2" />
    </svg>
  );
}

function RestorationIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 26V14l6-4 6 4v12" />
      <path d="M8 26h16" />
      <path d="M13 26v-6h6v6" />
      <path d="M12 18h8" />
      <path d="M14 14h4" />
      <path d="M22 10l3-3" />
      <path d="M22 10l-2 2" />
      <path d="M25 7l1.5 1.5" />
      <circle cx="24" cy="9" r="3.5" strokeDasharray="3 2" />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg {...iconProps}>
      <rect x="6" y="8" width="20" height="14" rx="1" />
      <path d="M6 14h20" />
      <path d="M6 18h20" />
      <path d="M14 8v6M18 8v6" />
      <path d="M8 22v4M24 22v4" />
      <path d="M6 26h20" />
      <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DoorsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 4h16v24H8z" />
      <path d="M16 4v24" />
      <rect x="10" y="8" width="4" height="6" rx="0.5" />
      <rect x="18" y="8" width="4" height="6" rx="0.5" />
      <rect x="10" y="18" width="4" height="6" rx="0.5" />
      <rect x="18" y="18" width="4" height="6" rx="0.5" />
      <circle cx="14.5" cy="16" r="0.75" fill="currentColor" stroke="none" />
      <path d="M5 28h22" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg {...iconProps}>
      <rect x="5" y="7" width="22" height="18" rx="1.5" />
      <path d="M9 11h8M9 15h12M9 19h6" />
      <circle cx="23" cy="11" r="2.5" />
      <path d="M23 8.5v5M20.5 11h5" />
      <path d="M21 19l3-3 3 3" />
    </svg>
  );
}

const icons = [
  CarvingIcon,
  InlayIcon,
  RestorationIcon,
  FurnitureIcon,
  DoorsIcon,
  DesignIcon,
] as const;

export function ServiceIcon({ index }: { index: number }) {
  const Icon = icons[index] ?? CarvingIcon;
  return (
    <div className="service-icon">
      <Icon />
    </div>
  );
}
