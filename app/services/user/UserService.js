/* jshint -W030 */
const mongoose = require('mongoose');
const DocRepository = require('../repository/DocumentRepository');
const LitMsError = require('../../utils/LitMsError');

const findById = async (_id, repo) => {
	let User = await repo.findOne( { _id } );
	if (!User) {
		throw new LitMsError(404, 'User not found!');
	}
	return User;
};

module.exports = class UserService {

	constructor () {
		this._repositoryUser = new DocRepository(mongoose.model('UserModel'));
		this._repositoryUser2 = new mongoose.model('UserModel');
	}

	async getAsyncUserTree() {		
		let value = this._repositoryUser2.schema.tree
		return value;
	}

	async getAsyncUsers (id_pdv) {
		if(!id_pdv) {
			throw new LitMsError(400, 'UserId is required');
		}
		const modelList = await this._repositoryUser.findOne( { IdPdv: id_pdv } );
		return modelList;
	}	

	async addAsyncUser (query) {
		query = query ? query : {};
		query.CreateAt = Date.now();
		try {
			return await this._repositoryUser.save(query);
		} catch (error) {
			throw new LitMsError(400, error.message || error);
		}
    }

	async updateAsyncUser (model, _id) {
		if (!_id) {
			throw new LitMsError(400, 'userId is required');
		}
		const innerModel = model;
		innerModel.UpdateAt = Date.now();
		const modelList = await this._repositoryUser2.findByIdAndUpdate(_id, innerModel, { new: true });
		return modelList;
    }
    
	async deleteAsyncUser (_id) {
		if (!_id) {
			throw new LitMsError(400, 'transactionId is required');
		}
		const deleted = await this._repositoryUser2.findByIdAndDelete(_id);
		if (!deleted) { throw new BusinessError('Ops, não foi possível excluir.', 400); }
		return deleted;
	}

};
