import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
/**
 * Performs a reliable HTML5 drag-and-drop that works with react-dnd HTML5 backend.
 * Playwright's built-in dragTo/dragAndDrop simulate mouse events which don't
 * reliably trigger react-dnd's HTML5 backend. This dispatches the actual
 * HTML5 DnD events with a real DataTransfer object.
 */
async function html5DragAndDrop(page: Page, source: Locator, target: Locator): Promise<void> {
  await source.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();

  // Ensure both elements are stable and visible
  await expect(source).toBeVisible({ timeout: 15000 });
  await expect(target).toBeVisible({ timeout: 15000 });

  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error('Could not get bounding boxes for drag source or target');
  }

  const sourceCenter = {
    x: sourceBox.x + sourceBox.width / 2,
    y: sourceBox.y + sourceBox.height / 2,
  };
  const targetCenter = {
    x: targetBox.x + targetBox.width / 2,
    y: targetBox.y + targetBox.height / 2,
  };

  await page.evaluate(
    ({ src, tgt }) => {
      function createDragEvent(type: string, pos: { x: number; y: number }, dataTransfer: DataTransfer) {
        return new DragEvent(type, {
          bubbles: true,
          cancelable: true,
          composed: true,
          clientX: pos.x,
          clientY: pos.y,
          dataTransfer,
        });
      }

      const sourceEl = document.elementFromPoint(src.x, src.y);
      const targetEl = document.elementFromPoint(tgt.x, tgt.y);

      if (!sourceEl || !targetEl) {
        throw new Error('Could not find elements at the given coordinates');
      }

      const dataTransfer = new DataTransfer();

      sourceEl.dispatchEvent(createDragEvent('dragstart', src, dataTransfer));
      sourceEl.dispatchEvent(createDragEvent('drag', src, dataTransfer));

      targetEl.dispatchEvent(createDragEvent('dragenter', tgt, dataTransfer));
      targetEl.dispatchEvent(createDragEvent('dragover', tgt, dataTransfer));
      targetEl.dispatchEvent(createDragEvent('dragover', tgt, dataTransfer));

      targetEl.dispatchEvent(createDragEvent('drop', tgt, dataTransfer));
      sourceEl.dispatchEvent(createDragEvent('dragend', src, dataTransfer));
    },
    { src: sourceCenter, tgt: targetCenter },
  );

  // Small pause for react-dnd to process the drop
  await page.waitForTimeout(300);
}

/**
 * Attempts drag-and-drop with retries to handle transient failures, mitigating flaky tests.
 */
export async function reliableDragAndDrop(
  page: Page,
  source: Locator,
  target: Locator,
  verifyLocator: Locator,
  maxAttempts = 3,
): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await html5DragAndDrop(page, source, target);

    try {
      await expect(verifyLocator).toBeVisible({ timeout: 5000 });

      return; // success
    } catch {
      if (attempt === maxAttempts) {
        throw new Error(
          `Drag and drop failed after ${maxAttempts} attempts. `
          + `Verification element not visible.`,
        );
      }
      // Brief pause before retrying
      await page.waitForTimeout(500);
    }
  }
}
