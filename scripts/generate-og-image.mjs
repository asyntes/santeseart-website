import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateBlackLogos } from "./generate-black-logos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

await generateBlackLogos(root);

const svg = readFileSync(join(root, "public", "logo-full-black.svg"));
const logoPng = await sharp(svg, { density: 300 })
  .resize(1000, null, { fit: "inside" })
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
  .composite([{ input: logoPng, gravity: "center" }])
  .png()
  .toFile(join(root, "public", "og-image.png"));

console.log("Generated public/og-image.png (1200x630, black logo on white)");
