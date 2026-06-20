import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateBlackLogos } from "./generate-black-logos.mjs";
import { ROSE_VIEWBOX } from "./rose-constants.mjs";
import { renderRosePng } from "./render-rose.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** Standard OG aspect ratio — within all platform limits (not oversized). */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Rose size on the OG canvas (user-approved). */
const ROSE_HEIGHT = 400;
const ROSE_WIDTH = Math.round(
  ROSE_HEIGHT * (ROSE_VIEWBOX.width / ROSE_VIEWBOX.height),
);

/** Internal SVG raster width before crop — not the delivered OG size. */
const RENDER_WIDTH = 7200;

await generateBlackLogos(root);

const rosePng = await renderRosePng(root, ROSE_WIDTH, ROSE_HEIGHT, RENDER_WIDTH);

const ogBuffer = await sharp({
  create: {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([{ input: rosePng, gravity: "center" }])
  .jpeg({
    quality: 92,
    mozjpeg: true,
    chromaSubsampling: "4:4:4",
  })
  .toBuffer();

const outPath = join(root, "public", "og-image.jpg");
await sharp(ogBuffer).toFile(outPath);

const meta = await sharp(ogBuffer).metadata();
const fileSizeKB = Math.round(ogBuffer.length / 1024);

console.log(
  `Generated public/og-image.jpg (${meta.width}x${meta.height}, rose ${ROSE_WIDTH}x${ROSE_HEIGHT}px, ${fileSizeKB} KB)`,
);
