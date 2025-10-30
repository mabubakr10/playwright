import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { login } from './locators/login'
import { users } from './data/userData'
import { elementText } from './data/elementData'
import input from '../utility/input'
import { config } from '@automation-suite/shared';

const { Given, Then } = createBdd();

Given(/^the user adds credentials for "([^"]*)"$/, async function ({ page }, user: string) {
  try {
    await page.goto(config.appUrl);
  } catch (error) {
    console.log('Network error, retrying...');
    await page.goto(config.appUrl, { timeout: 30000 });
  }

  const userData = users[user as keyof typeof users];
  await page.locator(login.username).click();
  await page.locator(login.username).pressSequentially(userData.username);
  await page.click(login.loginButton)
  await page.locator(login.password).click();
  await page.locator(login.password).pressSequentially(userData.password);
  await page.click(login.loginButton)
});

