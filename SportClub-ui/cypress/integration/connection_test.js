// connection_test.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Server is loaded', () => {
    it('Visits the server', () => {
        cy.visit('/')
    })
})