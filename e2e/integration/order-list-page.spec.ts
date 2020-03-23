describe('Order List page', () => {
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
    cy.get('[data-cy=email]').type('shopping@gorilla.com');
    cy.get('[data-cy=password]').type('Aa123456!');
    cy.get('[data-cy=submit]').click();
  });

  it('Display items in cart', () => {
    cy.get('[data-cy=element-0]')
      .wait(1500)
      .click();
    cy.get('[data-cy=item-quantity]').type('3');
    cy.get('[data-cy=add-to-cart]').click();
    cy.get('[data-cy=cart-items]').click();
    cy.get('[data-cy=do-checkout]').click();
    cy.get('[data-cy=order-list]').should('be.visible');
  });
});
