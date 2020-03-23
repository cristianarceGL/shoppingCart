describe('Product List page', () => {
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

  it('Authenticated user to Products page', () => {
    cy.get('[data-cy=product-list]').should('be.visible');
    cy.get('[data-cy=product-details]').should('not.exist');
  });
});
