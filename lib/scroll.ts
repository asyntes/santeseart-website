export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const nav = document.querySelector<HTMLElement>(".site-nav");
  const offset = nav?.getBoundingClientRect().height ?? 80;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - bodyRect - offset;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
}
