export const sendTracker = {
    sendDetailsMenu: "table tbody tr:nth-child(1) td:nth-child(7) div button",
    viewSendDetails: "table tbody tr:nth-child(1) td:nth-child(7) div:nth-child(2) a",
    cancelSendButton: "(//button[contains(text(),'Cancel Send')])[1]",
    confirmCancelButton: "(//button[contains(text(),'Yes')])",
    campaignName:  "(//table//tr[1]//td[3]//div)[3]",
    sendStatus:  "tbody tr:first-of-type td:nth-of-type(6) span",
    sendTrackerSearchField: "//*[@class='oso-relative oso-w-full']//input",
    dateCreatedColumn: "//tbody//tr[1]//td[5]//div//div[1]//div",
    recipientName:  "(//table[@class='oso-table-fixed oso-min-w-full']//tr[1]//td[2]//div)[3]",
    sendAgainButton: "//tbody//tr[1]//td[7]//ul//button",
    yesProceedButton: "//button[@form='updateSendParamsForm']",
    approveSendButton: "//button[text()=' Approve Send']",
    confirmApprovalButton: "(//footer[contains(@class,'sm:oso-justify-end')]//button[text()=' Yes'])[2]",
    touchName: "table tbody tr:nth-child(1) td:nth-child(3) div:nth-child(1) div:nth-child(1) div:nth-child(1)",
    touchStatus: "table tbody tr:nth-child(1) td:nth-child(6) span",
    sentOnBehalfOf: "//div[contains(@class, 'text-base') and normalize-space(.)='Send As']"
}
