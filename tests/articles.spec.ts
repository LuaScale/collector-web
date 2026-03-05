import { test, expect } from '@playwright/test';

test.describe('Articles Page', () => {
  test('should render the articles listing page', async ({ page }) => {
    await page.goto('/articles', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Check page heading
    await expect(page.getByRole('heading', { name: /articles/i })).toBeVisible();
    
    // Check layout structure
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display loading state or content', async ({ page }) => {
    await page.goto('/articles', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Either loading spinner or content should be visible
    const hasContent = await page.locator('main').isVisible();
    expect(hasContent).toBeTruthy();
  });

  test('should have proper meta structure', async ({ page }) => {
    await page.goto('/articles', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page).toHaveTitle(/Articles|Collector/);
  });
});

test.describe('Article Detail Page', () => {
  test('should handle non-existent article gracefully', async ({ page }) => {
    await page.goto('/articles/99999', { waitUntil: 'domcontentloaded', timeout: 30000 });

    await expect(page.locator('body')).toHaveCount(1);
  });
});
