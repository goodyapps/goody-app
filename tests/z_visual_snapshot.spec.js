// @ts-check
// Optional: capture a screenshot of the redesigned home page for quick visual review.
// Not part of the auto-fix loop; only runs when invoked directly.
const { test } = require('@playwright/test');
const { setupPage } = require('./helpers');

test('Z: capture home screenshot', async ({ page }) => {
  await setupPage(page);
  await page.waitForTimeout(400); // let proof + categories settle
  await page.screenshot({ path: 'test-results/home.png', fullPage: true });
});
