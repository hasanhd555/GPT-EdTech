describe('Student Dashboard Testcase 11 - Access Student Dashboard Without Login', () => {
  it('should redirect to the landing page if not logged in', () => {
    cy.visit('localhost:3000/dash-student');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Student Dashboard Testcase 12 - Profile Edit and Save General Case', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('bye@gmail.com');
    cy.get('input[name="password"]').type('SEISANNOYING1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    cy.url().should('include', '/');
    cy.wait(500);
    cy.visit('localhost:3000/dash-student');
  });
  it('all three changed', () => {
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
  });

  it('name changed', () => {
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear()
    cy.get('input[name="name"]').type('Ali');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_name']").should('contain', 'Mrs. Ali');
  });

  it("name set to number error",()=>{
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear()
    cy.get('input[name="name"]').type('100');
    cy.get("[data-testid='save-button']").click();
    cy.on('window:alert', (message) => { expect(message).to.equal("Name cannot be only numbers."); });
    cy.get("[data-testid='cancel-button']").click();
  });

  it('age changed', () => {
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="age"]').clear()
    cy.get('input[name="age"]').type('23');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_age']").should('contain', '23');
  });

  it("gender changed",()=>{
    cy.get("[data-testid='edit-button']").click();
    cy.get('select[name="gender"]').select('Other');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_gender']").should('contain', 'Other');
    cy.get("[data-testid='shown_name']").should('contain', 'Ali');
  });

  it("change name and age",()=>{
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear()
    cy.get('input[name="age"]').clear()
    cy.get('input[name="name"]').type('Musa');
    cy.get('input[name="age"]').type('17');
    cy.get("[data-testid='save-button']").click();
    cy.get("[data-testid='shown_name']").should('contain', 'Musa');
    cy.get("[data-testid='shown_age']").should('contain', '17');
    cy.get("[data-testid='shown_gender']").should('contain', 'Other');
  });
});


describe('Student Dashboard Testcase 13 - Profile Edit and Save Name Null Case', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('bye@gmail.com');
    cy.get('input[name="password"]').type('SEISANNOYING1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    
    cy.url().should('include', '/');
    cy.wait(500);

    cy.visit('localhost:3000/dash-student'); 
  });

  it('should not allow empty name', () => {
    cy.get("[data-testid='edit-button']").click();
    cy.get('input[name="name"]').clear();
    cy.get("[data-testid='save-button']").click();
    cy.get('.invalid-feedback').should('contain', 'Name cannot be empty');
  });
});


describe('Student Dashboard Testcase 14 - Enrolled Courses Display', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('bye@gmail.com');
    cy.get('input[name="password"]').type('SEISANNOYING1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    
    cy.url().should('include', '/');
    cy.wait(500);

    cy.visit('localhost:3000/dash-student'); 
  });

  it('should display enrolled courses only', () => {
    cy.get('[data-testid="enrolled-courses"]').children().should('have.length', 1); 
  });
});

describe('Student Dashboard Testcase 15 - No Courses Display', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('bye2@gmail.com');
    cy.get('input[name="password"]').type('SEISANNOYING1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    
    cy.url().should('include', '/');
    cy.wait(500);

    cy.visit('localhost:3000/dash-student'); 
  });

  it('should show no courses message when no courses are enrolled', () => {
    cy.get('[data-testid="enrolled-courses"]').children().should('have.length', 0);
  });
});