import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

export async function generateBlackLogos(root) {
  const logo = readFileSync(join(root, "public", "logo_santeseart.svg"), "utf8");

  const inner = logo
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "");

  const toBlackFilter = `<defs>
    <filter id="to-black" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    </filter>
  </defs>
  <g filter="url(#to-black)">${inner}</g>`;

  const fullBlack = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 1600 529" xml:space="preserve">
${toBlackFilter}
</svg>`;

  const roseBlack = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="680 15 240 210" xml:space="preserve">
${toBlackFilter}
</svg>`;

  writeFileSync(join(root, "public", "logo-full-black.svg"), fullBlack);
  writeFileSync(join(root, "public", "icon-rose-black.svg"), roseBlack);

  await sharp(Buffer.from(roseBlack), { density: 400 })
    .resize(512, 512, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(join(root, "public", "icon-rose-black.png"));
}

if (process.argv[1]?.endsWith("generate-black-logos.mjs")) {
  const { dirname, join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  await generateBlackLogos(root);
  console.log("Generated logo-full-black.svg, icon-rose-black.svg and icon-rose-black.png");
}
