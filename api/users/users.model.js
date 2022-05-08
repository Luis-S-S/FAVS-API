const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { versionKey: false });

UsersSchema.method.confirmPassword = async function(incomingPassword) {
    const user = this;
    return await bcrypt.compare(incomingPassword, user.password);
};

module.exports = mongoose.model('User', UsersSchema);