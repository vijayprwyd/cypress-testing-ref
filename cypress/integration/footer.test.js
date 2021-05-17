/* eslint-disable no-undef */
import mixedTodos from "../fixtures/todos/mixed_todos.json";
describe("Footer", () => {
  it("Filters todos", () => {
    const filters = [
      { link: "Active", expectedLength: 2 },
      { link: "Completed", expectedLength: 3 },
      { link: "All", expectedLength: 5 },
    ];
    cy.seedAndVisit(mixedTodos);
    cy.wrap(filters).each((filter) => {
      cy.contains(filter.link).click();
      cy.get(".todoList li").should("have.length", filter.expectedLength);
    });
  });
});
