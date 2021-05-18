const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}
const message = "Hello Cypress!";
const editMessage = "Bye Cypress!";

describe('Create announcement', () => {
    it('Is able to create announcement', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/announcement');

        cy.get('button[editext="edit-button"]').click();


        cy.get('textarea').clear().type(message);

        cy.get('button[editext="save-button"]').click();

        cy.get('button').contains('Submit').click();

        cy.url().should('include', 'dashboard');
        cy.reload();
        cy.contains(message);
    })
})
describe('Edit and delete announcement', () => {
    it('Is able to edit and delete announcement', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/dashboard');

        const card = cy.contains('div[id=logform]', message);
        card.find('button').contains('Edit').click();

        cy.get('textarea').clear().type(editMessage);
        cy.get('button').contains('Save').click();

        const editedCard = cy.contains('div[id=logform]', editMessage);
        editedCard.find('button').contains('Delete').click();

        editedCard.should('not.exist');
    })
})


