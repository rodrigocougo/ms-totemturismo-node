/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const CityController = require('../controllers/city/CityController');
const router = express.Router();
const _CityController = new CityController();

router.get('/:id_pdv', new CityController().getCitys); 
router.post('/', new CityController().addCity);
router.put('/:id_city', new CityController().updateCity);
router.delete('/:id_city', new CityController().deleteCity);
router.get('/new/tree', new CityController().getCityTree);

module.exports = router;
