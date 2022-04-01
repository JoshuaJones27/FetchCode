const express = require('express')
const app = express()

// Ligar à base de dados
const mysql = require('mysql');
const userController = require('./controllers/user');

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

// app.post('/users', async(req, res) => {

//     //Encriptação da palavra passe
//     try {
//         const hashedPasswords = await bcrypt.hash(req.body.password, 10)
//         const user = { name: req.body.name, password: hashedPasswords }
//         users.push(user)
//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }

// })

app.post('/users/login', async(req, res) => {
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

});

app.post('/users/register', async(req, res) => {
    userController.registerUser(req, res)
});

app.listen(3000)