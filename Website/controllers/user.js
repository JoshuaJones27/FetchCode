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
    const user = users.find(user => user.name === req.body.name)
    if(user == null)
    {
        return res.status(400).send('Utilizador não encontrado')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Sucesso')
        }else{
            res.send('Não Autorizado')
        }
    }catch{
        res.status(500).send()
    }
}

function getUser(req, res){
    res.json(users)
}

module.exports = {registerUser, loginUser, getUser}