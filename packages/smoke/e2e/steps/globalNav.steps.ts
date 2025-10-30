import {createBdd} from "playwright-bdd";
const { When } = createBdd();
import { globalNav } from './locators/globalNav'

When(/^the user clicks on main menu in navigation bar$/, async function ({page}) {
  await page.locator(globalNav.mainMenu).click()
});

When(/^the user clicks on "([^"]*)" option under "([^"]*)" tab on navigation bar$/, async function ({page},tabToClick,tab) {
  await page.locator('app-navbar button', { hasText: new RegExp(`^\\s*${tab}\\s*$`) }).click();
  await page.locator(`a[href*='${tabToClick}']`).last().click()
});

When(/^the user clicks on Hamburger icon$/, async function ({page}) {
  await page.locator(globalNav.hamburgerIcon).click()
});

When(/^the user clicks on "([^"]*)" tab on left menu panel$/, async function ({page},tabToClick) {
  await page.locator(`app-navbar >> text=${tabToClick}`).click();
});

When(/^the user clicks on send Logo$/, async function ({page}) {
  await page.waitForTimeout(1500)
  await page.locator(`(//img[@alt="Home"]/parent::div)[1]`).first().click();
});
