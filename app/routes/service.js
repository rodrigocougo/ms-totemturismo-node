/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const ServiceController = require('../controllers/service/ServiceController');
const router = express.Router();
const _ServiceController = new ServiceController();

router.get('/:id_pdv', new ServiceController().getServices);
router.post('/', new ServiceController().addService);
router.put('/:id_Service', new ServiceController().updateService);
router.delete('/:id_Service', new ServiceController().deleteService);
router.get('/new/tree', new ServiceController().getServiceTree);

module.exports = router;
