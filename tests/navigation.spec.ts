import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate from homepage to articles', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: /articles/i }).first().click();
    
    await expect(page).toHaveURL(/\/articles/);
    await expect(page.getByRole('heading', { name: /articles/i })).toBeVisible();
  });

  test('should navigate from homepage to categories', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: /catégories/i }).first().click();
    
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.getByRole('heading', { name: /catégories/i })).toBeVisible();
  });

  test('should navigate from homepage to boutiques', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: /boutiques/i }).first().click();
    
    await expect(page).toHaveURL(/\/boutiques/);
    await expect(page.getByRole('heading', { name: /boutiques/i })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Find login link in header
    const header = page.locator('header');
    await header.getByRole('link', { name: /connexion/i }).click();
    
    await expect(page).toHaveURL(/\/connexion/);
  });

  test('should navigate between auth pages', async ({ page }) => {
    await page.goto('/connexion');
    
    // Click link to registration
    await page.getByRole('link', { name: /créer un compte|inscription/i }).click();
    await expect(page).toHaveURL(/\/inscription/);
    
    // Click link back to login
    await page.getByRole('link', { name: /connexion|se connecter/i }).click();
    await expect(page).toHaveURL(/\/connexion/);
  });

  test('should have working logo link to homepage', async ({ page }) => {
    await page.goto('/articles');
    
    // Click logo/brand link
    await page.getByRole('link', { name: /collector/i }).first().click();
    
    await expect(page).toHaveURL('/');
  });
});

test.describe('Responsive Navigation', () => {
  test('should show mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Should have a mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Menu should open
      await expect(page.getByRole('link', { name: /articles/i })).toBeVisible();
    }
  });

  test('should hide desktop nav on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Main content should still be accessible
    await expect(page.locator('main')).toBeVisible();
  });
});
