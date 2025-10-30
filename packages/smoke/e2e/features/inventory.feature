@smoke1 @inventory

Feature: Create Apparel product from manager portal
  As a user I want to create single and variant physical product from manager portal

  Scenario Outline: Verify that user is able to create single physical product from manager portal

    Given the user adds credentials for "newInventoryPage"
    When the user clicks on "inventory" option under "Inventory" tab on navigation bar
    And the user clicks on Create Product button
    And the user chooses Product Type "Physical Product"
    And the user clicks next in the product creation process
    And the user selects primary category "<primaryCategory>" for the product
    And the user clicks next in the product creation process
    And the user selects a sub category "<subCategory>" for the product
    And the user clicks next in the product creation process
    And the user adds details for the product "<title>"
    And the user uploads a product image
    And the user clicks next in the product creation process
    And the user selects product variation as "single"
    And the user adds size "S" for the product variant
    And the user adds material "Cotton" for the product variant
    And the user adds gender "Women" for the product variant
    And the user adds color "Black" for the product variant
    And the user clicks next in the product creation process
    And the user adds the shipping information for the product "<number>" "<warehouse>"
    And the user clicks next in the product creation process
    And the user selects team "Marketing Ops" to assign to the product
    And the user clicks next in the product creation process
    And the user clicks on the success pop up
    Then the user verifies that Product Creation is complete and product is present on new Inventory List Page "<productName>"
    And the user searches for product on inventory listing "<productName>"
    And the user clicks on elipsis on Inventory Page to edit product
    And the user updates product title "<updatedTitle>"
    Then the user verifies that product title on inventory page has been updated "<updatedTitle>"
    And the user archives product and verify on inventory listing

    Examples:
      | warehouse     | primaryCategory | subCategory | number | productName      | title            | updatedTitle             |
      | Ireland       | Apparel         | Hats        | 100    | Apparel-Hats-IRE | Apparel-Hats-IRE | Apparel-Hats-IRE-Updated |
      | United Kingdom| Apparel         | Hats        | 100    | Apparel-Hats-UK  | Apparel-Hats-UK  | Apparel-Hats-UK-Updated  |

  @smokedev
  Scenario Outline: Creating new Ship Notice

    Given the user adds credentials for "newInventoryPage"
    When the user clicks on "inventory" option under "Inventory" tab on navigation bar
    And the user clicks on "<ship notices>" tab on inventory page
    And the user clicks on Create Ship Notice button
    And the user enters product name "<productName>"
    And the user clicks on save ship notice button
    And the user clicks on close button on success modal
    Then the user verifies that ship notice is created with "<status>"

    Examples:
      | ship notices | productName | status |
      | shipNotices  | send Hat IRE | In Transit |
      # | shipNotices  | send Hat UK | In Transit  |

  @smoke2
  Scenario Outline: Verify that user is able to create print on demand product from manager portal
    Given the user adds credentials for "oldCampaignCreation"
    When the user clicks on "inventory" option under "Inventory" tab on navigation bar
    And the user clicks on Create Product button
    And the user chooses Product Type "Print On Demand"
    And the user selects "print-on-demand" the editing option
    And the user clicks continue on the editing option modal
    And the user adds the print details "<name>"
    And the user clicks next on the print on demand product creation
    Then the user verifies the success modal for print on demand
    And the user closes the print on demand success pop up
    And the user saves the print on demand product
    Then the user verifies the print on demand product "<name>" on the inventory page

    Examples:
      | name             |
      | POD product name |
