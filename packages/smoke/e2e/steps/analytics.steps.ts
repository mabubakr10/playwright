import {createBdd} from 'playwright-bdd';
const {When} = createBdd();
import { analytics } from './locators/analytics'
import { expect } from "@playwright/test";

let sendCount: string, inventoriedInProgressCount: string, cancelledSendCount: string, cancelledSendCountUpdated: string;

When(/^the user checks count of in progress sends on analytics$/, async function ({page}) {
    await page.waitForSelector(analytics.inProgressSends, { state: 'visible', timeout: 10000 });
    sendCount = await page.locator(analytics.inProgressSends).textContent()
});

When(/^the user checks count of cancelled sends on analytics$/, async function ({page}) {
    await page.waitForSelector(analytics.cancelledSends, { state: 'visible', timeout: 10000 });
    cancelledSendCount = await page.locator(analytics.cancelledSends).textContent()
});

When(/^the user verifies that count of cancelled sends is incremented/, async function ({page}) {
    await page.waitForTimeout(2000)
    await page.reload()
    cancelledSendCountUpdated = await page.locator(analytics.cancelledSends).textContent()
    expect(cancelledSendCountUpdated).not.toBe(cancelledSendCount);
});

When(/^the user verifies that count of in progress sends is incremented$/, async function ({page}) {
    inventoriedInProgressCount = await page.locator(analytics.inProgressSends).textContent()
    expect(sendCount).not.toBe(inventoriedInProgressCount)
});
