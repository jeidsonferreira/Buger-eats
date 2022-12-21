/// <reference types="cypress" />

import signupFactory from "../factories/SignupFactory"
import signupPage from "../pages/SignupPage"

describe('Signup', () => {

    // O usuário deve ser entregue
    it('User should be deliver', function () {
        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const messageSucess = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(messageSucess)

    })
    // CPF incorreto
    it('Incorrect document', function () {
        var deliver = signupFactory.deliver()
        deliver.cpf = 'x00111222AB'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })
    // E-mail incorreto
    it('Incorrect Email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'abcd.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })
    // Validando campos obrigatórios
    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output)
            })
        })

    })

})