import {createBdd} from 'playwright-bdd';
const {When} = createBdd();
import { sendTracker } from '../steps/locators/sendTracker';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { elementText } from './data/elementData';
import { smartSend } from './locators/smartSend';
import moment from 'moment';

const randomRecipientFirstName: string = faker.lorem.words(2);
const randomRecipientLastName: string = faker.lorem.words(2);

When(/^the user verifies "([^"]*)" of campaign on send tracker page$/, async function ({page},status) {
    await page.waitForTimeout(2000)
    await page.reload({ waitUntil: 'load' });
    await page.locator(sendTracker.sendStatus).waitFor({ state: 'visible', timeout: 10000 });
    let sendStatusText = await page.locator(sendTracker.sendStatus).textContent();
    if (sendStatusText?.replace(/\s+/g, ' ').trim() === "Initiated") {
        await page.waitForTimeout(2000) // condition added if the sendtracker does not update status in 2 second than wait for another 2 seconds
        await page.reload({ waitUntil: 'load' });
        await page.waitForFunction(selector => {
            const element = document.querySelector(selector);
            const text = element?.textContent ?? '';
            return text.includes(status);
        }, sendTracker.sendStatus);
        sendStatusText = await page.locator(sendTracker.sendStatus).textContent()
    }
    expect(sendStatusText).toContain(status);
});

When(/^the user verify touch name "([^"]*)" and touch status "([^"]*)" on send tracker$/, async function ({page}, touchname, touchstatus) {
    // Verify Touch name on Send Tracker
    await page.locator(sendTracker.touchName).waitFor({ state: 'visible', timeout: 15000 });
    let actualResult = (await page.locator(sendTracker.touchName).innerText()).trim();
    expect(actualResult).toContain(touchname);

    //Verify touch status
    await page.waitForTimeout(2000)
    await page.reload({ waitUntil: 'load' });
    actualResult = (await page.locator(sendTracker.touchStatus).innerText()).trim();
    if(actualResult == " Suspicious Email ")
    {
        await page.locator(sendTracker.sendDetailsMenu).scrollIntoViewIfNeeded();
        await page.locator(sendTracker.sendDetailsMenu).click()
        await page.locator(sendTracker.viewSendDetails).first().waitFor({ state: 'visible' });
        await page.locator(sendTracker.approveSendButton).first().click()
        await page.locator(sendTracker.confirmApprovalButton).waitFor({ state: 'visible' });
        await page.click(sendTracker.confirmApprovalButton)
    }
    await page.waitForTimeout(3000)
    await page.reload({ waitUntil: 'load' });
    actualResult = (await page.locator(sendTracker.touchStatus).innerText()).trim();
    expect(actualResult).toContain(`${touchstatus}`);
});

When(/^the user opens send details of first send on send tracker$/, async function ({page}) {
    await page.reload()
    await page.waitForTimeout(1000); // added wait because script is failing without this.
    await page.evaluate(() => { document.body.style.zoom = '0.7'; });
    await page.waitForTimeout(1000); // added wait because script is failing without this.
    // await page.locator(sendTracker.sendDetailsMenu).scrollIntoViewIfNeeded();
    await page.locator(sendTracker.sendDetailsMenu).click()
    await page.waitForTimeout(1000); // added wait because script is failing without this.
    await page.locator(sendTracker.viewSendDetails).first().waitFor({ state: 'visible' });
    await page.locator(sendTracker.viewSendDetails).first().click();
})

When(/^the user cancels send from send details page$/, async function ({page}) {
    await page.waitForTimeout(5000); // added wait because script is failing without this.
    await page.locator(sendTracker.cancelSendButton).waitFor({ state: 'visible' });
    await page.locator(sendTracker.cancelSendButton).click();
    await page.locator(sendTracker.confirmCancelButton).waitFor({ state: 'visible' });
    await page.locator(sendTracker.confirmCancelButton).click();
});

When(/^the user selects Send Again option for first send on send tracker$/, async function ({page}) {
    // await page.waitForTimeout(5000); // added wait because script is failing without this.
    await page.locator(sendTracker.sendDetailsMenu).scrollIntoViewIfNeeded();
    await page.locator(sendTracker.sendDetailsMenu).click()
    await page.locator(sendTracker.sendAgainButton).first().waitFor({ state: 'visible' });
    await page.locator(sendTracker.sendAgainButton).first().click();
})

When(/^the user clicks on yes button to continue resend process$/, async function ({page}) {
    await page.locator(sendTracker.yesProceedButton).waitFor({ state: 'visible' });
    await page.locator(sendTracker.yesProceedButton).click();
})

When(/^the user enters recipient details and send$/, async function ({page}) {
    await page.locator(smartSend.recipientFirstName).waitFor({ state: 'visible' });
    await page.locator(smartSend.recipientFirstName).fill(randomRecipientFirstName);
    await page.locator(smartSend.recipientLastName).fill(randomRecipientLastName);
    await page.locator(smartSend.recipientEmail).fill(elementText.email);
    await page.locator(smartSend.notecardMessage).fill(elementText.physicalNotecardMessage);
    await page.locator(smartSend.sendButton).click();
});

When(/^the user verifies date and time for recent campaign$/, async function ({page}) {
    const currentTime = moment();
    const formattedCurrentDate = currentTime.local().format("YYYY-MM-DD");
    const timeLocator = await page.locator(sendTracker.dateCreatedColumn).textContent();
    if (!timeLocator) {
        throw new Error("Could not retrieve date from sendTracker.dateCreatedColumn");
    }
    const dateText = timeLocator.replace(",", "");
    const parsedDate = moment(dateText, "MMM DD YYYY", true).local();
    const formattedParsedDate = parsedDate.format("YYYY-MM-DD");
    expect(formattedParsedDate).toBe(formattedCurrentDate);
});

When(/^the user verifies smart send campaign name on send tracker page$/, async function ({page}) {
    await page.reload();
    await page.locator(sendTracker.campaignName).waitFor({ state: 'visible', timeout: 10000 });
    const campaignNameText = await page.locator(sendTracker.campaignName).textContent();
    expect(campaignNameText).toContain('Smart_Send_Campaign');
});

When(/^the user verifies sent on behalf company name "([^"]*)" from send details$/, async function ({page},companyName) {
    await page.locator(sendTracker.sentOnBehalfOf).waitFor({ state: 'visible', timeout: 10000 });
    const sentOnBehalfOfText = `//div[contains(@class, 'text-base') and normalize-space(.)='${companyName}']`
    const locator = page.locator(`xpath=${sentOnBehalfOfText}`);
    expect(locator).toHaveCount(1);
});
