export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `test-${timestamp}-${random}@send-synthetic.com`;
}

export function generateRandomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, length + 2);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return fn().catch(err => {
    if (maxRetries <= 0) throw err;
    return sleep(delay).then(() => retry(fn, maxRetries - 1, delay * 2));
  });
}

export function validateApiResponse(response: any, expectedFields: string[]): boolean {
  if (!response || typeof response !== 'object') return false;

  return expectedFields.every(field => {
    const keys = field.split('.');
    let current = response;

    for (const key of keys) {
      if (current[key] === undefined) return false;
      current = current[key];
    }

    return true;
  });
}

/**
 * Dynamically derives test type from workspace directory name
 * Examples:
 * - /packages/api/tests/... -> 'api'
 * - /packages/e2e/tests/... -> 'e2e'
 * - /packages/platform/tests/... -> 'platform'
 * - /packages/graphql/tests/... -> 'graphql'
 * - /packages/customer-api/tests/... -> 'customer-api'
 */
export function deriveTestTypeFromWorkspace(filePath: string): string {
  const workspaceMatch = filePath.match(/\/packages\/([^\/]+)\//);
  return workspaceMatch ? workspaceMatch[1] : 'unknown';
}

/**
 * Extracts test category from workspace name
 * Examples:
 * - synthetics-api -> 'api'
 * - synthetics-e2e -> 'e2e'
 * - smoke-e2e -> 'e2e'
 * - platform -> 'platform'
 */
export function deriveTestCategoryFromWorkspace(filePath: string): string {
  const workspaceName = deriveTestTypeFromWorkspace(filePath);
  // Extract the part after the last hyphen, or use the full name if no hyphen
  const parts = workspaceName.split('-');
  return parts.length > 1 ? parts[parts.length - 1] : workspaceName;
}

const tokenCache = new Map<string, string>();

export async function tokenFor(email: string, password: string): Promise<string> {
  const cacheKey = `${email}:${password}`;

  if (tokenCache.has(cacheKey)) {
    return tokenCache.get(cacheKey)!;
  }

  const { config } = await import('./config');

  const url = `${config.auth0Host}/oauth/token`;
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = {
    client_id: config.auth0ClientId,
    client_secret: config.auth0ClientSecret,
    audience: config.auth0Audience,
    password: password,
    grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
    username: email,
    realm: 'send-DB',
    scope: 'openid profile email'
  };

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, requestOptions);
  const { access_token } = await response.json() as { access_token: string };

  tokenCache.set(cacheKey, access_token);
  return access_token;
}
