const HotelService = require('../../services/Hotel/HotelService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class HotelController {

	async getHotelTree(req, res, next) {
		try {
			const response = await new HotelService().getAsyncHotelTree();
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

	async getHotels (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new HotelService().getAsyncHotels(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addHotel (req, res, next) {
		try {
			let response = await new HotelService().addAsyncHotel(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateHotel (req, res, next) {
		try {
			let response = await new HotelService().updateAsyncHotel(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteHotel (req, res, next) {
		try {
			let response = await new HotelService().deleteAsyncHotel(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
