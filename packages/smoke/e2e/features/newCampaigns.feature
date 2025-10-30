 @smoke1 @NewCampaigns
Feature: New Campaigns Flow

  Background: User is signed in to the application

    Given the user adds credentials for "newCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on Try the New Campaign Creation Flow button
    And the user clicks on Skip to Gift Selection button

  Scenario: Verify that user can create new marketplace touch with new campaign flow
            Verify that user can send the newly created campaign as party link option

    And the user selects marketplace "Cookie Stack" product
    And the user click on Add to Campaign button
    And the user clicks on " Save & Continue" button
    And the user enter the campaign name
    And the user clicks on " Save & Continue" button
    And the user set "1" limit per send
    And the user clicks on " Save & Continue" button
    And the user waits for "Funding" page to load
    And the user clicks on " Save & Continue" button
    And the user waits for "Campaign Tracking" page to load
    And the user clicks on " Save & Continue" button
    And the user clicks on Activate you campaign button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created campaign on Send Page "Physical"
    And the user selects "party-link" as a send option on send page
    And the user enters "This is new campaign creation flow with party link" inside message field
    And the user enters "This is new campaign creation flow with party link" inside Notecard message field
    And the user clicks on Create Party Link button
########## These line will be uncommented once QA-155 has been fixed
#    And the user opened copied link
#    And user fill the party link form for "Cookie Stack" touch
#    And the user hits send tracker link
#    Then the user verifies "Pending Approval" of campaign on send tracker page
#    And the user approved the send
#    Then the user verifies "Sent" of campaign on send tracker page

  @MeetingBooker
  Scenario: Verify that user can create eGift with new campaign creation flow
  Verify that user can book a meeting through Outreach application

    And the user clicks on "eGifts" link
    And the user selects marketplace "Nike" product
    And the user click on Add to Campaign button button
    And the user clicks on " Save & Continue" button
    And the user enter the campaign name
    And the user clicks on " Save & Continue" button
    And the user set "1" limit per send
    And the user clicks on " Save & Continue" button
    And the user waits for "Funding" page to load
    And the user clicks on " Save & Continue" button
    And the user waits for "Campaign Tracking" page to load
    And the user clicks on " Save & Continue" button
    And the user clicks on Activate you campaign button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user selects the created campaign on Send Page "eGifts"
    And the user selects "single-person" as a send option on send page
    And the user enters recipients detail for send Direct single Email with no address
    And the user Enable Meeting Booker functionality
    Then the user sends the touch and closes success pop up
    And the user verifies that the email has been received for meeting booker flow
    And the user confirms meeting booker for outreach application

  Scenario Outline: Verify that user can create Inventory touch with new campaign creation flow
                    Verify that user can send the newly created campaign in bulk

    And the user clicks on "Inventory" link
    And the user selects marketplace "<productName>" product
    And the user click on Add to Campaign button button
    And the user clicks on " Save & Continue" button
    And the user enter the campaign name
    And the user clicks on " Save & Continue" button
    And the user set "1" limit per send
    And the user clicks on " Save & Continue" button
    And the user waits for "Funding" page to load
    And the user clicks on " Save & Continue" button
    And the user waits for "Campaign Tracking" page to load
    And the user clicks on " Save & Continue" button
    And the user clicks on Activate you campaign button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created campaign on Send Page "Physical"
    And the user selects "group" as a send option on send page
    And the user Uploads "bulkSendData" File with valid recipient details
    And the user waits for loader to disappear on send page
    And the user clicks to see the live preview of the email
    And the user verify the message in preview window
    Then the user sends bulk items and verifies the message for "bulkSend"

    Examples:
    | productName |
    | New campaign Flow - Physical |
    | New Campaigns - UK |

  Scenario: Verify that user can create Bundles with new campaign creation flow
            Verify that user can remove the cards from the campaigns

    And the user clicks on "Bundles" link
    And the user selects marketplace "New Campaign Flow Bundle" product
    And the user click on Add to Campaign button button
    And the user selects marketplace "New campaign bundle test" product
    And the user click on Add to Campaign button button
    And the user clicks on " Save & Continue" button
    And the user selects "New campaign bundle test" product from campaign to remove
    And the user clicks on " Remove from campaign" button
    And the user clicks on " Save & Continue" button
    And the user enter the campaign name
    And the user clicks on " Save & Continue" button
    And the user set "1" limit per send
    And the user clicks on " Save & Continue" button
    And the user waits for "Funding" page to load
    And the user clicks on " Save & Continue" button
    And the user waits for "Campaign Tracking" page to load
    And the user clicks on " Save & Continue" button
    And the user clicks on Activate you campaign button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created campaign on Send Page "Physical"
    And the user clicks on next button send page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "New campaign Creation Flow" single Email
    And the user enters "This is New campaign Creation Flow" inside message field
    Then the user sends the touch and closes success pop up
