export const smartSend = {
  searchSmartSend: "//div[contains(@class,'relative w-full')]//input",
  sendItNowButton: "[class*='items-stretch self-auto flex-wrap '] button",
  recipientFirstName: "//input[@name='firstName']",
  recipientLastName: "//input[@name='lastName']",
  recipientEmail: "//input[@name='email']",
  notecardMessage: "//textarea[@aria-label='Physical Note Card Message']",
  sendButton: "[class*='flex-wrap items-center sm:justify-end'] div:nth-child(2) button",
  saveAndActivateButton: "//*[contains(@class, 'md:oso-sticky md:oso-top-0 oso-z-10 oso-bg-white oso')]//button",
  smartSendCookieProduct: "//div[@data-testid='product-grid']//div[1]//a[text()='Cookie Stack']",
  recipientAddressToggle: "[class*='relative text-base'] span[class*='absolute left']",
  recipientFirstAndLastName: "//input[@name='name']",
  recipientAddress: "//input[@name='address']",
  recipientCity: "//input[@name='city']",
  recipientZip: "//input[@name='zip']"
}
