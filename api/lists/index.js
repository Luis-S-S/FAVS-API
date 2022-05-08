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

router.get('/', handlerGetAllLists);
router.get('/:id', handlerGetListById);
router.get('/user/:userId', handlerGetListByUserId);
router.post('/', handlerCreateList);
router.patch('/:id', handlerUpdateList);
router.patch('/:id/add_favs', handlerAddFavsToList);
router.delete('/:id', handlerDeleteList);

module.exports = router;
