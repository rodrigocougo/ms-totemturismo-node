const { expect } = require('chai');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const CompanyService = require('../app/services/company/CompanyService');

/**
 * Module dependencies.
 */
require('../app/models/Company');

const mockCompany = {"members":["user1@lit.com","user2@lit.com","user3@lit.com"],"_id":"5da8774a80d06d3c906c8f37","name":"Escola de Negócios Saint Paul","description":"O propósito da Saint Paul, é transformar a vida das pessoas e da sociedade por meio do aprendizagem.","owner":"admin@lit.com"};

beforeEach(() => {
	const findMock = query => {
		return query.getQuery()._id === '5da8774a80d06d3c906c8f37' ? [ mockCompany ] : [];
	};
	const findOneMock = query => {
		return query.getQuery()._id === '5da8774a80d06d3c906c8f37' ? mockCompany : null;
	};
	const updateOneMock = query => {
		return query.getQuery()._id === '5da8774a80d06d3c906c8f37' ? { ...mockCompany, ...query._update } : null;
	};

	mockingoose(mongoose.model('Company'))
		.toReturn(findMock, 'find')
		.toReturn(findOneMock, 'findOne')
		.toReturn(updateOneMock, 'updateOne')
		.toReturn(mockCompany, 'save');
});

describe('#response from CompanyService', () => {
	test('#mongo should return a valid company when search with valid parameters', async () => {
		const companyService = new CompanyService();
		const companys = await companyService.getAsyncCompanys({ _id: '5da8774a80d06d3c906c8f37' });
		expect(companys.length).to.equal(1);
		expect(JSON.parse(JSON.stringify(companys))).to.deep.equal([ mockCompany ]);
		expect(Array.isArray(companys)).to.equal(Array.isArray([]));
	});

	test('#mongo should return an empty array when not found a company', async () => {
		const companys = await new CompanyService().getAsyncCompanys({ _id: '5d965692069c5a0e5416daf4' });
		expect(companys.length).to.equal(0);
		expect(Array.isArray(companys)).to.equal(Array.isArray([]));
	});


	test('#mongo should return a valid company when add a company', async () => {
		const company = await new CompanyService().addAsyncCompany({"members":["user1@lit.com","user2@lit.com","user3@lit.com"],"name":"Escola de Negócios Saint Paul","description":"O propósito da Saint Paul, é transformar a vida das pessoas e da sociedade por meio do aprendizagem.","owner":"admin@lit.com"});
		expect(JSON.parse(JSON.stringify(company))).to.deep.equal(mockCompany);
	});


	test('#mongo should return a valid company when update a company', async () => {
		const toUpdate = {"name": "Escola de Negócios Saint Paul"};
		const company = await new CompanyService().updateAsyncCompany(toUpdate, '5da8774a80d06d3c906c8f37');
		expect(JSON.parse(JSON.stringify(company))).to.deep.equal({ ...mockCompany, ...toUpdate });
	});
	
	test('#mongo should return error when try to update a company with null parameters', async () => {
		try {
			await new CompanyService().updateAsyncCompany(null, null);
		} catch (error) {
			expect('companyId is required').to.equal(error.message);
			expect(400).to.equal(error.status);
		}
	});
	
	test('#mongo should return error when try to update a inexistent company', async () => {
		try {
			await new CompanyService().updateAsyncCompany({}, '5d965692069c5a0e5416daf4');
		} catch (error) {
			expect('Company not found!').to.equal(error.message);
			expect(404).to.equal(error.status);
		}
	});
	
	
	test('#mongo should return error when try to delete a company with null parameters', async () => {
		try {
			await new CompanyService().deleteAsyncCompany(null);
		} catch (error) {
			expect('companyId is required').to.equal(error.message);
			expect(400).to.equal(error.status);
		}
	});

	test('#mongo should return error when try to delete a inexistent company', async () => {
		try {
			await new CompanyService().deleteAsyncCompany('5d965692069c5a0e5416daf4');
		} catch (error) {
			expect('Company not found!').to.equal(error.message);
			expect(404).to.equal(error.status);
		}
	});
});
