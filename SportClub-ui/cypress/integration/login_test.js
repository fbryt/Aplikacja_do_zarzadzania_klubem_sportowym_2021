// first_test.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe('Log in', () => {
    it('Is able to log in as an admin', () => {
        cy.login(currentUser);
    })
})

