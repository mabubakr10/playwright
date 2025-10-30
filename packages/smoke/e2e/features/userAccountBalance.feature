@AccountBalance @smoke1 @smokedev

Feature: Account Balance

  Background: User is signed in to the application
    Given the user adds credentials for "accountBalance"

  Scenario:
    Verify that user is able to cancel a recently sent touch (physical) and got refunded
    Verify that the user is able to send a physical campaign from manager portal with sufficient funds

    When the user verifies existing balance "Before" send on send page
    And the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the First Touch from the Send Page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "Sendoso Direct" single Email
    And the user clicks Enable Address Confirmation Button
    And the user clicks Save Address Confirmation Button
    And the user sends the touch and closes success pop up
    And the user verifies existing balance "After" send on send page
    And the user verifies that balance has been deducted
    And the user clicks on "tracker" option under "Reporting" tab on navigation bar
    And the user opens send details of first send on send tracker
    And the user cancels send from send details page
    And the user clicks on Sendoso Logo
    And the user clicks on "tracker" option under "Reporting" tab on navigation bar
    Then the user verifies that balance has been refunded
