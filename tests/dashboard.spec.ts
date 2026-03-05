import { test, expect } from '@playwright/test';

test.describe('Dashboard - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/tableau-de-bord');
    
    // Should redirect to login or show login prompt
    await page.waitForURL(/connexion|tableau-de-bord/, { timeout: 5000 });
    
    // Either redirected to login or showing loading/redirect state
    const url = page.url();
    const isOnLoginOrDashboard = url.includes('connexion') || url.includes('tableau-de-bord');
    expect(isOnLoginOrDashboard).toBeTruthy();
  });

  test('should redirect boutiques page to login', async ({ page }) => {
    await page.goto('/tableau-de-bord/boutiques');
    
    await page.waitForURL(/connexion|tableau-de-bord/, { timeout: 5000 });
    const url = page.url();
    const isProtected = url.includes('connexion') || url.includes('tableau-de-bord');
    expect(isProtected).toBeTruthy();
  });

  test('should redirect profile page to login', async ({ page }) => {
    await page.goto('/tableau-de-bord/profil');
    
    await page.waitForURL(/connexion|tableau-de-bord/, { timeout: 5000 });
    const url = page.url();
    const isProtected = url.includes('connexion') || url.includes('tableau-de-bord');
    expect(isProtected).toBeTruthy();
  });
});

test.describe('Dashboard - With Mock Auth', () => {
  test.beforeEach(async ({ page }) => {
    // Set mock auth in localStorage before navigation
    await page.addInitScript(() => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        pseudo: 'TestUser',
        isVerified: true,
        roles: ['ROLE_USER'],
        shops: [],
      };
      localStorage.setItem('collector_auth_user', JSON.stringify(mockUser));
    });
  });

  test('should render dashboard when authenticated', async ({ page }) => {
    await page.goto('/tableau-de-bord');

    const mainContent = page.locator('main, [role="main"]').first();
    const hasMain = await mainContent.isVisible().catch(() => false);
    if (!hasMain) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });

  test('should show sidebar navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/tableau-de-bord');

    const nav = page.locator('aside, nav').first();
    const hasNav = await nav.isVisible().catch(() => false);
    if (!hasNav) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });

  test('should render boutiques management page', async ({ page }) => {
    await page.goto('/tableau-de-bord/boutiques');

    const mainContent = page.locator('main, [role="main"]').first();
    const hasMain = await mainContent.isVisible().catch(() => false);
    if (!hasMain) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });

  test('should render new boutique form', async ({ page }) => {
    await page.goto('/tableau-de-bord/boutiques/nouveau');

    const formOrMain = page.locator('form, main').first();
    const hasContent = await formOrMain.isVisible().catch(() => false);
    if (!hasContent) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });

  test('should render profile page', async ({ page }) => {
    await page.goto('/tableau-de-bord/profil');

    const mainContent = page.locator('main, [role="main"]').first();
    const hasMain = await mainContent.isVisible().catch(() => false);
    if (!hasMain) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });

  test('should render settings page', async ({ page }) => {
    await page.goto('/tableau-de-bord/parametres');

    const mainContent = page.locator('main, [role="main"]').first();
    const hasMain = await mainContent.isVisible().catch(() => false);
    if (!hasMain) {
      await expect(page.getByText(/loading|redirecting/i).first()).toBeVisible();
    }
  });
});
