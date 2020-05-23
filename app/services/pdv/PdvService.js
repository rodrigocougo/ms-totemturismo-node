/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Pdv = await repo.findOne( { _id } );
	if (!Pdv) {
		throw new LitMsError(404, 'Pdv not found!');
	}
	return Pdv;
};

module.exports = class PdvService {

	constructor () {
		this._repositoryPdv = new DocRepository(mongoose.model('PdvModel'));
		this._repositoryPdv2 = new mongoose.model('PdvModel');
	}

	async getAsyncPdvTree() {		
		let value = this._repositoryPdv2.schema.tree
		return value;
	}

	async getAsyncPdv (id) {
		if(!id) {
			throw new LitMsError(400, 'PdvId is required');
		}
		const modelList = await this._repositoryPdv.findOne( { _id: id } );
		modelList.IdReferenceBase = modelList._id;
		return modelList;
	}	

	async getAsyncPdvs () {
		const modelList = await this._repositoryPdv.find();
		modelList.forEach(element => {
			element.IdReferenceBase = element._id;
		});		
		return modelList;
	}	

	async addAsyncPdv (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryPdv.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncPdv (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryPdv2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncPdv (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryPdv2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
