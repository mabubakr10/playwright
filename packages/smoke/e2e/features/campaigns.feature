@Campaigns

Feature: Campaigns - Touch Creation

  @smoke2 @smokedev
  Scenario Outline: Verify that user is able to create egift Int and send via new send experience
    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Brazil" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user selects an Amount for Egift between "<minamount>" and "<maxamount>"
    And the user selects "single_email_address" as Delivery Option
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user assigns the touch to Groups
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user selects the created Touch from the Send Page "eGifts"
    And the user selects "single-email" as a send option on send page
    And the user selects egift "<maxamount>" on send page
    And the user enters recipient "<email>" on send page
    And the user clicks to see the live preview of the email
    Then the user verify the message in preview window
    And the user sends the touch and closes success pop up

    Examples:
      | id                           | minamount | maxamount | email                      |
      | collapse-international-egift | 30        | 100       | afshan.shakoor@send.com |

  @smoke2 @smokedev
  Scenario Outline: Verify that user is able to create inventoried campaign and send via new send experience
    Verify that user is able to send single item physical touch and verify logging on activity tab

    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Single Items" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user selects "<productType>" product
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user selects the packing method
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user clicks the finish button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created Touch from the Send Page "Physical"
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "send Direct" single Email
    Then the user sends the touch and closes success pop up
    When the user clicks on "analytics" option under "Reporting" tab on navigation bar
#    And the user clicks on Hamburger icon
#    And the user clicks on "account_balances" tab on left menu panel
#    And the user clicks on Activity Feed tab
#    Then the user verifies touch name on activity feed page

    Examples:
      | id                              | productType      |
      | collapse-inventoried-sends-gift | Physical Product |

  @smoke2
  Scenario: Verify that user is able to bulk send single item physical touch from manager portal

    Given the user adds credentials for "oldCampaignCreation"
    And the user applies filter for "Physical" touch on send page
    And the user selects the First Touch from the Send Page
    And the user selects "group" as a send option on send page
    And the user Uploads "bulkSendData" File with valid recipient details
    And the user waits for loader to disappear on send page
    Then the user sends bulk items and verifies the message for "bulkSend"

  @smoke2 @smokedev
  Scenario Outline: Verify that user is able to create and send BYO Box from manager portal

    Given the user adds credentials for "smartSend"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "BYO Box" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user enters custom bundle name
    And the user selects warehouse for custom bundle
    And the user selects product and enter quantity
    And the user clicks on the Next Step button on Touch Creation
    And the user enters bundle name on Touch Details page
    And the user selects the packing method
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user clicks the finish button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created bundle from the Send Page "Physical"
    And the user selects product to add in bundle
    And the user clicks on next button send page
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "send Direct" single Email
    Then the user sends the touch and closes success pop up

    Examples:
      | id                              |
      | collapse-inventoried-sends-gift |

  @smoke1
  Scenario Outline: Verify that user is able to create and send Preset Bundle from manager portal
    Given the user adds credentials for "accountBalance"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Preset Bundles" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user selects bundle to add in campaign
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user selects the packing method
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user clicks the finish button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created Touch from the Send Page "Physical"
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "send Direct" single Email
    Then the user sends the touch and closes success pop up

    Examples:
      | id                              |
      | collapse-inventoried-sends-gift |

  @smoke1 @smokedev
  Scenario Outline: Verify that user is able to create and send Handwritten note campaign from manager portal
    Given the user adds credentials for "handwrittenNotes"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Handwritten Notes" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user selects notecard type "57" from the dropdown
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user selects the packing method
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user clicks the finish button
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created Touch from the Send Page "Physical"
    And the user selects "single-person" as a send option on send page
    And the user enters recipient detail for "send Direct" single Email
    And the user enters "<Message>" inside message field
    Then the user sends the touch and closes success pop up

    Examples:
      | id                               | Message                  |
      | collapse-handwritten-note-egifts | send Automation Suite |

  @smoke2
  Scenario Outline: Verify Manager User is able to create and send send Direct Type touch
    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user selects "<senddirect>" touch
    And the user clicks on the Next Step button on marketplace touch creation
    And the user selects marketplace "<productType>" product
    And the user click on Add to Campaign button button
    And the user enters sender name on Touch Details page
    And the user enters touch name on Touch Details page
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user assigns the touch to Groups
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "Physical" touch on send page
    And the user selects the created Touch from the Send Page "Physical"
    And the user selects "group" as a send option on send page
    And the user Uploads "bulkSendData" File with valid recipient details
    And the user waits for loader to disappear on send page
    And the user enter bulk send message inside the field
    And the user clicks to see the live preview of the email
    And the user verify the message in preview window
    Then the user sends bulk items and verifies the message for "bulkSend"

    Examples:
      | senddirect      | productType    |
      | Direct Marketplace | Cookie Stack   |

  @smoke2
  Scenario Outline: Verify Manager User is able to create and send send Choice Type touch

    Given the user adds credentials for "sendChoiceRedesign"
    And the user navigated to touch creation page
    When the user sets currency "<currency>" for send choice redesign touch
    And the user sets amount "<amount>" for send choice redesign touch
    And the user selects eGift card "<eGift1>"
    And the user clicks on "Next Step" button on send choice redesign page
    And the user enters the name for send choice redesign touch
    And the user enters display name for send choice redesign touch
    And the user sets type to "<ManualTouch>" for send choice redesign touch
    And the user sets source of funds "<Source Of Funds>"
    And the user assigns send choice redesign touch to group
    And the user "Save" the touch assignment
    And the user clicks on "Next Step" button on send choice redesign page
    And the user sets send eGift via option "<Sending Preference>"
    And the user clicks on "Create" button on send choice redesign page
    Then the user is redirected to touch summary page
    And the user expands "eGift Selection" section on touch summary page
    And the user verifies the "<currency>" under "COUNTRY" on touch summary page
    And the user verifies the "<amount>" under "EGIFT AMOUNT" on touch summary page
    And the user verifies the "<eGift1>" under "EGIFT SELECTED" on touch summary page
    And the user "activate" the send choice touch
    And the user waits for Global Navigation bar to load
    And the user verifies the campaign has been set to "Active" on campaigns page
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user clicks on the touch on send page
    And the user selects "single-email" as a send option on send page
    And the user enters recipient "<email>" on send page
    Then the user sends the touch and verifies the message for "singleEmail"
    And the user clicks on send Logo
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user "Edit" the "Active" campaign
    And the user edits "Touch Details & Settings" section on touch summary page
    And the user enters the name for send choice redesign touch
    And the user clicks on "Update" button on send choice redesign page
    And the user expands "Touch Details & Settings" section on touch summary page
    And the user verifies the "Touch Name" under basic information
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user "Edit" the "Active" campaign
    And the user "deactivate" the send choice touch
    And the user switch to "All" tab
    And the user verifies the touch has been set to "Draft" on touches page
    Examples:
      | currency | amount | eGift1         | Source Of Funds | Sending Preference                 | ManualTouch | email                      |
      | USA      | 10     | Caribou Coffee | Sender          | No restrictions on sending options | manual      | afshan.shakoor@send.com |

  @smoke2
  Scenario Outline: Verify that user is able to create a touch with "Shareable Link" option selected as sending preference
    Verify that touch is saved to Drafts/Scheduled section if not activated
    Verify that user is able to archive the active touch
    Verify that touch is moved to archived section once archived
    Verify that user is able to send the touch by selecting "Generate eGift link to download" option

    Given the user adds credentials for "sendChoiceRedesign"
    And the user navigated to touch creation page
    When the user sets currency "<currency>" for send choice redesign touch
    And the user sets amount "<amount>" for send choice redesign touch
    And the user selects eGift card "<eGift1>"
    And the user clicks on "Next Step" button on send choice redesign page
    And the user enters the name for send choice redesign touch
    And the user enters display name for send choice redesign touch
    And the user sets type to "<ManualTouch>" for send choice redesign touch
    And the user sets source of funds "<Source Of Funds>"
    And the user assigns send choice redesign touch to group
    And the user "Save" the touch assignment
    And the user clicks on "Next Step" button on send choice redesign page
    And the user sets send eGift via option "<Sending Preference>"
    And the user clicks on "Create" button on send choice redesign page
    And the user is redirected to touch summary page
    And the user save touch as Draft
    And the user switch to "All" tab
    And the user verifies the touch has been set to "Draft" on touches page
    And the user "Edit" the "Drafts" touch
    And the user "activate" the send choice touch
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user clicks on the touch on send page
    And the user selects "link" as a send option on send page
    And the user enters recipient "<email>" on send page
    Then the user sends the touch and verifies the message for "singleShareableLink"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user "Edit" the "Active" touch
    And the user archives the send Choice touch
    And the user switch to "All" tab
    And the user verifies the touch has been set to "Completed" on touches page

    Examples:
      | currency | amount | eGift1         | Sending Preference                 | Source Of Funds | ManualTouch | email                      |
      | USA      | 10     | Caribou Coffee | Limit send option to sharable link | Sender          | manual      | afshan.shakoor@send.com |

  @smoke2
  Scenario Outline: Verify that user is able to archive the touch before activating it
    Verify that user is not able to activate/archive already archived touch
    Verify that user is able to update the touch details
    Verify that user is able to edit eGift selection
    Verify that user is able to edit "Touch Details & Settings" section
    Verify that correct and same amount is displayed on touch summary page and footer

    Given the user adds credentials for "sendChoiceRedesign"
    And the user navigated to touch creation page
    When the user sets currency "<currency>" for send choice redesign touch
    And the user sets amount "<amount>" for send choice redesign touch
    And the user selects eGift card "<eGift1>"
    And the user clicks on "Next Step" button on send choice redesign page
    And the user enters the name for send choice redesign touch
    And the user enters display name for send choice redesign touch
    And the user verifies the touch "<amount>" against selected "<currency>" in header & footer
    And the user sets type to "<ManualTouch>" for send choice redesign touch
    And the user sets source of funds "<Source Of Funds>"
    And the user assigns send choice redesign touch to group
    And the user "Save" the touch assignment
    And the user clicks on "Next Step" button on send choice redesign page
    And the user sets send eGift via option "<Sending Preference>"
    And the user clicks on "Create" button on send choice redesign page
    And the user is redirected to touch summary page
    And the user verifies the touch "<amount>" against selected "<currency>" in header & footer
    And the user archives the send Choice touch
    And the user switch to "All" tab
    And the user verifies the touch has been set to "Completed" on touches page
    And the user "Edit" the "Completed" touch
    Then the user verifies the touch can not be "<activated>"
    And the user verifies the touch can not be "<archived>"
    And the user edits "eGift Selection" section on touch summary page
    And the user removes the product
    When the user sets currency "<currency2>" for send choice redesign touch
    And the user sets amount "<amount2>" for send choice redesign touch
    And the user selects eGift card "<eGift3>"
    And the user clicks on "Update" button on send choice redesign page
    And the user expands "eGift Selection" section on touch summary page
    And the user verifies the "<currency2>" under "COUNTRY" on touch summary page
    And the user verifies the "<eGift3>" under "EGIFT SELECTED" on touch summary page
    And the user verifies the "<amount2>" under "EGIFT AMOUNT" on touch summary page
    And the user expands "eGift Selection" section on touch summary page
    And the user edits "Touch Details & Settings" section on touch summary page
    And the user verifies the touch "<amount2>" against selected "<currency2>" in header & footer
    Examples:
      | currency | amount | eGift1         | Source Of Funds | Sending Preference                 | ManualTouch | archived            | activated               | currency2 | amount2 | eGift3   |
      | USA      | 10     | Caribou Coffee | Sender          | Limit send option to sharable link | manual      | status-dropdown-btn | active_draft_status_btn | Brazil    | 30      | Netshoes |

  @SendCreation @smoke2
  Scenario Outline: Verify that user is able to create and send egift US campaign
    Verify eGift Redemption flow

    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Coffee" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user assigns the touch to Groups
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user selects the created Touch from the Send Page "eGifts"
    And the user selects "single-email" as a send option on send page
    And the user enters recipient "<email>" on send page
    And the user sends the touch and closes success pop up
    And the user verifies that the recipient has received the email for eGift redemption
    And the user redeem the eGift on redemption form
    When the user clicks on "sends" option under "Send" tab on navigation bar
    When the user clicks on "tracker" option under "Reporting" tab on navigation bar
    Then the user verifies "Clicked" of campaign on send tracker page

    Examples:
      | id            | email                                      |
      | collapseEgift | amna.asadAcViaEmail@uugclxt3.mailosaur.net |

  @SendCreation @smoke2
  Scenario Outline: Verify that user is able to create online experiences egift

    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "campaigns" option under "Configure" tab on navigation bar
    And the user clicks on the create Campaign button
    And the user clicks on "Online Experiences eGift" touch having id "<id>"
    And the user clicks on the Next Step button on Touch Creation
    And the user select eGift Category
    And the user clicks on the Next Step button on Touch Creation
    And the user enters sender name on Touch Details page
    And the user clicks on the Next Step button on Touch Creation
    And the user waits for Salesforce Tracking page to load
    And the user clicks on the Next Step button on Touch Creation
    And the user assigns the touch to Groups
    And the user clicks on send Logo
    When the user clicks on "sends" option under "Send" tab on navigation bar
    And the user applies filter for "eGifts" touch on send page
    And the user selects the created Touch from the Send Page "eGifts"
    And the user selects "single-email" as a send option on send page
    And the user enters recipient "<email>" on send page
    And the user selects eGift Category on send page
    And the user sends the touch and closes success pop up

    Examples:
      | id                       | email                      |
      | sendExpeienceCollapse | afshan.shakoor@send.com |
