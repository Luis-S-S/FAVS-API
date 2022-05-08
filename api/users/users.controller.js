const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} = require('./users.service');

async function handlerGetAllUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerGetUserById(req, res) {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

async function handlerCreateUser(req, res) {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerUpdateUser(req, res) {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function handlerDeleteUser(req, res) {
    try {
        const deletedUser = await deleteUser(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    handlerGetAllUsers,
    handlerGetUserById,
    handlerCreateUser,
    handlerUpdateUser,
    handlerDeleteUser
}