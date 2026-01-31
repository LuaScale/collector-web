import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the homepage with hero section', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Collector/);
    
    // Check hero section - look for main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check main navigation is visible
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Check main nav links exist in header navigation
    const nav = page.locator('header nav, header');
    await expect(nav.getByRole('link', { name: /articles/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /catégories/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /boutiques/i })).toBeVisible();
  });

  test('should have footer with site info', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    // Check for brand name in footer
    await expect(footer.locator('text=Collector').first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
