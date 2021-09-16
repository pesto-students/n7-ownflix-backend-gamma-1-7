const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const ResumeWatchModel = require('../models/ResumeWatch');
const { ObjectID } = require('mongodb');

describe('ResumeWatch Functionality', () => {
	beforeAll(() => {
		ResumeWatchModel.deleteMany({}).then(res => {
			// console.log('previous movies deleted');
		});
	});

	var item = {
		_id: ObjectID(),
		user: ObjectID(),
		entity: 'Movie',
		entityId: ObjectID(),
		watchTime: 150,
	};
	var item2 = { ...item, entity: 'Series' };
	item2._id = ObjectID();

	var item3 = { ...item, entity: 'Series' };
	item3._id = ObjectID();

	it('post resume-watch/ , New resumeWatch creation', async () => {
		let res = await request.post('/resume-watch/').send(item);
		expect(res.statusCode).toEqual(201);
	});

	it('post resume-watch/ , New resumeWatch creation', async () => {
		let res = await request.post('/resume-watch/').send(item2);
		expect(res.statusCode).toEqual(201);
	});
	it('post resume-watch/ , New resumeWatch creation', async function () {
		let res = await request.post('/resume-watch/').send(item3);
		expect(res.statusCode).toEqual(201);
	});

	it('get resume-watch/ , get all resumeWatch details', async () => {
		let res = await request.get('/resume-watch/');
		expect(res.statusCode).toEqual(200);
	});

	it('get resume-watch/id , get resumeWatch details', async () => {
		let res = await request.get('/resume-watch/' + item._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put resume-watch/id , Update resumeWatch details', async () => {
		let res = await request.put('/resume-watch/' + item._id).send({ watchTime: 25 });
		expect(res.statusCode).toEqual(201);
	});

	it('delete resume-watch/id , soft delete resumeWatch details', async () => {
		let res = await request.delete('/resume-watch/' + item2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete resume-watch/id/delete , delete resumeWatch details', async () => {
		let res = await request.delete('/resume-watch/' + item2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
