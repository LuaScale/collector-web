import { test, expect } from '@playwright/test';

test.describe('Boutiques Page', () => {
  test('should render the shops listing page', async ({ page }) => {
    await page.goto('/boutiques');
    
    // Check page heading
    await expect(page.getByRole('heading', { name: /boutiques/i })).toBeVisible();
    
    // Check layout structure
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/boutiques');
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should have correct title', async ({ page }) => {
    await page.goto('/boutiques');
    await expect(page).toHaveTitle(/Boutiques|Collector/);
  });
});

test.describe('Boutique Detail Page', () => {
  test('should handle shop detail route', async ({ page }) => {
    await page.goto('/boutiques/1');
    
    // Should render without crashing
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should handle non-existent shop gracefully', async ({ page }) => {
    await page.goto('/boutiques/99999');
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });
});
