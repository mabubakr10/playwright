import {createBdd} from 'playwright-bdd';
const {Given, When, Then} = createBdd();
import { campaigns } from './locators/campaigns'
import input from '../utility/input'
import * as campaignsPage from './locators/campaigns'
import { expect } from "@playwright/test";
import mailHelper from "../utility/mailHelper";
import { mailData } from "./data/mailosaur";
import {config} from "@automation-suite/shared";

let dots, buttonToClick, actualResult;
export let touchName="";
export const displayName = Math.random().toString().substr(5, 11)

When(/^the user clicks on the create Campaign button$/, async function ({page}) {
    await page.click(campaigns.createCampaignButton);
});

When(/^the user clicks on "([^"]*)" touch having id "([^"]*)"$/, async function ({page},touch, id) {
    await page.locator(`//div[@id='${id}']//span[contains(text(),'${touch}')]`).click()
});

When(/^the user selects an Amount for Egift between "([^"]*)" and "([^"]*)"$/, async function ({page},price1, price2) {
    await page.waitForSelector(campaigns.decideAmount);
    if ((await page.$('#touch_form .amount-title h2')) == null) {
        await page.evaluate(() => {
            const elements = document.getElementById('touch_server_rendered');
            elements.click();
        });
    }
    await page.waitForTimeout(1000)
    await page.locator(campaigns.decideAmount).waitFor({ state: 'visible', timeout: 5000 });
    await page.locator(campaigns.decideAmount).click();
    await page.locator(campaigns.minPrice).waitFor({ state: 'visible', timeout: 5000 });
    await page.selectOption(campaigns.minPrice, price1)
    await page.locator(campaigns.maxPrice).click();
    await page.selectOption(campaigns.maxPrice, price2)
});

When(/^the user selects "([^"]*)" as Delivery Option$/, async function ({page},deliverOpt) {
    await input.selectDropdownValue({page}, campaigns.deliveryOption, deliverOpt);
});

Then(/^the user clicks on the Next Step button on Touch Creation$/, async function ({page}) {
    await page.waitForFunction(() => document.querySelectorAll('#touch_server_rendered').length >= 1, { timeout: 20000 });
    await page.evaluate(() => {
        const elements = document.getElementById('touch_server_rendered');
        elements.click();
    });
});

When(/^the user enters sender name on Touch Details page$/, async function ({page}) {
    touchName = Math.random().toString().substr(2, 5)
    await page.locator(campaigns.senderName).fill(touchName)
});

When(/^the user enters touch name on Touch Details page$/, async function ({page}) {
    await page.locator(campaigns.touchname).fill(touchName)
});

When(/^the user waits for Salesforce Tracking page to load$/, async function ({page}) {
    await page.locator(campaigns.trackingDetails).waitFor({ state: 'visible', timeout: 10000 });
});

When(/^the user assigns the touch to Groups$/, async function ({page}) {
    await page.locator(campaigns.finishButton).waitFor({ state: 'visible', timeout: 5000 });
    await page.locator(campaigns.assignTeams).click()
    await page.locator(campaigns.finishButton).click()
});

When(/^the user selects the created Touch from the Send Page "([^"]*)"$/, async function ({page},section) {
    await page.locator(campaigns.searchtouch).fill(touchName)
    await page.waitForTimeout(3000)
   let selectTouch= `//h5[contains(text(),'${section}')]/parent::div/parent::div//h3[@title='touchName']`;
    const touchToSendLocator = selectTouch.replace(
        'touchName',
        touchName
    );
    await page.waitForTimeout(3000)
    const touchToSend = page.locator(touchToSendLocator).first();
    await touchToSend.waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(3000)
    await touchToSend.click();
    await page.waitForTimeout(3000)
});

When(/^the user selects "([^"]*)" product$/, async function ({page},product) {
    await page.locator(`//h2[contains(text(),'${product}')]`).click()
});

When(/^the user selects the packing method$/, async function ({page}) {
    await page.locator(campaigns.packingItemBtn).click();
    await page.locator(campaigns.continuePackingBtn).waitFor({ state: 'visible' });
    await page.locator(campaigns.continuePackingBtn).click();
});

When(/^the user sets currency "([^"]*)" for send choice redesign touch$/, async function ({page},currency) {
    await page.locator(campaignsPage.eGiftSelectionPage.currency).click()
    await page.locator(campaignsPage.eGiftSelectionPage.currency).fill(currency);
    await page.keyboard.press('Enter');
});

When(/^the user sets amount "([^"]*)" for send choice redesign touch$/, async function ({page},amount) {
    await page.locator(campaignsPage.eGiftSelectionPage.amount).click()
    await page.locator(campaignsPage.eGiftSelectionPage.amount).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(campaignsPage.eGiftSelectionPage.amount).fill(amount);
    await page.waitForTimeout(1500)
    await page.keyboard.press('Enter');
});

When(/^the user selects eGift card "([^"]*)"$/, async function ({page},eGift) {
    await page.locator(`//span[contains(text(),'${eGift}')]`).click()
});

When(/^the user clicks on "([^"]*)" button on send choice redesign page$/, async function ({page},buttonName) {
    await page.locator(`button[aria-label="${buttonName}"]`).click()
});

When(/^the user enters the name for send choice redesign touch$/, async function ({page}) {
    touchName = Math.random().toString().substr(2, 5)
    await page.locator(campaignsPage.touchDetailsAndSettings.touchName).click()
    await page.locator(campaignsPage.touchDetailsAndSettings.touchName).type(touchName);
});

When(/^the user enters display name for send choice redesign touch$/, async function ({page}) {
    await page.locator(campaignsPage.touchDetailsAndSettings.displayName).click()
    await page.locator(campaignsPage.touchDetailsAndSettings.displayName).type(displayName)
});

When(/^the user sets type to "([^"]*)" for send choice redesign touch$/, async function ({page},touchType) {
    const touchToClick = `#${touchType}`;
    await page.locator(touchToClick).click()
    const clickedStatus =
        touchToClick + campaignsPage.touchDetailsAndSettings.touchTypeStatus;
    if ((await page.$(clickedStatus)) == null) {
        await page.locator(touchToClick).click();
    }
});

When(/^the user sets source of funds "([^"]*)"$/, async function ({page},sourceOfFunds) {
    const chargeCostTo = `//button[text()[contains(.,'${sourceOfFunds}')]]`;
    switch (sourceOfFunds) {
        case 'Sender':
            await page.locator(chargeCostTo).click();
            break;
        case 'Funding Source':
            await page.locator(chargeCostTo).click();
            await page.locator(campaignsPage.touchDetailsAndSettings.fundingSource).first().click();
            await page.locator(campaignsPage.touchDetailsAndSettings.saveButton).click();
            break;
    }
});

When(/^the user assigns send choice redesign touch to group$/, async function ({page}) {
    await page.locator(campaignsPage.touchDetailsAndSettings.assignTouch).click()
    await page.locator(campaignsPage.touchDetailsAndSettings.addLimits).click()
});

When(/^the user "([^"]*)" the touch assignment$/, async function ({page},buttonName) {
    await page.locator(`//li[@class='stl-list__item']//button[contains(text(),'${buttonName}')]`).click()
});

When(/^the user sets send eGift via option "([^"]*)"$/, async function ({page},sendOption) {
    await page.locator(`div[aria-label="${sendOption}"] button`).click()
});

Then(/^the user is redirected to touch summary page$/, async function ({page}) {
    const actualPageText = await page.textContent(campaignsPage.touchSummary.summaryPage);
    expect(actualPageText).toContain("Touch Summary");
});

Then(/^the user expands "([^"]*)" section on touch summary page$/, async function ({page},section) {
    await page.locator(`//div[contains(text(),'${section}')]/ancestor::div[@class='stl-grid-row stl-align-items-center']//i`).click()
});

Then(/^the user verifies the "([^"]*)" under "([^"]*)" on touch summary page$/, async function ({page},data, section) {
    const selector = `//div[contains(text(),'${data}')]`;
    await page.waitForSelector(selector)
    const sectionToVerify = (`//h5[contains(text(),'${section}')]/parent::div/parent::div//div[2]//div`);
    const actualText = await page.textContent(sectionToVerify);
    expect(actualText).toContain(data);
});

Then(/^the user "([^"]*)" the send choice touch$/, async function ({page},action) {
    await page.locator(campaignsPage.touchSummary.activateTouch).click()
    const activateNowButton = page.locator(campaignsPage.touchSummary.activateNow).first();
    await activateNowButton.waitFor({ state: 'visible', timeout: 5000 });
    await activateNowButton.click();
});

Then(/^the user waits for Global Navigation bar to load$/, async function ({page}) {
    await page.waitForSelector(campaignsPage.campaigns.campaignsTitle)
});

Then(/^the user verifies the campaign has been set to "([^"]*)" on campaigns page$/, async function ({page},touchStatus) {
    let expectedStatus, touchRow;
    await page.waitForSelector(campaignsPage.campaigns.campaignsTitle);
    switch (touchStatus) {
        case 'Active':
             touchRow = `//div[contains(text(),'${touchName}')]/parent::div/parent::div/parent::td/parent::tr//td[8]`
            await page.locator(touchRow).waitFor({ state: 'attached', timeout: 10000 });
            await page.locator(touchRow).waitFor({ state: 'visible', timeout: 10000 });
            expectedStatus = await page.textContent(touchRow);
            expect(expectedStatus).toContain(touchStatus);
            break;
        case 'Scheduled':
            touchRow = `(//tbody[@id='action_required_touches']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[11])[last()]`
            expectedStatus = await page.textContent(touchRow);
            expect(expectedStatus).toContain(touchStatus);
            break;
        case 'Draft':
            touchRow = `//tbody[@id='drafted_touches_list']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[11]`
            expectedStatus = await page.textContent(touchRow);
            expect(expectedStatus).toContain(touchStatus);
            break;
        case 'Completed':
            try {
                await page.locator(campaignsPage.touchSummary.expandArchiveSection).click();
            } catch (e) {
                console.log('Already expanded');
            } finally {
                touchRow = `//tbody[@id='archived_touches']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[10]`
                expectedStatus = await page.textContent(touchRow);
                expect(expectedStatus).toContain(touchStatus);
            }
    }
});

Then(/^the user "([^"]*)" the "([^"]*)" campaign$/, async function ({page},operation, touchSection) {
    let dots;
    switch (touchSection) {
        case 'Active':
            dots = `//div[contains(text(),'${touchName}')]/parent::div/parent::div/parent::td/parent::tr//td[9]`;
            await page.locator(dots).click();
            break;
        case 'Drafts':
            try {
                dots = `//tbody[@id='drafted_touches_list']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[12]`;
                await page.locator(
                    campaignsPage.campaigns.collpaseActive).click();
                await page.locator(dots).click();
                break;
            } catch (e) {
                dots = `//tbody[@id='action_required_touches']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[12]`;
                await page.locator(dots).click();
                break;
            }
        case 'Archived':
            dots = `//tbody[@id='archived_touches']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[11]`;
            await page.locator(dots).click();
            break;
        case 'Scheduled':
            dots = `//tbody[@id='action_required_touches']/tr//td[contains(text(),'${touchName}')]/parent::tr//td[12]`;
            await page.locator(dots).click();
            break;
    }
    const buttonToClick = dots + `//a[contains(text(),'${operation}')]`;
    await page.locator(buttonToClick).click();
});

Then(/^the user edits "([^"]*)" section on touch summary page$/, async function ({page},section) {
    await page.locator(`//div[contains(text(),'${section}')]/ancestor::div[@class="stl-grid-row stl-align-items-center"]//button`).click();
});

Then(/^the user verifies the "([^"]*)" under basic information$/, async function ({page},verificationSec) {
    let sectionToVerify, touchname;
    await page.reload()
    switch (verificationSec) {
        case 'Touch Name':
            sectionToVerify = `//h5[contains(text(),'${verificationSec}')]/parent::div//div`
            touchname = await page.textContent(sectionToVerify)
            expect(touchname).toContain(touchName);
            break;
        case 'Touch description':
            console.log('Not yet implemented');
            break;
    }
});
Then(/^the user switch to "([^"]*)" tab$/, async function ({page},tab) {
    await page.locator(`//a[text()=' ${tab} ']`).click()
});

Then(/^the user verifies the touch has been set to "([^"]*)" on touches page$/, async function ({page},touchStatus) {
    const touchRow = page.locator(`//div[contains(text(),'${touchName}')]/parent::div/parent::div/parent::td/parent::tr/td[7]//span`).first();
    const expectedStatus = await touchRow.textContent();
    expect(expectedStatus).toContain(touchStatus);
});
Given(/^the user navigated to touch creation page$/, async function ({page}) {
    const baseUrl = config.appUrl
    const loginSendButton = `${baseUrl}/v2/touches`
    await page.goto(loginSendButton)
});

Given(/^the user save touch as Draft$/, async function ({page}) {
    await page.locator('#status-dropdown-btn').click();
    await page.locator('#draft-status').click();
    await page.locator("//button[contains(text(),'Confirm')]").click();
});

Given(/^the user "([^"]*)" the "([^"]*)" touch$/, async function ({page},operation, touchSection) {
    await page.waitForSelector(campaignsPage.campaigns.campaignsTitle)
    if (touchSection == "Drafts" || touchSection == "Completed")
        dots = `(//div[contains(text(),'${touchName}')]/parent::div/parent::div/parent::td/parent::tr/td[8])[1]`;
    else if (touchSection == "Active")
        dots = `(//div[contains(text(),'${touchName}')]/parent::div/parent::div/parent::td/parent::tr/td[9])[1]`;
    await page.locator(dots).first().click();
    await page.locator(dots + `//a[contains(text(),'${operation}')]`).click();
});

Given(/^the user archives the send Choice touch$/, async function ({page}) {
    await page.locator(campaignsPage.touchSummary.dropDownBtn).click();
    await page.locator(campaignsPage.touchSummary.archiveButton).click();
    await page.locator(campaignsPage.touchSummary.confirmOperation).first().click();
});
When(/^the user verifies the touch "([^"]*)" against selected "([^"]*)" in header & footer$/, async function ({page},amount, currency) {
    let actualPrice: string;
    if (currency === 'USA') {
        await page.waitForSelector(campaignsPage.campaigns.usCurrency)
        actualPrice = await page.textContent(campaignsPage.campaigns.usCurrency);
        expect(actualPrice).toContain(amount);
    } else {
        await page.waitForSelector(campaignsPage.campaigns.otherCurrency)
        actualPrice = await page.textContent(campaignsPage.campaigns.otherCurrency);
        expect(actualPrice).toContain(amount);
    }
});

Then(/^the user verifies the touch can not be "([^"]*)"$/, async function ({page},button) {
    const element = `button#${button}[disabled='disabled']`;
    const result = await page.locator(element).getAttribute("disabled")
    expect(result).toEqual("disabled");
});

Then(/^the user removes the product$/, async function ({page}) {
    await page.waitForSelector(campaignsPage.campaigns.removeIcon)
    await page.locator(campaignsPage.campaigns.removeIcon).click()
});

When(/^the user adds Salesforce Integration$/, async function ({page}) {
    await page.locator(campaignsPage.touchDetailsAndSettings.addIntegration).click()
    await page.waitForSelector(campaignsPage.touchDetailsAndSettings.integrationType)
    await page.locator(campaignsPage.touchDetailsAndSettings.integrationType).click();
    await page.locator(campaignsPage.touchDetailsAndSettings.nextButton).click();
    await page.locator(campaignsPage.touchDetailsAndSettings.salesforceField).click();
    await page.locator(campaignsPage.touchDetailsAndSettings.salesforceObject).click();
    await page.type(campaignsPage.touchDetailsAndSettings.salesforceObjectField, "Lead");
    await page.keyboard.press('Enter');
    await page.locator(campaignsPage.touchDetailsAndSettings.operator).click();
    await page.type(campaignsPage.touchDetailsAndSettings.operatorsField, "Contains");
    await page.keyboard.press('Enter');
    await page.type(campaignsPage.touchDetailsAndSettings.inputField, "1");
    await page.locator(campaignsPage.touchDetailsAndSettings.nextButton).click();
    await page.waitForSelector(campaignsPage.touchDetailsAndSettings.fieldMapping);
    await page.locator(campaignsPage.touchDetailsAndSettings.fieldMapping).click();
    await page.locator(campaignsPage.touchDetailsAndSettings.nextButton).click();
    await page.fill(campaignsPage.touchDetailsAndSettings.sendDelivery, "Myself");
    await page.locator(campaignsPage.touchDetailsAndSettings.saveAndClose).click();
    actualResult = await page.textContent(campaignsPage.touchDetailsAndSettings.addTracking)
    await expect(actualResult).toContain('Edit Integration');
});
When(/^the user adds Add Limits$/, async function ({page}) {

    buttonToClick = `(//button[contains(text(),'Add Limits')])[2]`;
    await page.locator(buttonToClick).click();
    await page.locator(buttonToClick).click();
    await page.locator(campaignsPage.touchDetailsAndSettings.salesforceObject).click();
    await page.fill(campaignsPage.touchDetailsAndSettings.salesforceObjectField, "Lead");
    await page.keyboard.press('Enter');
    await page.click(campaignsPage.touchDetailsAndSettings.operator)
    await page.fill(campaignsPage.touchDetailsAndSettings.operatorsField, "Contains");
    await page.keyboard.press('Enter');
    await page.fill(campaignsPage.touchDetailsAndSettings.inputField, "1");
    await page.click(campaignsPage.touchDetailsAndSettings.apply)
    const verifyLimitApplied = page.locator(campaignsPage.touchDetailsAndSettings.verifyLimitsApplied)
    const isVisible = await verifyLimitApplied.isVisible();
    expect(isVisible).toBe(true);
});

When(/^the user adds Tracking$/, async function ({page}) {
    buttonToClick = `(//button[contains(text(),'Add Tracking')])[1]`;
    await page.locator(buttonToClick).click();
    await page.click(campaignsPage.touchDetailsAndSettings.salesforceCampaign);
    await page.fill(campaignsPage.touchDetailsAndSettings.salesforceCampaignValue, "Salesforce Tracking campaign:");
    await page.keyboard.press('Enter');
    await page.waitForSelector(campaignsPage.touchDetailsAndSettings.loadTrack)
    await page.click(campaignsPage.touchDetailsAndSettings.addTracking);
    await page.waitForSelector(campaignsPage.touchDetailsAndSettings.verifyTracking);
    actualResult = await page.textContent(campaignsPage.touchDetailsAndSettings.verifyTracking)
    await expect(actualResult).toContain('Remove');
});


When(/^the user clicks on change "([^"]*)" button$/, async function ({page},forOption) {
    const optionToClick = `label[for="${forOption}"]`;
    await page.locator(optionToClick).click();
});

When(/^the user verifies the "([^"]*)" under send setting$/, async function ({page},sectionToVerify) {
    const verificationElement = `//h4[contains(text(),'${sectionToVerify}')]/parent::div//div`;
    actualResult = await page.textContent(verificationElement)

    switch (sectionToVerify) {
        case 'Charge Cost To':
            await expect(actualResult).toContain("Funding Source");
            break;
        case 'Limits':
            await expect(actualResult).toContain("Limits for Salesforce criteria not applied");
            break;
        case 'Salesforce Campaign Tracking':
            await expect(actualResult).toContain("Salesforce Tracking campaign:");
            break;
        case 'Touch Assignment':
            await expect(actualResult).toContain("N/A");
            break;
        case 'Integration: Salesforce':
            await expect(actualResult).toContain("Synced with salesforce account:");
            break;
        case 'Integration: Marketo':
            try {
                await expect(actualResult).toContain("Synced with salesforce account:");
            } catch (e) {
                await expect(actualResult).toContain("Synced with marketo account:");
            }
            break;
        case 'Marketo Campaign Tracking':
            await expect(actualResult).toContain("Marketo Tracking campaign:");
            break;
        case 'Integration: Eloqua':
            await expect(actualResult).toContain("Synced with eloqua account");
            break;
    }
});

When(/^the user selects notecard type "([^"]*)" from the dropdown$/, async function ({page},value) {
    await page.locator(campaignsPage.touchDetailsAndSettings.notecardOption).waitFor({ state: 'visible', timeout: 5000 });
    await page.selectOption(campaignsPage.touchDetailsAndSettings.notecardOption, value)
});

When(/^the user selects bundle to add in campaign$/, async function ({page}) {
    await page.locator(campaignsPage.touchDetailsAndSettings.presetBundle).waitFor({ state: 'visible', timeout: 20000 });
    await page.locator(campaignsPage.touchDetailsAndSettings.presetBundle).click()
});

When(/^the user select eGift Category$/, async function ({page}) {
    await page.waitForTimeout(1000)
    await page.locator(".select2-search.select2-search--inline").click()
    await page.waitForTimeout(2000)
    await page.type(campaignsPage.onlineExperienceGits.eGiftCategory, "Drinks")
    await page.waitForTimeout(1500)
    await page.keyboard.press('Enter');
});

When(/^the user selects eGift Category on send page$/, async function ({page}) {
    await page.locator(campaignsPage.onlineExperienceGits.categoryOnSendPage).click()
});

When(/^the user redeem the eGift on redemption form$/, async function () {
    await mailHelper.mailosaurGetUrlToRedeemEGift(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID
    );
});
