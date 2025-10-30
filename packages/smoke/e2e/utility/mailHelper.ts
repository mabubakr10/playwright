import { JSDOM } from "jsdom";
import {expect, chromium} from '@playwright/test';
import {meetingBooker, send} from '../steps/locators/send'
import {campaigns} from '../steps/locators/campaigns';
import {elementText} from '../steps/data/elementData';
import {marketplace} from '../steps/locators/marketplace';
import MailosaurClient from 'mailosaur';

class MailHelper {
    async mailosaurGetSubject(
        apiKey: string,
        emailTo: string,
        serverID: string,
        subjectText: string,
        page
    ): Promise<void> {
        const client = new MailosaurClient(apiKey);

        const message = await client.messages.get(
            serverID,
            {sentTo: emailTo}, // Search criteria
            {timeout: 120000}  // Options
        );

        const subject = message.subject || '';
        if (subject !== subjectText) {
            await page.waitForTimeout(3000)
            await page.reload()
            const message = await client.messages.get(
                serverID,
                {sentTo: emailTo}, // Search criteria
                {timeout: 120000}  // Options
            );
        }
        expect(subject).toContain(subjectText);
    }

    async mailosaurGetElementText(
        apiKey: string,
        emailTo: string,
        serverID: string,
        locator: string,
        assertion: string
    ): Promise<void> {
        const client = new MailosaurClient(apiKey);

        const message = await client.messages.get(
            serverID,
            {sentTo: emailTo}, // Search criteria
            {timeout: 120000}  // Options
        );

        if (!message.html?.body) {
            throw new Error('Email does not contain an HTML body.');
        }
        const dom = new JSDOM(message.html.body);
        const element = dom.window.document.querySelector(locator);

        if (!element) {
            throw new Error(`Element not found for locator: ${locator}`);
        }
    }

    async mailosaurGetURLAndConfirmAddress(
        apiKey: string,
        emailTo: string,
        serverID: string
    ): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await page.waitForSelector(send.confirmAddressButton, {state: 'visible', timeout: 20000});
        await page.waitForTimeout(3000)
        const confirmButton = page.locator(send.confirmAddressButton);
        const successMessage = page.locator(send.verifyAddressIsConfirmed);

        await confirmButton.waitFor({state: 'visible'});
        await confirmButton.waitFor({state: 'attached'});
        await confirmButton.scrollIntoViewIfNeeded();// Scroll into view if necessary
        let maxAttempts = 3;
        let clickedSuccessfully = false;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            await confirmButton.click({force: true}).catch(() => {
            });
            try {
                await successMessage.waitFor({state: 'visible', timeout: 2000});
                clickedSuccessfully = true;
                break;
            } catch {
                console.log(`Attempt ${attempt}: Click did not trigger expected element`);
            }
            await page.waitForTimeout(500);  // Small delay before retrying
        }

        if (!clickedSuccessfully) {
            throw new Error("Failed to trigger next element after 3 attempts");
        }
        await browser.close();
    }

    async mailosaurGetURLAddConfirmAddress(
        apiKey: string,
        emailTo: string,
        serverID: string
    ): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await page.waitForSelector(send.confirmAddressButton, {state: 'visible', timeout: 20000});

        await page.locator(campaigns.input_mailing_address).fill(elementText.campaign_MailingAddresss);
        await page.locator(campaigns.city).fill(elementText.campaign_City);
        await page.locator(campaigns.state).click();
        await page.locator(campaigns.stateDropdown).waitFor({state: 'visible'});
        await page.locator(`.vs__dropdown-menu >> text=${elementText.campaign_State}`).click();
        await page.locator(campaigns.zip_code).fill(elementText.campaign_ZIP);
        await page.waitForTimeout(3000)
        const confirmButton = page.locator(send.confirmAddressButton);
        const successMessage = page.locator(send.verifyAddressIsConfirmed);
        await confirmButton.waitFor({state: 'visible'});
        await confirmButton.waitFor({state: 'attached'});
        await confirmButton.scrollIntoViewIfNeeded();// Scroll into view if necessary

        let maxAttempts = 3;
        let clickedSuccessfully = false;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            await confirmButton.click({force: true}).catch(() => {
            });
            try {
                await successMessage.waitFor({state: 'visible', timeout: 2000});
                clickedSuccessfully = true;
                break;
            } catch {
                console.log(`Attempt ${attempt}: Click did not trigger expected element`);
            }
            await page.waitForTimeout(500); // Small delay before retrying
        }

        if (!clickedSuccessfully) {
            throw new Error("Failed to trigger next element after 3 attempts");
        }
        await browser.close();
    }

    async mailosaurGetUrlToRedeemEGift(
        apiKey: string,
        emailTo: string,
        serverID: string
    ): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await page.waitForSelector(send.redeemGift, {state: 'visible', timeout: 20000});
        await page.locator(send.redeemGift).click()
        await page.waitForSelector(send.redeemEmailField, {state: 'visible', timeout: 20000});
        await page.fill(send.redeemEmailField, emailTo)
        await page.waitForTimeout(1000)
        await page.locator(send.verifyEmailButton).click()
        await page.waitForTimeout(1000)
        const successMsg = await page.locator(send.getConfirmationMessage).textContent();
        expect(successMsg).toContain(send.redemptionConfirmation);
        await browser.close();
    }

    async addressConfirmationWithGiftExchange(
        apiKey: string,
        emailTo: string,
        serverID: string
    ): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await this.selectCountryDropdownOption(page)
        await page.locator(marketplace.peepCookies).waitFor({state: 'visible'});
        await page.locator(marketplace.peepCookies).click();
        await page.locator(marketplace.selectThisGiftButton).waitFor({state: 'visible'});
        await page.locator(marketplace.selectThisGiftButton).click();
        await page.locator(campaigns.city).fill(elementText.campaign_City);
        await page.locator(campaigns.state).click();
        await page.locator(campaigns.stateDropdown).waitFor({state: 'visible'});
        await page.locator(`.vs__dropdown-menu >> text=${elementText.campaign_State}`).click();
        await page.locator(campaigns.zip_code).fill(elementText.campaign_ZIP);
        await page.locator(marketplace.streetAddress).fill("Terminal B")
        await page.locator(send.confirmAddressButton).waitFor({state: 'visible'});
        await page.locator(send.confirmAddressButton).click()
        await page.locator(marketplace.AddressIsCorrectBtn).waitFor({state: 'visible'});
        await page.locator(marketplace.AddressIsCorrectBtn).click();
        await browser.close();
    }

    async mailosaurGetURLAddConfirmAddressForMarketPlace(
        apiKey: string,
        emailTo: string,
        serverID: string
    ): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await this.selectCountryDropdownOption(page)
        await page.locator(marketplace.acceptYourGiftButton).waitFor({state: 'visible'});
        await page.locator(marketplace.acceptYourGiftButton).click()
        await page.locator(marketplace.city).waitFor({state: 'visible'});
        await page.locator(marketplace.city).fill(elementText.campaign_City);
        await page.locator(marketplace.state).click();
        await page.locator("//li[text()='Alabama']").click()
        await page.locator(marketplace.zip).fill(elementText.campaign_ZIP);
        await page.locator(marketplace.streetAddress).fill("Terminal B")
        await page.locator(marketplace.submitButton).waitFor({state: 'visible'});
        await page.locator(marketplace.submitButton).click()
        await page.locator(marketplace.AddressIsCorrectBtn).waitFor({state: 'visible'});
        await page.locator(marketplace.AddressIsCorrectBtn).click();
        await browser.close();
    }

    async ConfirmMeetingBookerOutreach(apiKey: string, emailTo: string, serverID: string): Promise<void> {
        const { page, browser } = await this.openNewBrowserAndPage();
        await this.clickOnEmailButton(page,apiKey,emailTo,serverID)
        await this.selectCountryDropdownOption(page)
        await page.locator(marketplace.acceptYourGiftButton).waitFor({state: 'visible'});
        await page.waitForTimeout(1000)
        await page.locator(marketplace.acceptYourGiftButton).click()
        await page.waitForTimeout(1000)
        await this.fillMeetingBookerForm(page)
        await page.locator(meetingBooker.successMessage).waitFor({state: 'visible'});
        await browser.close();
    }

    async openNewBrowserAndPage()
    {
        const browser = await chromium.launch({headless: true});
        const context = await browser.newContext();
        const page = await context.newPage();
        return {page,browser};
    }
    async fillMeetingBookerForm(page){
        // Meeting Booker Flow
        const iframe = page.frameLocator(meetingBooker.outReachFrame);
        // Wait for iframe to be ready
        await iframe.locator(meetingBooker.availableTimeSlot).first().waitFor({
            state: 'visible',
            timeout: 20000
        });
        // Click first available slot
        await iframe.locator(meetingBooker.availableTimeSlot).first().click();
        // Fill form
        await iframe.locator(meetingBooker.firstName).fill("Afshan");
        await iframe.locator(meetingBooker.lastName).fill("send");
        await iframe.locator(meetingBooker.email).fill(`afshan+${Date.now()}@send.com`);
        // Click Book meeting and wait for network activity inside iframe to finish
        await iframe.locator(meetingBooker.bookMeetingBtn).click(),
        await page.waitForTimeout(2000)
    }
    async clickOnEmailButton(page,apiKey,emailTo,serverID)
    {
        const client = new MailosaurClient(apiKey);
        const messages: any = await client.messages.get(
            serverID,
            {sentTo: emailTo}, // Search criteria
            {timeout: 120000}, // Options
        );
        await page.goto(messages.html.links[0].href); //opens the recent email's link
        await page.waitForTimeout(1000)
    }
    async selectCountryDropdownOption(page) {
    await page.locator(marketplace.countryDropdown).waitFor({state: 'visible'});
    await page.locator(marketplace.countryDropdown).click()
    await page.waitForTimeout(1000)
    await page.locator(marketplace.countryValue).waitFor({state: 'visible'});
    await page.locator(marketplace.countryValue).click()
    await page.locator(marketplace.continueButton).waitFor({state: 'visible'});
    await page.locator(marketplace.continueButton).click()
    }
}
export default new MailHelper();
