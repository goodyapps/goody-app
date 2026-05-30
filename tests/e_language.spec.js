// @ts-check
// Scenario E: language switch — LT default, switch to EN, headline + nav translate
const { test, expect } = require('@playwright/test');
const { setupPage } = require('./helpers');

test('E: language switch LT → EN updates headline, subtitle, social proof, nav', async ({ page }) => {
  await setupPage(page);

  const headline = page.locator('#hero-headline');
  const subtitle = page.locator('#hero-subtitle');
  const spPrices = page.locator('#sp-prices');
  const navHome = page.locator('#nav-home .nav-lbl');

  // Default LT
  await expect(headline).toContainText(/Niekada nepermok|Nigdy|Nie wieder|Never/);
  // Open lang bar and pick EN
  await page.locator('#lang-toggle').click();
  await page.locator('#lang-en').click();
  await expect(headline).toContainText('Never overpay again');
  await expect(subtitle).toContainText(/Scan a price tag/);
  await expect(spPrices).toContainText(/prices checked/);
  await expect(navHome).toContainText('Home');

  // Switch back to LT
  await page.locator('#lang-toggle').click();
  await page.locator('#lang-lt').click();
  await expect(headline).toContainText('Niekada nepermokėk');
  await expect(navHome).toContainText('Pradžia');
});
