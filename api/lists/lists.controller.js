const {
    getAllLists,
    getListById,
    getListByUserId,
    createList,
    updateList,
    deleteList
} = require('./lists.service');

async function handlerGetAllLists(req, res) {
    try {
        const lists = await getAllLists();
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerGetListById(req, res) {
    try {
        const list = await getListById(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

async function handlerGetListByUserId(req, res) {
    try {
        const lists = await getListByUserId(req.params.userId);
        res.status(200).json(lists);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

async function handlerCreateList(req, res) {
    try {
        const list = await createList(req.body);
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerUpdateList(req, res) {
    try {
        const list = await updateList(req.params.id, req.body);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerDeleteList(req, res) {
    try {
        const list = await deleteList(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    handlerGetAllLists,
    handlerGetListById,
    handlerGetListByUserId,
    handlerCreateList,
    handlerUpdateList,
    handlerDeleteList
}