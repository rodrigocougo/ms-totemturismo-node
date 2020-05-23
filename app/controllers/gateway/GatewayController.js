const errorHandler = require('../../utils/ErrorHandler');

module.exports = class GatewayController {

	async get(req, res, next) {
		try {
			let response = [
				{
					path: '/company',
					method: 'GET',
					middlewares: ['isAuthenticated'],
				},
				{
					path: '/company',
					method: 'POST',
					middlewares: ['isAuthenticated'],
				},
				{
					path: '/company/:companyId',
					method: 'PUT',
					middlewares: ['isAuthenticated'],
				},
				{
					path: '/company/:companyId',
					method: 'DELETE',
					middlewares: ['isAuthenticated'],
				},
				{
					path: '/company/:companyId/addMember',
					method: 'PATCH',
					middlewares: ['isAuthenticated'],
				},
				{
					path: '/company/:companyId/removeMember',
					method: 'PATCH',
					middlewares: ['isAuthenticated'],
				}
			];
			return res.json(response);
		} catch (error) {
			errorHandler.handle(error, res);
		}
	}
};