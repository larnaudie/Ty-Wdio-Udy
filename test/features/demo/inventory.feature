Feature: Inventory

    @demo @debug @smoke
    Scenario Outline: WEB_TC003: Demo Inventory
    Given As a standard_user user I login to inventory web app
    |userType |UserName                 |
    |stdUser  | standard_user           |
    |ProbUser | problem_user            |
    |PerfUser | performance_glitch_user |

    # Given Login to inventory web app
    Then Inventory page should list <NumberOfProducts>
    Then Validate all products have valid price

        Examples:
            | TestID    |NumberOfProducts| 
            | WEB_TC003 |    9           |