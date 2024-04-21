import {words_116,words_501,words_15,words_11,words_6} from './constant';

describe('summarizer word limit tests', () => {
    it('summarizer empty', () => {
  
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
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
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
      cy.wait(500);
      cy.get('textarea[name="summarizer-input"]').type(words_116, { delay: 0 });
      cy.get("[data-testid='generate-button']").click();
      //check if output exists
      cy.get("[data-testid='summarizer-text']").should('contain', 'botanist');
      

    });

    it("summarizer over word limit", () => {
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
      cy.wait(500);
      cy.get('textarea[name="summarizer-input"]').type(words_501, { delay: 0 });
      cy.get("[data-testid='generate-button']").click();
      //check if output exists
      cy.get("[data-testid='summarizer-text']").should('contain', 'Input text exceeded the maximum word limit of 500. Please keep it below the word limit');

    });

    it("summarizer under word limit", () => {
      cy.visit('localhost:3000/login');
      cy.get('input[name="email"]').type('bye@gmail.com');
      cy.get('input[name="password"]').type('SEISANNOYING1234');
      cy.get('input[value="student"]').check();
      cy.get('button[type="submit"]').click({ multiple: true });
      cy.url().should('include', '/');
      cy.wait(500);
      cy.visit('localhost:3000/summarizer');
      cy.wait(500);
      cy.get('textarea[name="summarizer-input"]').type(words_15, { delay: 0 });
      cy.get("[data-testid='generate-button']").click();
      //check if output exists
      cy.get("[data-testid='summarizer-text']").should('contain', 'Input text is too short to summarize. Please keep it above 20 words.');
    });
    it("notes maker empty", ()=>{
        cy.visit('localhost:3000/login');
        cy.get('input[name="email"]').type('bye@gmail.com');
        cy.get('input[name="password"]').type('SEISANNOYING1234');
        cy.get('input[value="student"]').check();
        cy.get('button[type="submit"]').click({ multiple: true });
        cy.url().should('include', '/');
        cy.wait(500);
        cy.visit('localhost:3000/summarizer');
        cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
        cy.wait(500);
        cy.get("[data-testid='generate-button']").click();
        //check if output exists
        cy.get("[data-testid='summarizer-text']").should('contain', 'Please enter some text or a title.');  
        
      });
      it("notes maker over limit",()=>{
        cy.visit('localhost:3000/login');
        cy.get('input[name="email"]').type('bye@gmail.com');
        cy.get('input[name="password"]').type('SEISANNOYING1234');
        cy.get('input[value="student"]').check();
        cy.get('button[type="submit"]').click({ multiple: true });
        cy.url().should('include', '/');
        cy.wait(500);
        cy.visit('localhost:3000/summarizer');
        cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
        cy.wait(500);
        cy.get('textarea[name="summarizer-input"]').type(words_15, { delay: 0 });
        cy.get("[data-testid='generate-button']").click();
        //check if output exists
        cy.get("[data-testid='summarizer-text']").should('contain', "Input title exceeded the word limit. Please keep the title below 10 words.");

      });
      it("notes maker normal",()=>{
        cy.visit('localhost:3000/login');
        cy.get('input[name="email"]').type('bye@gmail.com');
        cy.get('input[name="password"]').type('SEISANNOYING1234');
        cy.get('input[value="student"]').check();
        cy.get('button[type="submit"]').click({ multiple: true });
        cy.url().should('include', '/');
        cy.wait(500);
        cy.visit('localhost:3000/summarizer');
        cy.get('input[type="radio"][value="notes_maker"]').click({ force: true });
        cy.wait(500);
        cy.get('textarea[name="summarizer-input"]').type(words_6, { delay: 0 });
        cy.get("[data-testid='generate-button']").click();
        //check if output exists
        cy.get("[data-testid='summarizer-text']").should('contain', 'sun');
        
      });



   


    
    
  });



