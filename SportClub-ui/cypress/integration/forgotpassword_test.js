const currentUser = {
    username: "pablo@black.com",
    password: "pablochanged"
}

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
        cy.get('#formEmail').clear().type(currentUser.username);
        cy.get("button").contains("Submit").click();

        cy.wait(30000);
        cy.getLastEmail().then(html => {
            const link = html.match(/href="([^"]*)/)[1]
            cy.expect(link).to.contains('/resetpassword/')
            cy.visit(link);
        })
        cy.get('#password').clear().type(currentUser.password);
        cy.get("#confirm_password").clear().type(currentUser.password);
        cy.get("button").contains("Reset").click();

        cy.url().should('include','/login');
        cy.login(currentUser);
        cy.resetDB();

    })
})
