const express = require('express');
const users = require('./controllers/users');
const chat = require('./controllers/chat');
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
routes.post('/contact', chat.addContact);
routes.get('/contact', chat.getAllContacts);
routes.post('/chat', chat.sendMessage);
routes.get('/chat', chat.getAllConversationData);
routes.get('/room', chat.getConversationRoom);

module.exports = routes;
