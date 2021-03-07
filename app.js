const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routerIndex } = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
const { PORT = 3001 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const allowedOrigins = [
  'https://dianadomino24.students.nomoreparties.space',
  'https://www.dianadomino24.students.nomoreparties.space',
];
app.use(cors());

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.options('*', cors());

app.use(requestLogger);
// !!!!!!!убрать после успешного ревью!!!!!
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use('/', routerIndex);
app.use(errorLogger);

// Централизованная обработка ошибок
app.use(errors());

app.use(() => {
  throw new NotFoundError('The requested resource is not found');
});

// здесь обрабатываем все ошибки
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message || 'Sorry, some error on server.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
