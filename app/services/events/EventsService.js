/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Events = await repo.findOne( { _id } );
	if (!Events) {
		throw new LitMsError(404, 'Events not found!');
	}
	return Events;
};

module.exports = class EventsService {

	constructor () {
		this._repositoryEvents = new DocRepository(mongoose.model('EventsModel'));
		this._repositoryEvents2 = new mongoose.model('EventsModel');
	}

	async getAsyncEventsTree() {		
		let value = this._repositoryEvents2.schema.tree
		return value;
	}

	async getAsyncEvents (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'EventsId is required');
		}
		const modelList = await this._repositoryEvents.find( { IdPdv: id_pdv } );
		if(modelList){
			modelList.forEach(element => {
				element.IdReferenceBase = element._id;
			});
		}
		return modelList;
	}	

	async addAsyncEvents (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryEvents.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncEvents (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryEvents2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncEvents (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryEvents2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
