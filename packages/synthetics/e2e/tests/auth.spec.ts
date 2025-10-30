import { test, expect } from '@playwright/test';
import { config } from '@automation-suite/shared';

test.describe('Authentication E2E Tests @sending', () => {
  test('should login to sending platform @critical @security', async ({ page }) => {
    await page.goto('/');

    // wait to redirect to login page
    await expect(page).toHaveURL(/.*?\/u\/login/);

    // Fill in username
    await expect(page.locator('#username')).toBeVisible();
    await page.fill('#username', config.auth0UserEmail);

    // click continue button
    await page.click('button[type="submit"]');

    // Wait for the password field to be visible
    await expect(page.locator('#password')).toBeVisible();
    await page.fill('#password', config.auth0UserPassword);

    await page.click('button[type="submit"]');

    // Verify successful login
    await expect(page).toHaveURL(/.*?\/sends/);
  });
});
