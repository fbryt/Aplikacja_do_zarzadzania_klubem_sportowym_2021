const currentUser={
    username: "pablo@white.com",
    password: "pablowhite"
}


describe("registers user", ()=> {


    it("registers user",()=>{
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Admin tools").click();
        cy.contains("Register user").click();
        cy.url().should("include","/register");

        cy.get('form').within(() =>{
            cy.get('input[name="email"]').clear().type("pablo@test.com");
            cy.get('input[name="password"]').should("have.attr","type","password")
                .clear().type("pablotest");
            cy.get('input[name="firstName"]').clear().type("Pablo");
            cy.get('input[name="lastName"]').clear().type("Test");
            cy.get('#formRole').select("PLAYER");
            cy.get("button").contains("Submit").click();

            cy.url().should("include","/dashboard");

        })

        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Admin tools").click();
        cy.contains("Check all users").click();

        cy.url().should('include','/appUsers');

        cy.contains('Pablo');
        cy.contains('Test');
        cy.contains('pablo@test.com');

        cy.resetDB();

    })

})