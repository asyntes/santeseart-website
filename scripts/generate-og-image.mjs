import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateBlackLogos } from "./generate-black-logos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ROSE_VIEWBOX_WIDTH = 240;
const ROSE_VIEWBOX_HEIGHT = 210;
const ROSE_HEIGHT = 500;
const ROSE_WIDTH = Math.round(ROSE_HEIGHT * (ROSE_VIEWBOX_WIDTH / ROSE_VIEWBOX_HEIGHT));
const SUPERSAMPLE = 6;

await generateBlackLogos(root);

const svg = readFileSync(join(root, "public", "icon-rose-black.svg"));
const renderWidth = ROSE_WIDTH * SUPERSAMPLE;
const renderHeight = ROSE_HEIGHT * SUPERSAMPLE;
const density = Math.ceil((renderHeight * 72) / ROSE_VIEWBOX_HEIGHT);

const rosePng = await sharp(svg, { density })
  .resize(renderWidth, renderHeight, {
    fit: "contain",
    kernel: sharp.kernel.lanczos3,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .resize(ROSE_WIDTH, ROSE_HEIGHT, { kernel: sharp.kernel.lanczos3 })
  .flatten({ background: "#ffffff" })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([{ input: rosePng, gravity: "center" }])
  .png({ compressionLevel: 6 })
  .toFile(join(root, "public", "og-image.png"));

console.log(
  `Generated public/og-image.png (${OG_WIDTH}x${OG_HEIGHT}, rose ${ROSE_WIDTH}x${ROSE_HEIGHT}px @ ${SUPERSAMPLE}x, density ${density})`,
);
