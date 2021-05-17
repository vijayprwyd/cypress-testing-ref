/* eslint-disable no-undef */
describe("Form input", () => {
  beforeEach(() => {
    cy.seedAndVisit([]);
  });

  it("Focuses the input on load", () => {
    cy.focused().should("have.id", "todo");
  });

  it("Accepts Input", () => {
    const typedText = "New todo";
    cy.get("#todo").type("New todo").should("have.value", typedText);
  });
});
