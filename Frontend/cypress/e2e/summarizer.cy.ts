import { words_116, words_501, words_15, words_6 } from './constant';

describe('summarizer word limit tests', () => {
  const loginAndNavigateToSummarizer = () => {
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(1000);
      cy.visit('localhost:3000/summarizer');
  };

  const typeAndGenerate = (text:any) => {
      cy.wait(1000);
      cy.get('textarea[name="summarizer-input"]').type(text, { delay: 0 });
      cy.get("[data-testid='generate-button']").click();
  };

  it('summarizer empty', () => {
      loginAndNavigateToSummarizer();
      cy.get("[data-testid='generate-button']").click();
      cy.get("[data-testid='summarizer-text']").should('contain', 'Please enter some text or a title.');
  });

  it('summarizer normal', () => {
      loginAndNavigateToSummarizer();
      typeAndGenerate(words_116);
      cy.get("[data-testid='summarizer-text']").should('contain', 'botanist');
  });

  it("summarizer over word limit", () => {
      loginAndNavigateToSummarizer();
      typeAndGenerate(words_501);
      cy.get("[data-testid='summarizer-text']").should('contain', 'Input text exceeded the maximum word limit of 500. Please keep it below the word limit');
  });

  it("summarizer under word limit", () => {
      loginAndNavigateToSummarizer();
      typeAndGenerate(words_15);
      cy.get("[data-testid='summarizer-text']").should('contain', 'Input text is too short to summarize. Please keep it above 20 words.');
  });

  it("notes maker empty", () => {
      loginAndNavigateToSummarizer();
      cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
      cy.get("[data-testid='generate-button']").click();
      cy.get("[data-testid='summarizer-text']").should('contain', 'Please enter some text or a title.');
  });

  it("notes maker over limit", () => {
      loginAndNavigateToSummarizer();
      cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
      typeAndGenerate(words_15);
      cy.get("[data-testid='summarizer-text']").should('contain', "Input title exceeded the word limit. Please keep the title below 10 words.");
  });

  it("notes maker normal", () => {
      loginAndNavigateToSummarizer();
      cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
      typeAndGenerate(words_6);
      cy.get("[data-testid='summarizer-text']").should('contain', 'sun');
  });
});



describe('Summarizer mode test', () => {
  beforeEach(() => {
    // Visit the login page and log in as a student
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('bye@gmail.com');
    cy.get('input[name="password"]').type('SEISANNOYING1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    
    // Verify that the user is redirected to the home page after logging in
    cy.url().should('include', '/');
    cy.wait(500);

    // Now visit the summarizer page
    cy.visit('localhost:3000/summarizer'); // Replace with your actual summarizer page route if different
  });
  const typeAndGenerate = (text:any) => {
    cy.wait(1000);
    cy.get('textarea[name="summarizer-input"]').type(text, { delay: 0 });
    cy.get("[data-testid='generate-button']").click();
  };
  it('Paragraph mode', () => {
    cy.get('input[type="radio"][value="paragraph"]').click({ force: true });
    typeAndGenerate(words_116);
    cy.wait(1000);
    cy.get('p.m-5').should('exist');
    //ul shoudl not exist
    cy.get('ul.m-5').should('not.exist');

    
  });
  it('Bullet Points mode', () => {
    cy.get('input[type="radio"][value="bullet"]').click({ force: true });
    typeAndGenerate(words_116);
    cy.wait(1000);
    cy.get('ul.m-5').should('exist');
    
  });
  


});




  



