const currentUser = {
    username: "pablo@magenta.com",
    password: "pablomagenta"
}

describe('Check contractPage', () => {
    it('Is able to see contract data', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/mycontract');

        cy.get('#money').should('have.attr','value','2000');
    })
})

