describe('Billing Information page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body')
      .wait(1000)
      .then(body => {
        if (body.find('[data-cy="products-page"]').length > 0) {
          cy.get('.logout').click();
        }
      });
  });

  beforeEach(() => {
    cy.visit('/auth');
    cy.get('input[data-cy=email]')
      .type('shopping@gorilla.com')
      .get('input[data-cy=password]')
      .type('Aa123456!');
    cy.get('[data-cy=submit]').click();
  });

  beforeEach(() => {
    cy.get('[data-cy=element-0]')
      .wait(1500)
      .click();
    cy.get('input[data-cy=item-quantity]').type('3');
    cy.get('[data-cy=add-to-cart]').click();
    cy.get('[data-cy=cart-items]').click();
    cy.get('[data-cy=do-checkout]').click();
    cy.get('[data-cy=order-list]').should('be.visible');
    cy.get('[data-cy=order-checkout]').click();
  });

  beforeEach(() => {
    cy.get('input[data-cy=shipping-firstName]')
      .type('John', { force: true })
      .should('have.value', 'John');
    cy.get('input[data-cy=shipping-lastName]')
      .type('Doe', { force: true })
      .should('have.value', 'Doe');
    cy.get('input[data-cy=shipping-email]')
      .type('john.doe@gorilla.com', { force: true })
      .should('have.value', 'john.doe@gorilla.com');
    cy.get('input[data-cy=shipping-company]')
      .type('Gorilla Logic', { force: true })
      .should('have.value', 'Gorilla Logic');
    cy.get('input[data-cy=shipping-addressLine1]')
      .type('Sabana Business Center', { force: true })
      .should('have.value', 'Sabana Business Center');
    cy.get('input[data-cy=shipping-addressLine2]')
      .type('Mata Redonda', { force: true })
      .should('have.value', 'Mata Redonda');
    cy.get('input[data-cy=shipping-city]')
      .type('San Jose', { force: true })
      .should('have.value', 'San Jose');
    cy.get('input[data-cy=shipping-zipCode]')
      .type('20220', { force: true })
      .should('have.value', '20220');
    cy.get('input[data-cy=shipping-phone]')
      .type('22606060', { force: true })
      .should('have.value', '22606060');
    // Country/Region
    cy.get('mat-select[data-cy=shipping-country]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=shipping-country-0]')
      .contains('Costa Rica')
      .then(option => option[0].click());
    cy.get('mat-select[data-cy=shipping-region]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=shipping-region-0]')
      .contains('Provincia de Alajuela')
      .then(option => option[0].click());
    cy.get('[data-cy=shipping-continue-to]').click();
    cy.get('[data-cy=billing-form]').should('be.visible');
  });

  it('Fill in Billing information & Continue', () => {
    // Billing form BEGIN
    cy.get('input[data-cy=billing-firstName]')
      .type('John', { force: true })
      .should('have.value', 'John');
    cy.get('input[data-cy=billing-lastName]')
      .type('Doe', { force: true })
      .should('have.value', 'Doe');
    cy.get('input[data-cy=billing-email]')
      .type('john.doe@gorilla.com', { force: true })
      .should('have.value', 'john.doe@gorilla.com');
    cy.get('input[data-cy=billing-company]')
      .type('Gorilla Logic', { force: true })
      .should('have.value', 'Gorilla Logic');
    cy.get('input[data-cy=billing-addressLine1]')
      .type('Sabana Business Center', { force: true })
      .should('have.value', 'Sabana Business Center');
    cy.get('input[data-cy=billing-addressLine2]')
      .type('Mata Redonda', { force: true })
      .should('have.value', 'Mata Redonda');
    cy.get('input[data-cy=billing-city]')
      .type('San Jose', { force: true })
      .should('have.value', 'San Jose');
    cy.get('input[data-cy=billing-zipCode]')
      .type('20220', { force: true })
      .should('have.value', '20220');
    cy.get('input[data-cy=billing-phone]')
      .type('22606060', { force: true })
      .should('have.value', '22606060');
    // Country/Region
    cy.get('mat-select[data-cy=billing-country]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=billing-country-0]')
      .contains('Costa Rica')
      .then(option => option[0].click());
    cy.get('mat-select[data-cy=billing-region]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=billing-region-0]')
      .contains('Provincia de Alajuela')
      .then(option => option[0].click());
    // Billing form END

    // Payment form BEGIN
    cy.get('input[data-cy=card-name]')
      .type('John Doe Johnson', { force: true })
      .should('have.value', 'John Doe Johnson');
    cy.get('input[data-cy=card-number]')
      .type('4242000042420000', { force: true })
      .should('have.value', '4242000042420000');
    cy.get('input[data-cy=card-cvc]')
      .type('1234', { force: true })
      .should('have.value', '1234');
    // Type/Expirations
    cy.get('mat-select[data-cy=card-type]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=card-type-visa]')
      .contains('Visa')
      .then(option => option[0].click());
    cy.get('mat-select[data-cy=card-month]')
      .first()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=card-month-01]')
      .contains('01')
      .then(option => option[0].click());
    cy.get('mat-select[data-cy=card-year]')
      .last()
      .click({ force: true }); // opens the drop down
    cy.get('[data-cy=card-year-2030]')
      .contains('2030')
      .then(option => option[0].click());
    // Payment form END

    cy.get('[data-cy=billing-continue-to]').click({ force: true });
    cy.get('[data-cy=place-order-page]').should('be.visible');
  });
});
