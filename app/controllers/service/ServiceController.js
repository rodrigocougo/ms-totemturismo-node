const ServiceService = require('../../services/service/ServiceService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class ServiceController {

	async getServiceTree(req, res, next) {
		try {
			const response = await new ServiceService().getAsyncServiceTree();
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

	async getServices (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new ServiceService().getAsyncServices(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addService (req, res, next) {
		try {
			let response = await new ServiceService().addAsyncService(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateService (req, res, next) {
		try {
			let response = await new ServiceService().updateAsyncService(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteService (req, res, next) {
		try {
			let response = await new ServiceService().deleteAsyncService(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
