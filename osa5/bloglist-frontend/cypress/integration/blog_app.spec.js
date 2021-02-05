describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {

    cy.get('h2')
      .should('contain', 'Blogs');
    
    cy.get('#username');  // cypress commands have built-in assertions, so no need for ".should('exist')" or something similar
    cy.get('#password')
  });
})