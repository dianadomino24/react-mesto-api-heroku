const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const {
  validationCard,
  validationCardId,
} = require('../middlewares/requestValidator');

router.get('/', getCards);
router.post('/', validationCard, createCard);
router.delete('/:cardId', validationCardId, deleteCard);
router.put('/:cardId/likes', validationCardId, putLike);
router.delete('/:cardId/likes', validationCardId, deleteLike);

module.exports = router;
