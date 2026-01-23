# Publishing Guide for GitHub PR Test Hider

This guide walks you through publishing your Chrome extension to the Chrome Web Store.

## Prerequisites ✅

- [x] Extension icons (16x16, 48x48, 128x128) - **DONE**
- [x] Complete manifest.json - **DONE**
- [x] Privacy policy - **DONE**
- [x] Store listing content - **DONE**
- [ ] Screenshots (4 recommended, 1280x800 or 640x400)
- [ ] Promotional images (small tile 440x280, marquee 1400x560)
- [ ] Google account for Chrome Web Store Developer
- [ ] $5 USD one-time developer registration fee

## Step 1: Create Screenshots

You need to create screenshots showing your extension in action.

### Required Screenshots:

1. **Before/After comparison**
   - Open a GitHub PR with test files
   - Take screenshot BEFORE extension is active
   - Take screenshot AFTER with test files marked as viewed

2. **Extension in action**
   - Show the extension automatically working
   - Highlight the "viewed" checkmarks on test files

### Tools for Screenshots:
- **Chrome DevTools**: Use device toolbar for consistent sizing
- **Figma/Canva**: Create professional screenshots with annotations
- **Online tools**: screenshot.guru, screely.com

### Screenshot Dimensions:
- **Recommended:** 1280x800 pixels
- **Alternative:** 640x400 pixels
- **Format:** PNG or JPEG
- **Max file size:** 5MB each

## Step 2: Create Promotional Images (Optional but Recommended)

### Small Tile (440x280)
- Simple design with extension icon
- Text: "GitHub PR Test Hider"
- Background color matching your icon

### Marquee (1400x560)
- Hero banner for the store listing
- Show the extension's main benefit
- Professional design with screenshots

**Tools:**
- Figma (free)
- Canva (free templates)
- Adobe Express

## Step 3: Register as Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the **$5 one-time registration fee**
4. Accept the developer agreement
5. Complete your developer profile

## Step 4: Prepare the Extension Package

1. **Build the extension:**
   ```bash
   cd extensions/github-pr-test-hider
   pnpm build
   ```

2. **Verify the dist folder contains:**
   ```
   dist/
   ├── manifest.json
   ├── content.js
   ├── content.js.map
   ├── icon16.png
   ├── icon48.png
   └── icon128.png
   ```

3. **Create a ZIP file:**
   ```bash
   cd dist
   zip -r ../github-pr-test-hider-v1.0.0.zip .
   ```

   Or use the GUI:
   - Right-click the `dist` folder
   - Select "Compress" or "Send to > Compressed folder"

## Step 5: Update Manifest Metadata

Before publishing, update these fields in `src/manifest.json`:

```json
{
  "author": "Your Name or Company",
  "homepage_url": "https://github.com/yourusername/chrome-extensions"
}
```

## Step 6: Submit to Chrome Web Store

1. **Go to the Developer Dashboard:**
   https://chrome.google.com/webstore/devconsole

2. **Click "New Item"**

3. **Upload your ZIP file:**
   - Upload `github-pr-test-hider-v1.0.0.zip`
   - Wait for the upload to complete

4. **Fill out the Store Listing:**

   Use the content from `STORE_LISTING.md`:

   - **Product name:** GitHub PR Test Hider
   - **Summary:** (Copy from STORE_LISTING.md)
   - **Description:** (Copy detailed description)
   - **Category:** Developer Tools
   - **Language:** English
   - **Icon:** Upload icon128.png
   - **Screenshots:** Upload your 4 screenshots
   - **Promotional images:** Upload small tile and marquee

5. **Privacy:**

   - **Privacy policy:** Paste URL to hosted PRIVACY.md or copy text
   - **Permissions justification:** (Copy from STORE_LISTING.md)
   - **Single purpose:** (Copy from STORE_LISTING.md)

6. **Distribution:**

   - **Visibility:** Public
   - **Countries:** All countries (or select specific ones)
   - **Pricing:** Free

7. **Submit for Review:**
   - Review all information
   - Click "Submit for review"
   - Wait for Google's review (typically 1-3 business days)

## Step 7: Host Your Privacy Policy (Required)

You have several options:

### Option A: GitHub Pages (Free, Recommended)
1. Create `docs/privacy.html` in your repo
2. Enable GitHub Pages in repo settings
3. Privacy policy URL: `https://yourusername.github.io/chrome-extensions/privacy.html`

### Option B: GitHub Raw
- Direct link to PRIVACY.md
- URL: `https://raw.githubusercontent.com/yourusername/chrome-extensions/main/extensions/github-pr-test-hider/PRIVACY.md`

### Option C: Your Own Website
- Host PRIVACY.md on your personal or company website
- Must be publicly accessible

## Step 8: Review Process

**What Google Reviews:**
- Extension functionality
- Privacy policy compliance
- Permissions usage
- Code quality and security
- Compliance with [Chrome Web Store policies](https://developer.chrome.com/docs/webstore/program-policies/)

**Timeline:**
- Initial review: 1-3 business days
- If rejected: Fix issues and resubmit
- Updates: Faster review (usually < 24 hours)

**Common Rejection Reasons:**
- Missing or inadequate privacy policy
- Excessive permissions not justified
- Misleading description or screenshots
- Code that violates policies

## Step 9: After Approval

Once approved:

1. **Your extension is live!** 🎉
2. **Share the link:**
   - URL will be: `https://chrome.google.com/webstore/detail/[extension-id]`
3. **Update your README** with the Chrome Web Store badge
4. **Monitor reviews** and respond to users
5. **Track analytics** in the developer dashboard

## Updating Your Extension

When you make changes:

1. **Update version in manifest.json:**
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Build and zip:**
   ```bash
   pnpm build
   cd dist
   zip -r ../github-pr-test-hider-v1.0.1.zip .
   ```

3. **Upload to Developer Dashboard:**
   - Go to your extension's page
   - Click "Upload new package"
   - Upload the new ZIP
   - Updates are reviewed faster (usually < 24 hours)

## Testing Before Publishing

**Test locally:**
1. Build the extension: `pnpm build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder
6. Test on real GitHub PRs

**Test checklist:**
- [ ] Extension loads without errors
- [ ] Works on public GitHub PRs
- [ ] Works on private GitHub PRs (if you have access)
- [ ] Test files are marked as viewed
- [ ] Non-test files are NOT affected
- [ ] No console errors
- [ ] Icon appears in toolbar
- [ ] Tooltip shows correct text

## Resources

- **Chrome Web Store Developer Dashboard:** https://chrome.google.com/webstore/devconsole
- **Developer Documentation:** https://developer.chrome.com/docs/webstore/
- **Program Policies:** https://developer.chrome.com/docs/webstore/program-policies/
- **Best Practices:** https://developer.chrome.com/docs/webstore/best_practices/

## Troubleshooting

### "Package is invalid"
- Check manifest.json syntax
- Ensure all referenced files exist in dist/
- Verify icon files are valid PNGs

### "Privacy policy required"
- Add a publicly accessible privacy policy URL
- Include data collection practices

### "Permissions need justification"
- In the dashboard, explain why each permission is needed
- Be specific and detailed

### "Single purpose violation"
- Ensure extension does ONE thing well
- Don't bundle multiple unrelated features

## Support

If you need help:
1. Check Chrome Web Store documentation
2. Visit Chrome Extension Developer Forum
3. Open an issue in this repository

---

**Ready to publish?** Follow the steps above and good luck! 🚀
