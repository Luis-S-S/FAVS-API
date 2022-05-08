const { Router } = require('express');

const router = Router();

const { handlerUserLogin } = require('./local.controller');

router.post('/', handlerUserLogin);

module.exports = router;
