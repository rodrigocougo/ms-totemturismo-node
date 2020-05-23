/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const AtractiveController = require('../controllers/atractive/AtractiveController');
const router = express.Router();
const _AtractiveController = new AtractiveController();

router.get('/:id_pdv', new AtractiveController().getAtractives);
router.post('/', new AtractiveController().addAtractive);
router.put('/:id_Atractive', new AtractiveController().updateAtractive);
router.delete('/:id_Atractive', new AtractiveController().deleteAtractive);
router.get('/new/tree', new AtractiveController().getAtractiveTree);

module.exports = router;
