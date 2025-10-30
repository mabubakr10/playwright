@marketplace @smoke1 @smokedev

Feature: Send experience
  Verify that user is able to search different touches

  Background: User is signed in to the application
    Given the user adds credentials for "searchTouches"

  Scenario Outline:  Send marketplace campaign without address confirmation
    When the user clicks on "marketplace" option under "Send" tab on navigation bar
    And the user selects marketplace "<productType>" product
    And the user click on Send it now button
    And the user clicks on I have the recipient's address toggle
    And the user enter recipeint address
    And the user click on Send it button
    And the user clicks on Sendoso Logo
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    And the user verify touch name "Smart_Send_Campaign" and touch status "Order Received" on send tracker

    Examples:
      | productType    |
      | TEST - Sec Mug |

#  Scenario Outline: Send marketplace with address confirmation  -- FLAKY , will fix it in separate PR
#    When the user clicks on "marketplace" option under "Send" tab on navigation bar
#    And the user selects marketplace "<productType>" product
#    And the user click on Send it now button
#    And the user enter the recipient details without address
#    And the user check "<Allow Recipient to exchange gift>" checkbox
#    And the user click on Send it button
#    And the user clicks on Sendoso Logo
#    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
#    And the user verify touch name "Smart_Send_Campaign" and touch status "Offer Sent" on send tracker
#    And the user verifies that the recipient has received the email for marketplace address confirmation
#    And the user confirm address for marketplace touch
#    When the user clicks on "sends" option under "Send" tab on navigation bar
#
#    Examples:
#      | productType    | Allow Recipient to exchange gift|
#      | TEST - Sec Mug | giftExchange                    |
