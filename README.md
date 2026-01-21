# Chrome Extensions Monorepo

A monorepo for building Chrome extensions with TypeScript, Vite, and modern tooling.

## Structure

- `extensions/` - Individual Chrome extensions
- `packages/` - Shared utilities and libraries

## Getting Started

```bash
# Install dependencies
pnpm install

# Development mode (all extensions)
pnpm dev

# Build all extensions
pnpm build

# Run tests
pnpm test
```

## Extensions

### GitHub PR Test Hider

Automatically marks test files as "viewed" in GitHub pull requests to reduce noise.

## Development

Each extension is a separate package with its own:
- TypeScript configuration
- Vite build setup
- Tests
- Manifest configuration

## Adding a New Extension

1. Create a new folder in `extensions/`
2. Add `package.json`, `tsconfig.json`, and `vite.config.ts`
3. Create your extension source files
4. Run `pnpm dev` to start development

## Tech Stack

- **TypeScript** - Type safety
- **Vite** - Fast builds and HMR
- **Vitest** - Unit testing
- **pnpm** - Package management
