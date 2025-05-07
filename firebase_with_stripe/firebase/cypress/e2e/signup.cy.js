describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001");

    cy.get('[data-cy="emailInput"]').type("testUser@user.com");
    cy.get('[data-cy="usernameInput"]').type("Test User");
    cy.get('[data-cy="passwordInput"]').type("Test1234!");

    // cy.contains("Sign Up").click();
  });
});
