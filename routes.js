const favorites = require('./api/favs');
const user = require('./api/users');
const auth = require('./auth/local');

function routes(app) {
    app.use('/api/favs', favorites);
    app.use('/api/user', user);
    app.use('/auth/local', auth);
}

module.exports = routes;