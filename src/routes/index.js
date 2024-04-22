const express = require('express');
const usuarios = require('./usuarioRoutes.js');
const auth = require('./authRoutes.js');

module.exports = app => {
  app.use(
    express.json(),
    usuarios,
    auth,
  );
};