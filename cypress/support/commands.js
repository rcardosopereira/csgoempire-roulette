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
Cypress.Commands.add('increase100', () => {
    cy.get('.bet-input__controls-inner > :nth-child(6)').click();
    cy.get('.bet-input__field > .h-full').should("have.value", "100.00");
});

Cypress.Commands.add('performNumericValueChecks', () => {
    // Extract and display the highest numeric value from the main selector
    cy.get('#app div.font-numeric.text-2xl.font-bold')
        .should('exist')
        .then(($element) => {
            const numericValue = parseFloat($element.text().trim());
            cy.log(`Highest numeric value from main selector: ${numericValue}`);
        });

    // Extract and display the initial time value
    cy.get('.font-numeric')
        .should('exist')
        .then(($element) => {
            const initialTimeValue = $element.text().trim();
            cy.log(`Initial time value: ${initialTimeValue}`);
        });

    // Extract and display the highest numeric value among the elements with the '.font-numeric' class
    cy.get('.font-numeric')
        .should('exist')
        .then(($elements) => {
            const numericValues = $elements.toArray().map((element) => parseFloat(element.textContent.trim())).filter((value) => !isNaN(value));

            if (numericValues.length > 0) {
                const highestValue = Math.max(...numericValues);
                const formattedHighestValue = highestValue.toFixed(2);
                cy.log(`Highest value among '.font-numeric' elements: ${formattedHighestValue}`);
            } else {
                cy.log("No numeric values found among '.font-numeric' elements.");
            }
        });

    // Use cy.clock() to control time
    cy.clock();

    // Wait for the roulette elements to be visible
    cy.get('.wheel__item--visible', { timeout: 60000 }).should('have.length.gt', 0);

    let highestValue = 0;

    // Iterate over visible elements with the specified class
    cy.get('.wheel__item--visible .font-numeric.text-2xl.font-bold', { timeout: 60000 })
        .each(($el) => {
            const numericValue = parseFloat($el.text());

            if (!isNaN(numericValue) && numericValue > highestValue) {
                highestValue = numericValue;
            }
        })
        .then(() => {
            const formattedHighestValue = highestValue.toFixed(2);
            cy.log(`The highest numeric value is: ${formattedHighestValue}`);
        });

    // Fast-forward time by 30 seconds
    cy.tick(30000);

    // Wait for an additional 16 seconds
    cy.wait(16000);

    // Iterate over visible elements again after the additional wait
    cy.get('.wheel__item--visible .font-numeric.text-2xl.font-bold', { timeout: 60000 })
        .each(($el) => {
            const numericValue = parseFloat($el.text());

            if (!isNaN(numericValue) && numericValue > highestValue) {
                highestValue = numericValue;
            }
        })
        .then(() => {
            const formattedHighestValue = highestValue.toFixed(2);
            cy.log(`The updated highest numeric value is: ${formattedHighestValue}`);
        });
});
