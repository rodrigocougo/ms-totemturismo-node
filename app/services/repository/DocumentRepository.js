module.exports = class DocRepository {
	constructor (model) {
		this._model = model;
	}

	async save (toSave) {
        return await this._model.create(toSave);
	}

	async update (toUpdate, filter) {
        filter = filter || toUpdate;
        let { ...document } = toUpdate;
        document = await this._model.updateOne(filter, document);
        document = document && document._id ? document : await this._model.findOne(filter);
		return document;
	}

	async find (filter, sort, populate) {
		populate = Array.isArray(populate) ? populate : ( populate ? [ populate ] : populate );
		sort = sort ? { sort } : sort;
		return await this._model.find(filter, null, sort).populate(populate);
	}

	async findOne (filter) {
		return await this._model.findOne(filter);
	}

	async deleteOne (filter) {
		const deleted = await this._model.deleteOne(filter);
		return Boolean(deleted.deletedCount);
	}

	async addToSet (filter, toAdd) {
		await this._model.updateOne(filter, { $addToSet: toAdd }, { upsert: true });
		return await this._model.findOne(filter);
	}

	async set (filter, toAdd) {         // jshint ignore:line
		await this._model.updateOne(filter, { $set: toAdd }, { upsert: true });
		return await this._model.findOne(filter);
	}

	async pull (filter, toPull) {
		await this._model.updateOne(filter, { $pull: toPull });
		return await this._model.findOne(filter);
	}
};
