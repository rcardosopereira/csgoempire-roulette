/// <reference types="Cypress" />

describe('Visit Betting WebSite: Automation Test', () => {
    beforeEach(() => {
        cy.visit('https://csgoempire.com/roulette');
    });

    it('Extract and display the numeric value from the two times', () => {
        cy.performNumericValueChecks();
    });

    it('Verify that the betting input field is empty after clearing', () => {
        cy.get('.bet-input__controls-inner > :nth-child(1)').click();
        cy.get('.bet-input__field > .h-full').should("have.value", "0.00");
    });

    it("Verifies if the betting amount is increased by 100", () => {
        cy.get('.bet-input__controls-inner > :nth-child(6)').click();
        cy.get('.bet-input__field > .h-full').should("have.value", "100.00");
    });

    it("Verifies if the betting amount is increased by 200 (X2)", () => {
        cy.increase100();
        cy.get('.bet-input__controls-inner > :nth-child(8)').click();
        cy.get('.bet-input__field > .h-full').should("have.value", "200.00");
    });

    it("Verifies if the bet amount has been halved (1/2).", () => {
        cy.increase100();
        cy.get('.bet-input__controls-inner > :nth-child(7)').click();
        cy.get('.bet-input__field > .h-full').should("have.value", "50.00");
    });

    it("Verifies if any manually entered value can assert that the input field has the correct value", () => {
        cy.get('.bet-input__field > .h-full').type('1500');
        cy.get('.bet-input__field > .h-full').should('have.value', '1500');
    });

});

