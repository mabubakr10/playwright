import { config } from '@automation-suite/shared';

export const users = {
  managerUser: {
    username: config.auth0ManagerEmailid,
    password: config.auth0ManagerPassword
  },
  newCampaignCreation: {
    username: config.auth0NewCampaignUserEmailid,
    password: config.auth0NewCampaignUserPassword
  },
  oldCampaignCreation: {
    username: config.auth0OldCampaignUserEmailid,
    password: config.auth0OldCampaignUserPassword
  },
  smartSend: {
    username: config.auth0SmartSendUserEmailid,
    password: config.auth0SmartSendUserPassword
  },
  handwrittenNotes: {
    username: config.auth0HandwrittenNotesUserEmailid,
    password: config.auth0HandwrittenNotesUserPassword
  },
  sendChoiceRedesign: {
    username: config.auth0sendChoiceRedesignUserEmailid,
    password: config.auth0sendChoiceRedesignUserPassword
  },
  partyLink: {
    username: config.auth0PartyLinkEmailid,
    password: config.auth0PartyLinkPassword
  },
  addressConfirmation:{
    username: config.auth0AddressConfirmationUserEmailid,
    password: config.auth0AddressConfirmationUserPassword
  },
  newInventoryPage:{
    username: config.auth0NewInventoryEmailid,
    password: config.auth0NewInventoryPassword
  },
  accountBalance:{
    username: config.auth0AccountBalanceUserEmailid,
    password: config.auth0AccountBalanceUserPassword
  },
  teamOwner: {
    username: config.auth0TeamOwnerUserEmailid,
    password: config.auth0TeamOwnerUserPassword
  },
  searchTouches: {
    username: config.auth0SearchTouchesUserEmailid,
    password: config.auth0SearchTouchesUserPassword
  },
  teamAsManagerUser: {
    username: config.auth0TeamAsManagerUserEmailid,
    password: config.auth0NewCampaignUserPassword
  },
  teamAsDepartmentUser: {
    username: config.auth0TeamAsDepartmentUserEmailid,
    password: config.auth0NewCampaignUserPassword
  }
}
