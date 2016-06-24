'use strict';

var express = require('express');
var controller = require('./estrategico.controller');

var router = express.Router();

router.post('/proveedores', controller.proveedores);
router.get('/proveedores', controller.proveedoresRep);
router.post('/ingresos', controller.ingresos);
router.get('/ingresos', controller.ingresosRep);
router.post('/compras', controller.compras);
router.get('/compras', controller.comprasRep);
router.post('/topventas', controller.topLibros);
router.get('/topventas', controller.topLibrosRep);
router.post('/ventascategoria', controller.categoriasCompra);


module.exports = router;
