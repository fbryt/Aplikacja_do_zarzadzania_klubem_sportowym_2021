const currentUser = {
    username: "pablo@black.com",
    password: "pabloblack"
}

const player = {
    username: "pablo@magenta.com",
    password: "pablomagenta"
}


describe("It adds new event", () => {

    const eventName = "testowy event";

    it("adds new event", () => {
        cy.resetDB();

        cy.login(currentUser);

        cy.url().should("include", "/dashboard");
        cy.get('#responsive-navbar-nav').within(() => {
            cy.get('button').contains("Coach tools").click();
            cy.contains("Create Event").click();
        })
        cy.url().should("include", "/event");
        cy.get(":nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .calendar").click();
        cy.get(".react-datepicker").within(() => {
            cy.get(".react-datepicker__day--012").click();
        })
        cy.get(":nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .calendar").click();
        cy.get(".react-datepicker").within(() => {
            cy.get(".react-datepicker__day--013").click();
        })
        cy.get(".styles-module_Editext__button__sxYQX").click();
        cy.get(".textarea").clear().type(eventName);
        cy.get(".styles-module_Editext__save_button__1Dlwo").click();
        cy.get("#button > .btn").contains("Submit").click();
        cy.wait(3000);
        cy.url().should("include", "/dashboard");

    })

    it("is viewable by assigned players", () => {
        cy.login(player);

        cy.get('a').contains('Schedule').click();

        cy.contains(eventName);
    })
})