import path from "path";
import fs from "fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";
import {
  FAVICON_FILES,
  getManifestCode,
  getBrowserConfigCode,
} from "./utils.js";

/**
 * Generate all favicon files and assets files from a source image.
 *
 * @param source - Path to the source image file
 * @param dest - Path to the destination folder
 * @param ext - Output image format (default: "png")
 */
export async function generateFavicons(
  source: string,
  dest: string,
  ext: "png" | "webp" | "jpg" | "avif" = "png",
): Promise<void> {
  if (!fs.existsSync(source)) {
    throw new Error(`The source image file (${source}) does not exist.`);
  }

  if (!fs.existsSync(dest)) {
    throw new Error(`The destination folder (${dest}) does not exist.`);
  }

  generateImageFiles(source, dest, ext);

  writeAssetFiles(dest, ext);
}

/**
 * Generate all favicon files from a source image.
 *
 * @param source - Path to the source image file
 * @param dest - Path to the destination folder
 * @param ext - Output image format (default: "png")
 */
export async function generateImageFiles(
  source: string,
  dest: string,
  ext: "png" | "webp" | "jpg" | "avif" = "png",
) {
  for (const file of FAVICON_FILES) {
    if (file.favicon === true) {
      const buffer = await sharp(source).resize(file.resolution).toBuffer();
      const ico = await pngToIco(buffer);
      fs.writeFileSync(`${dest}/${file.name}.ico`, ico);
    } else {
      await sharp(source)
        .resize(file.resolution)
        .toFile(`${dest}/${file.name}.${ext}`);
    }
  }
}

/**
 * Write manifest.json and browserconfig.xml files in destination folder.
 *
 * @param dest - Path to the destination folder
 * @param ext - Output image format (default: "png")
 */
export function writeAssetFiles(
  dest: string,
  ext: "png" | "webp" | "jpg" | "avif" = "png",
) {
  fs.writeFileSync(path.resolve(dest, "manifest.json"), getManifestCode(ext));
  fs.writeFileSync(
    path.resolve(dest, "browserconfig.xml"),
    getBrowserConfigCode(ext),
  );
}

export {
  FAVICON_FILES,
  parseFlags,
  getManifestCode,
  getBrowserConfigCode,
  HTML_CODE,
  SUPPORTED_FLAGS,
} from "./utils.js";
export type {
  EasyFaviconGeneratorFlags,
  EasyFaviconGeneratorFile,
} from "./types/config.js";
