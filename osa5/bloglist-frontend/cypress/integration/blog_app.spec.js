describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Mauri Ernesti',
      username: 'mauriernesti',
      password: 'supersecret'
    };
    const differentUser = {
      name: 'Olli Väisänen',
      username: 'ojavaisa',
      password: 'passw0rd'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', differentUser);
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

      cy.get('html').should('not.contain', 'Mauri Ernesti logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mauriernesti', password: 'supersecret' });
    });

    it('a blog can be created', function () {
      cy.contains('New blog').click();

      cy.get('#title').type('Movie Blog');
      cy.get('#author').type('Roger Ebert');
      cy.get('#url').type('www.movieblog.com');
      cy.get('#submit-button').click();

      cy.get('html').contains('Movie Blog - Roger Ebert');  // NB! Format how blog title and author is displayed
    });

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Test blog 1', author: 'Test author 1', url: 'www.test1.com' });
        cy.createBlog({ title: 'Test blog 2', author: 'Test author 2', url: 'www.test2.com' });
        cy.createBlog({ title: 'Test blog 3', author: 'Test author 3', url: 'www.test3.com' });
      });

      it('a blog can be liked', function () {
        cy.contains('Test blog 1').parent().contains('View').click();
        cy.contains('Likes:').find('button').as('likeButton');

        cy.contains('Likes:').should('contain', '0');
        cy.get('@likeButton').click();
        cy.contains('Likes:').should('contain', '1');
        cy.get('@likeButton').click();
        cy.contains('Likes:').should('contain', '2');
      });

      it('logged in user can remove blog (they added)', function () {
        cy.contains('Test blog 1').parent().contains('View').click();
        cy.contains('Remove').click();
        cy.get('html').should('not.contain', 'Test blog 1');
      });

      it('different user cannot remove blog', function () {
        cy.contains('Logout').click();
        cy.login({ username: 'ojavaisa', password: 'passw0rd' });

        cy.contains('Test blog 1').parent().contains('View').click();

        cy.contains('Remove').parent().should('have.css', 'display', 'none'); //check that button is not visible to user
        cy.contains('Remove').click({ force: true }); //(attempt to) click the non-visible button anyway 
        //check for error message here? error notificatins not yet implemented in frontend
        cy.get('html').should('contain', 'Test blog 1');  //blog should not be removed 
      });

      it('blogs are ordered according to likes', function () {
        cy.contains('Test blog 1').parent().contains('View').click();
        cy.contains('Test blog 2').parent().contains('View').click();
        cy.contains('Test blog 3').parent().contains('View').click();

        cy.contains('Test blog 1').parent().contains('Likes:').find('button').as('likeBtn1');
        cy.contains('Test blog 2').parent().contains('Likes:').find('button').as('likeBtn2');
        cy.contains('Test blog 3').parent().contains('Likes:').find('button').as('likeBtn3');

        for (let i = 0; i < Math.floor(Math.random() * 7); i++) {  //click between 0 and 7, seven is of course the randomest number
          cy.get('@likeBtn1').click();
        }
        for (let i = 0; i < Math.floor(Math.random() * 7); i++) {
          cy.get('@likeBtn2').click();
        }
        for (let i = 0; i < Math.floor(Math.random() * 7); i++) {
          cy.get('@likeBtn3').click();
        }

        cy.get('.blogFullInfo > div').then((divs) => {
          //cy.log(divs);
          const texts = [...divs].map(div => div.textContent);
          //cy.log(texts)
          const justLikeDivs = texts.filter((divText) => divText.startsWith('Likes:'));
          //cy.log(justLikeDivs)
          const nums = justLikeDivs.map(text => text.match(/\d+/));
          //cy.log(nums);
          cy.wrap(nums).should('equal', nums.sort((a, b) => b - a));
        });
      });
    });


  });
});