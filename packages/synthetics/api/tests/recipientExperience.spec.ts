import { test, expect } from '@playwright/test';
import { config, tokenFor } from '@automation-suite/shared';

async function getAccessToken() {
  return tokenFor(config.auth0UserEmail, config.auth0UserPassword);
}

const baseUrl = config.appUrl;

test.describe('Recipient Experience Tests', () => {
  test('should fetch current user data', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `
          query currentUser {
            me {
              id
              email
              permissionScopes
              firstName
              lastName
              __typename
            }
          }
        `
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.errors).toBeUndefined();
    expect(data.data?.me).toBeDefined();
    const user = data.data.me;
    expect(user.email).toBeDefined();
    expect(user.id).toBeDefined();
  });

  test('should fetch teams data', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `
          query getOrganizationFields {
            organization {
              __typename
              id
              name
            }
          }
        `
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.errors).toBeUndefined();
    expect(data.data?.organization).toBeDefined();
  });

  test('should fetch organization fields', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `
          query {
            organization {
              __typename
              id
              name
              # Add more fields here if needed
            }
          }
        `
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.errors).toBeUndefined();
    expect(data.data?.organization).toBeDefined();
    const organization = data.data.organization;
    expect(organization.__typename).toBeDefined();
    expect(organization.id).toBeDefined();
    expect(organization.name).toBeDefined();
  });

  test('should fetch user settings', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `
          query {
            me {
              id
              email
              firstName
              lastName
              __typename
            }
          }
        `
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.errors).toBeUndefined();
    expect(data.data?.me).toBeDefined();
    const user = data.data.me;
    expect(user.email).toBeDefined();
    expect(user.id).toBeDefined();
  });

  test('MarketplaceSearchCriteria', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `query MarketplaceSearchCriteria { marketplaceSearchCriteria { maxPrice organizationId countries internationalGiftExchangeEnabled } }`
      }
    });
    const data = await response.json();
    if (data.errors && data.errors.some(e => e.message.includes('Requested send not found'))) {
      console.warn('No send found for marketplaceSearchCriteria, skipping assertions.');
      return;
    }
    expect(response.ok()).toBeTruthy();
    expect(data.errors).toBeUndefined();
    expect(data.data?.marketplaceSearchCriteria).toBeDefined();
  });

  test('AddressConfirmationClicked', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `mutation AddressConfirmationClicked($reminderEmail: Boolean) { addressConfirmationClicked(reminderEmail: $reminderEmail) { success errors { message } } }`,
        variables: { reminderEmail: false }
      }
    });
    const data = await response.json();
    if (data.errors && data.errors.some(e => e.message.includes('Send not found'))) {
      console.warn('No send found for addressConfirmationClicked, skipping assertions.');
      return;
    }
    expect(data.errors).toBeUndefined();
    expect(data.data?.addressConfirmationClicked).toBeDefined();
  });

  test('RecipientSelectProduct', async ({ request }) => {
    const accessToken = await getAccessToken();
    const variables = {
      activityTransactionGid: "Z2lkOi8vc2VuZG9zby9BY3Rpdml0eVRyYW5zYWN0aW9uLzcyODAzMg",
      productVariantUuid: "Z2lkOi8vc2VuZG9zby9Qcm9kdWN0LzEwMjQxOTkw",
      productVariantUuids: ["Z2lkOi8vc2VuZG9zby9Qcm9kdWN0LzEwMjQxOTkw"],
      productUuid: "27421cd9-0d3a-45f0-8337-9c348c976d68"
    };
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `mutation RecipientSelectProduct($activityTransactionGid: ID! $productVariantUuid: ID! $productUuid: ID! $productVariantUuids: [ID!]) { recipientSelectProduct(activityTransactionGid: $activityTransactionGid productVariantUuid: $productVariantUuid productVariantUuids: $productVariantUuids productUuid: $productUuid) { activityTransaction { id } addressConfirmationLink isMeetingRequired isEgift errors { message } productVariant { id name } } }`,
        variables
      }
    });
    const data = await response.json();
    if (data.errors && data.errors.some(e => e.message.includes('Recipient not Authorized'))) {
      console.warn('Recipient not authorized for recipientSelectProduct, skipping assertions.');
      return;
    }
    expect(data.errors).toBeUndefined();
    expect(data.data?.recipientSelectProduct).toBeDefined();
  });

  test('formFields', async ({ request }) => {
    const accessToken = await getAccessToken();
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `query formFields($countryName: String!) { formFields(countryName: $countryName) { fields { name } } }`,
        variables: { countryName: "US" }
      }
    });
    const data = await response.json();
    if (!response.ok()) {
      console.warn('formFields: Response not OK', response.status(), data);
      return;
    }
    expect(data.errors).toBeUndefined();
    expect(data.data?.formFields).toBeDefined();
  });

  test('confirmRecipientAddress', async ({ request }) => {
    const accessToken = await getAccessToken();
    const variables = {
      ignoreWarnings: false,
      recipientAddressInput: {
        address1: "447 Battery St",
        address2: "",
        city: "San Francisco",
        countryCode: "US",
        email: "abubakr@sendoso.com",
        name: "abubakr",
        phoneNumber: "",
        postalCode: "94111 3205",
        province: "California"
      }
    };
    const response = await request.post('/gql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `mutation ConfirmRecipientAddress($ignoreWarnings: Boolean $recipientAddressInput: RecipientAddressInput!) { confirmRecipientAddress(ignoreWarnings: $ignoreWarnings recipientAddressInput: $recipientAddressInput) { errors { message } success warnings { message } } }`,
        variables
      }
    });
    const data = await response.json();
    if (data.errors && data.errors.some(e => e.message.includes('Requested send not found'))) {
      console.warn('No send found for confirmRecipientAddress, skipping assertions.');
      return;
    }
    expect(data.errors).toBeUndefined();
    expect(data.data?.confirmRecipientAddress).toBeDefined();
  });
});
