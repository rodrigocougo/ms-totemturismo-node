/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let Hotel = await repo.findOne( { _id } );
	if (!Hotel) {
		throw new LitMsError(404, 'Hotel not found!');
	}
	return Hotel;
};

module.exports = class HotelService {

	constructor () {
		this._repositoryHotel = new DocRepository(mongoose.model('HotelModel'));
		this._repositoryHotel2 = new mongoose.model('HotelModel');
	}

	async getAsyncHotelTree() {		
		let value = this._repositoryHotel2.schema.tree
		return value;
	}

	async getAsyncHotels (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'HotelId is required');
		}
		const modelList = await this._repositoryHotel.find( { IdPdv: id_pdv } );
		if(modelList){
			modelList.forEach(element => {
				element.IdReferenceBase = element._id;
			});
		}
		return modelList;
	}	

	async addAsyncHotel (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryHotel.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncHotel (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryHotel2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncHotel (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryHotel2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
