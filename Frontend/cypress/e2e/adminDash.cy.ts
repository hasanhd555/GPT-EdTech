describe("Admin Dashboard Test Case 23 - Edit Course Details", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/login");
    cy.get('input[name="email"]').type("admin100@gmail.com");
    cy.get('input[name="password"]').type("admin100");
    cy.get('input[value="admin"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.url().should("include", "/");
    cy.wait(500);

    cy.visit("localhost:3000/dash-admin");
    cy.get('[data-testid="edit-course-button"]').click();
    cy.visit("localhost:3000/edit-course?id=6625390944a3df471caa17ee");
  });

  it("should display an error for empty text fields", () => {
    cy.get('[data-testid="edit-course-button"]').click();

    cy.get('[data-testid="course-content-input"]').clear();
    cy.get('[data-testid="save-course-button"]').click();
    cy.get('[data-testid="course-title-error"]').should(
      "contain",
      "Title is required"
    );
    cy.get('[data-testid="course-content-error"]').should(
      "contain",
      "Description is required"
    );
  });
});

describe("Admin Dashboard Test Case 24 - Course Analytics Page When No Courses", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/login");
    cy.get('input[name="email"]').type("admin100@gmail.com");
    cy.get('input[name="password"]').type("admin100");
    cy.get('input[value="admin"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.url().should("include", "/");
    cy.wait(500);

    cy.visit("localhost:3000/dash-admin");

    cy.visit("localhost:3000/course-analytics?id=6625390944a3df471caa17ee");
  });

  it("should display a message for no enrollments", () => {
    cy.get('[data-testid="no-enrollments-message"]').should("be.visible");
    cy.contains("No data available for this course. No enrollments.");
  });
});
