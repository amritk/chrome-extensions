import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
      },
    },
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      name: 'copy-manifest',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'src/manifest.json'),
          resolve(__dirname, 'dist/manifest.json')
        );
        console.log('Copied manifest.json to dist');

        const distDir = resolve(__dirname, 'dist');
        mkdirSync(distDir, { recursive: true });

        const iconSizes = [16, 48, 128];
        iconSizes.forEach(size => {
          const sourcePath = resolve(__dirname, `public/icon${size}.png`);
          const iconPath = resolve(distDir, `icon${size}.png`);
          try {
            copyFileSync(sourcePath, iconPath);
            console.log(`Copied icon${size}.png to dist`);
          } catch (error) {
            console.log(`Icon${size}.png not found, skipping...`);
          }
        });
      },
    },
  ],
});
