Feature: Adding a new pets to the petstore

Scenario: Add a new pet to the petstore
    Given The petstore service is available
    When I add a new pet to the pet store
    Then I can find my newly added pet in the petstore

Scenario: Add a new pet without image should fail
    Given The petstore service is available
    When I add a new pet without image
    Then I can't find my new pet in the petstore

Scenario: Add a new pet without name should fail
    Given The petstore service is available
    When I add a new pet without name
    Then I can't find my new pet in the petstore 

Scenario: Add a new pet with pending status
    Given The petstore service is available
    When I add a new pet with pending status
    Then I can find my new pet in the store with matching status data