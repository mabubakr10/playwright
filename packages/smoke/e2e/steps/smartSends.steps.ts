import { smartSend } from './locators/smartSend.ts';
import { elementText } from './data/elementData';
import {createBdd} from "playwright-bdd";
const { When, Then } = createBdd();
import {expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

let smartSendRecommendation1: string, smartSendRecommendation2: string;
const randomRecipientFirstName: string = faker.lorem.words(2);

When(/^the user searches for a product on smart send page "([^"]*)"$/, async function ({page}, product) {
    await page.locator(smartSend.searchSmartSend).waitFor();
    await page.locator(smartSend.searchSmartSend).click();
    await page.locator(smartSend.searchSmartSend).fill(product);
    await page.keyboard.press('Enter');
    await page.waitForFunction((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element !== null;
    }, smartSend.smartSendCookieProduct);
});

Then(/^the user verifies that correct count and set of recommendations is displaying "([^"]*)" "([^"]*)"$/, async function ({page}, searchResult1, searchResult2) {
    const smartSendRecommendationCount = await page.evaluate(() => {
        const smartSendParentElement = document.querySelector('[data-testid=product-grid]');
        return smartSendParentElement ? smartSendParentElement.children.length : 0;
    });
    smartSendRecommendation1 = `//div[@data-testid='product-grid']//div[1]//a[text()='${searchResult1}']`;
    smartSendRecommendation2 = `//div[@data-testid='product-grid']//div[1]//a[text()='${searchResult2}']`;
    await page.waitForTimeout(500)
    expect(smartSendRecommendationCount.toString()).toContain('15');
    await page.locator(smartSendRecommendation1).waitFor({ state: 'visible' });
    expect(await page.locator(smartSendRecommendation1).isVisible()).toBeTruthy();
    expect(await page.locator(smartSendRecommendation2).isVisible()).toBeTruthy();
});

When(/^the user selects first product on smart send page$/, async function ({page}) {
    await page.locator(smartSendRecommendation1).waitFor({ state: 'visible' });
    await page.locator(smartSendRecommendation1).click();
});

When(/^the user clicks on send it now button$/, async function ({page}) {
    await page.locator(smartSend.sendItNowButton).click()
});

When(/^the user clicks on I have the recipient's address toggle$/, async function ({page}) {
    await page.locator(smartSend.recipientAddressToggle).waitFor({ state: 'visible' });
    await page.locator(smartSend.recipientAddressToggle).click()
});

When(/^the user enters recipient address and send$/, async function ({page}) {
    await page.locator(smartSend.recipientFirstAndLastName).waitFor({ state: 'visible' });
    await page.locator(smartSend.recipientFirstAndLastName).fill(randomRecipientFirstName);
    await page.locator(smartSend.recipientAddress).fill(elementText.campaign_MailingAddresss);
    await page.locator(smartSend.recipientCity).fill(elementText.campaign_City);
    await page.locator(smartSend.recipientZip).fill(elementText.campaign_ZIP);
    await page.locator(smartSend.recipientEmail).fill(elementText.email);
    await page.locator(smartSend.notecardMessage).fill(elementText.physicalNotecardMessage);
    await page.locator(smartSend.sendButton).click();
});
