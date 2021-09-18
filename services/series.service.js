var Series = require('../models/Series');
var GenreService = require('../services/genre.service');
const SeriesEpisode = require('../models/SeriesEpisode');

exports.index = async function (req) {
	let search = req.query.search;
	let limit = req.query.limit;
	let page = req.query.page;
	if (search) {
		var regexString = '.*' + search + '.*';
	} else {
		var regexString = '';
	}

	let query = {
		deleted: false,
		isPublished: true,
		$or: [
			{ title: { $regex: new RegExp(regexString, 'i') } },
			{ director: { $regex: new RegExp(regexString, 'i') } },
			{ actors: { $regex: new RegExp(regexString, 'i') } },
		],
	};

	let options = {
		populate: [{ path: 'genres', select: 'title slug' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { imdbRating: -1, views: -1 },
	};
	try {
		return await Series.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating series');
	}
};

exports.store = async function (dto) {
	try {
		let series = await new Series(dto);
		return series.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let series = await Series.findById(id).populate('genres');
		return series;
	} catch (e) {
		throw Error('Error while find series by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let series = await Series.findByIdAndUpdate(id, dto, { new: true });
		return series;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let series = await Series.findById(id);
		series.delete();
		return series;
	} catch (e) {
		throw Error('Error while deleting series');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let series = await Series.findByIdAndDelete(id);
		return series;
	} catch (e) {
		throw Error('Error while deleting series');
	}
};

exports.indexAll = async function (req) {
	let search = req.query.search;
	let limit = req.query.limit;
	let page = req.query.page;
	if (search) {
		var regexString = '.*' + search + '.*';
	} else {
		var regexString = '';
	}

	let query = {
		deleted: false,
		$or: [
			{ title: { $regex: new RegExp(regexString, 'i') } },
			{ director: { $regex: new RegExp(regexString, 'i') } },
			{ actors: { $regex: new RegExp(regexString, 'i') } },
		],
	};

	let options = {
		populate: [{ path: 'genres', select: 'title slug' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { createdAt: -1 },
	};

	try {
		return await Series.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating series');
	}
};
exports.popular = async function (req) {
	let limit = req.query.limit;
	let page = req.query.page;
	let query = {
		deleted: false,
		isPublished: true,
	};
	let options = {
		populate: [{ path: 'genres', select: 'title slug' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { createdAt: -1, imdbRating: -1, views: -1 },
	};

	try {
		return await Series.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating series');
	}
};
exports.recommended = async function (req) {
	let search = req.query.search;
	let limit = req.query.limit;
	let page = req.query.page;
	let genreSlug = req.query.genre;

	if (search) {
		var regexString = '.*' + search + '.*';
	} else {
		var regexString = '';
	}

	let query = {
		deleted: false,
		isPublished: true,
		$or: [
			{ title: { $regex: new RegExp(regexString, 'i') } },
			{ director: { $regex: new RegExp(regexString, 'i') } },
			{ actors: { $regex: new RegExp(regexString, 'i') } },
		],
	};

	if (genreSlug) {
		let genre = await GenreService.findBySlug(genreSlug);
		if (genre) {
			query['$or']['genre'] = genre.id;
		}
	}
	let options = {
		populate: [{ path: 'genres', select: 'title slug' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { createdAt: -1 },
	};

	try {
		return await Series.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating series');
	}
};

exports.byGenre = async function (genreSlug) {
	try {
		let genre = await GenreService.findBySlug(genreSlug);
		if (genre) {
			let series = await Series.paginate({ genre: genre._id });
			return series;
		} else {
			throw Error('Error while find series by id');
		}
	} catch (e) {
		throw Error('Error while find genre by title');
	}
};

exports.latest = async function (req) {
	let search = req.query.search;
	let limit = req.query.limit;
	let page = req.query.page;
	if (search) {
		var regexString = '.*' + search + '.*';
	} else {
		var regexString = '';
	}

	let query = {
		deleted: false,
		isPublished: true,
		$or: [
			{ title: { $regex: new RegExp(regexString, 'i') } },
			{ director: { $regex: new RegExp(regexString, 'i') } },
			{ actors: { $regex: new RegExp(regexString, 'i') } },
		],
	};

	let options = {
		populate: [{ path: 'genres', select: 'title slug' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { createdAt: -1 },
	};

	try {
		return await Series.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating series');
	}
};

exports.bySlug = async function (slug) {
	try {
		let modSeries = {};
		let series = await Series.findOne({ slug: slug });
		let episodes = await SeriesEpisode.find({ series: series.id, deleted: false, isPublished: true });
		modSeries = { ...series._doc };
		modSeries.episodes = episodes;
		// console.log(series);
		return modSeries;
	} catch (e) {
		console.log(e);
		throw Error('Error while find series by id');
	}
};
