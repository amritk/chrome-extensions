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
        // Copy manifest.json to dist
        copyFileSync(
          resolve(__dirname, 'src/manifest.json'),
          resolve(__dirname, 'dist/manifest.json')
        );
        console.log('✓ Copied manifest.json to dist');

        // Create placeholder icons
        const distDir = resolve(__dirname, 'dist');
        mkdirSync(distDir, { recursive: true });

        // Note: In a real extension, you'd copy actual PNG files
        // For now, we'll create empty placeholder files
        const iconSizes = [16, 48, 128];
        iconSizes.forEach(size => {
          const iconPath = resolve(distDir, `icon${size}.png`);
          try {
            copyFileSync(
              resolve(__dirname, 'src/icon.png'),
              iconPath
            );
          } catch {
            // Icon doesn't exist, skip for now
            console.log(`⚠ Icon${size}.png not found, skipping...`);
          }
        });
      },
    },
  ],
});
