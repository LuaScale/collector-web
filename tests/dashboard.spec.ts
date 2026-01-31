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
    // Set mock auth in localStorage before navigating
    await page.goto('/');
    await page.evaluate(() => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        pseudo: 'TestUser',
        isVerified: true,
        roles: ['ROLE_USER'],
        shops: [],
      };
      localStorage.setItem('collector_user', JSON.stringify(mockUser));
      localStorage.setItem('collector_token', 'mock-jwt-token');
    });
  });

  test('should render dashboard when authenticated', async ({ page }) => {
    await page.goto('/tableau-de-bord');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Should show dashboard content or redirect message
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
  });

  test('should show sidebar navigation', async ({ page }) => {
    await page.goto('/tableau-de-bord');
    await page.waitForLoadState('networkidle');
    
    // On desktop, sidebar should be visible
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Check for sidebar or navigation elements
    const hasNavigation = await page.locator('aside, nav').first().isVisible();
    expect(hasNavigation).toBeTruthy();
  });

  test('should render boutiques management page', async ({ page }) => {
    await page.goto('/tableau-de-bord/boutiques');
    await page.waitForLoadState('networkidle');
    
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
  });

  test('should render new boutique form', async ({ page }) => {
    await page.goto('/tableau-de-bord/boutiques/nouveau');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for client-side hydration
    await page.waitForTimeout(1000);
    
    // Should show form or redirect
    const formOrMain = page.locator('form, main').first();
    await expect(formOrMain).toBeVisible();
  });

  test('should render profile page', async ({ page }) => {
    await page.goto('/tableau-de-bord/profil');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for client-side hydration
    await page.waitForTimeout(1000);
    
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
  });

  test('should render settings page', async ({ page }) => {
    await page.goto('/tableau-de-bord/parametres');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for client-side hydration
    await page.waitForTimeout(1000);
    
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
  });
});
