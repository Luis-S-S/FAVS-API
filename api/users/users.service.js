const usersModel = require('./users.model');

async function getAllUsers() {
    return await usersModel.find({});
}

async function getUserById(id) {
    return await usersModel.findById(id);
}

async function getUserByEmail(email) {
    return await usersModel.findOne({ email });
}

async function createUser(user) {
    return await usersModel.create(user);
}

async function updateUser(id, user) {
    return await usersModel.findByIdAndUpdate(id, user, { new: true });
}

async function deleteUser(id) {
    return await usersModel.findByIdAndDelete(id);
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}