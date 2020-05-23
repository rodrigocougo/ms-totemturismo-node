const UserService = require('../../services/User/UserService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class UserController {

	async getUserTree(req, res, next) {
		try {
			const response = await new UserService().getAsyncUserTree();
			return res.send(response);
			//return res.json(response);
		} catch (error) {
			if (error instanceof BusinessError) {
				return res.status(error.status).json({ error: error.message });
			}
			logger.error(error);
			return res.status(500).json(error);
		}
	}

	async getUsers (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new UserService().getAsyncUsers(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addUser (req, res, next) {
		try {
			let response = await new UserService().addAsyncUser(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateUser (req, res, next) {
		try {
			let response = await new UserService().updateAsyncUser(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteUser (req, res, next) {
		try {
			let response = await new UserService().deleteAsyncUser(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
