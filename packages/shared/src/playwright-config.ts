import { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

/**
 * Creates a base Playwright configuration that can be extended by workspaces
 * No hardcoded test types - workspaces pass in their complete configuration
 */
export function createBasePlaywrightConfig(workspaceConfig: PlaywrightTestConfig): PlaywrightTestConfig {
  // Resolve the New Relic reporter path - use .js for the compiled output
  const newRelicReporterPath = path.resolve(__dirname, './reporters/new-relic-reporter.js');

  const baseReporters: any[] = [
    [process.env.CI ? 'dot' : 'list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/test-results.xml' }],
    [newRelicReporterPath]
  ];

  const baseConfig: PlaywrightTestConfig = {
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 30000,
    reporter: baseReporters,
    use: {
      trace: 'on-first-retry',
    },
  };

  // Deep merge workspace config with base config
  return {
    ...baseConfig,
    ...workspaceConfig,
    reporter: workspaceConfig.reporter ? [...baseReporters, ...workspaceConfig.reporter] : baseReporters,
    use: {
      ...baseConfig.use,
      ...workspaceConfig.use,
    },
    projects: workspaceConfig.projects || baseConfig.projects,
  };
}
