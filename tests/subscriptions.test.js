const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const SubscriptionModel = require('../models/Subscription');
const { ObjectID } = require('mongodb');

describe('Watchlist Functionality', () => {
	beforeAll(() => {
		SubscriptionModel.deleteMany({}).then(res => {
			// console.log('previous movies deleted');
		});
	});

	var item = {
		_id: ObjectID(),
		user: ObjectID(),
		transactionMode: 'Credit card',
		gateway: 'Paytm',
		amount: 255,
		subsStartDate: '2021-10-10',
		subsEndDate: '2021-11-10',
		status: 'Completed',
	};
	var item2 = { ...item, transactionMode: 'Online Payment' };
	item2._id = ObjectID();

	var item3 = { ...item };
	item3._id = ObjectID();

	it('post subscriptions/ , New subscription creation', async () => {
		let res = await request.post('/subscriptions/').send(item);
		expect(res.statusCode).toEqual(201);
	});

	it('post subscriptions/ , New subscription creation', async () => {
		let res = await request.post('/subscriptions/').send(item2);
		expect(res.statusCode).toEqual(201);
	});
	it('post subscriptions/ , New subscription creation', async function () {
		let res = await request.post('/subscriptions/').send(item3);
		expect(res.statusCode).toEqual(201);
	});

	it('get subscriptions/ , get all subscription details', async () => {
		let res = await request.get('/subscriptions/');
		expect(res.statusCode).toEqual(200);
	});

	it('get subscriptions/id , get subscription details', async () => {
		let res = await request.get('/subscriptions/' + item._id);
		expect(res.statusCode).toEqual(200);
	});

	// it('put subscriptions/id , Update subscription details', async () => {
	// 	let res = await request.put('/subscriptions/' + item._id).send({ watchTime: 25 });
	// 	expect(res.statusCode).toEqual(201);
	// });

	it('delete subscriptions/id , soft delete subscription details', async () => {
		let res = await request.delete('/subscriptions/' + item2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete subscriptions/id/delete , delete subscription details', async () => {
		let res = await request.delete('/subscriptions/' + item2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
