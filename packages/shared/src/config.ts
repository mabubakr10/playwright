import dotenv from 'dotenv'

// TODO: maybe make this dynamic
dotenv.config({ path: ['../../../.env.local', '../../../.env', '.env.local'] })

const createDynamicConfig = () =>
  // Find all AUTOMATION_ environment variables and map them to camelCase config
  // Examples:
  // AUTOMATION_API_KEY -> apiKey
  // AUTOMATION_BASE_URL -> baseUrl
  // AUTOMATION_NEW_RELIC_ACCOUNT_ID -> newRelicAccountId
  Object.keys(process.env)
    .filter(key => key.startsWith('AUTOMATION_'))
    .reduce((acc, key) => {
      const configKey = key
        .replace('AUTOMATION_', '')
        .toLowerCase()
        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

      acc[configKey] = process.env[key] || ''
      return acc
    }, {} as Record<string, string>)

export const config = createDynamicConfig()
