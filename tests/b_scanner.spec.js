// @ts-check
// Scenario B: scanner — presses scan button, scan sheet appears
const { test, expect } = require('@playwright/test');
const { setupPage } = require('./helpers');

test('B: scanner opens camera sheet via search-bar camera icon', async ({ page }) => {
  const { errors } = await setupPage(page);
  const camBtn = page.locator('#srch-go');
  await expect(camBtn).toBeVisible();
  await expect(camBtn).toHaveAttribute('aria-label', /Scan|Skenuoti|Skanuj/i);
  // It must have a visible SVG icon (not the empty "white square" complaint)
  await expect(camBtn.locator('svg')).toBeVisible();

  await camBtn.click();
  const sheet = page.locator('#cam-sheet');
  await expect(sheet).toHaveClass(/open/);

  // Close it again
  await page.locator('.cam-close').click();
  await expect(sheet).not.toHaveClass(/open/);

  const ignored = /favicon|ServiceWorker|manifest|sw\.js|getUserMedia|Permission/i;
  const real = errors.filter((e) => !ignored.test(e));
  expect(real, 'console errors: ' + real.join(' | ')).toEqual([]);
});

test('B2: bottom nav scan button also opens scanner', async ({ page }) => {
  await setupPage(page);
  await page.locator('#nav-scan').click();
  await expect(page.locator('#cam-sheet')).toHaveClass(/open/);
});
