# Synthetics Test Suite - Development Notes

For setup and usage instructions, see [README.md](README.md).

## Architecture Overview

- **Dynamic Workspaces**: Test types auto-derived from workspace directory names
- **Zero Shared Coupling**: Each workspace owns its complete configuration
- **Template-based Creation**: Simple copy-paste workflow for new workspaces
- **Docker Containerized**: Single service with dynamic commands
- **New Relic Integration**: Automated SLI/SLO metrics collection via `AutomationSLI` events with multi-dimensional tracking

## Key Implementation Details

### Zero Duplication Design
- **Single New Relic Reporter**: `packages/shared/src/reporters/new-relic-reporter.ts`
- **Base Playwright Config Factory**: `createBasePlaywrightConfig()` function
- **Base TypeScript Config**: `packages/shared/tsconfig.base.json` extended by all workspaces
- **Dynamic Test Type Detection**: Automatically derives test type from workspace directory name

### Workspace Independence
Each workspace contains only:
- `package.json` (dependencies)
- `playwright.config.ts` (workspace-specific config)
- `tsconfig.json` (extends base)
- `tests/` (test files)

### Template System
- Single `templates/workspace-template/` for all use cases
- Copy, replace placeholders, uncomment needed config
- No complex generation scripts

## Docker & Make Commands
- `make synthetics-api` - Synthetics API tests
- `make synthetics-e2e` - Synthetics E2E tests
- `make smoke-e2e` - Smoke E2E tests
- `make reset` - Reset Docker (clean + rebuild)
- `make install` - Install dependencies
- `make shell` - Open shell in Docker container

### Workspace Organization
- **Synthetics workspaces**: `packages/synthetics/` - Main test suites
- **Smoke workspaces**: `packages/smoke/` - Lightweight smoke tests
- **Naming convention**: `{category}-{type}` (e.g., `synthetics-api`, `smoke-e2e`)
- **Make pattern**: `make {category}-{workspace}` automatically runs `pnpm --filter {category}-{workspace} test`

# important-instruction-reminders
1. Do what has been asked; nothing more, nothing less.
2. NEVER create files unless they're absolutely necessary for achieving your goal.
3. ALWAYS prefer editing an existing file to creating a new one.
4. NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
5. Always run commands in docker, never on the host machine
