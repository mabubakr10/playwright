# Playwright Automation Suite

Automated testing suite with dynamic test types and New Relic integration.

## 🚀 Quick Setup

1. **Clone and install:**
   ```bash
   git clone git@github.com:mabubakr10/playwright.git
   cd playwright
   make setup
   ```

2. **Set environment variables:**
   ```bash
   # Copy and edit environment file
   cp .env.local.example .env.local
   # Add your New Relic API key and other config
   ```

3. **Run tests:**
   ```bash
   make synthetics-api    # Run synthetics API tests
   make synthetics-e2e    # Run synthetics E2E tests
   make smoke-e2e         # Run smoke E2E tests
   ```

## 📋 Available Commands

### Make Commands (Docker)
```bash
make synthetics-api    # Run synthetics API tests
make synthetics-e2e    # Run synthetics E2E tests
make smoke-e2e         # Run smoke E2E tests
make reset             # Reset Docker (clean + rebuild)
make setup             # Install dependencies
make shell             # Open shell in Docker container
```

## 🔧 Adding a New Workspace

1. **Copy the template:**
   ```bash
   # For synthetics workspaces:
   cp -r templates/workspace-template packages/synthetics/your-workspace-name

   # For smoke workspaces:
   cp -r templates/workspace-template packages/smoke/your-workspace-name
   ```

2. **Replace placeholder names:**
   ```bash
   # For synthetics workspaces:
   find packages/synthetics/your-workspace-name -type f -exec sed -i 's/WORKSPACE_NAME/synthetics-your-workspace-name/g' {} +

   # For smoke workspaces:
   find packages/smoke/your-workspace-name -type f -exec sed -i 's/WORKSPACE_NAME/smoke-your-workspace-name/g' {} +
   ```

3. **Configure for your testing type:**

   Edit `packages/synthetics/your-workspace-name/playwright.config.ts` or `packages/smoke/your-workspace-name/playwright.config.ts`:

   **For API testing** - uncomment:
   ```javascript
   use: {
     baseURL: 'https://api.example.com',
     extraHTTPHeaders: {
       'Accept': 'application/json',
     },
   },
   ```

   **For E2E testing** - uncomment:
   ```javascript
   use: {
     baseURL: 'https://app.example.com',
     screenshot: 'only-on-failure',
     video: 'retain-on-failure',
   },
   ```

4. **Test using make commands:**
   ```bash
   # For synthetics workspaces:
   make synthetics-your-workspace-name

   # For smoke workspaces:
   make smoke-your-workspace-name
   ```

5. **Install and run:**
   ```bash
   make setup
   # Then use the make commands above
   ```

6. **Make commands work automatically:**
   The Makefile already supports the pattern:
   - `synthetics-%` runs `pnpm --filter synthetics-% test`
   - `smoke-%` runs `pnpm --filter smoke-% test`

## 🏷️ Test Types and Tagging

- **Test types** are automatically derived from workspace directory names
- Use tags in your tests: `@critical`, `@high`, `@medium`, `@low`
- Use feature tags: `@campaigns`, `@sending`, `@analytics`
- Business impact tags: `@revenue`, `@customer_experience`, `@compliance`

Example:
```javascript
test('should login successfully @critical @sending @security', async ({ page }) => {
  // Your test here
});
```

## 📊 New Relic Integration

All tests automatically send aggregated metrics to New Relic:
- **AutomationSLI** events with availability, latency, error rates
- Multi-dimensional tracking by feature type, severity, and overall
- Each event includes `testType` (workspace name), `testCategory` (e.g., api, e2e), and `service` fields
- Service field uses `AUTOMATION_SERVICE` environment variable or defaults to 'automation'

## 🏗️ Architecture

```
packages/
├── shared/              # Common utilities, configs, New Relic reporter
├── synthetics/          # Synthetics test workspaces
│   ├── api/             # API testing workspace (testType: 'synthetics-api')
│   ├── e2e/             # E2E testing workspace (testType: 'synthetics-e2e')
│   └── your-workspace/  # Your workspace (testType: 'synthetics-your-workspace')
├── smoke/               # Smoke test workspaces
│   ├── e2e/             # Smoke E2E tests (testType: 'smoke-e2e')
│   └── your-workspace/  # Your workspace (testType: 'smoke-your-workspace')

templates/
└── workspace-template/  # Copy this to create new workspaces
```

**Key principles:**
- Each workspace owns its complete configuration
- Shared package has zero test-type knowledge
- Test types derived dynamically from directory names
- No coupling between workspaces and shared code

## 🎯 Example: Adding GraphQL Tests

```bash
# 1. Copy template (adding to synthetics)
cp -r templates/workspace-template packages/synthetics/graphql

# 2. Replace names
find packages/synthetics/graphql -type f -exec sed -i 's/WORKSPACE_NAME/synthetics-graphql/g' {} +

# 3. Configure for API testing in packages/synthetics/graphql/playwright.config.ts
# 4. Write your GraphQL tests in packages/synthetics/graphql/tests/

pnpm install
make synthetics-graphql
```

The test type will automatically be `synthetics-graphql` in New Relic metrics.
