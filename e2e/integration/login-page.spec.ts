describe('Login form', () => {
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
    cy.get('[data-cy=email]').type('user.test@gorillalogic.com');
    cy.get('[data-cy=password]').type('Password123');
  });

  it('Email form validation', () => {
    cy.visit('/auth');
    cy.get('[data-cy=email]').clear();
    cy.get('form').submit();
    cy.get('#mat-error-0').should('contain', 'Email is required');
  });

  it('Passwod form validation', () => {
    cy.visit('/auth');
    cy.get('[data-cy=password]').clear();
    cy.get('form').submit();
    cy.get('#mat-error-1').should('contain', 'Password is required');
  });

  it('Submit a valid form', () => {
    cy.get('form').submit();
  });
});
