const CityService = require('../../services/city/CityService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class CityController {

	async getCityTree(req, res, next) {
		try {
			const response = await new CityService().getAsyncCityTree();
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

	async getCitys (req, res, next) { 
		try {
			let response = await new CityService().getAsyncCitys(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addCity (req, res, next) {
		try {
			let response = await new CityService().addAsyncCity(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateCity (req, res, next) {
		try {
			let response = await new CityService().updateAsyncCity(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteCity (req, res, next) {
		try {
			let response = await new CityService().deleteAsyncCity(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
