var Movie = require('../models/Movie');
var GenreService = require('../services/genre.service');

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
		return await Movie.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating movies');
	}
};

exports.store = async function (dto) {
	try {
		let movie = await new Movie(dto);
		return movie.save();
	} catch (e) {
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let movie = await Movie.findById(id).populate('genres');
		return movie;
	} catch (e) {
		throw Error('Error while find movie by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let movie = await Movie.findByIdAndUpdate(id, dto, { new: true });
		return movie;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let movie = await Movie.findById(id);
		movie.delete();
		return movie;
	} catch (e) {
		throw Error('Error while deleting movie');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let movie = await Movie.findByIdAndDelete(id);
		return movie;
	} catch (e) {
		throw Error('Error while deleting movie');
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
		populate: [{ path: 'genres' }],
		limit: parseInt(limit) || 10,
		page: page || 1,
		sort: { createdAt: -1 },
	};

	try {
		return await Movie.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating movies');
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
		return await Movie.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating movies');
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
		return await Movie.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating movies');
	}
};

exports.byGenre = async function (genreSlug) {
	try {
		let genre = await GenreService.findBySlug(genreSlug);
		if (genre) {
			let movies = await Movie.paginate({ genre: genre._id });
			return movies;
		} else {
			throw Error('Error while find movie by id');
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
		return await Movie.paginate(query, options);
	} catch (e) {
		throw Error('Error while paginating movies');
	}
};

exports.bySlug = async function (slug) {
	try {
		let movie = await Movie.findOne({ slug: slug });
		return movie;
	} catch (e) {
		throw Error('Error while find movie by id');
	}
};
