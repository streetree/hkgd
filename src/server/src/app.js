const express = require('express')
const app = express()

const home = require('./controller/home')
const login = require('./controller/login')
const register = require('./controller/register')

app.use('/', home)
app.use('/login', login)
app.use('/register', register)

module.exports = app
