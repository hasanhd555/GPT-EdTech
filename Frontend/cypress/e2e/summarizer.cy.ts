import {words_116} from './constant';

describe('summarizer word limit tests', () => {
    it('summarizer empty', () => {
  
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('why@gmail.com');
      cy.get('input[name="password"]').type('abcd1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
      cy.get("[data-testid='generate-button']").click();
      cy.get("[data-testid='summarizer-text']").should('contain', 'Please enter some text or a title.');
    
    });

    it('summarizer normal', () => {
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('why@gmail.com');
      cy.get('input[name="password"]').type('abcd1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
      cy.wait(500);
      cy.get('textarea[name="summarizer-input"]').type(words_116);
      cy.get("[data-testid='generate-button']").click();
      //check if output exists
      cy.get("[data-testid='summarizer-text']").should('contain', 'botanist');
      

    });


    
    
  });



