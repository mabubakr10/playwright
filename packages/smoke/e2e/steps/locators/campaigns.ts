export const campaigns = {
    campaignsTitle: "a[href*='/manage/campaigns']",
    collpaseActive: "//span[contains(text(),'Active')]/parent::div//span[@class='minus']",
    expandArchiveSection: "//a[@aria-expanded=\"false\"]/parent::div",
    createCampaignButton: "a[href*='/touches/new']",
    globalNav: "a[href*='/manage/campaigns']",
    decideAmount: "#egift_range_price_checkbox",
    minPrice: "select[class*='starting_egift_price_range'][id='touch_starting_egift_price']",
    maxPrice: "#touch_ending_egift_price",
    deliveryOption: "#touch_delivery_option",
    touchname: "#touch_name",
    touchnameforsender: "#touch_name_for_sender",
    senderName: "[id='touch_name_for_sender']",
    trackingDetails: "div[class='touch-title']",
    assignTeams: "[class='row text-left'] div:nth-child(1)",
    finishBtn: "input[class='btn next-step']",
    searchtouch: "input[type='search']",
    sendType: "img[src*='",
    touchdetails: ".icon-minus",
    sendingmethoddropdown: ".icon-dropdown-arrow",
    touchPrice: "//span[contains(text(),",
    emailField: "input[placeholder=\"Recipient's Email Address\"]",
    previewBtn: "button[content='Email Preview']",
    gotItBtn: "[role='dialog'] footer [class='stl-text-right'] button",
    packingItemBtn: "button[class='stl-button stl-button--small stl-mb-5 stl-button_outline--secondary stl-text-regular']",
    continuePackingBtn: "[class='stl-button stl-button--primary']",
    finishButton: "input.btn.next-step",
    input_sender_name: "#recipient-name",
    input_mailing_address: "#recipient-address",
    city: "#recipient-city",
    state: "#recipient-state .vs__selected-options",
    stateDropdown: ".vs__dropdown-menu",
    zip_code: "#recipient-zip",
    enterRecipientEmail: "[id='recipient-email']",
    sendButton: "li#send-button button",
    doneSendButton: "//span[@class='stl-button stl-button--primary']",
    customBundleTouchName: "[id='custom_bundle_name']",
    customBundleWarehouseDropdown: "#touch_custom_bundle_warehouse_id",
    customBundleProduct: "//*[@class='bundle-productizations']",
    customBundleProductQuantity: "//input[@id='touch_bundle_productizations_attributes__quantity']",
    bundleProductSendPage: "//*[@class='stl-grid-row stl-align-items-center']",
    nextButton: "[class='simple_form new_touch'] a[id='touch_on_demand_marketplace_catalog']",
    addToCampaign: "//button[contains(., 'Add to campaign')]",
    usCurrency: "div.stl-badge--filled--info",
    otherCurrency: "span.stl-text-medium",
    removeIcon: ".icon-delete",
    enterCompanyName: "[id='recipient-company-name']",
    newCampaignCreationFlowBtn:"//button[text()=' Create Campaign']",
    enableMeetingBooker:"//button//span[text()=' Enable ']",
    saveMeeting:"//button//span[text()=' Save ']",
    sendAsField:"//input[@placeholder='Search for active users']"
}

export const eGiftSelectionPage = {
    currency: "(//div[@class='vs__selected-options']//input[@class=\"vs__search\"])[1]",
    amount: "(//div[@class='vs__selected-options']//input[@class=\"vs__search\"])[2]"
}

export const touchDetailsAndSettings = {
    touchName: "input[name='name']",
    displayName: "input[name='nameForSender']",
    touchTypeStatus: ".stl-cursor--pointer.stl-card--active",
    fundingSource: "div[class='stl-form__radio stl-form__radio--custom']",
    saveButton: "button[class=\"stl-button stl-button--secondary\"]",
    assignTouch: "//button[contains(text(),'Assign Touch')]",
    addLimits: ".add-sending-limits",
    salesforceObject: "div[class='stl-grid-col-3']:nth-child(1)>div:nth-child(2)",
    salesforceObjectField: "//div[contains(text(),'Salesforce Object')]/parent::div//input",
    operator: "div[class='stl-grid-col-3']:nth-child(3)>div:nth-child(2)",
    operatorsField: "//div[contains(text(),'Operator')]/parent::div//input",
    inputField: "input[placeholder=\"Enter data\"]",
    apply: "//button[contains(text(),'Apply')]",
    verifyLimitsApplied: "//div[contains(text(),'Define Visibility Based Salesforce Criteria')]/parent::div//button[contains(text(),'Remove')]",
    salesforceCampaign: "div.vs__actions",
    salesforceCampaignValue: "//h3[contains(text(),'Salesforce Campaign')]/parent::div//input",
    loadTrack: "label[for='activity_4']",
    verifyTracking: "(//div[contains(text(),'Add Salesforce Campaign Tracking')]/parent::div//button)[2]",
    addTracking: "//button[contains(text(),'Add Tracking to Touch')]",
    addIntegration: "(//button[contains(text(),'Add Integration')])[1]",
    integrationType: "div[class*='stl-card__image stl-pb-0'] img[src*='/salesforce']",
    nextButton: "(//button[contains(text(),'Next')])[1]",
    salesforceField: "#salesforce_field",
    fieldMapping: "#lead-mapping",
    sendDelivery: "//h3[contains(text(),'Send/Delivery Confirmation')]/ancestor::li//input[@type='search']",
    saveAndClose: "(//button[contains(text(),'Save & Close')])[1]",
    notecardOption: "//select[@id='touch_product_ids_']",
    presetBundle: "//*[@id='touch_form']/div[2]/div[1]/label/span"
}

export const touchSummary = {
    "summaryPage": "div[class='h1 stl-mb-0 stl-mr-5']",
    "activateTouch": "#active_draft_status_btn",
    "activateNow": "li[class='stl-list__item']>.stl-button--primary",
    "expandArchiveSection": "//a[@aria-expanded=\"false\"]/parent::div",
    "dropDownBtn": "#status-dropdown-btn",
    "archiveButton": "#archive_btn",
    "confirmOperation": "li[class='stl-list__item']>.stl-button--primary",
}
export const onlineExperienceGits = {
    "eGiftCategory": "input.select2-search__field",
    "categoryOnSendPage": "//span[text()=' Drinks ']"
}
export const campaignsSetup={
    skipToGiftSelectionBtn:"button use[href*='icons.svg#gift~line']"
}
export const campaignsDetails={
    campaignNameField:"input[name='campaignName']"
}
export const teamsAndLimits= {
    limitSendPerUserBtn :"input[value='limit']",
    limitInputField:"input[name='sendQuantityLimit']"
}
export const summaryPage= {
    activateCampaignButton: "button[data-testid='activate-campaign-button']"
}
