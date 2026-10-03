import {
  EasyFaviconGeneratorFile,
  EasyFaviconGeneratorFlags,
} from "./types/config.js";

export const SUPPORTED_FLAGS = ["source", "dest", "help", "ext"];

export const FAVICON_FILES: EasyFaviconGeneratorFile[] = [
  { name: "android-icon-36x36", resolution: 36 },
  { name: "android-icon-48x48", resolution: 48 },
  { name: "android-icon-72x72", resolution: 72 },
  { name: "android-icon-96x96", resolution: 96 },
  { name: "android-icon-144x144", resolution: 144 },
  { name: "android-icon-192x192", resolution: 192 },
  { name: "android-icon-512x512", resolution: 512 },
  { name: "apple-icon", resolution: 192 },
  { name: "apple-icon-57x57", resolution: 57 },
  { name: "apple-icon-60x60", resolution: 60 },
  { name: "apple-icon-72x72", resolution: 72 },
  { name: "apple-icon-76x76", resolution: 76 },
  { name: "apple-icon-114x114", resolution: 144 },
  { name: "apple-icon-120x120", resolution: 120 },
  { name: "apple-icon-144x144", resolution: 144 },
  { name: "apple-icon-152x152", resolution: 152 },
  { name: "apple-icon-180x180", resolution: 180 },
  { name: "apple-icon-precomposed", resolution: 192 },
  { name: "favicon", resolution: 16 },
  { name: "favicon-16x16", resolution: 16 },
  { name: "favicon-32x32", resolution: 32 },
  { name: "favicon-96x96", resolution: 96 },
  { name: "ms-icon-70x70", resolution: 70 },
  { name: "ms-icon-144x144", resolution: 144 },
  { name: "ms-icon-150x150", resolution: 150 },
  { name: "ms-icon-310x310", resolution: 310 },
];

export const HTML_CODE = `
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
`;

/**
 * Parse command line arguments into an object of flags
 * @returns An object containing the parsed flags from the command line arguments
 */
export function parseFlags(): EasyFaviconGeneratorFlags {
  const args = process.argv.slice(2);
  const flags: any = {};

  for (const arg of args) {
    if (arg.startsWith("--")) {
      // Get flag and value
      const [flag, value] = arg.replace(/^--/, "").split("=");

      if (SUPPORTED_FLAGS.includes(flag)) {
        flags[flag] = value;
      }
    }
  }
  return flags as EasyFaviconGeneratorFlags;
}

/**
 * Return the manifest.json content based on the files extension
 * @param ext Destination files extension
 * @returns {string} The manifest.json content
 */
export function getManifestCode(ext: string): string {
  return `{
 "name": "App",
 "icons": [
  {
   "src": "\/android-icon-36x36.${ext}",
   "sizes": "36x36",
   "type": "image\/${ext}",
   "density": "0.75"
  },
  {
   "src": "\/android-icon-48x48.${ext}",
   "sizes": "48x48",
   "type": "image\/${ext}",
   "density": "1.0"
  },
  {
   "src": "\/android-icon-72x72.${ext}",
   "sizes": "72x72",
   "type": "image\/${ext}",
   "density": "1.5"
  },
  {
   "src": "\/android-icon-96x96.${ext}",
   "sizes": "96x96",
   "type": "image\/${ext}",
   "density": "2.0"
  },
  {
   "src": "\/android-icon-144x144.${ext}",
   "sizes": "144x144",
   "type": "image\/${ext}",
   "density": "3.0"
  },
  {
   "src": "\/android-icon-192x192.${ext}",
   "sizes": "192x192",
   "type": "image\/${ext}",
   "density": "4.0"
  },
  {
    "src": "/android-icon-512x512.${ext}",
    "sizes": "512x512",
    "type": "image/${ext}",
    "density": "5.0"
  }
 ]
}`;
}

/**
 * Return the browserconfig.xml content based on the files extension
 * @param ext Destination files extension
 * @returns {string} The browserconfig.xml content
 */
export function getBrowserConfigCode(ext: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig><msapplication><tile><square70x70logo src="/ms-icon-70x70.${ext}"/><square150x150logo src="/ms-icon-150x150.${ext}"/><square310x310logo src="/ms-icon-310x310.${ext}"/></tile></msapplication></browserconfig>`;
}
