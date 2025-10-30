@PostSend @smoke2

Feature: Verify Send tracker functionality

  Scenario:Verify that new record is generated after sending touch on send tracker page

      Given the user adds credentials for "partyLink"
      And the user clicks on "sends" option under "Send" tab on navigation bar
      And the user applies filter for "Physical" touch on send page
      And the user selects the First Touch from the Send Page
      And the user selects "single-person" as a send option on send page
      And the user enters recipient detail for "Sendoso Direct" single Email
      And the user sends the touch and verifies the message for "physicalSend"
      And the user verify touch name "test Touch 1" and touch status "Order Received" on send tracker

  Scenario: Verify that the user can resend a canceled campaign to recreate the send from scratch

      Given the user adds credentials for "accountBalance"
      And the user clicks on "sends" option under "Send" tab on navigation bar
      And the user applies filter for "Physical" touch on send page
      And the user selects the First Touch from the Send Page
      And the user selects "single-person" as a send option on send page
      And the user enters recipient detail for "Sendoso Direct" single Email
      And the user clicks Enable Address Confirmation Button
      And the user clicks Save Address Confirmation Button
      And the user sends the touch and closes success pop up
      And the user clicks on "tracker" option under "Reporting" tab on navigation bar
      And the user opens send details of first send on send tracker
      And the user cancels send from send details page
      And the user clicks on Sendoso Logo
      And the user clicks on "sends" option under "Send" tab on navigation bar
      And the user clicks on "tracker" option under "Reporting" tab on navigation bar
      And the user selects Send Again option for first send on send tracker
      And the user clicks on yes button to continue resend process
      And the user clicks on Sendoso Logo
      And the user clicks on "tracker" option under "Reporting" tab on navigation bar
      Then the user verifies "Offer Sent" of campaign on send tracker page
