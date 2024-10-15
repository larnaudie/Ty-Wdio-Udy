Feature: Inventory

    @demo @debug @smoke
    Scenario Outline: Demo Inventory
    Given Login to inventory web app
    Then Inventory page should list <NumberOfProducts>
    Then Validate all products have valid price

        Examples:
            | TestID    |NumberOfProducts| 
            | WEB_TC003 |6               |