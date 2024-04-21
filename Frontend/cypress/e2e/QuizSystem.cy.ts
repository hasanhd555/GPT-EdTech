describe('Quiz System Spec', () => {
  it('No Quiz Options Selected', () => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('test1@student.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.wait(500);
    cy.url().should("include", "/");
    cy.visit('localhost:3000/quiz?id=65dcea4bf43941f534249f1b');
    cy.wait(500);
    cy.get('[data-testid="submit-button"]').should("have.class","disabled");


    cy.wait(120002);

    cy.get('[data-testid="submit-modal"]').should("be.visible");

    cy.get('[data-testid="quiz-score"]')
    .invoke('text') // Extract the text content of the element
    .then(text => {
      // Use Cypress assertion to check if the score is 0/20
      console.log(text);
      expect(text.trim()).to.equal('Score: 0/20');
    });

  });

  it('User Answers all questions', () => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('test1@student.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.wait(500);
    cy.url().should("include", "/");
    cy.visit('localhost:3000/quiz?id=65dcea4bf43941f534249f1b');
    cy.wait(500);
    cy.get('[data-testid="submit-button"]').should("have.class","disabled");

    cy.get('[data-testid="question0-option1"]').click();;
    cy.get('[data-testid="question1-option3"]').click();

    cy.get('[data-testid="submit-button"]').should("not.have.class","disabled");
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="submit-modal"]').should("be.visible");

    cy.get('[data-testid="quiz-score"]')
    .invoke('text') // Extract the text content of the element
    .then(text => {
      // Use Cypress assertion to check if the score is 0/20
      console.log(text);
      expect(text.trim()).to.equal('Score: 20/20');
    });

  });
});

  



