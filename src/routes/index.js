const express = require('express');
const usuarios = require('./usuarioRoutes.js');

module.exports = app => {
  app.use(
    express.json(),
    usuarios
  );
};