// @ts-check
const { expect } = require('@playwright/test');

/**
 * Visit home, stub backend /api/health, suppress onboarding overlay,
 * and collect console errors. Returns { errors, warnings, badImages }.
 */
async function setupPage(page) {
  /** @type {string[]} */
  const errors = [];
  /** @type {string[]} */
  const warnings = [];
  /** @type {string[]} */
  const badImages = [];

  page.on('console', (msg) => {
    const t = msg.type();
    if (t === 'error') errors.push(msg.text());
    else if (t === 'warning') warnings.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('response', (resp) => {
    const url = resp.url();
    if (/\.(png|jpg|jpeg|webp|gif|svg)(\?|$)/i.test(url) && resp.status() >= 400) {
      badImages.push(`${resp.status()} ${url}`);
    }
  });

  // Stub backend endpoints so tests are independent of the live API
  await page.route('**/api/health', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        version: '7.55-test',
        cache: { hit_rate_pct: 42, hits: 100, misses: 138, entries: 12 },
        shops: ['Varle.lt', 'Elesen.lt', 'Pigu.lt', 'Topo centras', 'Amazon.DE', 'Amazon.PL'],
        ai: { provider: 'claude', model: 'claude-opus-4-7', configured: true },
        supabase: true, scraper_api: true, zyte: true,
      }),
    })
  );
  await page.route('**/api/rate-limit', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ used: 1, limit: 50, remaining: 49 }),
    })
  );
  await page.route('**/api/popular-searches**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searches: [{ query: 'iPhone 17 Pro', count: 12 }], total_unique: 1 }),
    })
  );
  await page.route('**/api/watchlist-check', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ alerts: [] }),
    })
  );

  // Disable onboarding overlay; clear app-managed localStorage; suppress service worker
  // so Playwright's network mocks aren't bypassed by sw.js.
  await page.addInitScript(() => {
    try {
      localStorage.clear();
      localStorage.setItem('gy_ob_done', '1');
      localStorage.setItem('gy_lang', 'lt');
    } catch (e) {}
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.register) {
        const noop = () => Promise.resolve({
          installing: null, waiting: null, active: null,
          scope: '/', update: () => Promise.resolve(),
          unregister: () => Promise.resolve(true),
          addEventListener: () => {}, removeEventListener: () => {},
        });
        navigator.serviceWorker.register = noop;
      }
    } catch (e) {}
  });

  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  // Ensure any pre-existing SW is gone for this origin (paranoia)
  await page.evaluate(async () => {
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if (window.caches && caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (e) {}
  });
  // Wait for boot
  await page.waitForFunction(() => !!document.getElementById('hero-headline'));
  return { errors, warnings, badImages };
}

async function stubSearch(page, payload) {
  // Non-streaming fallback: plain JSON
  await page.route('**/api/search', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(payload),
    })
  );
  // Streaming endpoint: emit a single SSE "complete" event
  const sseBody = `data: ${JSON.stringify({ type: 'complete', payload })}\n\n`;
  await page.route('**/api/search-stream', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/event-stream',
      body: sseBody,
    })
  );
}

const SAMPLE_RESULT = {
  product_name: 'iPhone 17 Pro',
  ai_verdict: 'BUY',
  verdict_label: 'Pirkti dabar',
  verdict_reason: 'Geriausia kaina rinkoje šiandien.',
  ai_summary: 'Goody rado 3 kainas. Pigiausia: €1199.00.',
  buy_recommendation: 'Geras pasiūlymas.',
  alternative: '',
  price_forecast: '',
  deal_score: 88,
  price_min: 1199,
  price_max: 1399,
  price_avg: 1280,
  price_history: {},
  search_suggestion: '',
  product_type: 'phone',
  category_icon: '📱',
  results: [
    {
      shop: 'Amazon.DE',
      flag: '🇩🇪',
      url: 'https://example.com/1',
      affiliate_url: '',
      price: 1199,
      currency: 'EUR',
      in_stock: true,
      delivery: 'Tomorrow',
      deal_score: 92,
      rating: 4.6,
      review_count: 240,
      notes: '',
      is_best_value: true,
      is_cheapest: true,
      is_top_rated: true,
      why_recommended: 'Lowest price',
      source: 'amazon',
      product_title: 'Apple iPhone 17 Pro 256GB',
    },
    {
      shop: 'Varle',
      flag: '🇱🇹',
      url: 'https://example.com/2',
      affiliate_url: '',
      price: 1299,
      currency: 'EUR',
      in_stock: true,
      delivery: '1-2 d.',
      deal_score: 80,
      rating: 4.4,
      review_count: 50,
      notes: '',
      is_best_value: false,
      is_cheapest: false,
      is_top_rated: false,
      why_recommended: '',
      source: 'varle',
      product_title: 'iPhone 17 Pro 256GB',
    },
  ],
  _rate: { used: 1, limit: 50, remaining: 49 },
};

module.exports = { setupPage, stubSearch, SAMPLE_RESULT, expect };
