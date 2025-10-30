import {createBdd} from "playwright-bdd";
const { When, Then } = createBdd();
import { inventory } from './locators/inventory';
import { inventoryData } from "./data/inventoryData";
import path from 'path';
import { expect } from "@playwright/test";

When(/^the user clicks on Create Product button$/, async function ({page}) {
    await page.locator(inventory.createProductButton).click()
});

Then(/^the user chooses Product Type "([^"]*)"$/, async function ({page}, type) {
    const productType = `img[alt="${type}"]`
    await page.click(productType);
});

Then(/^the user clicks next in the product creation process$/, async function ({page}) {
    await page.click(inventory.btnNextNew)
});

Then(/^the user selects primary category "([^"]*)" for the product$/, async function ({page}, category) {
    const categoryType = `//div[@data-testid='categories']//span[contains(text(),"${category}")]`;
    await page.click(categoryType);
});

Then(/^the user selects a sub category "([^"]*)" for the product$/, async function ({page}, subCategory) {
    const categoryType = `//div[@data-testid='subcategories']//span[contains(text(),"${subCategory}")]`;
    await page.click(categoryType);
});

Then(/^the user adds details for the product "([^"]*)"$/, async function ({page}, title) {
    await page.locator(inventory.addProductTitle).waitFor({ state: 'visible' });
    await page.locator(inventory.addProductTitle).fill(title);
    await page.locator(inventory.addProductVendor).first().fill(inventoryData.vendor);
    await page.locator(inventory.addProductBrand).fill(inventoryData.brand);
    await page.locator(inventory.addProductCost).fill(inventoryData.cost);
});

Then(/^the user uploads a product image$/, async function ({page}) {
    const imagePath = path.join(__dirname, '../steps/data/worldImage.jpg');
    const fileInput = await page.$('input[type="file"]');
    await fileInput.setInputFiles(imagePath);
});

Then(/^the user selects product variation as "([^"]*)"$/, async function ({page}, variant) {
    if (variant === 'single') {
        await page.locator(inventory.singleVariant).click();
    } else {
        await page.locator(inventory.multipleVariant).click();
    }
});

Then(/^the user adds size "([^"]*)" for the product variant$/, async function ({page}, size) {
    await page.locator(inventory.sizeMenu).click();
    const variantSize = `[id="li-item-${size}"] button`;
    await page.locator(variantSize).click();
});

Then(/^the user adds material "([^"]*)" for the product variant$/, async function ({page}, material) {
    await page.locator(inventory.materialMenu).click();
    const variantMaterial = `[id="li-item-${material}"] button`;
    await page.locator(variantMaterial).click();
});

Then(/^the user adds gender "([^"]*)" for the product variant$/, async function ({page}, gender) {
    await page.locator(inventory.genderMenu).click();
    const variantGender = `[id="li-item-${gender}"] button`;
    await page.locator(variantGender).click();
});

Then(/^the user adds color "([^"]*)" for the product variant$/, async function ({page}, color) {
    await page.locator(inventory.colorMenu).click();
    const variantColor = `[id="li-item-${color}"] button`;
    await page.locator(variantColor).click();
});

Then(/^the user adds the shipping information for the product "([^"]*)" "([^"]*)"$/, async function ({page}, number, warehouse) {
    await page.locator(inventory.numberOfItems).fill(number);
    await page.locator(inventory.warehouseMenu).click();
    const warehousePath = `//span[contains(text(), "${warehouse}")]`;
    await page.locator(warehousePath).click();
    await page.locator(inventory.domesticShipping).click();
});

Then(/^the user selects team "([^"]*)" to assign to the product$/, async function ({page}, team) {
    if (team === 'Marketing Ops') {
        await page.locator(inventory.marketingTeam).click();
    } else if (team === 'SDRs') {
        await page.locator(inventory.SDRs).click();
    } else {
        await page.locator(inventory.AEs).click();
    }
});

Then(/^the user clicks on the success pop up$/, async function ({page}) {
    await page.locator(inventory.successPopup).waitFor({ state: 'visible' });
    await page.locator(inventory.successPopup).click();
});

Then(/^the user verifies that Product Creation is complete and product is present on new Inventory List Page "([^"]*)"$/, async function ({page}, name) {
    await page.locator(inventory.searchProductField).click();
    await page.locator(inventory.searchProductField).fill(name);
    await page.keyboard.press('Enter');
    const firstProductNametitle = await page.locator(inventory.firstProductInventoryPage).textContent();
    expect(firstProductNametitle?.trim()).toContain(name.trim());
});

Then(/^the user clicks on elipsis on Inventory Page to edit product$/, async function ({page}) {
    await page.locator(inventory.elipsisInventoryPage).click();
    await page.locator(inventory.editInventoryOption).click();
});

Then(/^the user updates product title "([^"]*)"$/, async function ({page}, title) {
    await page.locator(inventory.productTitleUpdate).click();
    await page.locator(inventory.productTitleUpdate).fill('');
    await page.locator(inventory.productTitleUpdate).fill(title);
    await page.locator(inventory.saveAndCloseButton).click();
    const buttonLocator = page.locator(`xpath=${inventory.saveChangesButton}`);
    await buttonLocator.click();
});

Then(/^the user verifies that product title on inventory page has been updated "([^"]*)"$/, async function ({page}, updatedTitle) {
    const title = await page.locator(inventory.firstProductInventoryPage).textContent();
    expect(title).toContain(updatedTitle);
});

Then(/^the user searches for product on inventory listing "([^"]*)"$/, async function ({page}, name) {
    await page.reload()
    await page.locator(inventory.searchProductField).click();
    await page.locator(inventory.searchProductField).fill(name);
    await page.keyboard.press('Enter');
    const firstProductNametitle = await page.locator(inventory.firstProductInventoryPage).textContent();
    expect(firstProductNametitle?.trim()).toContain(name.trim());
});

Then(/^the user archives product and verify on inventory listing$/, async function ({page}) {
    await page.locator(inventory.elipsisInventoryPage).click();
    await page.locator(inventory.deleteInventoryOption).click();
    await page.locator(inventory.confirmDeleteInventoryButton).click();
});

When(/^the user clicks on Create Ship Notice button$/, async function ({page}) {
    await page.locator(inventory.createShipNoticeButton).click();
});

When(/^the user enters product name "([^"]*)"$/, async function ({page}, productName) {
    const productNameFieldLocator = page.locator(inventory.enterProductNameField);
    await productNameFieldLocator.waitFor({ state: 'visible' });
    await expect(productNameFieldLocator).toBeEnabled();
    await productNameFieldLocator.click();
    await expect(productNameFieldLocator).toBeFocused();
    await productNameFieldLocator.type(productName, { delay: 200 });
    await page.locator(inventory.clearSearchShipNoticeModal).click()
    await productNameFieldLocator.type(productName, { delay: 200 });
    await page.keyboard.press('Enter');
})

When(/^the user clicks on save ship notice button$/, async function ({page}) {
    await page.locator(inventory.saveShipNoticeButton).click();
});

When(/^the user clicks on "([^"]*)" tab on inventory page$/, async function ({page}, tabName) {
    const tab = `//a[contains(@href, "${tabName}")]`;
    const tabLocator = page.locator(tab);
    await tabLocator.waitFor({ state: 'visible' });
    await tabLocator.click();
});

When(/^the user clicks on close button on success modal$/, async function ({page}) {
    await page.locator(inventory.closeSuccessShipNoticeModal).click();
});

Then(/^the user verifies that ship notice is created with "([^"]*)"$/, async function ({ page }, status) {
    const snStatusLocator = page.locator(inventory.snStatus);
    let shipNoticeStatus = '';
    const maxAttempts = 5;
    for (let i = 0; i < maxAttempts; i++) {
      await page.reload({ waitUntil: 'load' });
      shipNoticeStatus = (await snStatusLocator.textContent())?.trim() || '';
      if (shipNoticeStatus.includes(status)) {
        break;
      }
      await page.waitForTimeout(2000); // small backoff before next reload
    }
    expect(shipNoticeStatus).toContain(status);
});

When(/^the user selects "([^"]*)" the editing option$/, async function ({page},option) {
    const editOption = `[class*="${option}"] button`
    await page.click(editOption);
});

When(/^the user clicks continue on the editing option modal$/, async function ({page}) {
    await page.locator(inventory.continueEditingOption).click();
});

When(/^the user adds the print details "([^"]*)"$/, async function ({page},name) {
    await page.locator(inventory.printingName).fill(name);
});

When(/^the user clicks next on the print on demand product creation$/, async function ({page}) {
    await page.locator(inventory.nextStepBtn).click();
});

Then(/^the user verifies the success modal for print on demand$/, async function ({page}) {
    const successMessage = await page.textContent(inventory.successDialogMessage);
    expect(successMessage).toContain(inventory.printOnDemandSuccess);
});

When(/^the user closes the print on demand success pop up$/, async function ({page}) {
    await page.locator(inventory.successDialogClose).click();
});

When(/^the user saves the print on demand product$/, async function ({page}) {
    await page.locator(inventory.saveBtn).click();
});

Then(/^the user verifies the print on demand product "([^"]*)" on the inventory page$/, async function ({page},name) {
    await page.waitForTimeout(1000)
    await page.reload()
    const productName = await page.textContent(inventory.getProductName);
    expect(productName).toContain(name);
});

