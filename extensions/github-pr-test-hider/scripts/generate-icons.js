import { readFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure public directory exists
const publicDir = join(__dirname, '../public');
try {
  mkdirSync(publicDir, { recursive: true });
} catch (e) {
  // Directory exists
}

// Read SVG
const svgPath = join(__dirname, '../public/icon.svg');
const svg = readFileSync(svgPath);

// Generate PNG icons at required sizes
const sizes = [16, 48, 128];

async function generateIcons() {
  console.log('🎨 Generating extension icons...\n');

  for (const size of sizes) {
    const outputPath = join(publicDir, `icon${size}.png`);

    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${size}x${size} icon: icon${size}.png`);
  }

  console.log('\n✨ All icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
