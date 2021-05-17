/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import todos from "../fixtures/todos/todo.json";

describe("App initialization", () => {
  it("Displays todos from API on load", () => {
    cy.seedAndVisit(todos);
    cy.get(".todo").should("have.length", 3);
  });
});
