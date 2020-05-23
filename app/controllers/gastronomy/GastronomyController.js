const GastronomyService = require('../../services/Gastronomy/GastronomyService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class GastronomyController {

	async getGastronomyTree(req, res, next) {
		try {
			const response = await new GastronomyService().getAsyncGastronomyTree();
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

	async getGastronomys (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new GastronomyService().getAsyncGastronomys(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addGastronomy (req, res, next) {
		try {
			let response = await new GastronomyService().addAsyncGastronomy(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateGastronomy (req, res, next) {
		try {
			let response = await new GastronomyService().updateAsyncGastronomy(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteGastronomy (req, res, next) {
		try {
			let response = await new GastronomyService().deleteAsyncGastronomy(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
