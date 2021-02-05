describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Mauri Ernesti',
      username: 'mauriernesti',
      password: 'supersecret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {

    cy.get('h2')
      .should('contain', 'Blogs');

    cy.get('#username');  // cypress commands have built-in assertions, so no need for ".should('exist')" or something similar
    cy.get('#password');
  });

  describe('Login', function () {
    it('succeeds with correct credentielas', function () {
      cy.get('#username').type('mauriernesti');
      cy.get('#password').type('supersecret');
      cy.get('#login-button').click();

      cy.contains('Mauri Ernesti logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mauriernesti');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();

      /* cy.get('.error') //error notificatins not yet implemented in frontend
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid'); */
      
      cy.get('html').should('not.contain', 'Mauri Ernesti logged in')
    });
  });
});