# Screenshot and Promotional Image Guide

This guide helps you create professional screenshots and promotional images for the Chrome Web Store.

## Required Assets Checklist

- [ ] 1-5 screenshots (1280x800 or 640x400 PNG/JPEG)
- [ ] Small tile promotional image (440x280 PNG)
- [ ] Marquee promotional image (1400x560 PNG) - Optional but recommended

## Screenshot Ideas

### Screenshot 1: Before & After (Required)
**Purpose:** Show the problem and solution

**Content:**
- Split-screen or side-by-side comparison
- LEFT: GitHub PR with unviewed test files (orange dots)
- RIGHT: Same PR with test files marked as viewed (gray checks)
- Add annotation arrows or labels

**How to create:**
1. Open a GitHub PR with test files
2. Disable the extension
3. Take screenshot of the file list
4. Enable the extension
5. Refresh the page
6. Take screenshot of the file list with tests hidden
7. Combine in an image editor

### Screenshot 2: Extension in Action (Recommended)
**Purpose:** Show the extension working

**Content:**
- Full GitHub PR page view
- Highlight test files with checkmarks
- Show extension icon in toolbar
- Add text overlay: "Automatically marks test files as viewed"

### Screenshot 3: File Pattern Examples (Recommended)
**Purpose:** Show variety of supported patterns

**Content:**
- List of different test file names being detected:
  - `Button.test.tsx` ✓
  - `utils.spec.js` ✓
  - `helpers.test.ts` ✓
  - `integration.spec.tsx` ✓
- Regular files shown without checkmarks:
  - `Button.tsx`
  - `utils.js`

### Screenshot 4: Clean Review Experience (Optional)
**Purpose:** Show the benefit

**Content:**
- GitHub PR with all test files collapsed/viewed
- Only implementation files visible and expanded
- Text: "Focus on what matters"

## Screenshot Dimensions

**Recommended:** 1280x800 pixels (16:10 aspect ratio)
**Alternative:** 640x400 pixels (same ratio, smaller)

**Important:**
- Minimum width: 640px
- Maximum width: 1280px
- Must all be the same size
- PNG or JPEG format
- Max 5MB per file

## Tools for Creating Screenshots

### Free Online Tools:
1. **Screely** (https://screely.com)
   - Add browser chrome to screenshots
   - Professional looking backgrounds
   - No signup required

2. **Screenshot.rocks** (https://screenshot.rocks)
   - Beautiful mockups
   - Multiple device frames
   - Free tier available

3. **Canva** (https://canva.com)
   - Professional templates
   - Easy annotations
   - Free account available

### Desktop Tools:
1. **Figma** (Free)
   - Professional design tool
   - Great for annotations and layouts
   - Export at exact dimensions

2. **GIMP** (Free)
   - Open-source image editor
   - Crop and annotate
   - Cross-platform

3. **Chrome DevTools**
   - Built-in screenshot tool
   - Device toolbar for consistent sizing
   - F12 → Ctrl+Shift+P → "Capture screenshot"

## Promotional Images

### Small Tile (440x280)

**Design elements:**
- Extension icon (centered or left)
- Extension name: "GitHub PR Test Hider"
- Tagline: "Hide Test Files Automatically"
- Simple, clean design
- Brand colors: Blue (#2563eb) and white

**Template idea:**
```
┌─────────────────────┐
│                     │
│   [ICON]            │
│                     │
│  GitHub PR Test     │
│  Hider              │
│                     │
│  Hide test files    │
│  automatically      │
└─────────────────────┘
```

### Marquee (1400x560) - Optional

**Design elements:**
- Hero image showing extension in use
- Large headline: "Focus on Code That Matters"
- Subheadline: "Automatically hide test files in GitHub PRs"
- Extension icon
- Call to action: "Install Now"
- Professional gradient or brand colors

**Template idea:**
```
┌────────────────────────────────────────┐
│                                        │
│  Focus on Code That Matters            │
│  Automatically hide test files in PRs  │
│                                        │
│  [Screenshot preview]    [ICON]        │
│                                        │
└────────────────────────────────────────┘
```

## Quick Start with Figma

1. **Create a new Figma file**
   - Sign up at figma.com (free)

2. **Set up frames:**
   - Screenshot: 1280x800
   - Small tile: 440x280
   - Marquee: 1400x560

3. **Import screenshots:**
   - Drag and drop your GitHub PR screenshots

4. **Add annotations:**
   - Use text tool (T) for labels
   - Use rectangle tool (R) for highlights
   - Add arrows with the pen tool (P)

5. **Export:**
   - Select frame
   - Right sidebar → Export
   - Format: PNG
   - Resolution: 2x for retina displays

## Tips for Professional Screenshots

### Do:
✓ Use high-resolution displays (retina if possible)
✓ Keep browser UI clean (hide bookmarks bar)
✓ Use consistent sizing across all screenshots
✓ Add helpful annotations and labels
✓ Show real-world usage
✓ Use readable fonts
✓ Keep it simple and focused

### Don't:
✗ Include personal information
✗ Show unrelated browser tabs
✗ Use low-quality/blurry images
✗ Include copyrighted content
✗ Make false claims
✗ Clutter with too much text

## Example Screenshot Workflow

1. **Prepare GitHub PR:**
   - Find a PR with multiple test files
   - Or create a test PR in your own repo

2. **Capture "Before" state:**
   - Disable extension
   - Open PR files tab
   - Take full-page screenshot
   - Save as `before.png`

3. **Capture "After" state:**
   - Enable extension
   - Refresh page
   - Wait for test files to be marked viewed
   - Take screenshot
   - Save as `after.png`

4. **Create comparison:**
   - Open both in image editor
   - Create 1280x800 canvas
   - Place images side by side
   - Add labels "Before" and "After"
   - Add arrows pointing to key features
   - Export as PNG

## Hosting Promotional Images

Once created, store them in:
```
extensions/github-pr-test-hider/
└── assets/
    ├── screenshots/
    │   ├── screenshot-1.png
    │   ├── screenshot-2.png
    │   ├── screenshot-3.png
    │   └── screenshot-4.png
    └── promo/
        ├── tile-440x280.png
        └── marquee-1400x560.png
```

Add to .gitignore if files are too large (>1MB):
```
assets/screenshots/*.png
assets/promo/*.png
```

## Resources

**Free Design Tools:**
- Figma: https://figma.com
- Canva: https://canva.com
- GIMP: https://gimp.org

**Screenshot Tools:**
- Screely: https://screely.com
- Screenshot.rocks: https://screenshot.rocks
- Browserframe: https://browserframe.com

**Stock Photos (if needed):**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com

**Icon Resources:**
- Heroicons: https://heroicons.com
- Feather Icons: https://feathericons.com

## Need Help?

If you're not comfortable creating these assets:
1. Hire a designer on Fiverr ($5-20 for screenshot design)
2. Use screenshot tools with templates
3. Ask in the repo discussions for help
4. Start with simple screenshots - you can improve later!

Remember: **You can always update your store listing assets after publishing!**
