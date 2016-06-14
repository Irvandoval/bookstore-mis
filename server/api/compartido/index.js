'use strict';

var express = require('express');
var controller = require('./compartido.controller');

var router = express.Router();

router.get('/aniosventas', controller.aniosVentas);


module.exports = router;
