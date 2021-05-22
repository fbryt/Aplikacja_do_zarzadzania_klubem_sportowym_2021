const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe("Is able to connect players to coach",()=>{
    it('connects players to coach',()=>{
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Admin tools").click();
        cy.contains("Connect players with Coach").click();
        cy.url().should("include","/playersWithCoach");

        cy.get('ul').eq(0).within(()=>{
            cy.contains("Player: Pablo Magenta");
            cy.contains("Coach not found");
        })


        cy.contains("Select...").eq(0).click();
        cy.get('span[id="aria-context"]');
        cy.get('#react-select-2-option-0').click();
        cy.get("button").contains('Submit').eq(0).click();
        cy.reload();

        cy.get('ul').eq(0).within(()=>{
            cy.contains("Player: Pablo Magenta");
            cy.contains("Coach: Pablo Black");
        })
        cy.resetDB();
    })
})