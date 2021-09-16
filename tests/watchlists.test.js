const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const WatchListModel = require('../models/WatchList');
const { ObjectID } = require('mongodb');

describe('Watchlist Functionality', () => {
	beforeAll(() => {
		WatchListModel.deleteMany({}).then(res => {
			// console.log('previous movies deleted');
		});
	});

	var item = {
		_id: ObjectID(),
		user: ObjectID(),
		entity: 'Movie',
		entityId: ObjectID(),
	};
	var item2 = { ...item, entity: 'Series' };
	item2._id = ObjectID();

	var item3 = { ...item, entity: 'Series' };
	item3._id = ObjectID();

	it('post watch-list/ , New watchlist creation', async () => {
		let res = await request.post('/watch-list/').send(item);
		expect(res.statusCode).toEqual(201);
	});

	it('post watch-list/ , New watchlist creation', async () => {
		let res = await request.post('/watch-list/').send(item2);
		expect(res.statusCode).toEqual(201);
	});
	it('post watch-list/ , New watchlist creation', async function () {
		let res = await request.post('/watch-list/').send(item3);
		expect(res.statusCode).toEqual(201);
	});

	it('get watch-list/ , get all watchlist details', async () => {
		let res = await request.get('/watch-list/');
		expect(res.statusCode).toEqual(200);
	});

	it('get watch-list/id , get watchlist details', async () => {
		let res = await request.get('/watch-list/' + item._id);
		expect(res.statusCode).toEqual(200);
	});

	// it('put watch-list/id , Update watchlist details', async () => {
	// 	let res = await request.put('/watch-list/' + item._id).send({ watchTime: 25 });
	// 	expect(res.statusCode).toEqual(201);
	// });

	it('delete watch-list/id , soft delete watchlist details', async () => {
		let res = await request.delete('/watch-list/' + item2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete watch-list/id/delete , delete watchlist details', async () => {
		let res = await request.delete('/watch-list/' + item2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
