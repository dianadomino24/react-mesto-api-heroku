const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть и начинается с Bearer
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  if (!authorization) {
    throw new UnauthorizedError('Authorization is required');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    throw new UnauthorizedError('Authorization is required, wrong token');
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  next();
};
