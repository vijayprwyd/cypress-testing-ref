/* eslint-disable no-undef */
describe("Form submission", () => {
  it("Adds a new to do item", () => {
    const newTodo = "Some task";
    cy.seedAndVisit();
    cy.route({
      method: "POST",
      url: "/todos",
      response: {
        id: 123,
        task: newTodo,
        isComplete: false,
      },
    }).as("save");
    cy.get("#todo").type("Some task").type("{enter}");
    cy.wait("@save");
    cy.get(".todoList li").should("have.length", 4);
    // cy.get('#todo')
  });

  it("Displays error if save failed", () => {
    cy.seedAndVisit();
    cy.route({
      method: "POST",
      url: "/todos",
      status: 500,
      response: {},
    }).as("save");
    cy.get("#todo").type("Some task").type("{enter}");
    cy.wait("@save");
    cy.get(".todoList li").should("have.length", 3);
    cy.get(".save-error").should("have.length", 1);
  });
});
