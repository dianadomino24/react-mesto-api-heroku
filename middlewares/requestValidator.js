const { celebrate, Joi } = require('celebrate');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim().required().min(6)
      .max(15),
  }),
});

const validationUserSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(6)
      .max(15),
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30),
    link: Joi.string().required().min(9)
      .uri(),
  }),
});

const validationUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30),
    about: Joi.string().trim().required().min(2)
      .max(30),
  }),
});

const validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validationUser,
  validationUserSignUp,
  validationCard,
  validationUserData,
  validationAvatar,
  validationCardId,
  validationUserId,
};
