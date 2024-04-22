const { Router } = require('express');
const AuthController = require('../controller/AuthController.js');

const router = Router();

router
    .post('/login', AuthController.login)
    .post('/login/token', AuthController.verificaToken);


module.exports = router;