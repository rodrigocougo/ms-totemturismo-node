/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const GatewayController = require('../controllers/gateway/GatewayController');
const router = express.Router();

router.get('/', new GatewayController().get);

module.exports = router;
