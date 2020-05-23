/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const EventsController = require('../controllers/events/EventsController');
const router = express.Router();
const _EventsController = new EventsController();

router.get('/:id_pdv', new EventsController().getEvents);
router.post('/', new EventsController().addEvents);
router.put('/:id_Events', new EventsController().updateEvents);
router.delete('/:id_Events', new EventsController().deleteEvents);
router.get('/new/tree', new EventsController().getEventsTree);

module.exports = router;
