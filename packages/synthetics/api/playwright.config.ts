import { createBasePlaywrightConfig, config } from '@automation-suite/shared';
import { devices } from '@playwright/test';

export default createBasePlaywrightConfig({
  use: {
    baseURL: config.appUrl,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
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
