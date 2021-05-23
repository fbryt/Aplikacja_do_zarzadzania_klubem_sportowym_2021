// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {

    cy.visit('http://localhost:3000/login')

    cy.url().should('include', '/login');

    cy.get('input[name="username"]').type(username);

    cy.get('input[name="password"]').type(`${password}{enter}`);

    cy.url().should('include', '/dashboard')

});

Cypress.Commands.add('resetDB', () => {
    cy.request('http://localhost:8080/db/reset');
});

const inboxUrl = Cypress.env('inboxUrl')
const token  = Cypress.env('API_KEY')
Cypress.Commands.add('getLastEmail', () => {
    function requestEmail() {
        return cy
            .request({
                method: 'GET',
                url: `${inboxUrl}/messages`,
                headers: {
                    'Api-Token': token,
                },
                json:true
            })
            .then((response) => {

                cy.log('dupa');
               cy.log(JSON.stringify(response));
               const msgId = response.body.id;
                    cy.request({
                        method: 'GET',
                        url: `${inboxUrl}/messages/${msgId}/body.html`,
                        headers: {
                            'Api-Token': token,
                        },
                        json: true,
                    }).then(({ body }) => {
                        if (body) { return body }

                        cy.wait(1000);
                        return requestEmail();
                    })
            })

    }

    return requestEmail();
});

Cypress.Commands.add('cleanInbox', () => {
    return cy.request({
        method: 'PATCH',
        url: `${inboxUrl}/clean`,
        headers: {
            'Api-Token': token,
        },
        json: true,
    })
});