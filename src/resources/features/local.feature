Feature: Login Feature

  @local
  Scenario Outline: Login with given username
    Given I navigate to local website
    And I click on "Sign In" link
    And I type <username> in "username"
    And I type <password> in "password"
    And I press Log In Button
    Then I should see user <username> logged in
    Examples:
      | username                 | password         |
      | "fav_user"               | "testingisfun99" |
      | "image_not_loading_user" | "testingisfun99" |
      | "existing_orders_user"   | "testingisfun99" |