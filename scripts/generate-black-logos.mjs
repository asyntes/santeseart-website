import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FULL_LOGO_VIEWBOX_WIDTH, ROSE_VIEWBOX } from "./rose-constants.mjs";
import { renderRosePng } from "./render-rose.mjs";

export { ROSE_VIEWBOX } from "./rose-constants.mjs";

const FULL_LOGO_VIEWBOX_HEIGHT = 529;

async function renderFullLogoPng(root, outputWidth, renderWidth) {
  const fullSvg = readFileSync(join(root, "public", "logo-full-black.svg"));
  const density = Math.ceil((renderWidth * 72) / FULL_LOGO_VIEWBOX_WIDTH);
  const outputHeight = Math.round(
    (outputWidth * FULL_LOGO_VIEWBOX_HEIGHT) / FULL_LOGO_VIEWBOX_WIDTH,
  );

  return sharp(fullSvg, { density })
    .resize(outputWidth, outputHeight, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}

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
  width="${ROSE_VIEWBOX.width}" height="${ROSE_VIEWBOX.height}"
  viewBox="${ROSE_VIEWBOX.x} ${ROSE_VIEWBOX.y} ${ROSE_VIEWBOX.width} ${ROSE_VIEWBOX.height}" xml:space="preserve">
${toBlackFilter}
</svg>`;

  writeFileSync(join(root, "public", "logo-full-black.svg"), fullBlack);
  writeFileSync(join(root, "public", "icon-rose-black.svg"), roseBlack);

  const iconPng = await renderRosePng(root, 512, 512, 7200);
  writeFileSync(join(root, "public", "icon-rose-black.png"), iconPng);

  // Raster fallback for mobile zoom: SVG masks misalign on WebKit when pinch-zooming.
  const monochromePng = await renderFullLogoPng(root, 800, 4800);
  const monochromePng2x = await renderFullLogoPng(root, 1600, 7200);
  writeFileSync(join(root, "public", "logo-monochrome.png"), monochromePng);
  writeFileSync(join(root, "public", "logo-monochrome@2x.png"), monochromePng2x);
}

if (process.argv[1]?.endsWith("generate-black-logos.mjs")) {
  const { dirname, join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  await generateBlackLogos(root);
  console.log(
    "Generated logo-full-black.svg, icon-rose-black.svg, icon-rose-black.png, logo-monochrome.png and logo-monochrome@2x.png",
  );
}
