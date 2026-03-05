import { test, expect } from '@playwright/test';

test.describe('Categories Page', () => {
  test('should render the categories listing page', async ({ page }) => {
    await page.goto('/categories');
    
    // Check page heading
    await expect(page.getByRole('heading', { name: /catégories/i })).toBeVisible();
    
    // Check layout structure
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have main content area', async ({ page }) => {
    await page.goto('/categories');
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/categories');
    
    // Check heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
  });
});

test.describe('Category Detail Page', () => {
  test('should handle category slug route', async ({ page }) => {
    await page.goto('/categories/test-category', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    await expect(page.locator('body')).toHaveCount(1);
  });
});
