import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateBlackLogos } from "./generate-black-logos.mjs";
import { ROSE_VIEWBOX } from "./rose-constants.mjs";
import { renderRosePng } from "./render-rose.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ROSE_HEIGHT = 400;
const ROSE_WIDTH = Math.round(
  ROSE_HEIGHT * (ROSE_VIEWBOX.width / ROSE_VIEWBOX.height),
);
const RENDER_WIDTH = 7200;

await generateBlackLogos(root);

const rosePng = await renderRosePng(root, ROSE_WIDTH, ROSE_HEIGHT, RENDER_WIDTH);

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
  `Generated public/og-image.png (${OG_WIDTH}x${OG_HEIGHT}, rose ${ROSE_WIDTH}x${ROSE_HEIGHT}px, full render ${RENDER_WIDTH}px wide)`,
);
