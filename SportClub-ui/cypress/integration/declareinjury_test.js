const currentUser = {
    username: "pablo@magenta.com",
    password: "pablomagenta"
}

describe('Declare Injury', () => {
    it('Is able to declare injury', () => {

        cy.login(currentUser);
        cy.visit('http://localhost:3000/dashboard');
        cy.get('a').contains("Declare Injury").click({multiple:true});
        cy.url().should('include', '/declareInjury');
        cy.get('button').contains("Submit").click({multiple : true});
        cy.url().should('include', '/dashboard');
    })
})