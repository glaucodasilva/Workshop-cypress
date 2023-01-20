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

Cypress.Commands.add('login', (email, pass) => {
    cy.get('#username').type(email).should('have.value', email);
    cy.get('#password').type(pass).should('have.value', pass);
    cy.get('.woocommerce-form > .button').click();
})

Cypress.Commands.add('faturamento', (userDados) => {
    const firstName = userDados.name.split(' ').slice(0,1).toString()
    const lastName = userDados.name.split(' ').slice(1).join(' ')
    cy.get('#billing_first_name').type(firstName).should('have.value',firstName);
    cy.get('#billing_last_name').type(lastName).should('have.value',lastName);
    cy.get('#billing_company').type(userDados.company.name).should('have.value',userDados.company.name);
    cy.get('#select2-billing_country-container').click();
    cy.get('#select2-billing_country-results').contains('Brasil').click();
    cy.get('#select2-billing_country-container').should('contain', 'Brasil');
    cy.get('#billing_address_1').type(userDados.address.street).should('have.value',userDados.address.street);
    cy.get('#billing_address_2').type(userDados.address.suite).should('have.value',userDados.address.suite);
    cy.get('#billing_city').type(userDados.address.city).should('have.value',userDados.address.city);
    cy.get('#billing_postcode').type(userDados.address.zipcode).should('have.value',userDados.address.zipcode);
    cy.get('#billing_phone').type(userDados.phone).should('have.value',userDados.phone);
    cy.get('#billing_email').type(userDados.email).should('have.value',userDados.email);
})