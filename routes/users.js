const router = require('express').Router();
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getMe,
} = require('../controllers/users');

const {
  validationUserData,
  validationAvatar,
  validationUserId,
} = require('../middlewares/requestValidator');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validationUserId, getUser);

router.patch('/me', validationUserData, updateUser);
router.patch('/me/avatar', validationAvatar, updateAvatar);

module.exports = router;
