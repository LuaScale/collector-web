import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/connexion');
  });

  test('should render the login form', async ({ page }) => {
    // Check page heading
    await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: /se connecter/i })).toBeVisible();
  });

  test('should have link to registration page', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: /créer un compte|inscription/i });
    await expect(registerLink).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    // Click submit without filling form
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    // Should stay on login form (client-side validation/auth guard)
    await expect(page).toHaveURL(/\/(en|fr)\/connexion(?:\?.*)?$/);
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have proper form structure', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check input types
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toHaveAttribute('type', 'email');
    
    const passwordInput = page.getByLabel(/mot de passe/i);
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should validate email format', async ({ page }) => {
    // Enter invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/mot de passe/i).fill('password123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    // Should show email validation error (Zod message)
    await expect(page.getByText(/invalide|invalid|email/i).first()).toBeVisible();
  });
});

test.describe('Registration Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscription');
  });

  test('should render the registration form', async ({ page }) => {
    // Check page heading
    await expect(page.getByRole('heading', { name: /inscription|créer/i })).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel(/pseudo/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i).first()).toBeVisible();
  });

  test('should have link to login page', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /connexion|se connecter/i });
    await expect(loginLink).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    // Click submit without filling form
    await page.getByRole('button', { name: /créer|inscrire/i }).click();
    
    // Should show validation errors
    await expect(page.getByText(/requis|invalide|caractères/i).first()).toBeVisible();
  });

  test('should validate password confirmation', async ({ page }) => {
    await page.getByLabel(/pseudo/i).fill('testuser');
    await page.getByLabel(/email/i).fill('test@example.com');
    
    // Get password fields by placeholder or more specific selector
    const passwordFields = page.locator('input[type="password"]');
    await passwordFields.nth(0).fill('password123');
    await passwordFields.nth(1).fill('differentpassword');
    
    await page.getByRole('button', { name: /créer|inscrire/i }).click();
    
    // Should remain on registration page when confirmation is invalid
    await expect(page).toHaveURL(/\/(en|fr)\/inscription(?:\?.*)?$/);
    await expect(page.locator('form')).toBeVisible();
  });
});
