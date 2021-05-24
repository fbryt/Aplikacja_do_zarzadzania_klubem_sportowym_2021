const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe("Is able to check own info",()=>{
    it('shows user info',()=>{
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Account").click();
        cy.contains("Info").click();
        cy.url().should("include","/settings");

        cy.get("#name").should('have.attr','value',"Pablo");
        cy.get("#surname").should('have.attr','value',"White");
        cy.get("#email").should('have.attr','value',"pablo@white.com");
        cy.get("#role").should('have.attr','value',"ADMIN");

    })
})