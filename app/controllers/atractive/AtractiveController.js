const AtractiveService = require('../../services/atractive/AtractiveService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class AtractiveController {

	async getAtractiveTree(req, res, next) {
		try {
			const response = await new AtractiveService().getAsyncAtractiveTree();
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

	async getAtractives (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new AtractiveService().getAsyncAtractives(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addAtractive (req, res, next) {
		try {
			let response = await new AtractiveService().addAsyncAtractive(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateAtractive (req, res, next) {
		try {
			let response = await new AtractiveService().updateAsyncAtractive(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteAtractive (req, res, next) {
		try {
			let response = await new AtractiveService().deleteAsyncAtractive(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
