/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Gastronomy = await repo.findOne( { _id } );
	if (!Gastronomy) {
		throw new LitMsError(404, 'Gastronomy not found!');
	}
	return Gastronomy;
};

module.exports = class GastronomyService {

	constructor () {
		this._repositoryGastronomy = new DocRepository(mongoose.model('GastronomyModel'));
		this._repositoryGastronomy2 = new mongoose.model('GastronomyModel');
	}

	async getAsyncGastronomyTree() {		
		let value = this._repositoryGastronomy2.schema.tree
		return value;
	}

	async getAsyncGastronomys (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'GastronomyId is required');
		}
		const modelList = await this._repositoryGastronomy.find( { IdPdv: id_pdv } );
		if(modelList){
			modelList.forEach(element => {
				element.IdReferenceBase = element._id;
			});
		}
		return modelList;
	}	

	async addAsyncGastronomy (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryGastronomy.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncGastronomy (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryGastronomy2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncGastronomy (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryGastronomy2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
