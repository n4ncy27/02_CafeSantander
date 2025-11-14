const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productoController');

router.get('/', ctrl.obtenerProductos);
router.get('/:id', ctrl.obtenerProducto);

module.exports = router;