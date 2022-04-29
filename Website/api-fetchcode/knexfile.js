//const config = require('./config')

module.exports = {
    test: {
        client: 'pg',
        connection: {
            host: 'fetchcodeserver.mysql.database.azure.com',
            user: 'FetchCode',
            password: 'sidyfgygIJS956_kjhvfddv87',
            database: 'fetchcode'
        },
        debug: false,
        migrations: {
            directory: 'source/migrations',
        },
        seeds:{
            directory: 'source/seeds',
        }, 
        pool: {
            min: 0,
            max: 50,
            propagateCreateError: false,
        },
    },
};
