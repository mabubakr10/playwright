import {createBdd} from 'playwright-bdd';
import * as campaignsPage from './locators/campaigns'
import mailHelper from "../utility/mailHelper";
import {mailData} from "./data/mailosaur";
const {Given, When,Then} = createBdd();
let campaignName: string

When(/^the user clicks on Try the New Campaign Creation Flow button$/, async function ({page}) {
    await page.click(campaignsPage.campaigns.newCampaignCreationFlowBtn);
});

When(/^the user clicks on Skip to Gift Selection button$/, async function ({page}) {
    await page.locator(campaignsPage.campaignsSetup.skipToGiftSelectionBtn).waitFor({ state: 'visible', timeout: 70000 });
    await page.click(campaignsPage.campaignsSetup.skipToGiftSelectionBtn);
});

When(/^the user clicks on "([^"]*)" button$/, async function ({page}, buttonToClick) {
    let continueButton = `//button[text()='${buttonToClick}']`
    await page.locator(continueButton).click();
});

When(/^the user enter the campaign name$/, async function ({page}) {
    campaignName = Math.random().toString().substr(2, 5)
    await page.locator(campaignsPage.campaignsDetails.campaignNameField).waitFor({ state: 'visible'});
    await page.locator(campaignsPage.campaignsDetails.campaignNameField).fill(campaignName)
});

When(/^the user set "([^"]*)" limit per send$/, async function ({page}, limit) {
    await page.waitForSelector(campaignsPage.teamsAndLimits.limitSendPerUserBtn, {state: 'visible'});
    await page.locator(campaignsPage.teamsAndLimits.limitSendPerUserBtn).click()
    await page.locator(campaignsPage.teamsAndLimits.limitInputField).fill(limit)
});

When(/^the user clicks on Activate you campaign button$/, async function ({page}) {
    await page.click(campaignsPage.summaryPage.activateCampaignButton)
});

When(/^the user waits for "([^"]*)" page to load$/, async function ({page}, pageName) {
    await page.waitForSelector(`//span[text()[contains(., "${pageName}")]]`, {state: 'visible'});
});

When(/^the user clicks on "([^"]*)" link$/, async function ({page}, link) {
    let tabToClick = `(//a[@aria-current="page"][text()=' ${link} '])`
    await page.waitForSelector(tabToClick, {state: 'visible'});
    await page.click(tabToClick)
});

When(/^the user selects the created campaign on Send Page "([^"]*)"$/, async function ({page},section){
    await page.locator(campaignsPage.campaigns.searchtouch).fill(campaignName)
    await page.waitForTimeout(2000) // waiting for search query to generate the results
    let campaignToSend = `//h5[contains(.,'${section}')]/parent::div/parent::div//h3[@title='${campaignName}']`;
    await page.locator(campaignToSend).waitFor({state: 'visible', timeout: 20000});
    await page.locator(campaignToSend).first().click();
});

Given(/^the user selects "([^"]*)" product from campaign to remove$/, async function ({ page }, productName: string) {
    let productToRemove = `//a[text()='${productName}']`
    await page.locator(productToRemove).click()
});

Given(/^the user confirms meeting booker for outreach application$/, async () => {
    await mailHelper.ConfirmMeetingBookerOutreach(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID);
});

Then(/^the user verifies that the email has been received for meeting booker flow$/, async function ({page}) {
    await page.waitForTimeout(10000) //waiting for recent email to appear in mailosaur
    await mailHelper.mailosaurGetSubject(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID,
        mailData.meeting_booker_email_subject,page);
});

When(/^the user searches the campaign on Send Page "([^"]*)" from section "([^"]*)"$/, async function ({page},campaign,section){
    await page.locator(campaignsPage.campaigns.searchtouch).fill(campaign)
    await page.waitForTimeout(2000) // waiting for search query to generate the results
    let campaignToSend = `//h5[contains(.,'${section}')]/parent::div/parent::div//h3[@title='${campaign}']`;
    await page.locator(campaignToSend).waitFor({state: 'visible', timeout: 20000});
    await page.locator(campaignToSend).first().click();
});
