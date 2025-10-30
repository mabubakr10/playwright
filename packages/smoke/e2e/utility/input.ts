import {faker} from "@faker-js/faker";

class Input {
  async getElementText({ page }, element: string): Promise<string> {
    try {
      await page.waitForSelector(element);
      return await page.$eval(element, (el) => el.textContent || '');
    } catch (error) {
      throw new Error(`Unable to get the text of element. Error: ${error}`);
    }
  }
  async selectDropdownValue({ page }, element: string, value: string) {
    try {
      await page.waitForSelector(element, { state: 'visible' });
      await page.selectOption(element, value);

    } catch (e) {
      throw new Error(`Unable to select the dropdown value "${value}". Error: ${e}`);
    }
  }
  async customDomainEmail(domain: string): Promise<string> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomNumber = Math.floor(Math.random() * 10000);

    return `${firstName}.${lastName}.${randomNumber}${domain}`;
  }
}
export default new Input();
