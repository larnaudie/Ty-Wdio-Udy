Feature: Customer search

@smoke
Scenario Outline: <TestID>: Search external customers
    # Given Get list of users from reqres.in
    # When an as Admin user login to nopcommerce site
    # Then Verify if all users exist in customers list
    Then Validate DB result

    Examples: 
    |TestID|    |
    |E2E_TC001  |