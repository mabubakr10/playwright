import * as path from 'path';

class Upload {
  async uploadImage({page}, filePath: string): Promise<void> {
    const fileInput = await page.$('input[type=file]');
    if (fileInput) {
      await fileInput.setInputFiles(`${filePath}.jpg`);
    } else {
      console.error('File input element not found.');
    }
  }

  async bulkUpload({page}, file: string): Promise<void> {
    await page.waitForTimeout(3000) //Bulk upload takes time hence adding wait here
    const csvPath = path.join(__dirname, `../../../smoke/e2e/steps/data/${file}.csv`);
    const uploadButton = await page.$('input[type=file]');
    await uploadButton.setInputFiles(csvPath);
  }
}
export default new Upload();
