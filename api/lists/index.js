const { Router } = require('express');

const router = Router();

const {
  handlerGetAllLists,
  handlerGetListById,
  handlerGetListByUserId,
  handlerCreateList,
  handlerUpdateList,
  handlerAddFavsToList,
  handlerDeleteList,
} = require('./lists.controller');

const { isAuthenticated } = require('../../auth/auth.service');

router.get('/', isAuthenticated(), handlerGetAllLists);
router.get('/user', isAuthenticated(), handlerGetListByUserId);
router.get('/:id', isAuthenticated(), handlerGetListById);
router.post('/', isAuthenticated(), handlerCreateList);
router.patch('/:id', isAuthenticated(), handlerUpdateList);
router.patch('/:id/add_favs', isAuthenticated(), handlerAddFavsToList);
router.delete('/:id', isAuthenticated(), handlerDeleteList);

module.exports = router;
