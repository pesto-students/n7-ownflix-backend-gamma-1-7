const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const EpisodeModel = require('../models/SeriesEpisode');
const { ObjectID } = require('mongodb');

describe('SeriesEpisode Functionality', () => {
	beforeAll(() => {
		EpisodeModel.deleteMany({}).then(res => {
			// console.log('previous series-episodes deleted');
		});
	});

	var episode = {
		_id: ObjectID(),
		series: ObjectID(),
		episodeNo: 1,
		title: 'Series Asur episode 1',
		images: ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'],
		videoTrailer: {
			s3rl: 'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		},
		videoMain: {
			s3rl: 'https://images.unsplash.com/photo-1616594529046-d7b47847a021?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
		},

		dateOfRelease: '2020-01-15',

		runningTime: '150 mins',
		plot: 'Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Tempore neque quod deleniti distinctio eaque ab recusandae cum, alias laudantium porro dignissimos fuga rem repudiandae cupiditate obcaecati dolor assumenda earum amet vitae saepe illum dolores delectus. Quasi consectetur quam ad voluptatum sapiente, enim voluptatibus, eligendi inventore ipsam aliquam, eveniet! Eligendi laudantium porro in voluptatem. Voluptatum vero nesciunt nisi nihil, veniam iste. Veritatis blanditiis omnis cupiditate, provident accusamus eaque fuga aut consectetur, corporis distinctio reiciendis fugiat est ea, nihil quasi, sequi temporibus. Veniam voluptate velit quae, ipsa. Debitis expedita perferendis, nesciunt ipsa minus quisquam quae quam sit! Eligendi adipisci reprehenderit unde sit?',

		isPublished: true,
	};
	var episode2 = { ...episode };
	episode2._id = ObjectID();

	var episode3 = { ...episode };
	episode3._id = ObjectID();

	it('post series-episodes/ , New episode creation', async () => {
		let res = await request.post('/series-episodes/').send(episode);
		expect(res.statusCode).toEqual(201);
	});

	it('post series-episodes/ , New episode creation', async () => {
		let res = await request.post('/series-episodes/').send(episode2);
		expect(res.statusCode).toEqual(201);
	});
	it('post series-episodes/ , New episode creation', async function () {
		let res = await request.post('/series-episodes/').send(episode3);
		expect(res.statusCode).toEqual(201);
	});

	it('get series-episodes/ , get all episode details', async () => {
		let res = await request.get('/series-episodes/all');
		expect(res.statusCode).toEqual(200);
	});

	it('get series-episodes/id , get episode details', async () => {
		let res = await request.get('/series-episodes/' + episode._id);
		expect(res.statusCode).toEqual(200);
	});

	it('put series-episodes/id , Update episode details', async () => {
		let res = await request.put('/series-episodes/' + episode._id).send({ title: 'iron man 3' });
		expect(res.statusCode).toEqual(201);
	});

	it('delete series-episodes/id , soft delete episode details', async () => {
		let res = await request.delete('/series-episodes/' + episode2._id);
		expect(res.statusCode).toEqual(200);
	});

	it('delete series-episodes/id/delete , delete episode details', async () => {
		let res = await request.delete('/series-episodes/' + episode2._id + '/delete');
		expect(res.statusCode).toEqual(200);
	});
});
