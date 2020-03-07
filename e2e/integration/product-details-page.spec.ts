describe('Product Details page', () => {
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

  it('Click an element of the list', () => {
    cy.visit('/auth');
    cy.get('[data-cy=email]').type('shopping@gorilla.com');
    cy.get('[data-cy=password]').type('Aa123456!');
    cy.get('[data-cy=submit]').click();

    cy.get('[data-cy=element-0]')
      .wait(1500)
      .click();
  });
});
