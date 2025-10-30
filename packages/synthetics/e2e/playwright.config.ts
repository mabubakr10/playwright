import { createBasePlaywrightConfig, config } from '@automation-suite/shared';
import { devices } from '@playwright/test';

export default createBasePlaywrightConfig({
  use: {
    baseURL: config.appUrl,
    screenshot: 'on',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'e2e-chromium',
      testMatch: '**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: config.appUrl,
      },
    },
  ],
});
