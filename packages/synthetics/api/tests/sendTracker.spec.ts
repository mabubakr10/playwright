import { test, expect } from '@playwright/test';
import { config, tokenFor } from '@automation-suite/shared';

test.describe('Send Tracker API Tests @sendtracker/list', () => {
  test('gets a list of sends @critical', async ({ request }) => {
    const accessToken = await tokenFor(config.auth0UserEmail, config.auth0UserPassword);

    const sendsQuery = `query Sends($sortBy: [SendsSortInput!]) {
              sends(first: 1, sortBy: $sortBy) {
                nodes {
                  id
                  friendlyId
                  createdAt
                  status {
                    id
                    createdAt
                  }
                }
              }
    }`;

    const result = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: sendsQuery,
          variables: {
            sortBy: [
              {
                field: 'SENT_AT',
              direction: 'DESC',
            },
          ],
        },
      },
    });

    expect(result.status()).toBe(200);

    const data = await result.json();
      const sends = data.data.sends.nodes;

    expect(Array.isArray(sends)).toBeTruthy();
      if (sends.length > 0) {
        const send = sends[0];
      expect(send).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          friendlyId: expect.any(String),
          createdAt: expect.any(String),
          status: expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(String),
          }),
        })
      );
    }
  });
});
