import { send } from '../steps/locators/send'

class Finance {
  async getUserBalance({page}): Promise<number> {
    const balance = await page.locator(send.currentBalance).evaluate(element => {
      const text = element.textContent || '';
      return parseFloat(text.replace(/[^\d.-]/g, ''));
    });
    return balance;
  }
}

export default new Finance();
