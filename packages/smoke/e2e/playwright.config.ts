import { createBasePlaywrightConfig } from '@automation-suite/shared';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',
});

export default createBasePlaywrightConfig({
  testDir,
  timeout: 90000,
  retries: process.env.CI ? 1 : 0,
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
