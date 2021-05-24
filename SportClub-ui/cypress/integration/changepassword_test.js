const currentUser = {
    username: "pablo@white.com",
    password: "pablowhite"
}

describe("change password test",() => {
    beforeEach(function () {
        cy.resetDB();
    });
    it("Is able to change password", () => {
        cy.login(currentUser);
        cy.get('.navbar-toggler-icon').click();
        cy.get('button').contains("Account").click();
        cy.contains("Change password").click();
        cy.url().should("include","/settings/password");

        cy.contains("Change Password");

        cy.get('form').within(()=>{
            cy.get('input[name="oldpassword"]').should('have.attr','type','password');
            cy.get('img').eq(0).click();
            cy.get('input[name="oldpassword"]').should('have.attr','type','text');

            cy.get('input[name="password"]').should('have.attr','type','password');
            cy.get('img').eq(1).click();
            cy.get('input[name="password"]').should('have.attr','type','text');

            cy.get('input[name="confirmpassword"]').should('have.attr','type','password');
            cy.get('img').eq(2).click();
            cy.get('input[name="confirmpassword"]').should('have.attr','type','text');

            cy.get('input[name="oldpassword"]').type("pablowhite");
            cy.get('input[name="password"]').type("pablowhite1");
            cy.get('input[name="confirmpassword"]').type("pablowhite2");

            cy.get('img').eq(0).click();
            cy.get('img').eq(1).click();
            cy.get('img').eq(2).click();

            cy.get("button").click();
            cy.contains("Passwords do not match!");

            cy.get('img').eq(0).click();
            cy.get('img').eq(1).click();
            cy.get('img').eq(2).click();
            cy.get('input[name="oldpassword"]').clear().type("pablowhite1");
            cy.get('input[name="password"]').clear().type("pablowhite1");
            cy.get('input[name="confirmpassword"]').clear().type("pablowhite1");
            cy.get('img').eq(0).click();
            cy.get('img').eq(1).click();
            cy.get('img').eq(2).click();
            cy.get("button").click();
            cy.contains("Invalid password!");

            cy.get('img').eq(0).click();
            cy.get('img').eq(1).click();
            cy.get('img').eq(2).click();
            cy.get('input[name="oldpassword"]').clear().type(currentUser.password);
            cy.get('input[name="password"]').clear().type("pablowhite1");
            cy.get('input[name="confirmpassword"]').clear().type("pablowhite1");
            cy.get('img').eq(0).click();
            cy.get('img').eq(1).click();
            cy.get('img').eq(2).click();
            cy.get("button").click();
        });

            cy.url().should('include','/dashboard');
            cy.get('.navbar-toggler-icon').click();
            cy.get('button').contains("Account").click();
            cy.contains("Logout").click();
            cy.url().should("include","/");


            cy.get("button").contains("Login form").click();
            cy.get("#formUsername").clear().type(currentUser.username);
            cy.get("#formPassword").clear().type(currentUser.password);
            cy.get("button").contains("Log in").click();
            cy.contains('Invalid Username or Password!');

            cy.get("#formUsername").clear().type(currentUser.username);
            cy.get("#formPassword").clear().type("pablowhite1");
            cy.get("button").contains("Log in").click();
            cy.url().should("include",'/dashboard');
            cy.resetDB();


    })
})