@smoke1 @SendAs
Feature: Send As Feature

  Scenario: As an Admin, I want to send bulk campaigns on behalf of any user(team member) in the organization

    Given the user adds credentials for "newCampaignCreation"
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user searches the campaign on Send Page "US Physical Campaign" from section "YOUR RECENT SENDS"
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "Inventoried" single Email
    And the user selects a team member to send on behalf of "iqra"
    Then the user sends the touch and closes success pop up
    And the user clicks on "tracker" option under "Reporting" tab on navigation bar
    And the user opens send details of first send on send tracker
    Then the user verifies sent on behalf company name "Send As" from send details

  Scenario: As a Dept Admin, I want to send in bulk on behalf of any user (team member) within my department
    Given the user adds credentials for "teamAsDepartmentUser"
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user searches the campaign on Send Page "US Physical Campaign" from section "YOUR RECENT SENDS"
    And the user selects "group" as a send option on send page
    And the user Uploads "bulkSendDataSendAs" File with valid recipient details
    And the user waits for loader to disappear on send page
    And the user clicks to see the live preview of the email
    And the user verify the message in preview window
    Then the user sends bulk items and verifies the message for "bulkSend"

  Scenario: Verify that a manager user can send single sends on behalf of team members
    Given the user adds credentials for "teamAsManagerUser"
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user searches the campaign on Send Page "US Physical Campaign" from section "YOUR RECENT SENDS"
    And the user selects "group" as a send option on send page
    And the user Uploads "bulkSendDataSendAs" File with valid recipient details
    And the user waits for loader to disappear on send page
    And the user clicks to see the live preview of the email
    And the user verify the message in preview window
    Then the user sends bulk items and verifies the message for "bulkSend"


