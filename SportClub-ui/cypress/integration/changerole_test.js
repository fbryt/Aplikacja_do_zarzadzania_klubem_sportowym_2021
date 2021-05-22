const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe("change role test",() => {
    it("Is able to change role", () => {
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Admin tools").click();
        cy.contains("Check all users").click();
        cy.url().should("include","/appUsers");

        cy.contains('Pablo');
        cy.contains('Black');
        cy.get('tbody').within(($list) => {
            cy.get('tr').eq(0).within(() => {
                cy.get('td').eq(4).within(()=>{
                    cy.contains('COACH').click();
                })
                cy.get('td.react-bootstrap-table-editing-cell').within(()=>{
                    cy.get('select').select('Player').blur();
                });
            });
        });

        cy.reload();

        cy.contains('Pablo');
        cy.contains('Black');
        cy.get('tbody').within(($list) => {
            cy.get('tr').eq(0).within(() => {
                cy.get('td').eq(4).within(()=>{
                    cy.contains('PLAYER');
                })
            })
        });

        cy.resetDB();
    })
})