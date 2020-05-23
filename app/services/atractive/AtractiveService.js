/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Atractive = await repo.findOne( { _id } );
	if (!Atractive) {
		throw new LitMsError(404, 'Atractive not found!');
	}
	return Atractive;
};

module.exports = class AtractiveService {

	constructor () {
		this._repositoryAtractive = new DocRepository(mongoose.model('AtractiveModel'));
		this._repositoryAtractive2 = new mongoose.model('AtractiveModel');
	}

	async getAsyncAtractiveTree() {		
		let value = this._repositoryAtractive2.schema.tree
		return value;
	}

	async getAsyncAtractives (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'AtractiveId is required');
		}
		const modelList = await this._repositoryAtractive.find( { IdPdv: id_pdv } );
		if(modelList){
			modelList.forEach(element => {
				element.IdReferenceBase = element._id;
			});
		}
		return modelList;
	}	

	async addAsyncAtractive (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryAtractive.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncAtractive (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryAtractive2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncAtractive (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryAtractive2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
