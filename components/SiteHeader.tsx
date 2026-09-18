"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMonochrome } from "@/components/LogoMonochrome";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useLocale } from "@/context/LocaleContext";
import { scrollToSection } from "@/lib/scroll";

const NAV_ITEMS = [
  { id: "chi-siamo", label: "about" },
  { id: "servizi", label: "services" },
  { id: "galleria", label: "gallery" },
  { id: "contatti", label: "contact" },
] as const;

export function SiteHeader() {
  const { t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const goHome = () => {
    closeMobileMenu();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  };

  const goToSection = (id: string) => {
    closeMobileMenu();
    if (isHome) {
      scrollToSection(id);
      return;
    }
    router.push(`/#${id}`);
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
    <nav className="site-nav fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="site-nav-inner max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button type="button" onClick={goHome} className="flex items-center cursor-pointer group bg-transparent border-0 p-0" aria-label="Santese Art">
          <LogoMonochrome className="site-nav-logo transition-transform group-hover:scale-[1.02]" />
        </button>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} type="button" onClick={() => goToSection(item.id)} className="nav-link">
                {t.nav[item.label]}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <LocaleSwitcher />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-1"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
            >
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
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="nav-link text-left py-3.5 px-1 border-b border-gray-100 last:border-none"
                >
                  {t.nav[item.label]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
