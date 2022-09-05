const express = require('express')
const route = express.Router()
const controller = require('../controller/controller')
const axios = require('axios')
const { response } = require('express')
const {verifyJWT, verifyAdmin} = require('../helpers/auth')

//home
route.get('/', (req,res) => {
    res.render('index')
})
// login
route.get('/login', (req,res) => {
    axios.get('http://localhost:7000/api-user')
    res.render("login")
})
// game
route.get('/game',verifyJWT, (req,res) => {
    res.render("game")
})
// dashboard
route.get('/dashboard',verifyAdmin, (req,res) => {
    axios.get('http://localhost:7000/api-user')
    .then(response => {
        res.render('dashboard', {userdata: response.data})
    })
    .catch(err => {
        console.log(err)
    })
})
// tambah pengguna
route.get('/tambah-pengguna', (req,res) => {
    res.render('tambah_pengguna')
})
// update
route.get('/update-user', (req,res) => {
    axios.get('http://localhost:7000/api-user', {params: {id: req.query.id} })
    .then((datanya) => {
        res.render("update_pengguna", {pemilik: datanya.data})
    })
    .catch(err => {
        res.send(err)
    })
})
//logout
route.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/login')
  })
//multiplayer
route.get('/multiplayer',verifyJWT, (req, res) => {
    res.render('multi_game')
})

// API
// user
route.get('/users/:id', controller.findById)
route.post('/api-user', controller.register)
route.post('/login',controller.login)
route.get('/api-user',controller.findUser)
route.put('/api-user/:id', controller.updateUser)
route.delete('/api-user/:id', controller.deleteUser)
// game score
route.post('/api/game-score',controller.gameScore)
route.get('/api/game-score',controller.gameRead)
route.post("/api-test",controller.updateUser)

module.exports = route