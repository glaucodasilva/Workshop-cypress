/// <reference types="cypress" />

describe('validar menus', () => {
    let data;
    let dadosFaturamento;

    before(() => {
        cy.fixture("profile").then(dadosUsuario => {
            data = dadosUsuario;
        })
        cy.fixture("users").then(dadosUsers => {
            dadosFaturamento = dadosUsers;
        })
    });
    
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br');
    });

    it('clicando no link comprar deve direcionar para a página de compra', () => {
        cy.get('#primary-menu > .menu-item-629 > a').contains('Comprar').click();
        cy.title().should('eq', 'Produtos – EBAC – Shop');
    });

    it('clicando no link de conta deve direcionar para a página de login/cadastro', () => {
        cy.get('.icon-user-unfollow').click();
        cy.title().should('eq','Minha conta – EBAC – Shop')
    });

    /*it('criar cadastro de usuário', () => {
        cy.get('.icon-user-unfollow').click();
        cy.title().should('eq','Minha conta – EBAC – Shop');
        cy.get('#reg_email').type(data.email).should('have.value', data.email);
        cy.get('#reg_password').type(data.pass).should('have.value', data.pass);
        cy.get('.register .button').click();
        cy.get('.page-title').should('have.value','MINHA CONTA');
        cy.get('#main > .woocommerce').contains('Olá, jane');
    });*/

    it('login com o usuário cadastrado', () => {
        cy.get('.icon-user-unfollow').click();
        cy.title().should('eq','Minha conta – EBAC – Shop');
        cy.login(data.email, data.pass);
        cy.get('#main > .woocommerce').should('contain','Olá, jane');
    });
    
    it('selecionar e comprar um item', () => {
        cy.get('#primary-menu > .menu-item-629 > a').should('contain','Comprar').click();
        cy.get('.page-title').should('contain','Produtos');
        cy.get('.post-2559 > .product-block > .caption > .meta > .infor > .name > a').click();
        cy.get('.product_title').should('contain', 'Abominable Hoodie')
        cy.get('.button-variable-item-L').click();
        cy.get('.button-variable-item-Blue').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message').should('be.visible').contains('“Abominable Hoodie” foi adicionado no seu carrinho.');
        cy.get('.woocommerce-message > .button').click();
        cy.get('.page-title').should('contain','Carrinho');
        cy.get('.checkout-button').click();
        cy.faturamento(dadosFaturamento[0]);
        cy.get('#payment_method_cod').check();
        cy.get('#terms').check();
        cy.get('#place_order').click();
        cy.get('.page-title').should('contain','Pedido recebido');
    });
});