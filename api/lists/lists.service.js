const listModel = require('./lists.model');

async function getAllLists() {
    return await listModel.find({});
}

async function getListById(id) {
    return await listModel.findById(id);
}

async function getListByUserId(userId) {
    return await listModel.find({ refUser: userId });
}

async function createList(list) {
    return await listModel.create(list);
}

async function updateList(id, list) {
    return await listModel.findByIdAndUpdate(id, list, { new: true });
}

async function deleteList(id) {
    return await listModel.findByIdAndDelete(id);
}

module.exports = {
    getAllLists,
    getListById,
    getListByUserId,
    createList,
    updateList,
    deleteList
}