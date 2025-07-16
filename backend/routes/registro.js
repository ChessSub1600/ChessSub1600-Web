// routes/registro.js

const express = require('express');
const router  = express.Router();

const { registrarUsuario } = require('../controllers/registroController');
const { obtenerUsuarios }  = require('../controllers/usuariosController');

router.post('/registro', registrarUsuario);
router.get('/usuarios', obtenerUsuarios);

module.exports = router;
