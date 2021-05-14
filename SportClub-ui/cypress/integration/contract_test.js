const currentUser = {
    username: "pablo@magenta.com",
    password: "pablomagenta"
}

describe('Check contractPage', () => {
    it('Is able to see contract data', () => {

        cy.login(currentUser);

        cy.visit('http://localhost:3000/mycontract');

        cy.contains('2000');
    })
})

