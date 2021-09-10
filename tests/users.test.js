const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const UserModel = require('../models/User');
const { ObjectID } = require('mongodb');

var user = {
	_id: ObjectID(),
	name: 'Ayub Ansari',
	email: 'rohanjaincode@gmail.com',
	password: '12345678',
	mobile: '9614028180',
	role: 'User',
};

var user2 = {
	_id: ObjectID(),
	name: 'Ayub Ansari',
	email: 'driveforayub@gmail.com',
	password: '12345678',
	mobile: '9851109954',
	role: 'User',
};
var user3 = {
	_id: ObjectID(),
	name: 'Ayub Ansari',
	email: 'emailforayub@gmail.com',
	password: '12345678',
	mobile: '987897897',
	role: 'User',
};
describe('Users Functionality', () => {
	beforeAll(() => {
		UserModel.deleteMany({}).then(res => {
			console.log('previous users deleted');
		});
		UserModel.insertMany([user2, user3]);
	});

	it('get users/ , get all user details', async () => {
		let res = await request.get('/users/');
		expect(res.statusCode).toEqual(200);
	});

	it('post users/ , New user creation and email sent', async () => {
		let res = await request.post('/users/').send(user);
		expect(res.statusCode).toEqual(201);
	});

	it('get users/id , get user details', async () => {
		let res = await request.get('/users/' + user2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put users/id , Update user details', async () => {
		let res = await request.put('/users/' + user2._id).send({ name: 'rintu' });
		expect(res.statusCode).toEqual(201);
	});

	it('delete users/id , soft delete user details', async () => {
		let res = await request.delete('/users/' + user2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete users/id/delete , delete user details', async () => {
		let res = await request.delete('/users/' + user3._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
