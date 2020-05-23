/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Service = await repo.findOne( { _id } );
	if (!Service) {
		throw new LitMsError(404, 'Service not found!');
	}
	return Service;
};

module.exports = class ServiceService {

	constructor () {
		this._repositoryService = new DocRepository(mongoose.model('ServiceModel'));
		this._repositoryService2 = new mongoose.model('ServiceModel');
	}

	async getAsyncServiceTree() {		
		let value = this._repositoryService2.schema.tree
		return value;
	}

	async getAsyncServices (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'ServiceId is required');
		}
		const modelList = await this._repositoryService.find( { IdPdv: id_pdv } );		
		if(modelList){
			modelList.forEach(element => {
				element.IdReferenceBase = element._id;
			});
		}
		return modelList;
	}	

	async addAsyncService (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryService.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncService (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryService2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncService (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryService2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
