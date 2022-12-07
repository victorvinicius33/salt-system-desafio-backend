const express = require('express');
const users = require('./controllers/users');
const login = require('./controllers/login');
const verifyLogin = require('./middlewares/verifyLogin');
const validation = require('./middlewares/validation');
const schemaSignUpUser = require('./validations/schemaSignUpUser');
const schemaLogin = require('./validations/schemaLogin');

const routes = express();

routes.post('/user', validation(schemaSignUpUser), users.signUpUser);

routes.post('/login', validation(schemaLogin), login);

routes.use(verifyLogin);

routes.get('/user', users.detailUser);

module.exports = routes;
