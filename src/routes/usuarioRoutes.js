const { Router } = require('express');
const UsuarioController = require('../controller/UsuarioController.js');

const router = Router()
const usuarioController = new UsuarioController();

router  
    .get('/usuarios', (req, res) => usuarioController.getAll(req, res))
    .post('/usuarios', (req, res) => usuarioController.cadastrarUsuario(req, res))


module.exports = router;