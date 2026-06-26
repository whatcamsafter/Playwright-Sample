import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com';
const LOGIN_URL = `${BASE_URL}/login`;
const VALID_USERNAME = 'practice';
const VALID_PASSWORD = 'SuperSecretPassword!';
 
test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });


 test('TC-01 | Login page loads and displays required elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Login/i);
    await expect(page.locator('h1')).toContainText(/login/i);
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"], input[type="submit"]')).toBeVisible();
  });


  test('TC-02 | Successful login redirects to /secure and shows success message', async ({ page }) => {
    await page.locator('#username').fill(VALID_USERNAME);
    await page.locator('#password').fill(VALID_PASSWORD);
    await page.locator('button[type="submit"], input[type="submit"]').click();
 
    await expect(page).toHaveURL(`${BASE_URL}/secure`);
    await expect(page.locator('.flash, .alert, [class*="success"]')).toContainText(
      'You logged into a secure area!'
    );
    await expect(page.locator('a[href*="logout"], button', { hasText: /logout/i })).toBeVisible();
  });

    test('TC-03 | Invalid username shows "Invalid password." error', async ({ page }) => {
    await page.locator('#username').fill('wrongUser');
    await page.locator('#password').fill(VALID_PASSWORD);
    await page.locator('button[type="submit"], input[type="submit"]').click();
 
    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('.flash, .alert, [class*="error"], [class*="danger"]')).toContainText(
      'Your password is invalid!'
    );
  });

    test('TC-04 | Invalid password shows "Invalid password." error', async ({ page }) => {
    await page.locator('#username').fill(VALID_USERNAME);
    await page.locator('#password').fill('WrongPassword');
    await page.locator('button[type="submit"], input[type="submit"]').click();
 
    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('.flash, .alert, [class*="error"], [class*="danger"]')).toContainText(
      'Your password is invalid!'
    );
  });