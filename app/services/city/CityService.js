/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let City = await repo.findOne( { _id } );
	if (!City) {
		throw new LitMsError(404, 'City not found!');
	}
	return City;
};

module.exports = class CityService {

	constructor () {
		this._repositoryCity = new DocRepository(mongoose.model('CityModel'));
		this._repositoryCity2 = new mongoose.model('CityModel');
	}

	async getAsyncCityTree() {		
		let value = this._repositoryCity2.schema.tree
		return value;
	}

	async getAsyncCitys (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'CityId is required');
		}
		const modelList = await this._repositoryCity.findOne( { IdPdv: id_pdv } );
		modelList.IdReferenceBase = modelList._id;
		return modelList;
	}	

	async addAsyncCity (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryCity.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncCity (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryCity2.findByIdAndUpdate(_id, innerModel, { new: true });		
		return modelList;
    }
    
	async deleteAsyncCity (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryCity2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
