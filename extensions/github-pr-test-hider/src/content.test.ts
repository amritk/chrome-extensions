import { describe, it, expect, beforeEach, vi } from 'vitest';
import { matchesTestPattern, markAsViewed, hideTestFiles } from './content';

describe('matchesTestPattern', () => {
  it('should match test.ts files', () => {
    const element = document.createElement('h3');
    element.textContent = 'src/components/Button.test.ts';

    expect(matchesTestPattern(element, ['test.ts'])).toBe(true);
  });

  it('should match .spec. files', () => {
    const element = document.createElement('h3');
    element.textContent = 'src/utils/helpers.spec.js';

    expect(matchesTestPattern(element, ['.spec.'])).toBe(true);
  });

  it('should match multiple patterns', () => {
    const element = document.createElement('h3');
    element.textContent = 'src/App.test.tsx';

    expect(matchesTestPattern(element, ['test.ts', 'test.tsx', '.spec.'])).toBe(true);
  });

  it('should not match non-test files', () => {
    const element = document.createElement('h3');
    element.textContent = 'src/components/Button.tsx';

    expect(matchesTestPattern(element, ['test.ts', '.spec.'])).toBe(false);
  });

  it('should handle elements with no text content', () => {
    const element = document.createElement('h3');

    expect(matchesTestPattern(element, ['test.ts'])).toBe(false);
  });

  it('should handle empty patterns array', () => {
    const element = document.createElement('h3');
    element.textContent = 'src/test.ts';

    expect(matchesTestPattern(element, [])).toBe(false);
  });

  it('should trim whitespace from text content', () => {
    const element = document.createElement('h3');
    element.textContent = '  src/utils/helper.test.js  ';

    expect(matchesTestPattern(element, ['test.js'])).toBe(true);
  });
});

describe('markAsViewed', () => {
  let mockConfig: any;

  beforeEach(() => {
    mockConfig = {
      patterns: ['test.ts'],
      headerSelector: 'h3',
      notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
      debug: false,
    };
  });

  it('should click the "Not Viewed" button when found', () => {
    // Create DOM structure matching GitHub PR layout
    const container = document.createElement('div');
    const parent = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = 'test.ts';

    const nextSibling = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Not Viewed');

    const clickSpy = vi.fn();
    button.click = clickSpy;

    nextSibling.appendChild(button);
    parent.appendChild(header);
    container.appendChild(parent);
    container.appendChild(nextSibling);

    const result = markAsViewed(header, mockConfig);

    expect(result).toBe(true);
    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should return false when header has no parent', () => {
    const header = document.createElement('h3');
    header.textContent = 'test.ts';

    const result = markAsViewed(header, mockConfig);

    expect(result).toBe(false);
  });

  it('should return false when parent has no next sibling', () => {
    const parent = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = 'test.ts';
    parent.appendChild(header);

    const result = markAsViewed(header, mockConfig);

    expect(result).toBe(false);
  });

  it('should return false when next sibling is not an HTMLElement', () => {
    const container = document.createElement('div');
    const parent = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = 'test.ts';

    parent.appendChild(header);
    container.appendChild(parent);
    container.appendChild(document.createTextNode('text node'));

    const result = markAsViewed(header, mockConfig);

    expect(result).toBe(false);
  });

  it('should return false when "Not Viewed" button is not found', () => {
    const container = document.createElement('div');
    const parent = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = 'test.ts';

    const nextSibling = document.createElement('div');
    // No button added

    parent.appendChild(header);
    container.appendChild(parent);
    container.appendChild(nextSibling);

    const result = markAsViewed(header, mockConfig);

    expect(result).toBe(false);
  });

  it('should handle errors gracefully', () => {
    const header = document.createElement('h3');
    // Simulate error by passing malformed config
    const badConfig = {
      ...mockConfig,
      notViewedButtonSelector: null as any,
    };

    const result = markAsViewed(header, badConfig);

    expect(result).toBe(false);
  });
});

describe('hideTestFiles', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should process all matching test files', () => {
    // Create GitHub PR-like structure
    const createFileBlock = (filename: string, hasButton = true) => {
      const container = document.createElement('div');
      const headerParent = document.createElement('div');
      const header = document.createElement('h3');
      header.textContent = filename;

      const contentBlock = document.createElement('div');
      let button: HTMLButtonElement | null = null;

      if (hasButton) {
        button = document.createElement('button');
        button.setAttribute('aria-label', 'Not Viewed');
        button.click = vi.fn();
        contentBlock.appendChild(button);
      }

      headerParent.appendChild(header);
      container.appendChild(headerParent);
      container.appendChild(contentBlock);
      document.body.appendChild(container);

      return button;
    };

    const button1 = createFileBlock('src/App.test.ts');
    const button2 = createFileBlock('src/utils.spec.js');
    createFileBlock('src/Component.tsx'); // Should not be clicked
    const button3 = createFileBlock('src/helper.test.tsx');

    const config = {
      patterns: ['test.ts', 'test.tsx', '.spec.'],
      headerSelector: 'h3',
      notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
      debug: false,
    };

    const count = hideTestFiles(config);

    expect(count).toBe(3);
    expect(button1.click).toHaveBeenCalled();
    expect(button2.click).toHaveBeenCalled();
    expect(button3.click).toHaveBeenCalled();
  });

  it('should return 0 when no headers are found', () => {
    const config = {
      patterns: ['test.ts'],
      headerSelector: 'h3',
      notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
      debug: false,
    };

    const count = hideTestFiles(config);

    expect(count).toBe(0);
  });

  it('should return 0 when no test files match', () => {
    const header = document.createElement('h3');
    header.textContent = 'README.md';
    document.body.appendChild(header);

    const config = {
      patterns: ['test.ts'],
      headerSelector: 'h3',
      notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
      debug: false,
    };

    const count = hideTestFiles(config);

    expect(count).toBe(0);
  });

  it('should handle missing buttons gracefully', () => {
    const container = document.createElement('div');
    const headerParent = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = 'test.ts';

    const contentBlock = document.createElement('div');
    // No button

    headerParent.appendChild(header);
    container.appendChild(headerParent);
    container.appendChild(contentBlock);
    document.body.appendChild(container);

    const config = {
      patterns: ['test.ts'],
      headerSelector: 'h3',
      notViewedButtonSelector: 'button[aria-label="Not Viewed"]',
      debug: false,
    };

    const count = hideTestFiles(config);

    expect(count).toBe(0);
  });
});
