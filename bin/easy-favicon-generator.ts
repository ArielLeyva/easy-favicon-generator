#!/usr/bin/env node
import { generateFavicons, parseFlags } from "../src/index.js";

const config = parseFlags();

// Validate required flags
if (!config.source || !config.dest) {
  console.error("Usage: easy-favicon-generator --source=<image> --dest=<folder> [--ext=png|webp|jpg|avif]");
  process.exit(1);
}

try {
  await generateFavicons(config.source, config.dest, config.ext ?? "png");
  console.log("Favicons generated successfully!");
} catch (error) {
  console.error("Error:", (error as Error).message);
  process.exit(1);
}
