const { Router } = require('express');
const router = Router();

const {
    handlerGetAllLists,
    handlerGetListById,
    handlerGetListByUserId,
    handlerCreateList,
    handlerUpdateList,
    handlerDeleteList
} = require('./lists.controller');

router.get('/', handlerGetAllLists);
router.get('/:id', handlerGetListById);
router.get('/user/:userId', handlerGetListByUserId);
router.post('/', handlerCreateList);
router.patch('/:id', handlerUpdateList);
router.delete('/:id', handlerDeleteList);

module.exports = router;