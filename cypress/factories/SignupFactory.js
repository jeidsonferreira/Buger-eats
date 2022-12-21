// faker para criação Nome e Sobrenome dinâmicos
var faker = require('faker')
// gerador de cpf dinâmico
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '81999999999',
            address: {
                postalcode: '50100220',
                street: 'Rua Pedro Afonso',
                number: '254',
                details: 'Apt 130',
                district: 'Santo Amaro',
                city_state: 'Recife/PE'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.png'
        }

        return data
    }
}