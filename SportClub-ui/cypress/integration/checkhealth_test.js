const currentUser = {
    username: "pablo@black.com",
    password: "pabloblack"
}

describe("Coach is able to check health of his players",()=>{
    it("checks that player is healthy",()=>{
        cy.login(currentUser);
        cy.get('button').contains("Coach tools").click();
        cy.contains("My players").click();
        cy.url().should("include","/myPlayers");

        cy.contains('Pablo');
        cy.contains('Magenta');
        cy.contains('pablo@magenta.com');
        cy.get('tbody').within(($list) => {
            cy.get('tr').eq(0).within(() => {
                cy.get('td').eq(4).within(()=>{
                    cy.contains('Healthy');
                })
            });
        });

        cy.resetDB();



    })
})