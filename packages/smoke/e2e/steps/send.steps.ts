import {createBdd} from "playwright-bdd";
const { Given, When, Then } = createBdd();
import { displayName } from './campaigns.steps'
import {chromium, expect} from '@playwright/test';
import * as sendPage from "./locators/send";
import { campaigns } from './locators/campaigns';
import { faker } from '@faker-js/faker';
import * as addressConfirmationData from './data/elementData';
import uploadUtility from '../utility/upload';
import finance from '../utility/finance'
import mailHelper from '../utility/mailHelper'
import { mailData } from './data/mailosaur'
import input from "../utility/input";
import {config} from "@automation-suite/shared";
import {marketplace} from "./locators/marketplace";

let actualResult: any, balanceBeforeSend: any, balanceAfterSend: any, page2: any, browser: any;
const customBundleName = 'bundle ' + faker.lorem.words(2)
let campaignName = faker.lorem.words(2)

When(/^the user applies filter for "([^"]*)" touch on send page$/, async function ({page},filter) {
    await page.locator(`//span[contains(text(),'${filter}')]`).click();
});

When(/^the user clicks on the touch on send page$/, async function ({page}) {
    const touchToSend = `h3[title='${displayName}']`;
    await page.waitForSelector(sendPage.send.loader, { state: 'hidden', timeout: 20000 });
    await page.locator(touchToSend).first().click();
});

When(/^the user selects "([^"]*)" as a send option on send page$/, async function ({page},sendoption) {
    const sendOption = `img[src*='${sendoption}']`;
    await page.locator(sendOption).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(750)
    await page.locator(sendOption).first().click({ timeout: 60000 });
    await page.waitForTimeout(750)
    expect(sendPage.send.sendingMethodDropDown).toBeTruthy();
});

When(/^the user enters recipient "([^"]*)" on send page$/, async function ({page},email) {
    await page.click(sendPage.send.emailField);
    await page.fill(sendPage.send.emailField, email)
});

Then(/^the user sends the touch and verifies the message for "([^"]*)"$/, async function ({page},sendVia) {
    const className = sendPage.sendViaSuccessMessages[sendVia];
    if (className !== 'single-egift-link-message') {
        await page.locator(sendPage.send.sendButton).click();
        const sendMessage = (`//p[contains(@class,'${className}')]/ancestor::div[@role='dialog']//h3`)
        expect(sendMessage).toBeTruthy()
        actualResult = await page.textContent(sendMessage)
        expect(actualResult).toContain("Successfully Sent!");
        if (className === 'multiple-egift-link-message') {
            await page.locator(sendPage.send.closePopup).click();
        }
        else {
            await page.locator(sendPage.send.sendTracker).click()
        }
    }
    else {
        await page.locator(sendPage.send.sendButton).click();
        actualResult = await page.textContent(`.${className}`)
        await expect(actualResult).toContain("Success!");
        await page.locator(sendPage.send.gotItBtn).click();
    }
});

When(/^the user enters the "([^"]*)" in the search bar$/, async function ({page},touchName) {
    await page.locator(sendPage.send.searchSend).click();
    await page.locator(sendPage.send.searchSend).fill(touchName)
    await page.keyboard.press('Enter');
});

Then(/^the user verifies the search result for touches "([^"]*)"$/, async function ({page},touchName) {
    const expected = await input.getElementText({ page }, sendPage.send.searchResultTouches)
    expect(expected).toContain(touchName)
});

When(/^the user selects the First Touch from the Send Page$/, async function ({page}) {
    await page.locator(sendPage.send.selectFirstTouch).waitFor({ state: 'visible', timeout: 50000 });
    await page.locator(sendPage.send.selectFirstTouch).click()
});

When(/^the user Uploads "([^"]*)" File with valid recipient details$/, async function ({page},file) {
    await uploadUtility.bulkUpload({ page }, file)
    await page.locator(sendPage.send.submitButton).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(sendPage.send.submitButton).click();
});

When(/^the user waits for loader to disappear on send page/, async function ({page}) {
    await page.waitForSelector(sendPage.send.loaderCSV, { state: 'hidden', timeout: 40000 });
});

When(/^the user sends bulk items and verifies the message for/, async function ({page}) {
    await page.waitForSelector(sendPage.send.sendCampaignButton, { state: 'visible', timeout: 20000 });
    await page.locator(sendPage.send.sendCampaignButton).click()
    actualResult = await page.textContent(sendPage.send.bulkSendSuccessMessage)
    expect(actualResult).toContain("You're almost done.");
    await page.waitForTimeout(2000) //Adding this because all bulk sends were stuck in pending
});

When(/^the user enters custom bundle name/, async function ({page}) {
    await page.locator(campaigns.customBundleTouchName).fill(customBundleName)
});

When(/^the user selects warehouse for custom bundle/, async function ({page}) {
    await page.selectOption(campaigns.customBundleWarehouseDropdown, "10");

});

When(/^the user selects product and enter quantity/, async function ({page}) {
    await page.locator(campaigns.customBundleProduct).first().click()
    await page.locator(campaigns.customBundleProductQuantity).fill("1")
});

When(/^the user selects product to add in bundle/, async function ({page}) {
    await page.locator(campaigns.bundleProductSendPage).waitFor({ state: 'visible', timeout: 10000 });
    await page.locator(campaigns.bundleProductSendPage).click()
});

When(/^the user clicks on next button send page/, async function ({page}) {
    await page.locator(campaigns.sendButton).click()
});

When(/^the user selects "([^"]*)" touch$/, async function ({page},touchToCreate) {
    const touch = `//span[contains(text(),'${touchToCreate}')]`;
    await page.locator(touch).waitFor({ state: 'visible', timeout: 10000 });
    await page.click(touch);
});

Then(/^the user clicks on the Next Step button on marketplace touch creation$/, async function ({page}) {
    await page.locator(campaigns.nextButton).click()
});

When(/^the user selects marketplace "([^"]*)" product$/, async function ({page},product) {
    let productToSelect=`//a[contains(., '${product}')]`
    await page.locator(productToSelect).first().click({ force: true })
});

When(/^the user click on Add to Campaign button/, async function ({page}) {
    await page.locator(campaigns.addToCampaign).click()
});

When(/^the user enter bulk send message inside the field$/, async function ({page}) {
    await page.locator(sendPage.send.enterMessage).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(sendPage.send.enterMessage).fill(addressConfirmationData.elementText.random_message)
    await page.keyboard.press('Tab');
});

When(/^the user selects the created bundle from the Send Page "([^"]*)"$/, async function ({page},section) {
    await page.locator(campaigns.searchtouch).fill(customBundleName)
    let selectTouch= `//h5[contains(text(),'${section}')]/parent::div/parent::div//h3[@title='touchName']`;
    const touchToSend = selectTouch.replace(
        'touchName',
        customBundleName
    );
    await page.locator(touchToSend).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(touchToSend).click();
});

When(/^the user enters bundle name on Touch Details page$/, async function ({page}) {
    await page.locator(campaigns.senderName).fill(customBundleName)
});

When(/^the user selects egift (.*) on send page$/, async function ({page},price) {
    await page.locator(`${campaigns.touchPrice}${price})]/ancestor::button`).click()
});

When(/^the user clicks to see the live preview of the email$/, async function ({page}) {
    await page.locator(campaigns.previewBtn).waitFor({ state: 'visible', timeout: 5000 });
    await page.locator(campaigns.previewBtn).click();
});

Then(/^the user verify the message in preview window$/, async function ({page}) {
    await page.locator(campaigns.gotItBtn).click()
});

When(/^the user enters recipient detail for "([^"]*)" single Email$/, async function ({page},touchType) {
     campaignName = faker.lorem.words(4)
   if(touchType=="Sendoso Direct")
       await page.locator(campaigns.enterRecipientEmail).fill(addressConfirmationData.elementText.campaign_email);
   else
       await page.locator(campaigns.enterRecipientEmail).fill(addressConfirmationData.newCampaignCreationData.email);
    await page.locator(campaigns.input_sender_name).fill(campaignName);
    await page.locator(campaigns.input_mailing_address).fill(addressConfirmationData.elementText.campaign_MailingAddresss);
    await page.locator(campaigns.city).fill(addressConfirmationData.elementText.campaign_City);
    await page.locator(campaigns.state).click();
    await page.locator(campaigns.stateDropdown).waitFor({ state: 'visible' });
    await page.locator(`.vs__dropdown-menu >> text=${addressConfirmationData.elementText.campaign_State}`).click();
    await page.locator(campaigns.zip_code).fill(addressConfirmationData.elementText.campaign_ZIP);
});

When(/^the user enters recipients detail for Sendoso Direct single Email with no address$/, async function ({page}) {
     campaignName = faker.lorem.words(2)
    await page.locator(campaigns.input_sender_name).fill(campaignName);
    await page.locator(campaigns.enterRecipientEmail).fill(addressConfirmationData.elementText.campaign_email);
    await page.locator(campaigns.enterCompanyName).fill(addressConfirmationData.elementText.companyName);
});

When(/^the user clicks the finish button$/, async function ({page}) {
    await page.locator(campaigns.finishButton).click();
});

When(/^the user sends the touch and closes success pop up$/, async function ({page}) {
    await page.locator(campaigns.sendButton).click({ force: true });
    await page.locator(campaigns.doneSendButton).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(campaigns.doneSendButton).click();
});

Then(/^the user verifies if playbook is disabled$/, async function ({page}) {
    await page.waitForSelector(sendPage.send.playbookBtn, { state: 'hidden'});
});

When(/^the user clicks on the playbook button$/, async function ({page}) {
    await page.waitForSelector(sendPage.send.loader, { state: 'hidden', timeout: 20000 });
    await page.waitForSelector(sendPage.send.playbookBtn, { state: 'visible', timeout: 20000 });
    await page.click(sendPage.send.playbookBtn);
});

Then(/^the user verifies playbook button redirects to correct url$/, async function ({page}) {
    await page.waitForSelector(sendPage.send.playbookSection, { state: 'visible', timeout: 20000 });
    expect(page.url()).toContain(sendPage.send.playbookUrl);
});

When(/^the user clicks Enable Address Confirmation Button$/, async function ({page}) {
    await page.locator(sendPage.send.enableAddressConfirmation).click()
});

When(/^the user selects I dont have recipients address option$/, async function ({page}) {
    await page.locator(sendPage.send.noRecipientAddress).click()
});

When(/^the user clicks Save Address Confirmation Button$/, async function ({page}) {
    await page.locator(sendPage.send.saveAddressConfirmation).click()
});

Then(/^the user verifies playbook tooltip$/, async function ({page}) {
    await page.waitForSelector(sendPage.send.tooltipBlock, { state: 'visible', timeout: 20000 });
    await page.waitForSelector(sendPage.send.gotItLinkTooltip, { state: 'visible', timeout: 20000 });
});

When(/^the user clicks on occasion "([^"]*)"$/, async function ({page},occasion) {
    await page.waitForSelector(sendPage.send.occasionOptions, { state: 'visible', timeout: 20000 });
    const occasionXpath = "//button[contains(., '" + occasion + "')]";
    await page.locator(occasionXpath).click()
});

Then(/^the user verifies touches card for unavailable touches$/, async function ({page}) {
    await page.waitForSelector(sendPage.send.unavailablePlaysHeading, { state: 'visible', timeout: 20000 });
    await page.waitForSelector(sendPage.send.unavailablePlaySection, { state: 'visible', timeout: 20000 });
});

When(/^the user verifies existing balance "([^"]*)" send on send page$/, async function ({page},option) {
    await page.waitForTimeout(3000) // added wait because script is failing without this.
    await page.reload()
    await page.waitForTimeout(2000)
    await page.waitForSelector(sendPage.send.currentBalance, { state: 'attached', timeout: 20000 });
    if(option=="Before")
        balanceBeforeSend = await finance.getUserBalance({page})
    else if(option=="After")
        balanceAfterSend = await finance.getUserBalance({page})

});

When(/^the user verifies that balance has been deducted$/, async function ({page}) {
    expect(balanceBeforeSend).not.toBe(balanceAfterSend);
});

When(/^the user verifies that balance has been refunded$/, async function ({page}) {
    await page.waitForTimeout(5000) // added wait because script is failing without this.
    await page.reload()
    await page.waitForTimeout(2000) // added wait because script is failing without this.
    await page.waitForSelector(sendPage.send.analyticsCurrentUserBalance, { state: 'attached', timeout: 20000 });
    const balance = await page.locator(sendPage.send.analyticsCurrentUserBalance).evaluate(element => {
        const text = element.textContent || '';
        return parseFloat(text.replace(/,/g, '').replace(/\$/g, ''));
    });
    expect(balanceBeforeSend).toBe(balance);
});

When(/^the user verifies that the recipient has received the email for Address Confirmation via Email for "([^"]*)" user$/, async function ({page},user) {
    await page.waitForTimeout(15000) //waiting for recent email to appear in mailosaur
    let email_subject = "Confirm your address with Iqra Dilawar from New Inventory"
    await mailHelper.mailosaurGetSubject(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID,
        email_subject,page
    );
});

Then(/^the user verifies the contents of the email for Address Confirmation via Email$/, async function ({page}) {
    await mailHelper.mailosaurGetElementText(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID,
        sendPage.send.acViaEmailText,
        mailData.assertion_ac_via_email_text
    );
});

Then(/^the user confirms address on address verification form$/, async function ({page}) {
    await mailHelper.mailosaurGetURLAndConfirmAddress(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID
    );
});

Then(/^the user adds address on address verification form$/, async function ({page}) {
    await mailHelper.mailosaurGetURLAddConfirmAddress(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID
    );
});

Given(/^the user enters "([^"]*)" inside message field$/, async function ({page},message) {
    await page.locator(sendPage.send.messageField).first().fill(message)
});

Given(/^the user clicks on Create Party Link button$/, async function ({page}) {
    await page.waitForTimeout(1500)
    await page.locator(sendPage.send.createPartyLink).click();
    await page.locator(sendPage.send.copyLink).waitFor({ state: 'visible' });
    await page.locator(sendPage.send.copyLink).click();
});

When(/^the user verifies that the recipient has received the email for eGift redemption$/, async function ({page}) {
    await page.waitForTimeout(10000) //waiting for recent email to appear in mailosaur
    await mailHelper.mailosaurGetSubject(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID,
        mailData.email_subject_for_redemption_flow,page
    );
});

When(/^the user send the touch and confirm send action$/, async function ({page}) {
    await page.locator(campaigns.sendButton).click({ force: true });
    await page.waitForSelector(sendPage.send.goToSendIssuesButton)
    await page.locator(sendPage.send.goToSendIssuesButton).click()
    await page.waitForSelector(sendPage.send.ellipsesButton)
    await page.locator(sendPage.send.ellipsesButton).click();
    await page.waitForSelector(sendPage.send.approveSendButton)
    await page.locator(sendPage.send.approveSendButton).click();
    await page.waitForSelector(sendPage.send.confirmApproval)
    await page.locator(sendPage.send.confirmApproval).click()
});

When(/^the user opened copied link$/, async function ({page}) {
    await page.waitForTimeout(3000)
    const newLink = await page.locator(sendPage.partylink.copylink).evaluate(el => (el as HTMLInputElement).value);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page2 = await context.newPage();
    await page2.goto(newLink, { waitUntil: 'domcontentloaded', timeout: 100000 });
});

When(/^user fill the party link form for "([^"]*)" touch$/, async function ({},touch) {
    let eGift=`//button[text()='${touch}']/parent::div/parent::div`
    await page2.locator(marketplace.countryDropdown).waitFor({state: 'visible'});
    await page2.locator(marketplace.countryDropdown).click()
    await page2.waitForTimeout(1000)
    await page2.locator(marketplace.countryValue).waitFor({state: 'visible'});
    await page2.locator(marketplace.countryValue).click()
    await page2.locator(marketplace.continueButton).waitFor({state: 'visible'});
    await page2.locator(marketplace.continueButton).click()
    await page2.locator(eGift).waitFor({state: 'visible'});
    await page2.locator(eGift).click();
    await page2.locator(marketplace.confirmChoiceButton).waitFor({state: 'visible'});
    await page2.locator(marketplace.confirmChoiceButton).click();
    await page2.locator(marketplace.acceptYourGiftButton).waitFor({state: 'visible'});
    await page2.locator(marketplace.acceptYourGiftButton).click()
    await page2.locator(marketplace.name).fill("Afshan Shakoor")
    await page2.locator(marketplace.email).fill("afshanshakoor@sendoso.com")
    await page2.locator(marketplace.submitButton).waitFor({state: 'visible'});
    await page2.locator(marketplace.submitButton).click()
    await page2.waitForTimeout(1000)
    await browser.close();

});

When(/^the user hits send tracker link$/, async function ({page},) {
    const baseUrl = config.appUrl
    await page.goto(`${baseUrl}/tracker`, {
        waitUntil: 'domcontentloaded',
        timeout: 100000
    });
});

Then(/^the user approved the send$/, async function ({page}) {
    await page.locator(sendPage.send.ellipsesButton).click();
    await page.locator(sendPage.send.approveSendButton).click()
    await page.locator(sendPage.partylink.confirmApproval).click()
    await page.waitForTimeout(2000)
});
Given(/^the user search for touch "([^"]*)"$/, async function ({page},touchName) {
    await page.locator(campaigns.searchtouch).waitFor({ state: 'visible', timeout: 50000 });
    await page.locator(campaigns.searchtouch).fill(touchName)
    await page.keyboard.press('Enter');
    await page.locator(sendPage.send.selectFirstTouch).click()
});
Given(/^the user select "([^"]*)" touch on send page$/, async function ({page},touchname) {
    await page.locator(campaigns.searchtouch).type(touchname)
    const touchToSendLocator = `h3[title='${touchname}']`
    await page.waitForTimeout(2000)
    const touchToSend = page.locator(touchToSendLocator).first();
    await touchToSend.waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(1500)
    await touchToSend.click();
});

When( /^the user Enable Meeting Booker functionality$/, async function ({page}) {
    await page.locator(campaigns.enableMeetingBooker).click();
    await page.locator(campaigns.saveMeeting).click()
} );

Given(/^the user enters "([^"]*)" inside Notecard message field$/, async function ({page},message) {
    await page.locator(sendPage.send.messageField).last().fill(message)
});

Given(/^the user selects a team member to send on behalf of "([^"]*)"$/, async function ({page},member) {
    await page.locator(campaigns.sendAsField).click()
    await page.locator(campaigns.sendAsField).fill(member)
    await page.keyboard.press('Enter')
});

Given(/^the user clicks on go to send tracker button$/, async function ({page}) {
    await page.waitForTimeout(1500)
    await page.locator(sendPage.send.goToSendTrackerButton).click()
});