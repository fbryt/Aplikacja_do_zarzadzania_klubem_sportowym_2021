const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe('Create announcement', () => {
    it('Is able to create announcement', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/announcement');

        cy.get('button').click({multiple : true});

        cy.url().should('include', '/dashboard');

        cy.contains('11.05.2021 Na Sohan odbedzie sie event gorniczy');
    })
})

