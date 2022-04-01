const bcrypt = require('bcrypt')

function registerUser(req, res) {

    try {
        // Encriptação da palavra passe
        const hashedPasswords = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPasswords }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}

function loginUser(req, res) {
    console.log(req, res)
}


module.exports = {registerUser, loginUser}