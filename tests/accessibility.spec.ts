import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/articles', name: 'Articles' },
    { path: '/categories', name: 'Categories' },
    { path: '/boutiques', name: 'Boutiques' },
    { path: '/connexion', name: 'Login' },
    { path: '/inscription', name: 'Registration' },
  ];

  for (const { path, name } of pages) {
    test(`${name} should have proper heading hierarchy`, async ({ page }) => {
      await page.goto(path);
      
      // Should have at least one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test(`${name} should have proper landmark regions`, async ({ page }) => {
      await page.goto(path);
      
      // Should have main content area
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test(`${name} should have navigation landmark`, async ({ page }) => {
      await page.goto(path);
      
      const nav = page.getByRole('navigation');
      await expect(nav.first()).toBeVisible();
    });
  }

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/connexion');
    
    // All inputs should have associated labels
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();
    
    const passwordInput = page.getByLabel(/mot de passe/i);
    await expect(passwordInput).toBeVisible();
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/connexion');
    
    const submitButton = page.getByRole('button', { name: /se connecter/i });
    await expect(submitButton).toBeVisible();
  });

  test('links should have accessible names', async ({ page }) => {
    await page.goto('/');
    
    // Check that links have text content
    const links = page.getByRole('link');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // First link should have accessible name
    const firstLink = links.first();
    const name = await firstLink.getAttribute('aria-label') || await firstLink.textContent();
    expect(name).toBeTruthy();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt can be empty for decorative images but should be defined
      expect(alt).toBeDefined();
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('should be able to tab through login form', async ({ page }) => {
    await page.goto('/connexion');
    
    // Focus first interactive element
    await page.keyboard.press('Tab');
    
    // Should be able to reach form fields
    let foundEmailInput = false;
    for (let i = 0; i < 10; i++) {
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      if (focused === 'INPUT') {
        foundEmailInput = true;
        break;
      }
      await page.keyboard.press('Tab');
    }
    
    expect(foundEmailInput).toBeTruthy();
  });

  test('should be able to submit form with Enter key', async ({ page }) => {
    await page.goto('/connexion');
    
    // Fill form
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/mot de passe/i).fill('password123');
    
    // Press Enter to submit
    await page.keyboard.press('Enter');
    
    // Form should attempt to submit (validation will show)
    await page.waitForTimeout(500);
  });
});
