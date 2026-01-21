/**
 * GitHub PR Test Hider
 * Automatically marks test files as "viewed" in pull request file lists
 */

interface Config {
  /** File patterns to match (e.g., 'test.ts', '.spec.js') */
  patterns: string[];
  /** Selector for file header elements */
  headerSelector: string;
  /** Selector for the "Not Viewed" button */
  notViewedButtonSelector: string;
  /** Enable debug logging */
  debug: boolean;
}

const DEFAULT_CONFIG: Config = {
  patterns: ['test.ts', 'test.tsx', 'test.js', 'test.jsx', '.spec.', '.test.'],
  headerSelector: 'h3',
  notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
  debug: true,
};

/**
 * Logs debug messages if debug mode is enabled
 */
function log(message: string, ...args: unknown[]): void {
  if (DEFAULT_CONFIG.debug) {
    console.log(`[GitHub PR Test Hider] ${message}`, ...args);
  }
}

/**
 * Checks if a header element contains any of the configured patterns
 */
export function matchesTestPattern(
  element: HTMLElement,
  patterns: string[]
): boolean {
  const textContent = element.textContent?.trim() || '';
  return patterns.some((pattern) => textContent.includes(pattern));
}

/**
 * Safely clicks the "Not Viewed" button for a given header element
 */
export function markAsViewed(
  headerElement: HTMLElement,
  config: Config
): boolean {
  try {
    // Get the parent element's next sibling which contains the file content
    const parent = headerElement.parentElement;
    if (!parent) {
      log('No parent element found for header:', headerElement);
      return false;
    }

    const nextSibling = parent.nextSibling;
    if (!nextSibling || !(nextSibling instanceof HTMLElement)) {
      log('No valid next sibling found for parent:', parent);
      return false;
    }

    // Find and click the "Not Viewed" button
    const button = nextSibling.querySelector<HTMLButtonElement>(
      config.notViewedButtonSelector
    );

    if (button) {
      button.click();
      log('Marked as viewed:', headerElement.textContent?.trim());
      return true;
    } else {
      log('No "Not Viewed" button found for:', headerElement.textContent?.trim());
      return false;
    }
  } catch (error) {
    console.error('[GitHub PR Test Hider] Error marking file as viewed:', error);
    return false;
  }
}

/**
 * Processes all test file headers and marks them as viewed
 */
export function hideTestFiles(config: Config = DEFAULT_CONFIG): number {
  try {
    const headers = document.querySelectorAll<HTMLElement>(config.headerSelector);
    log(`Found ${headers.length} header elements`);

    let processedCount = 0;

    headers.forEach((header) => {
      if (matchesTestPattern(header, config.patterns)) {
        if (markAsViewed(header, config)) {
          processedCount++;
        }
      }
    });

    log(`Successfully processed ${processedCount} test files`);
    return processedCount;
  } catch (error) {
    console.error('[GitHub PR Test Hider] Error processing test files:', error);
    return 0;
  }
}

/**
 * Observes DOM changes and processes new test files
 */
export function observeDOMChanges(
  config: Config = DEFAULT_CONFIG
): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    let shouldProcess = false;

    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldProcess = true;
        break;
      }
    }

    if (shouldProcess) {
      log('DOM changed, processing new test files...');
      hideTestFiles(config);
    }
  });

  // Observe the file list container
  const fileListContainer = document.querySelector('#files');
  if (fileListContainer) {
    observer.observe(fileListContainer, {
      childList: true,
      subtree: true,
    });
    log('Started observing DOM changes');
  } else {
    log('File list container not found, skipping DOM observation');
  }

  return observer;
}

/**
 * Main execution
 */
function main(): void {
  log('Extension loaded');

  // Initial processing
  hideTestFiles();

  // Watch for dynamic content changes
  observeDOMChanges();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
