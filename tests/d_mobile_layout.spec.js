// @ts-check
// Scenario D: mobile layout — 375px and 414px, floating nav visible, no overflow
const { test, expect } = require('@playwright/test');
const { setupPage } = require('./helpers');

for (const width of [375, 414]) {
  test(`D: mobile layout ${width}px — hero, search bar, floating nav all visible without overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    const { errors, badImages } = await setupPage(page);

    // Headline visible
    await expect(page.locator('#hero-headline')).toBeVisible();
    // Search input visible
    await expect(page.locator('#srch-inp')).toBeVisible();
    // Both icons inside the bar
    await expect(page.locator('#srch-go')).toBeVisible();
    await expect(page.locator('#voice-btn')).toBeVisible();
    // Social proof present
    await expect(page.locator('.social-proof')).toBeVisible();
    // Floating nav present
    const nav = page.locator('.bottom-nav');
    await expect(nav).toBeVisible();
    // Floating: should NOT touch the very bottom edge AND should not overlap with content
    const navBox = await nav.boundingBox();
    expect(navBox).not.toBeNull();
    if (navBox) {
      expect(navBox.x, 'nav has left inset').toBeGreaterThan(0);
      expect(navBox.x + navBox.width, 'nav has right inset').toBeLessThan(width);
    }
    // Horizontal scroll should not happen
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(horizontalOverflow, 'no horizontal overflow').toBeLessThanOrEqual(1);

    expect(badImages, 'no broken images: ' + badImages.join(', ')).toEqual([]);
    const ignored = /favicon|ServiceWorker|manifest|sw\.js/i;
    const real = errors.filter((e) => !ignored.test(e));
    expect(real, 'console errors: ' + real.join(' | ')).toEqual([]);
  });
}
