import {marketplace} from "./locators/marketplace";
import mailHelper from "../utility/mailHelper";
import {mailData} from "./data/mailosaur";
import {createBdd} from "playwright-bdd";
const { Given, When } = createBdd();
import {config} from "@automation-suite/shared";

When(/^the user click on Send it now button$/, async function ({page}) {
    await page.locator(marketplace.senditNowButton).click();
});
When(/^the user confirm recipient details$/, async function ({page}) {
    await page.locator(marketplace.confirmRecipientToggleButton).click()
    await page.waitForTimeout(1500)
});
When(/^the user enter recipeint address$/, async function ({page}) {
    await page.locator(marketplace.name).fill("Afshan Shakoor")
    await page.locator(marketplace.address).fill("Trichtenhausenstrasse 35")
    await page.locator(marketplace.city).fill("Zurich")
    await page.locator(marketplace.zip).fill("8321")
    await page.locator(marketplace.email).fill("afshanshakoor@send.com")
    await page.locator(marketplace.notes).fill("This is marketplace touch send")
});
When(/^the user click on Send it button$/, async function ({page}) {
    await page.locator(marketplace.sendIt).click()
});

Given(/^the user enter the recipient details without address$/, async function ({page}) {
    await page.locator(marketplace.firstName).fill("Amna")
    await page.locator(marketplace.lastName).fill("send")
    await page.locator(marketplace.email).fill("amna.asadAcViaEmail@uugclxt3.mailosaur.net")
    await page.locator(marketplace.notes).fill("This is marketplace touch send")
});
Given(/^the user verifies that the recipient has received the email for marketplace address confirmation$/, async function ({page}) {
    await page.waitForTimeout(10000) //waiting for recent email to appear in mailosaur
    const email_subject = marketplace.subject
    if (!email_subject) {
        throw new Error('Environment variable assertion_marketplace_ac_via_email_subject is required')
    }
    await mailHelper.mailosaurGetSubject(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID,
        email_subject,page);
});
Given(/^the user confirm address for marketplace touch$/, async function () {
    await mailHelper.mailosaurGetURLAddConfirmAddressForMarketPlace(
        mailData.api_key,
        mailData.emailAcViaEmail,
        mailData.serverID);
});
When(/^the user check "([^"]*)" checkbox$/, async function ({page}, checkboxname) {
    let checkbox=`input[name='${checkboxname}']`
     await page.locator(checkbox).click();
});

When(/^the user confirm address for marketplace address confirmation and eGift exchange$/, async function () {
    await mailHelper.addressConfirmationWithGiftExchange(mailData.api_key,mailData.emailAcViaEmail,mailData.serverID)
});
When(/^the user verifies that the recipient has received the email for marketplace address confirmation and eGift exchange$/, async function () {
    await mailHelper.addressConfirmationWithGiftExchange(mailData.api_key,mailData.emailAcViaEmail,mailData.serverID)
});
