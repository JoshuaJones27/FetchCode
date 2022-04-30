const Sequelize = require('sequelize')
const sequelize = new Sequelize('fetchcode', 'FetchCode', 'sidyfgygIJS956_kjhvfddv87', {
    host: 'fetchcodeserver.mysql.database.azure.com',
    dialect: 'mysql'
})

sequelize.authenticate().then(function() {
    console.log("Conectado com sucesso!")
}).catch(function(erro) {
    console.log("Falha a conectar ao servidor: " + erro)
})

// let mysql = require('mysql')
// let connection = mysql.createConnection({
//     host: 'fetchcodeserver.mysql.database.azure.',
//     username: 'FetchCode',
//     password: 'sidyfgygIJS956_kjhvfddv87',
//     database: 'fetchcode'
// })