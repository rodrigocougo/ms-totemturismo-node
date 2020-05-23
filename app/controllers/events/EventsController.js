const EventsService = require('../../services/events/EventsService');
const errorHandler = require('../../utils/ErrorHandler');
const BusinessError = require('../../utils/BusinessError');
const { logger } = require('../../../config/winston');

module.exports = class EventsController {

	async getEventsTree(req, res, next) {
		try {
			const response = await new EventsService().getAsyncEventsTree();
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

	async getEvents (req, res, next) {
		//console.log(req.params.id)
		try {
			let response = await new EventsService().getAsyncEvents(req.params.id_pdv);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}	
    
	async addEvents (req, res, next) {
		try {
			let response = await new EventsService().addAsyncEvents(req.body);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async updateEvents (req, res, next) {
		try {
			let response = await new EventsService().updateAsyncEvents(req.body, req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
    }
    
	async deleteEvents (req, res, next) {
		try {
			let response = await new EventsService().deleteAsyncEvents(req.params.id);
			res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
	
};
