@AddressConfirmation @smoke1

Feature: Address Confirmation

  Scenario: Verify that user is able to send campaign via AC and confirm address
    Given the user adds credentials for "addressConfirmation"
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user selects the First Touch from the Send Page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "send Direct" single Email
    And the user clicks Enable Address Confirmation Button
    And the user clicks Save Address Confirmation Button
    And the user sends the touch and closes success pop up
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    Then the user verifies "Offer Sent" of campaign on send tracker page
    And the user verifies that the recipient has received the email for Address Confirmation via Email for "newInventoryPage" user
    And the user verifies the contents of the email for Address Confirmation via Email
    And the user confirms address on address verification form
    And the user clicks on send Logo
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    Then the user verifies "Order Received" of campaign on send tracker page

  Scenario: Verify that user does not have recipient address
    Given the user adds credentials for "addressConfirmation"
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user selects the First Touch from the Send Page
    And the user selects "single-person" as a send option on send page
    And the user selects I dont have recipients address option
    And the user enters recipients detail for send Direct single Email with no address
    And the user clicks Enable Address Confirmation Button
    And the user clicks Save Address Confirmation Button
    And the user sends the touch and closes success pop up
    And the user verifies that the recipient has received the email for Address Confirmation via Email for "newInventoryPage" user
    And the user verifies the contents of the email for Address Confirmation via Email
    And the user adds address on address verification form
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    Then the user verifies "Order Received" of campaign on send tracker page
