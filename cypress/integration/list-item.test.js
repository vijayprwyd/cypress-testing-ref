/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
describe("List item tests", () => {
  it("Should remove an item when deleted", () => {
    cy.seedAndVisit();
    cy.route({
      method: "DELETE",
      url: "/todos/*",
      response: {},
    }).as("delete");
    cy.get(".todo").first().find(".todoButton").click({ force: true });
    cy.wait("@delete");
    cy.get(".todo").should("have.length", 2);
  });

  it("Should update and toggle list item when clicked", () => {
    cy.seedAndVisit();
    cy.fixture("todos/todo.json").then((todos) => {
      const target = todos[0];
      cy.route({
        method: "PUT",
        url: "/todos/*",
        response: Cypress._.merge(target, { isComplete: true }),
      }).as("update");
    });

    cy.get(".todoList li").first().as("firstTodo");
    cy.get("@firstTodo").click();
    cy.wait("@update");
    cy.get("@firstTodo").find(".completed").should("have.length", 1);
  });
});
