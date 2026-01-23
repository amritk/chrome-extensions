# Chrome Web Store Listing Content

## Extension Name
GitHub PR Test Hider

## Short Description (132 characters max)
Automatically mark test files as viewed in GitHub pull requests to reduce noise and focus on implementation code.

## Detailed Description

Save time reviewing GitHub pull requests by automatically marking test files as "viewed"!

**What it does:**
- Automatically marks test files as viewed when you open a GitHub PR
- Reduces visual clutter in PR file lists
- Helps you focus on implementation code changes
- Works with any test file pattern: `.test.`, `.spec.`, `Test.`, etc.

**Features:**
✓ Automatic detection of test files
✓ Works on all GitHub repositories
✓ Lightweight and fast
✓ No configuration needed
✓ Privacy-focused - no data collection
✓ Open source

**How it works:**
1. Install the extension
2. Navigate to any GitHub pull request
3. Test files are automatically marked as viewed
4. Focus on reviewing the actual implementation code!

**Supported file patterns:**
- `*.test.ts`, `*.test.tsx`, `*.test.js`, `*.test.jsx`
- `*.spec.ts`, `*.spec.js`
- Any file containing `.test.` or `.spec.`

**Privacy:**
This extension does NOT collect, store, or transmit any data. All processing happens locally in your browser. We don't use analytics, tracking, or external APIs.

**Open Source:**
View the source code and contribute:
https://github.com/yourusername/chrome-extensions

---

**Support:**
Found a bug or have a feature request? Please open an issue on GitHub!

## Category
**Primary:** Developer Tools
**Secondary:** Productivity

## Language
English

## Keywords (20 max)
- github
- pull request
- pr
- code review
- test files
- developer tools
- productivity
- hide tests
- viewed
- github extension
- code
- typescript
- testing
- spec
- automation

## Screenshots Needed

You'll need to provide:

### 1. Main Screenshot (1280x800 or 640x400)
**Title:** "Before and After"
**Description:** Show a GitHub PR with test files highlighted, then the same PR with test files marked as viewed

### 2. Screenshot 2 (1280x800 or 640x400)
**Title:** "Focus on What Matters"
**Description:** Show a clean PR view with only implementation files visible

### 3. Screenshot 3 (1280x800 or 640x400)
**Title:** "Works Automatically"
**Description:** Show the extension icon and a PR being loaded

### 4. Screenshot 4 (optional)
**Title:** "Multiple File Patterns"
**Description:** Show various test file patterns being detected

## Promotional Images Needed

### Small Tile (440x280)
- Extension icon
- Text: "GitHub PR Test Hider"
- Subtitle: "Hide Test Files"

### Marquee (1400x560)
- Hero image showing the extension in action
- Main text: "Focus on Code That Matters"
- Subtext: "Automatically hide test files in GitHub PRs"

## Justification for Permissions

**Host Permission: `https://github.com/*/*/pull/*`**

This permission is required to:
- Access GitHub pull request pages
- Read file names in the PR file list
- Interact with the "Not Viewed" buttons
- Monitor for dynamically loaded content

The extension ONLY runs on GitHub pull request pages and does not access any other websites.

## Single Purpose Description

This extension serves a single purpose: to automatically mark test files as "viewed" in GitHub pull requests, helping developers focus on reviewing implementation code by reducing visual clutter.

## Privacy Practices

**Data Collection:** None
- This extension does not collect, store, or transmit any user data
- No personal information is accessed
- No browsing history is recorded
- All processing happens locally in the browser

**Privacy Policy:** See PRIVACY.md

## Testing Instructions for Reviewers

1. Install the extension in Chrome
2. Navigate to any public GitHub repository
3. Open any pull request with test files (e.g., files ending in `.test.ts` or `.spec.js`)
4. Observe that test files are automatically marked as "viewed" (gray checkbox instead of orange)
5. Verify that non-test files remain unaffected

Example PR for testing:
https://github.com/facebook/react/pulls
(Open any PR with test file changes)

## Version History

### Version 1.0.0 (Initial Release)
- Automatic test file detection and hiding
- Support for multiple test file patterns
- MutationObserver for dynamic content
- Zero data collection
- Open source
