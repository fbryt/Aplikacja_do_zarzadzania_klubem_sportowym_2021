const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}
const nextUser =

    describe('Check contractPage', () => {
        beforeEach(function () {
            cy.resetDB();
        });

        it('Is able to edit contract data', () => {

            cy.login(currentUser);

            cy.visit('http://localhost:3000/appUsers');

            cy.contains('Pablo');
            cy.contains('Black');
            cy.get('tbody').within(($list) => {
                cy.get('tr').eq(3).within(() => {
                    cy.get('td').eq(5).within(() => {
                        cy.get('button').click();
                    })
                })
            })
            cy.get('form').within(() => {
                cy.get('input[name="money"]').clear().type(3000);
                cy.contains("Save Changes").click();
            })

            cy.visit('http://localhost:3000/appUsers');
            cy.contains('Pablo');
            cy.contains('Black');
            cy.get('tbody').within(($list) => {
                cy.get('tr').eq(3).within(() => {
                    cy.get('td').eq(5).within(() => {
                        cy.get('button').click();
                    })
                })
            })
            cy.get('form').within(() => {
                cy.get('input[name="money"]').invoke('val').should('eq', '3000');
            })
        })
    })