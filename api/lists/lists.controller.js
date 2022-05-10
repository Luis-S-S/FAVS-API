const {
  getAllLists,
  getListById,
  getListByUserId,
  createList,
  updateList,
  deleteList,
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
    const { _id } = req.user;
    const list = await getListById(req.params.id);
    if (list.refUser.toString() === _id.toString()) {
      res.status(200).json(list);
    } else {
      res.status(403).json('Forbidden');
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
}

async function handlerGetListByUserId(req, res) {
  try {
    const { _id } = req.user;
    const lists = await getListByUserId(_id);
    res.status(200).json(lists);
  } catch (error) {
    res.status(404).json(error.message);
  }
}

async function handlerCreateList(req, res) {
  try {
    const { _id } = req.user;
    const newList = await createList({ refUser: _id, ...req.body });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function handlerUpdateList(req, res) {
  try {
    const { _id } = req.user;
    const list = await getListById(req.params.id);
    if (list.refUser.toString() === _id.toString()) {
      const updatedList = await updateList(req.params.id, req.body);
      res.status(200).json(updatedList);
    } else {
      res.status(403).json('Forbidden');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function handlerAddFavsToList(req, res) {
  try {
    const { _id } = req.user;
    const list = await getListById(req.params.id);
    if (list.refUser.toString() === _id.toString()) {
      const newFavsArray = [...list.favs, ...req.body];
      const updatedList = await updateList(req.params.id, { favs: newFavsArray });
      res.status(200).json(updatedList);
    } else {
      res.status(403).json('Forbidden');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function handlerDeleteList(req, res) {
  try {
    const { _id } = req.user;
    const list = await getListById(req.params.id);
    if (list.refUser.toString() === _id.toString()) {
      const deletedList = await deleteList(req.params.id);
      res.status(200).json(deletedList);
    } else {
      res.status(403).json('Forbidden');
    }
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
  handlerAddFavsToList,
  handlerDeleteList,
};
