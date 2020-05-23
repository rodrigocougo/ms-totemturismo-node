/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const PdvController = require('../controllers/pdv/PdvController');
const router = express.Router();
const _PdvController = new PdvController();

router.get('/:id_pdv', new PdvController().getPdv);
router.get('/', new PdvController().getPdvs);
router.post('/', new PdvController().addPdv);
router.put('/:id_pdv', new PdvController().updatePdv);
router.delete('/:id_pdv', new PdvController().deletePdv);
router.get('/new/tree', new PdvController().getPdvTree);

module.exports = router;
