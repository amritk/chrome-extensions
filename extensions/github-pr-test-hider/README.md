# GitHub PR Test Hider

A Chrome extension that automatically marks test files as "viewed" in GitHub pull requests to reduce noise and help you focus on the important code changes.

## Features

- 🎯 Automatically detects test files based on configurable patterns
- ✅ Marks test files as "viewed" in GitHub PR file lists
- 🔄 Watches for dynamic content changes (lazy-loaded files)
- 🛡️ Safe error handling and null checks
- 📝 TypeScript for type safety
- 🧪 Comprehensive test coverage

## Default Test File Patterns

The extension matches files containing:
- `test.ts` / `test.tsx`
- `test.js` / `test.jsx`
- `.spec.` (e.g., `.spec.ts`, `.spec.js`)
- `.test.` (e.g., `.test.ts`, `.test.js`)

## Development

```bash
# Install dependencies
pnpm install

# Development mode (watches for changes)
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type check
pnpm type-check
```

## Installation

1. Build the extension: `pnpm build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `dist` folder from this extension directory

## Usage

1. Navigate to any GitHub pull request
2. The extension will automatically mark test files as "viewed"
3. Files are processed on page load and when new files are dynamically loaded

## Configuration

To customize which files are hidden, edit the `DEFAULT_CONFIG` in `src/content.ts`:

```typescript
const DEFAULT_CONFIG: Config = {
  patterns: ['test.ts', 'test.tsx', '.spec.', '.test.'],
  headerSelector: 'h3',
  notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
  debug: true,
};
```

## How It Works

1. Scans all file headers (`<h3>` elements) in the PR
2. Checks if the filename matches any test patterns
3. For matching files, finds the "Not Viewed" button
4. Clicks the button to mark the file as viewed
5. Continues to watch for new files added to the page

## Architecture

- **content.ts** - Main content script with core logic
- **content.test.ts** - Comprehensive unit tests (17 tests, 100% coverage)
- **manifest.json** - Chrome extension configuration
- **vite.config.ts** - Build configuration
- **vitest.config.ts** - Test configuration

## Publishing to Chrome Web Store

Ready to publish your extension? See our comprehensive guides:

- **[PUBLISHING.md](./PUBLISHING.md)** - Complete step-by-step publishing guide
- **[STORE_LISTING.md](./STORE_LISTING.md)** - Pre-written store listing content
- **[SCREENSHOTS.md](./SCREENSHOTS.md)** - How to create screenshots and promo images
- **[PRIVACY.md](./PRIVACY.md)** - Privacy policy (required for submission)

### Quick Publishing Checklist

- [x] Extension code complete
- [x] Icons generated (16x16, 48x48, 128x128)
- [x] Tests passing (17/17)
- [x] Privacy policy written
- [x] Store listing content prepared
- [ ] Create 1-4 screenshots
- [ ] Create promotional images (optional)
- [ ] Register Chrome Web Store developer account ($5)
- [ ] Update manifest with your author info
- [ ] Build and zip extension
- [ ] Submit for review

See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

## Tech Stack

- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast builds with hot module replacement
- **Vitest** - Unit testing with Happy DOM
- **Sharp** - Automated icon generation from SVG

## Privacy

This extension:
- ✅ Does NOT collect any data
- ✅ Does NOT track users
- ✅ Does NOT use analytics
- ✅ Runs entirely in your browser
- ✅ Only accesses GitHub PR pages

See [PRIVACY.md](./PRIVACY.md) for full privacy policy.
