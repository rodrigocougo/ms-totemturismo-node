const PdvService = require('../../services/pdv/PdvService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class PdvController {

	async getPdvTree(req, res, next) {
		try {
			const response = await new PdvService().getAsyncPdvTree();
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

	async getPdv (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new PdvService().getAsyncPdv(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}

	async getPdvs (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new PdvService().getAsyncPdvs(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addPdv (req, res, next) {
		try {
			let response = await new PdvService().addAsyncPdv(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updatePdv (req, res, next) {
		try {
			let response = await new PdvService().updateAsyncPdv(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deletePdv (req, res, next) {
		try {
			let response = await new PdvService().deleteAsyncPdv(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
