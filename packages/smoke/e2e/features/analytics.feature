@smoke1 @Analytics @smokedev

Feature: Analytics
  As a user I want to verify stats after sending touch

  Background: User is signed in to the application
    Given the user adds credentials for "accountBalance"

  Scenario: Overview | Verify in progress sends on overview page
    When the user clicks on "analytics" option under "Reporting" tab on navigation bar
    And the user checks count of in progress sends on analytics
    And the user clicks on Sendoso Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the First Touch from the Send Page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "Sendoso Direct" single Email
    And the user sends the touch and closes success pop up
    When the user clicks on "analytics" option under "Reporting" tab on navigation bar
    Then the user verifies that count of in progress sends is incremented

  Scenario: Verify cancelled sends on overview page
    When the user clicks on "analytics" option under "Reporting" tab on navigation bar
    And the user checks count of cancelled sends on analytics
    And the user clicks on Sendoso Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the First Touch from the Send Page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "Sendoso Direct" single Email
    And the user clicks Enable Address Confirmation Button
    And the user clicks Save Address Confirmation Button
    And the user sends the touch and closes success pop up
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    And the user opens send details of first send on send tracker
    And the user cancels send from send details page
    And the user clicks on Sendoso Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    When the user clicks on "analytics" option under "Reporting" tab on navigation bar
    Then the user verifies that count of cancelled sends is incremented
