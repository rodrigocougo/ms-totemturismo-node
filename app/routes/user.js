/* jshint -W117, -W097 */
"use strict";
const express = require('express');
const UserController = require('../controllers/user/UserController');
const router = express.Router();
const _UserController = new UserController();

router.get('/:id_pdv', new UserController().getUsers);
router.post('/', new UserController().addUser);
router.put('/:id_city', new UserController().updateUser);
router.delete('/:id_city', new UserController().deleteUser);
router.get('/new/tree', new UserController().getUserTree);

module.exports = router;
