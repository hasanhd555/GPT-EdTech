describe('Student dashboard Testcase 11', () => {
  it('Logs in with valid credentials', () => {

    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('why@gmail.com');
    cy.get('input[name="password"]').type('abcd1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.url().should('include', '/');
    cy.wait(500);
    //copy the above part to login
    cy.visit('localhost:3000/dash-student');
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear()
    cy.get('input[name="age"]').clear()
    cy.get('input[name="name"]').type('Zaeem');
    cy.get('input[name="age"]').type('21');
    cy.get('select[name="gender"]').select('Female');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_name']").should('contain', 'Mrs. Zaeem');
    cy.get("[data-testid='shown_age']").should('contain', '21');
    cy.get("[data-testid='shown_gender']").should('contain', 'Female');
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear()
    cy.get('input[name="age"]').clear()
    cy.get('input[name="name"]').type('Hasan Hameed');
    cy.get('input[name="age"]').type('20');
    cy.get('select[name="gender"]').select('Male');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_name']").should('contain', 'Mr. Hasan Hameed');
    cy.get("[data-testid='shown_age']").should('contain', '20');
    cy.get("[data-testid='shown_gender']").should('contain', 'Male');

  });
});
