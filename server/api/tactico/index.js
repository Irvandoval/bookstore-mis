'use strict';

var express = require('express');
var controller = require('./tactico.controller');

var router = express.Router();

router.post('/inventario', controller.inventario);
router.get('/inventario', controller.inventarioRep);
router.post('/ordencompra', controller.ordenCompra);
router.get('/ordencompra', controller.ordenCompraRep);
router.post('/librosvendidos', controller.librosVendidos);
router.get('/librosvendidos', controller.librosVendidosRep);
router.post('/ventaseditorial', controller.ventasEditoral);
router.get('/ventaseditorial', controller.ventasEditorialRep);
router.post('/ventaspormes', controller.ventasPorMes);
router.get('/ventaspormes', controller.ventasPorMesRep);
router.post('/ventasproveedor', controller.ventasPorProveedor);
router.get('/ventasproveedor', controller.ventasPorProveedorRep);
