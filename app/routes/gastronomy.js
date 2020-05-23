/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const GastronomyController = require('../controllers/gastronomy/GastronomyController');
const router = express.Router();
const _GastronomyController = new GastronomyController();

router.get('/:id_pdv', new GastronomyController().getGastronomys);
router.post('/', new GastronomyController().addGastronomy);
router.put('/:id_Gastronomy', new GastronomyController().updateGastronomy);
router.delete('/:id_Gastronomy', new GastronomyController().deleteGastronomy);
router.get('/new/tree', new GastronomyController().getGastronomyTree);

module.exports = router;
