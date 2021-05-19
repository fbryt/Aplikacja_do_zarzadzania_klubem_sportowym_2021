const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

    describe('Check contractPage', () => {
        it('Is able to edit contract data', () => {

            cy.login(currentUser);

            cy.visit('http://localhost:3000/appUsers');

            cy.contains('Pablo');
            cy.contains('Black');
            cy.get('tbody').within(($list) => {
                cy.get('tr').eq(4).within(() =>{
                    cy.get('td').eq(5).within(()=>{
                        cy.get('button').click();
                    })
                })
            })
            cy.get('form').within(() =>{
                cy.contains("Create New Contract").click();
                cy.contains('Save Changes');
                cy.get('input[name="money"]').clear().type(6000);
                cy.get(".react-date-picker__inputGroup").eq(1).within(()=>{
                    cy.get('input[name="year"]').type(2022);
                })
                cy.contains("Save Changes").click();
            })

            cy.visit('http://localhost:3000/appUsers');
            cy.contains('Pablo');
            cy.contains('Black');
            cy.get('tbody').within(($list) => {
                cy.get('tr').eq(4).within(() =>{
                    cy.get('td').eq(5).within(()=>{
                        cy.get('button').click();
                    })
                })
            })
            cy.get('form').within(() =>{
                cy.get(".react-date-picker__inputGroup").eq(1).within(()=>{
                    cy.get('input[name="year"]').invoke('val').should('eq','2022');
                })
                cy.get('input[name="money"]').invoke('val').should('eq','6000');
            })

        })
    })