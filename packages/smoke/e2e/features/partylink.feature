@smoke2 @partylink

Feature: Party Link : Verify functionality of Party link feature

  Scenario Outline:
    Single Price send Choice Touches | Let Sender Decide | User can see & select the Party Link send method on the single price send choice touches (egift amount selected via dropdown)

    Given the user adds credentials for "partyLink"
    And the user clicks on "sends" option under "Send" tab on navigation bar
    And the user search for touch "partylinktouch"
    And the user selects "party-link" as a send option on send page
    And the user enters "<Message>" inside message field
    And the user clicks on Create Party Link button
    And the user opened copied link
    And user fill the party link form for "Redbox" touch
    And the user hits send tracker link
    Then the user verifies " Pending " of campaign on send tracker page
    And the user approved the send
    Then the user verifies "Sent" of campaign on send tracker page

    Examples:
      | Message                            |
      | This is party link testing feature |
