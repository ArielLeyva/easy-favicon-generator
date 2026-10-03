export interface EasyFaviconGeneratorFlags {
  source: string;
  dest: string;
  ext?: "png" | "webp" | "jpg" | "avif";
}

export interface EasyFaviconGeneratorFile {
  resolution: number;
  name: string;
  favicon?: boolean;
}
