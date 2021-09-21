var User = require('../models/User');
var Genre = require('../models/Genre');
var Movie = require('../models/Movie');
var Series = require('../models/Series');
var User = require('../models/User');

exports.index = async function () {
	try {
		let data = [
			{
				title: 'Users',
				count: await User.countDocuments({ role: 'User' }),
			},
			{
				title: 'Movies',
				count: await Movie.countDocuments(),
			},
			{
				title: 'Series',
				count: await Series.countDocuments(),
			},
			{
				title: 'Genres',
				count: await Genre.countDocuments(),
			},
		];
		return data;
	} catch (e) {
		console.log(e);
		throw Error('Error while paginating users');
	}
};
