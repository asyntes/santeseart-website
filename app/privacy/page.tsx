"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLocale } from "@/context/LocaleContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/site";

export default function PrivacyPage() {
  const { t } = useLocale();
  const privacy = t.privacy;

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden flex flex-col">
      <SiteHeader />
      <main className="legal-page flex-1 w-full">
        <article className="max-w-3xl mx-auto px-6 pb-20">
          <div className="uppercase text-xs tracking-[3px] text-gray-500 mb-3">{privacy.eyebrow}</div>
          <h1 className="font-serif text-[clamp(2.25rem,7vw,3.5rem)] tracking-[-1.5px] leading-none mb-4">
            {privacy.title}
          </h1>
          <p className="text-sm text-gray-400 mb-8">{privacy.updated}</p>
          <p className="text-lg leading-relaxed text-gray-600 mb-12">{privacy.intro}</p>

          <section className="legal-section">
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">{privacy.controllerTitle}</h2>
            <p className="text-[15px] leading-[1.7] text-gray-700 mb-4">{privacy.controllerBody}</p>
            <p className="text-[15px] leading-[1.7] text-gray-700">
              {privacy.controllerContactBefore}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-black underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              {" · "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-black underline underline-offset-4">
                {CONTACT_PHONE}
              </a>
              {privacy.controllerContactAfter}
            </p>
          </section>

          {privacy.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="legal-section"
            >
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.7] text-gray-700 mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="mt-14 text-sm text-gray-500">
            <Link href="/" className="text-black underline underline-offset-4 hover:no-underline">
              {privacy.backHome}
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
