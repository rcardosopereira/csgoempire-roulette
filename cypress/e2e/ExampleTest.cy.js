/// <reference types="Cypress" />
describe('Get highest numeric value from a specific selector', () => {
    it('should extract and display the highest numeric value', () => {
      cy.visit('https://csgoempire.com/roulette');
  
      // Extract numeric value from the specified CSS selector
      cy.get('#app > div.site-layout--chat-open.site-layout > div.site-layout__main.relative.z-10 > div > div > div.page-layout__inner > div.page > div > div.wheel.relative.mx-auto.mb-8.w-full.lg\\:mb-12 > div.wheel__item.absolute.z-20.flex.h-full.w-full.items-center.justify-center > div > div.font-numeric.text-2xl.font-bold')
        .should('exist')
        .then(($element) => {
          const textContent = $element.text().trim();
          const numericValue = parseFloat(textContent);
          cy.log(`Highest numeric value: ${numericValue}`);
        });
  
      // Extract and log the text content of the '.font-numeric' element
      cy.get('.font-numeric')
        .should('exist')
        .then(($element) => {
          const initialTimeValue = $element.text().trim();
          cy.log(`Initial time value: ${initialTimeValue}`);
        });
  
      // Extract numeric values from '.font-numeric' elements
      cy.get('.font-numeric')
        .should('exist')
        .then(($elements) => {
          const values = $elements.toArray().map((element) => {
            const value = parseFloat(element.textContent.trim());
            return isNaN(value) ? 0 : value;
          });
  
          // Calculate the highest and lowest values
          if (values.length > 0) {
            const highestValue = Math.max(...values);
            const lowestValue = Math.min(...values);
            const maxNumericValue = Math.max(...values);
  
            const highestValueInSeconds = highestValue * 60;
            const highestValueFormatted = highestValue.toFixed(2);
            const test = highestValueInSeconds.toFixed(2);
            const y = highestValue.toFixed(2);
  
            const centiseconds = (maxNumericValue % 1).toFixed(2) * 100;
            const seconds = Math.floor(maxNumericValue);
  
            // Log the results
            cy.log(`Highest value: ${highestValue}`);
            cy.log(`Lowest value: ${lowestValue}`);
            cy.log(`Highest value in seconds: ${highestValueInSeconds}`);
            cy.log(`Highest value formatted: ${highestValueFormatted}`);
            cy.log(`Highest value in seconds: ${test}`);
            cy.log(`Highest value: ${maxNumericValue}`);
            cy.log(`Highest value: ${y}`);
            cy.log(`Highest value in centiseconds and seconds: ${seconds}.${centiseconds}`);
          } else {
            cy.log('No numeric values found among .font-numeric elements.');
          }
        });
  
      // Use cy.clock() to control time
      cy.clock();
  
      // Wait for the roulette elements to be visible
      cy.get('.wheel__item--visible', { timeout: 30000 }).should('have.length.gt', 0);
  
      let highestValue = 0;
  
      // Iterate over visible elements with the specified class
      cy.get('.wheel__item--visible .font-numeric.text-2xl.font-bold', { timeout: 30000 })
        .each(($el) => {
          const numericValue = parseFloat($el.text());
          if (!isNaN(numericValue) && numericValue > highestValue) {
            highestValue = numericValue;
          }
        })
        .then(() => {
          cy.log(`The highest numeric value is: ${highestValue}`);
        });
  
      // Fast-forward time by 30 seconds
      cy.tick(30000);
  
      // Wait for an additional 16 seconds
      cy.wait(16000);
  
      // Iterate over visible elements again after the additional wait
      cy.get('.wheel__item--visible .font-numeric.text-2xl.font-bold', { timeout: 30000 })
        .each(($el) => {
          const numericValue = parseFloat($el.text());
          if (!isNaN(numericValue) && numericValue > highestValue) {
            highestValue = numericValue;
          }
        })
        .then(() => {
          const formattedHighestValue = highestValue.toFixed(2);
          cy.log(`The updated highest numeric value is: ${highestValue}`);
          cy.log(`The updated highest numeric value is: ${formattedHighestValue}`);
        });
  
      // Select the element with the specified style
      cy.get('.wheel').should('have.attr', 'style').then((styleAttribute) => {
        const backgroundPositionValue = styleAttribute.match(/background-position:\s*([0-9.]+)px center;/);
        if (backgroundPositionValue && backgroundPositionValue[1]) {
          const numericValue = parseFloat(backgroundPositionValue[1]);
          cy.log(`Highest background-position value: ${numericValue}`);
        } else {
          cy.log('Unable to extract background-position value');
        }
      });
    });
  });
  