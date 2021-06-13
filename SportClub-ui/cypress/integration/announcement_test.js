const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe('Create announcement', () => {
    it('Is able to create announcement', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/announcement');

        cy.get('button').contains("Submit").click({multiple : true});

        cy.url().should('include', '/dashboard');

    })
})
describe('Edit and delete announcement', () => {
    it('Is able to edit and delete announcement', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/dashboard');

        cy.get('ul button:first').click({multiple : true});

        cy.url().should('include', '/dashboard');

        cy.contains('11.05.2021 Na Sohan odbedzie sie event gorniczy');
        cy.get('textarea').type("siema");
        cy.get('button').contains("Save Changes").click({multiple:true});
        cy.url().should('include', '/dashboard');
        cy.contains('11.05.2021 Na Sohan odbedzie sie event gorniczysiema');
        cy.get('button').contains("Delete").click({multiple : true});
        cy.url().should('include', '/dashboard');
        cy.contains('11.05.2021 Na Sohan odbedzie sie event gorniczy').should('not.exist');
    })
})


