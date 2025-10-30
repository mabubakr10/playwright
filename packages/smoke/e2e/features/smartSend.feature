@SmartSend @smoke1 @smokedev

Feature: Smart Send: Verify user is able to search/send via smart send

    Background: User is signed in to the application
        Given the user adds credentials for "smartSend"

    Scenario Outline: Search for cookies and verify that correct recommendations and count is displaying on smart send page.

        When the user clicks on "smart_sending" option under "Send" tab on navigation bar
        And the user searches for a product on smart send page "<product>"
        Then the user verifies that correct count and set of recommendations is displaying "<searchResult1>" "<searchResult2>"
        And the user selects first product on smart send page
        And the user clicks on send it now button
        And the user enters recipient details and send
        And the user clicks on send Logo
        And the user clicks on "tracker" option under "Reporting" tab on navigation bar
        Then the user verifies date and time for recent campaign
        And the user verifies smart send campaign name on send tracker page
        Then the user verifies "Offer Sent" of campaign on send tracker page

        Examples:
            | product | searchResult1 | searchResult2              |
            | cookies | Cookie Stack  | DIY Chocolate Chip Cookies |

    Scenario Outline: Verify that user is able to send via smart send with recipient address

        When the user clicks on "smart_sending" option under "Send" tab on navigation bar
        And the user searches for a product on smart send page "<product>"
        Then the user verifies that correct count and set of recommendations is displaying "<searchResult1>" "<searchResult2>"
        And the user selects first product on smart send page
        And the user clicks on send it now button
        And the user clicks on I have the recipient's address toggle
        And the user enters recipient address and send
        And the user clicks on send Logo
        And the user clicks on "tracker" option under "Reporting" tab on navigation bar
        Then the user verifies date and time for recent campaign
        And the user verifies smart send campaign name on send tracker page
        Then the user verifies "Order Received" of campaign on send tracker page

        Examples:
            | product | searchResult1 | searchResult2              |
            | cookies | Cookie Stack  | DIY Chocolate Chip Cookies |
