/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const HotelController = require('../controllers/hotel/HotelController');
const router = express.Router();
const _HotelController = new HotelController();

router.get('/:id_pdv', new HotelController().getHotels);
router.post('/', new HotelController().addHotel);
router.put('/:id_Hotel', new HotelController().updateHotel);
router.delete('/:id_Hotel', new HotelController().deleteHotel);
router.get('/new/tree', new HotelController().getHotelTree);

module.exports = router;
