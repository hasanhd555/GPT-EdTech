describe('Login Test', () => {
  it('Logs in with valid credentials', () => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('why@gmail.com');
    cy.get('input[name="password"]').type('abcd1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.url().should('include', '/');
    cy.wait(500);
    cy.visit('localhost:3000/dash-student');
  });
});

