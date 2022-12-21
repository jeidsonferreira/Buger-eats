

class SignupPage {

    // Função de abrir o navegador e acessar a página de cadastro
    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    // Função de preenchimento do formulario de cadastro
    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()
        // Anexando cnh
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    // Função para submeter do cadastro
    submit() {
        cy.get('form button[class="button-success"]').click()
    }

    // Função validar a mensagem de sucesso do cadastro
    modalContentShouldBe(messageSucess) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', messageSucess)
    }

    // Função validar mensagem de erro
    alertMessageShouldBe(messageError) {
        //cy.get('span[class="alert-error"]').should('have.text', messageError)
        cy.contains('span[class="alert-error"]', messageError).should('be.visible')
    }
}

export default new SignupPage;

