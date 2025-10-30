import { test, expect } from '@playwright/test';
import { config, tokenFor } from '@automation-suite/shared';

test.describe('Campaigns API Tests @campaigns/list', () => {
  test('gets a list of campaigns @medium', async ({ request }) => {
    const accessToken = await tokenFor(config.auth0UserEmail, config.auth0UserPassword)

    const campaignsQuery = `query Touches {
      touches {
        edges {
          node {
            id
            name
          }
        }
      }
    }`

    const result = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        query: campaignsQuery
      }
    })

    expect(result.status()).toBe(200)

    const data = await result.json()
    const campaigns = data.data.touches.edges.map((edge: any) => edge.node)

    expect(campaigns).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String)
      })
    ]))
  })
})
