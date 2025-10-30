import {createBdd} from 'playwright-bdd';
const {When,Then} = createBdd();
import { teams } from './locators/teams'
import input from '../utility/input'

let email = '';

When(/^the user clicks on Create Team from create dropdown$/, async function ({page}) {
  await page.click(teams.createBtn);
  await page.click(teams.btnCreateTeam);
});

When(/^the user enters name of team in the name field as "(.*)"$/, async function ({page},name) {
  const randomName = Date.now().toString();
  await page.click(teams.teamNameField);
  const nameTeam = name + randomName;
  await page.locator(teams.teamNameField).fill(nameTeam)
});

When(/^the user selects the funding source "(.*)"$/, async function ({page},fundingSource) {
  await page.click(teams.fundingSourceXpath);
  const fsXpath = "//span[contains(text(), '" + fundingSource + "')]/../..";
  await page.locator(fsXpath).click();
});

When(/^the user selects team type "(.*)"$/, async function ({page},teamType) {
  await page.click(teams.jobFunction);
  const typeXpath = `//li[contains(text(), '${teamType}')]`;
  await page.locator(typeXpath).click();

});

When(/^the user clicks on next button on teams modal$/, async function ({page}) {
  await page.click(teams.createTeamBtn);
});

When(/^the user enters email in email field with "([^"]*)"$/, async function ({page},domain) {
  email = await input.customDomainEmail(domain);
  await page.click(teams.inputEmailAdd);
  await page.keyboard.type(email);
});

When(/^the user selects invite user role as "([^"]*)"$/, async function ({page},role) {
  await page.click(teams.rolesAndPermissions);
  const roleXpath = "//li[@class='stl-dropdown__item' and contains (.,'" + role + "')]";
  await page.locator(roleXpath).click();
});

When(/^the user clicks on the Send Invite$/, async function ({page}) {
  await page.click(teams.sendInvite);
});

Then(/^the user verifies the Invite is sent$/, async function ({page}) {
  await page.waitForSelector(teams.inviteSuccessToken, { state: 'visible' });
  await page.waitForSelector(teams.inviteSuccessToken,{ state: 'hidden' });
});

When(/^the user clicks on the Done button$/, async function ({page}) {
  await page.locator(teams.btnDone).click();
});
