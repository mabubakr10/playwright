@smoke1 @smokedev @teams

Feature: Create new team in teams section
  Background: User logs in to the app and goes to teams page

    Given the user adds credentials for "teamOwner"
    And the user clicks on main menu in navigation bar
    And the user clicks on "Teams" tab on left menu panel

  Scenario Outline: Create a team as a team owner without department and 1 member invitation
    And the user clicks on Create Team from create dropdown
    And the user enters name of team in the name field as "<team-name>"
    And the user selects the funding source "<funding-source>"
    And the user selects team type "<team-type>"
    And the user clicks on next button on teams modal
    And the user enters email in email field with "<domain>"
    And the user selects invite user role as "<role>"
    And the user clicks on the Send Invite
    Then the user verifies the Invite is sent
    And the user clicks on the Done button

    Examples:
      | team-type          | role    | team-name | funding-source | domain       |
      | Account Management | Manager | test05-   | AHT FS 01      | @sendoso.com |
