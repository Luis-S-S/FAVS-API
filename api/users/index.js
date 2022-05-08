const { Router } = require('express');

const router = Router();

const {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
} = require('./users.controller');

const { isAuthenticated } = require('../../auth/auth.service');

router.get('/', isAuthenticated(), handlerGetAllUsers);
router.get('/:id', handlerGetUserById);
router.post('/', handlerCreateUser);
router.patch('/:id', handlerUpdateUser);
router.delete('/:id', handlerDeleteUser);

module.exports = router;
