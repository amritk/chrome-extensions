/**
 * Gmail Delete Sender
 *
 * Adds a "Delete all from <sender>" option to Gmail's right-click context menu.
 * When clicked, it searches for all emails from that sender, selects them all,
 * and deletes them — automating a multi-step flow into a single click.
 *
 * Flow:
 * 1. User right-clicks an email in the Gmail inbox
 * 2. Gmail shows its context menu; we inject "Delete all from <sender>"
 * 3. User clicks our option → confirmation dialog
 * 4. Extension navigates to search results for that sender
 * 5. Automatically selects all conversations and moves them to trash
 */

const EXTENSION_NAME = 'Gmail Delete Sender';
const PENDING_DELETE_KEY = 'gmail-delete-sender-pending';
const INJECTED_MARKER = 'data-delete-sender-injected';
const DEBUG = true;

function log(message: string, ...args: unknown[]): void {
  if (DEBUG) {
    console.log(`[${EXTENSION_NAME}] ${message}`, ...args);
  }
}

// ---------------------------------------------------------------------------
// 1. Track the right-click target so we can find the email row later
// ---------------------------------------------------------------------------

let lastRightClickTarget: HTMLElement | null = null;

document.addEventListener(
  'contextmenu',
  (e) => {
    lastRightClickTarget = e.target as HTMLElement;
  },
  true
);

// ---------------------------------------------------------------------------
// 2. Email row helpers — extract sender info from the Gmail DOM
// ---------------------------------------------------------------------------

/**
 * Walk up from an element to find the ancestor <tr> that represents an email row.
 */
export function findEmailRow(el: HTMLElement | null): HTMLElement | null {
  let current = el;
  while (current) {
    if (current.tagName === 'TR') {
      // Gmail email rows contain sender spans with an `email` attribute
      if (
        current.querySelector('[email]') ||
        current.querySelector('[data-hovercard-id]')
      ) {
        return current;
      }
    }
    current = current.parentElement;
  }
  return null;
}

/**
 * Extract the sender's email address from a Gmail email row element.
 */
export function extractSenderEmail(row: HTMLElement | null): string | null {
  if (!row) return null;

  // Gmail puts the address in an `email` attribute on sender <span> elements
  const senderEl = row.querySelector<HTMLElement>('[email]');
  if (senderEl) {
    const email = senderEl.getAttribute('email');
    if (email) return email;
  }

  // Fallback: data-hovercard-id sometimes holds the email
  const hoverEl = row.querySelector<HTMLElement>('[data-hovercard-id]');
  if (hoverEl) {
    const id = hoverEl.getAttribute('data-hovercard-id');
    if (id && id.includes('@')) return id;
  }

  return null;
}

// ---------------------------------------------------------------------------
// 3. Context menu detection — watch for Gmail's custom context menu
// ---------------------------------------------------------------------------

/**
 * Search a DOM subtree for the "Find emails from …" menu item.
 * Returns the menu-item element and the sender name extracted from its text.
 */
export function findFindEmailsMenuItem(
  root: HTMLElement
): { element: HTMLElement; senderName: string } | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim() ?? '';
    if (!text.startsWith('Find emails from')) continue;

    const senderName = text.replace(/^Find emails from\s*/, '').trim();

    // Walk up to find the menu-item container
    let candidate = node.parentElement;
    while (candidate && candidate !== root) {
      if (
        candidate.getAttribute('role') === 'menuitem' ||
        candidate.getAttribute('act') != null
      ) {
        return { element: candidate, senderName };
      }
      candidate = candidate.parentElement;
    }

    // Fallback — use the direct parent of the text node
    if (node.parentElement) {
      return { element: node.parentElement, senderName };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// 4. Menu item injection
// ---------------------------------------------------------------------------

/**
 * Clone the "Find emails from …" item and turn it into "Delete all from …".
 */
function injectDeleteMenuItem(
  findEmailsItem: HTMLElement,
  senderName: string
): void {
  // Don't inject twice
  const parent = findEmailsItem.parentElement;
  if (!parent) return;
  if (parent.querySelector(`[${INJECTED_MARKER}]`)) return;

  // Capture sender email now (before the menu closes)
  const emailRow = findEmailRow(lastRightClickTarget);
  const senderEmail = extractSenderEmail(emailRow);
  const searchQuery = senderEmail ?? senderName;

  log(`Preparing delete option — sender: ${senderName}, email: ${senderEmail}`);

  // Clone to inherit Gmail's styling
  const deleteItem = findEmailsItem.cloneNode(true) as HTMLElement;
  deleteItem.setAttribute(INJECTED_MARKER, 'true');

  // Replace text content
  const textWalker = document.createTreeWalker(
    deleteItem,
    NodeFilter.SHOW_TEXT
  );
  let textNode: Node | null;
  while ((textNode = textWalker.nextNode())) {
    if (textNode.textContent?.includes('Find emails from')) {
      textNode.textContent = `Delete all from ${senderName}`;
      break;
    }
  }

  // Visual distinction — red text to signal a destructive action
  deleteItem.style.color = '#d93025';

  // Swap icon tint if possible
  const img = deleteItem.querySelector('img');
  if (img) {
    img.style.filter = 'grayscale(1) brightness(0.5) sepia(1) saturate(5) hue-rotate(-10deg)';
  }
  const svg = deleteItem.querySelector('svg');
  if (svg) {
    svg.style.color = '#d93025';
    svg.style.fill = '#d93025';
  }

  // Click handler
  deleteItem.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const displayName = senderEmail ?? senderName;
      const confirmed = confirm(
        `Delete ALL emails from "${displayName}"?\n\n` +
          'This will find every email from this sender, select them all, ' +
          'and move them to trash.\n\n' +
          'Emails in trash are permanently deleted after 30 days.'
      );

      if (!confirmed) {
        log('User cancelled deletion');
        return;
      }

      // Set flag so the search-results page knows to auto-delete
      sessionStorage.setItem(PENDING_DELETE_KEY, 'true');

      // Navigate to Gmail search
      log(`Navigating to search: from:${searchQuery}`);
      window.location.hash = `search/from:${searchQuery}`;
    },
    true
  );

  // Insert right after the "Find emails from …" item
  parent.insertBefore(deleteItem, findEmailsItem.nextSibling);
  log('Delete menu item injected');
}

// ---------------------------------------------------------------------------
// 5. MutationObserver — detect when Gmail renders its context menu
// ---------------------------------------------------------------------------

function observeContextMenu(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (!(node instanceof HTMLElement)) continue;

        const found = findFindEmailsMenuItem(node);
        if (found) {
          injectDeleteMenuItem(found.element, found.senderName);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  log('Context menu observer started');
}

// ---------------------------------------------------------------------------
// 6. Post-search automation — select all & delete
// ---------------------------------------------------------------------------

/**
 * After navigating to search results, wait for rows to appear, then
 * select-all → (expand selection) → delete.
 */
function waitForSearchResultsAndDelete(): void {
  const MAX_ATTEMPTS = 30;
  let attempts = 0;

  const check = () => {
    attempts++;
    if (attempts > MAX_ATTEMPTS) {
      log('Timed out waiting for search results');
      sessionStorage.removeItem(PENDING_DELETE_KEY);
      return;
    }

    // Gmail renders email rows as <tr> elements; toolbar has gh="mtb" or gh="tl"
    const rows = document.querySelectorAll('tr.zA, table.F.cf.zt tbody tr');
    const toolbar = document.querySelector('[gh="mtb"], [gh="tl"]');

    if (rows.length > 0 && toolbar) {
      log(`Search loaded — ${rows.length} rows found`);
      sessionStorage.removeItem(PENDING_DELETE_KEY);
      selectAllAndDelete();
    } else {
      setTimeout(check, 500);
    }
  };

  // Give Gmail a moment to start loading results
  setTimeout(check, 1000);
}

function selectAllAndDelete(): void {
  // Step 1 — click the select-all checkbox in the toolbar
  const checkbox = document.querySelector<HTMLElement>(
    '[gh="mtb"] [role="checkbox"], [gh="tl"] [role="checkbox"], ' +
      '[act="10"], .aeH [role="checkbox"]'
  );

  if (!checkbox) {
    log('Select-all checkbox not found');
    alert(
      '[Gmail Delete Sender] Could not find the select-all checkbox. ' +
        'Please select and delete manually.'
    );
    return;
  }

  log('Clicking select-all checkbox');
  checkbox.click();

  // Step 2 — expand selection to ALL matching conversations (if link appears)
  setTimeout(() => {
    expandSelectionAndDelete();
  }, 800);
}

function expandSelectionAndDelete(): void {
  // Gmail shows a banner: "All 25 conversations on this page are selected.
  // Select all conversations that match this search"
  const links = document.querySelectorAll<HTMLAnchorElement>(
    '.ya span a, .Dj span a, [role="alert"] a, .ya a'
  );

  let selectAllLink: HTMLAnchorElement | null = null;
  for (const link of Array.from(links)) {
    const text = link.textContent ?? '';
    if (
      text.includes('Select all') ||
      text.includes('all conversations') ||
      text.includes('All')
    ) {
      selectAllLink = link;
      break;
    }
  }

  if (selectAllLink) {
    log('Expanding selection to all matching conversations');
    selectAllLink.click();
    setTimeout(clickDelete, 500);
  } else {
    log('No "Select all conversations" link (single page of results)');
    clickDelete();
  }
}

function clickDelete(): void {
  const deleteBtn = document.querySelector<HTMLElement>(
    '[act="7"], [gh="mtb"] [aria-label="Delete"], [aria-label="Delete"], ' +
      'button[title="Delete"]'
  );

  if (!deleteBtn) {
    log('Delete button not found');
    alert(
      '[Gmail Delete Sender] Could not find the delete button. ' +
        'Emails are selected — please click delete manually.'
    );
    return;
  }

  log('Clicking delete');
  deleteBtn.click();

  // Gmail may show a confirmation dialog for bulk operations
  setTimeout(handleBulkConfirmation, 500);
}

function handleBulkConfirmation(): void {
  const okButton = document.querySelector<HTMLElement>(
    '[name="ok"], button[name="ok"]'
  );

  if (okButton) {
    log('Confirming bulk delete dialog');
    okButton.click();
  } else {
    log('No confirmation dialog (operation completed directly)');
  }
}

// ---------------------------------------------------------------------------
// 7. Navigation watcher — respond to Gmail hash changes
// ---------------------------------------------------------------------------

function watchForPendingDelete(): void {
  window.addEventListener('hashchange', () => {
    if (sessionStorage.getItem(PENDING_DELETE_KEY) === 'true') {
      log('Hash changed with pending delete — waiting for search results');
      waitForSearchResultsAndDelete();
    }
  });

  // Also handle page-load case (e.g. if user refreshed mid-flow)
  if (sessionStorage.getItem(PENDING_DELETE_KEY) === 'true') {
    log('Pending delete found on page load');
    waitForSearchResultsAndDelete();
  }
}

// ---------------------------------------------------------------------------
// 8. Main
// ---------------------------------------------------------------------------

function main(): void {
  log('Extension loaded');
  observeContextMenu();
  watchForPendingDelete();
  log('Initialization complete');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
