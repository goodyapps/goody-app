// @ts-check
// Scenario A: price hunter — types "iPhone 17 Pro", submits, sees results
const { test, expect } = require('@playwright/test');
const { setupPage, stubSearch, SAMPLE_RESULT } = require('./helpers');

test('A: price hunter types iPhone 17 Pro and sees results', async ({ page }) => {
  const { errors } = await setupPage(page);
  await stubSearch(page, SAMPLE_RESULT);

  const input = page.locator('#srch-inp');
  await expect(input).toBeVisible();
  await input.fill('iPhone 17 Pro');
  await input.press('Enter');

  // Results page should appear
  await expect(page.locator('#pg-results')).toHaveClass(/on/);
  // At least one price card visible
  const resultsPage = page.locator('#pg-results');
  const cards = resultsPage.locator('.p-card');
  await expect(cards.first()).toBeVisible({ timeout: 10_000 });
  // Cheapest €1199 should be visible within the results page (not the hidden home popular list)
  await expect(resultsPage.locator('text=/€\\s*1[\\.,]?199/').first()).toBeVisible();

  // No error-level console messages
  const ignored = /favicon|ServiceWorker|manifest|sw\.js/i;
  const real = errors.filter((e) => !ignored.test(e));
  expect(real, 'console errors: ' + real.join(' | ')).toEqual([]);
});
