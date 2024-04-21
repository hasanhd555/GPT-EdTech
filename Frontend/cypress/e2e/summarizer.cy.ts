import { words_116, words_501, words_15, words_6 } from './constant';

describe('summarizer word limit tests', () => {
  const loginAndNavigateToSummarizer = () => {
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
  };

  const typeAndGenerate = (text:any) => {
      cy.wait(500);
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



describe('Summarizer page tests', () => {
  beforeEach(() => {
    // Visit the login page and log in as a student
    cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('why@gmail.com');
    cy.get('input[name="password"]').type('abcd1234');
    cy.get('input[value="student"]').check();
    cy.get('button[type="submit"]').click({ multiple: true });
    
    // Verify that the user is redirected to the home page after logging in
    cy.url().should('include', '/');
    cy.wait(500);

    // Now visit the summarizer page
    cy.visit('localhost:3000/summarizer'); // Replace with your actual summarizer page route if different
  });

  it('displays an error when the OpenAI API is unavailable', () => {
    // Mock the OpenAI API response to simulate it being down
    cy.intercept('POST', '**/openai/chat/completions', {
      statusCode: 503,
      body: {
        error: {
          message: 'Service unavailable',
        },
      },
    }).as('openAIRequest');

    // Fill in the text to summarize
    cy.get('textarea[name="summarizer-input"]').type('Mitochondria');

    // Select the 'Notes Maker' role and 'Bullet Points' mode
    cy.get('#role-1').click({force:true}); // Assuming the Notes Maker button has id 'role-1'
    cy.get('#mode-1').click({force:true}); // Assuming the Bullet Points button has id 'mode-1'

    // Click the 'Generate' button
    cy.get('[data-testid="generate-button"]').click();

    // Wait for the mocked API request to complete
    cy.wait('@openAIRequest');

    // Assert that an appropriate error message is displayed
    cy.get('[data-testid="summarizer-text"]')
      .should('contain', 'An error occurred while summarizing. Please try again.');

    // Check if the summary text is empty and if the summary word count is reset to 0
    cy.get('[data-testid="summarizer-text"]').should('be.empty');
    cy.get('h6').contains('Word Count: 0');
  });
});




  



