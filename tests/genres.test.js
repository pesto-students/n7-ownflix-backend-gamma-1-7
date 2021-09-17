const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const GenreModel = require('../models/Genre');
const { ObjectID } = require('mongodb');
const randomstring = require('randomstring');

describe('Genres Functionality', () => {
	beforeAll(() => {
		GenreModel.deleteMany({}).then(res => {
			// console.log('previous genres deleted');
		});
	});

	var genre = {
		_id: ObjectID(),
		title: 'Action ',
	};
	var genre2 = {
		_id: ObjectID(),
		title: 'Thriller ',
	};
	var genre3 = {
		_id: ObjectID(),
		title: 'Romantic Drama',
	};

	it('post genres/ , New genre creation', async () => {
		let res = await request.post('/genres/').send(genre);
		expect(res.statusCode).toEqual(201);
	});

	it('post genres/ , New genre creation', async () => {
		let res = await request.post('/genres/').send(genre2);
		expect(res.statusCode).toEqual(201);
	});
	it('post genres/ , New genre creation', async function () {
		let res = await request.post('/genres/').send(genre3);
		expect(res.statusCode).toEqual(201);
	});

	it('get genres/ , get all genre details', async () => {
		let res = await request.get('/genres/');
		expect(res.statusCode).toEqual(200);
	});
	it('get genres/all , get all genre details', async () => {
		let res = await request.get('/genres/all');
		expect(res.statusCode).toEqual(200);
	});

	it('get genres/id , get genre details', async () => {
		let res = await request.get('/genres/' + genre._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put genres/id , Update genre details', async () => {
		let res = await request.put('/genres/' + genre._id).send({ title: 'iron man 3' });
		expect(res.statusCode).toEqual(201);
	});

	it('delete genres/id , soft delete genre details', async () => {
		let res = await request.delete('/genres/' + genre2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete genres/id/delete , delete genre details', async () => {
		let res = await request.delete('/genres/' + genre2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
