# Privacy Policy for GitHub PR Test Hider

**Last Updated:** January 23, 2026

## Overview

GitHub PR Test Hider is a Chrome extension that automatically marks test files as viewed in GitHub pull requests. This privacy policy explains our data practices.

## Data Collection

**We do NOT collect, store, or transmit any user data.**

Specifically:
- No personal information is collected
- No browsing history is recorded
- No analytics or tracking is performed
- No data is sent to external servers
- No cookies are used

## Permissions

The extension requests the following permissions:

### Host Permissions
- `https://github.com/*/*/pull/*` - Required to run on GitHub pull request pages

This permission allows the extension to:
- Read the DOM structure of GitHub PR file lists
- Click the "Not Viewed" button on test files
- Monitor for dynamically loaded content

**All processing happens locally in your browser.** Nothing leaves your device.

## Data Processing

The extension:
1. Scans file names on GitHub PR pages for test file patterns (e.g., `.test.`, `.spec.`)
2. Automatically clicks the "Not Viewed" button for matching files
3. All operations occur locally within your browser

## Third-Party Services

This extension does NOT use any third-party services, analytics, or external APIs.

## Changes to Privacy Policy

We may update this privacy policy from time to time. Updates will be posted in this document with an updated "Last Updated" date.

## Contact

If you have questions about this privacy policy, please open an issue on our GitHub repository:
https://github.com/yourusername/chrome-extensions

## Open Source

This extension is open source. You can review the complete source code to verify our privacy claims:
https://github.com/yourusername/chrome-extensions/tree/main/extensions/github-pr-test-hider
