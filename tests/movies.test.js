const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const MovieModel = require('../models/Movie');
const { ObjectID } = require('mongodb');

describe('Movies Functionality', () => {
	beforeAll(() => {
		MovieModel.deleteMany({}).then(res => {
			console.log('previous movies deleted');
		});
	});

	var movie = {
		_id: ObjectID(),
		title: 'Ayub Ansari',
		genre: 'Action',
		images: ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'],
		imagesVertical:
			'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		videoTrailer:
			'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		videoMain: 'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		yearOfRelease: '2010',
		dateOfRealease: '2020-01-15',
		director: 'C Nolan',
		productionHouse: 'String',
		imdbRating: 4.7,
		runnningTime: '150 mins',
		actors: 'Tony Stark',
		plot: 'Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Tempore neque quod deleniti distinctio eaque ab recusandae cum, alias laudantium porro dignissimos fuga rem repudiandae cupiditate obcaecati dolor assumenda earum amet vitae saepe illum dolores delectus. Quasi consectetur quam ad voluptatum sapiente, enim voluptatibus, eligendi inventore ipsam aliquam, eveniet! Eligendi laudantium porro in voluptatem. Voluptatum vero nesciunt nisi nihil, veniam iste. Veritatis blanditiis omnis cupiditate, provident accusamus eaque fuga aut consectetur, corporis distinctio reiciendis fugiat est ea, nihil quasi, sequi temporibus. Veniam voluptate velit quae, ipsa. Debitis expedita perferendis, nesciunt ipsa minus quisquam quae quam sit! Eligendi adipisci reprehenderit unde sit?',
		rated: 'UA',
	};
	var movie2 = { ...movie };
	movie2._id = ObjectID();

	var movie3 = { ...movie };
	movie3._id = ObjectID();

	it('post movies/ , New movie creation', async () => {
		let res = await request.post('/movies/').send(movie);
		expect(res.statusCode).toEqual(201);
	});

	it('post movies/ , New movie creation', async () => {
		let res = await request.post('/movies/').send(movie2);
		expect(res.statusCode).toEqual(201);
	});
	it('post movies/ , New movie creation', async function () {
		let res = await request.post('/movies/').send(movie3);
		expect(res.statusCode).toEqual(201);
	});

	it('get movies/ , get all movie details', async () => {
		let res = await request.get('/movies/');
		expect(res.statusCode).toEqual(200);
	});

	it('get movies/id , get movie details', async () => {
		let res = await request.get('/movies/' + movie._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put movies/id , Update movie details', async () => {
		let res = await request.put('/movies/' + movie._id).send({ title: 'iron man 3' });
		expect(res.statusCode).toEqual(201);
	});

	it('delete movies/id , soft delete movie details', async () => {
		let res = await request.delete('/movies/' + movie2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete movies/id/delete , delete movie details', async () => {
		let res = await request.delete('/movies/' + movie2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
