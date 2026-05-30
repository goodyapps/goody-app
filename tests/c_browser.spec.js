// @ts-check
// Scenario C: browser — clicks each category, verifies search fires
const { test, expect } = require('@playwright/test');
const { setupPage, stubSearch, SAMPLE_RESULT } = require('./helpers');

test('C: each category card fires a search and navigates to results', async ({ page }) => {
  const { errors } = await setupPage(page);
  await stubSearch(page, SAMPLE_RESULT);

  const cats = page.locator('.cats .cat');
  const count = await cats.count();
  expect(count, 'category cards rendered').toBeGreaterThan(3);

  for (let i = 0; i < count; i++) {
    // Always start from home
    await page.locator('#nav-home').click();
    await expect(page.locator('#pg-home')).toHaveClass(/on/);
    await cats.nth(i).click();
    await expect(page.locator('#pg-results')).toHaveClass(/on/);
    await expect(page.locator('.p-card').first()).toBeVisible({ timeout: 10_000 });
  }

  const ignored = /favicon|ServiceWorker|manifest|sw\.js/i;
  const real = errors.filter((e) => !ignored.test(e));
  expect(real, 'console errors: ' + real.join(' | ')).toEqual([]);
});
