import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  FULL_LOGO_VIEWBOX_WIDTH,
  ROSE_VIEWBOX,
} from "./rose-constants.mjs";

/**
 * Rasterize the full logo at high resolution, then crop the rose region.
 * Cropped SVGs via librsvg look soft; a full render + extract stays sharp.
 */
export async function renderRosePng(
  root,
  outputWidth,
  outputHeight,
  renderWidth = 7200,
) {
  const fullSvg = readFileSync(join(root, "public", "logo-full-black.svg"));
  const density = Math.ceil((renderWidth * 72) / FULL_LOGO_VIEWBOX_WIDTH);

  const fullPng = await sharp(fullSvg, { density })
    .png()
    .toBuffer();

  const meta = await sharp(fullPng).metadata();
  const scale = meta.width / FULL_LOGO_VIEWBOX_WIDTH;

  return sharp(fullPng)
    .extract({
      left: Math.round(ROSE_VIEWBOX.x * scale),
      top: Math.round(ROSE_VIEWBOX.y * scale),
      width: Math.round(ROSE_VIEWBOX.width * scale),
      height: Math.round(ROSE_VIEWBOX.height * scale),
    })
    .resize(outputWidth, outputHeight, {
      kernel: sharp.kernel.lanczos3,
    })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
}
