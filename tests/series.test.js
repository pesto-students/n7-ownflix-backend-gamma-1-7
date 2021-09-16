const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const SeriesModel = require('../models/Series');
const { ObjectID } = require('mongodb');

describe('Series Functionality', () => {
	beforeAll(() => {
		SeriesModel.deleteMany({}).then(res => {
			// console.log('previous series deleted');
		});
	});

	var series = {
		_id: ObjectID(),
		title: 'Ayub Ansari',
		noOfEpisodes: 10,
		genre: ObjectID(),
		images: ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'],
		imagesVertical: [
			'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		],
		videoTrailer:
			'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',

		yearOfRelease: '2010',
		dateOfRealease: '12-12-2012',
		director: 'C Nolan',
		productionHouse: 'String',
		imdbRating: 4.7,
		actors: 'Tony Stark',
		plot: 'Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Tempore neque quod deleniti distinctio eaque ab recusandae cum, alias laudantium porro dignissimos fuga rem repudiandae cupiditate obcaecati dolor assumenda earum amet vitae saepe illum dolores delectus. Quasi consectetur quam ad voluptatum sapiente, enim voluptatibus, eligendi inventore ipsam aliquam, eveniet! Eligendi laudantium porro in voluptatem. Voluptatum vero nesciunt nisi nihil, veniam iste. Veritatis blanditiis omnis cupiditate, provident accusamus eaque fuga aut consectetur, corporis distinctio reiciendis fugiat est ea, nihil quasi, sequi temporibus. Veniam voluptate velit quae, ipsa. Debitis expedita perferendis, nesciunt ipsa minus quisquam quae quam sit! Eligendi adipisci reprehenderit unde sit?',
		rated: 'UA',
		isPublished: true,
		subscriptionRequired: false,
	};
	var series2 = { ...series };
	series2._id = ObjectID();

	var series3 = { ...series };
	series3._id = ObjectID();

	it('post series/ , New series creation', async () => {
		let res = await request.post('/series/').send(series);
		expect(res.statusCode).toEqual(201);
	});

	it('post series/ , New series creation', async () => {
		let res = await request.post('/series/').send(series2);
		expect(res.statusCode).toEqual(201);
	});
	it('post series/ , New series creation', async function () {
		let res = await request.post('/series/').send(series3);
		expect(res.statusCode).toEqual(201);
	});

	it('get series/ , get all series details', async () => {
		let res = await request.get('/series/');
		expect(res.statusCode).toEqual(200);
	});

	it('get series/id , get series details', async () => {
		let res = await request.get('/series/' + series._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put series/id , Update series details', async () => {
		let res = await request.put('/series/' + series._id).send({ title: 'iron man 3 -f' });
		expect(res.statusCode).toEqual(201);
	});

	it('delete series/id , soft delete series details', async () => {
		let res = await request.delete('/series/' + series2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete series/id/delete , delete series details', async () => {
		let res = await request.delete('/series/' + series2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
