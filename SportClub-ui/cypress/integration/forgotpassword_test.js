

/*
describe('Is able to retrieve password',()=>{
    it('reminds password', ()=>{
        cy.cleanInbox();
        const inboxUrl = Cypress.env('inboxUrl');
        const token = Cypress.env('Api-token');

        cy.visit("http://localhost:3000/");
        cy.url().should('include','/');
        cy.get('button').contains('Login form').click();

        cy.url().should('include','/login');
        cy.get('#logform > :nth-child(3) > :nth-child(2) > .btn').contains('Forgot password').click();

        cy.url().should('include','/forgotpassword');
        cy.get('#formEmail').clear().type('pablo@black.com');
        cy.get("button").contains("Submit").click();

        cy.getLastEmail().then(html => {
            cy.get('a').contains("Reset Password!").click();
        })

    })
})*/
