const lists = require('./api/lists');
const users = require('./api/users');
const auth = require('./auth/local');

function routes(app) {
    app.use('/api/lists', lists);
    app.use('/api/users', users);
    app.use('/auth/local', auth);
}

module.exports = routes;