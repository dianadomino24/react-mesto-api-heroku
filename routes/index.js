const routerIndex = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const userRouter = require('./users');

const { validationUser, validationUserSignUp } = require('../middlewares/requestValidator');

routerIndex.post('/signin', validationUser, login);
routerIndex.post('/signup', validationUserSignUp, createUser);

routerIndex.use('/cards', auth, cardsRouter);
routerIndex.use('/users', auth, userRouter);

module.exports = { routerIndex };
