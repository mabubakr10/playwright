import { createBasePlaywrightConfig } from '@automation-suite/shared';

export default createBasePlaywrightConfig({
  // Configure based on your testing needs:

  // For API testing, uncomment:
  // use: {
  //   baseURL: 'https://api.example.com',
  //   extraHTTPHeaders: {
  //     'Accept': 'application/json',
  //   },
  // },

  // For E2E testing, uncomment:
  // use: {
  //   baseURL: 'https://app.example.com',
  //   screenshot: 'only-on-failure',
  //   video: 'retain-on-failure',
  // },

  projects: [
    {
      name: 'WORKSPACE_NAME',
      testMatch: '**/*.spec.ts',
      // Add project-specific configuration here
    },
  ],
});
