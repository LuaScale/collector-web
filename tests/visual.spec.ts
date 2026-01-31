import { test, expect } from '@playwright/test';

// Visual regression tests - run with: npx playwright test tests/visual.spec.ts --update-snapshots
// Skip by default in regular test runs
test.describe('Visual Regression', () => {
  test.skip(({ browserName }) => true, 'Visual tests skipped by default. Run with --update-snapshots to create baselines.');

  const pages = [
    { path: '/', name: 'homepage' },
    { path: '/articles', name: 'articles' },
    { path: '/categories', name: 'categories' },
    { path: '/boutiques', name: 'boutiques' },
    { path: '/connexion', name: 'login' },
    { path: '/inscription', name: 'registration' },
  ];

  for (const { path, name } of pages) {
    test(`${name} page should render correctly`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }

  test('homepage mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('login page mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/connexion');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('login-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
