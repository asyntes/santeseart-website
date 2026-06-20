import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateBlackLogos } from "./generate-black-logos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

await generateBlackLogos(root);

const svg = readFileSync(join(root, "public", "icon-rose-black.svg"));
const rosePng = await sharp(svg, { density: 400 })
  .resize(420, 420, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([{ input: rosePng, gravity: "center" }])
  .png()
  .toFile(join(root, "public", "og-image.png"));

console.log("Generated public/og-image.png (1200x630, black rose on white)");
