# Easy Favicon Generator

Generate all the favicon files and assets your website needs from a single source image. Inspired by [https://www.favicon-generator.org](https://www.favicon-generator.org).

## CLI

Works without installing just use `npx`:

```bash
npx easy-favicon-generator --source=<image> --dest=<folder> [--ext=<format>]
```

Or install globally:

```bash
npm install -g easy-favicon-generator
easy-favicon-generator --source=<image> --dest=<folder> [--ext=<format>]
```

### Options

```bash
easy-favicon-generator --source=<image> --dest=<folder> [--ext=<format>]
```

#### Options

| Flag     | Required | Description                                    | Default |
|----------|----------|------------------------------------------------|---------|
| `--source` | Yes      | Path to the source image file                  | -       |
| `--dest`   | Yes      | Path to the destination folder                 | -       |
| `--ext`    | No       | Output image format: `png`, `webp`, `jpg`, `avif` | `png`   |

#### Examples

```bash
# Generate PNG favicons (default)
easy-favicon-generator --source=./logo.png --dest=./public

# Generate WebP favicons
easy-favicon-generator --source=./logo.png --dest=./public --ext=webp
```

### npx / pnpm

No need to install globally:

```bash
npx easy-favicon-generator --source=./logo.png --dest=./public

pnpm easy-favicon-generator --source=./logo.png --dest=./public
```

---

## Programmatic Usage

```bash
npm install easy-favicon-generator
```

```ts
import { generateFavicons, generateImageFiles, writeAssetFiles } from 'easy-favicon-generator';

// Generate everything (images + assets): All favicon images and manifest.json + browserconfig.xml
await generateFavicons('./logo.png', './public');

// Generate only the image files (no manifest or browserconfig)
await generateImageFiles('./logo.png', './public', 'webp');

// Write only the asset files (manifest.json + browserconfig.xml)
writeAssetFiles('./public', 'png');
```

### Available Exports

| Export | Description |
|--------|-------------|
| `generateFavicons(source, dest, ext)` | Generate all favicon files and assets |
| `generateImageFiles(source, dest, ext)` | Generate only image files (no assets) |
| `writeAssetFiles(dest, ext)` | Write only `manifest.json` and `browserconfig.xml` |
| `getManifestCode(ext)` | Get the `manifest.json` content |
| `getBrowserConfigCode(ext)` | Get the `browserconfig.xml` content |
| `FAVICON_FILES` | List of all generated favicon definitions |
| `HTML_CODE` | Ready-to-use HTML `<link>` tags |

---

## Requirements

- Node.js ≥ 18
- Image source must exist before running
- Destination folder must exist before running
