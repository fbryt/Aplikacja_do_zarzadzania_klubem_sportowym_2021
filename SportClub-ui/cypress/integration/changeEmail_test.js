const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe("change email test",() => {
    it("Is able to change email", () => {
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Admin tools").click();
        cy.contains("Check all users").click();
        cy.url().should("include","/appUsers");

        cy.contains('Pablo');
        cy.contains('Black');
        cy.get('tbody').within(($list) => {
            cy.get('tr').eq(0).within(() => {
                cy.get('td').eq(3).within(()=>{
                    cy.contains('pablo@black.com').click();
                })
                cy.get('td.react-bootstrap-table-editing-cell').within(()=>{
                    cy.get('input').clear().type('pablo@changed.com').blur();
                });
            });
        });

        cy.reload();

        cy.contains('Pablo');
        cy.contains('Black');
        cy.get('tbody').within(($list) => {
            cy.get('tr').eq(0).within(() => {
                cy.get('td').eq(3).within(()=>{
                    cy.contains('pablo@changed.com');
                })
            })
        });

        cy.resetDB();
    })
})