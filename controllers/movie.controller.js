const MovieService = require('../services/movie.service');

exports.index = async function (req, res, next) {
	let movies = await MovieService.index(req);
	res.status(200).send(movies);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let movie = await MovieService.store(dto);
		res.status(201).send({ data: movie, msg: 'New movie created successfully' });
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			let errors = {};
			Object.keys(error.errors).forEach(key => {
				errors[key] = error.errors[key].message;
			});
			return res.status(400).send(errors);
		}
		res.status(500).send({ msg: error.message });
	}
};

exports.show = async function (req, res, next) {
	let id = req.params.id;
	let movie = await MovieService.show(id);
	if (movie) {
		res.status(200).send(movie);
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let movie = await MovieService.update(id, dto);
		return res.status(201).send({ data: movie, msg: 'Movie updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let movie = await MovieService.destroy(id);
	if (movie) {
		res.status(200).send({ msg: 'Movie deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let movie = await MovieService.hardDestroy(id);
	if (movie) {
		res.status(200).send({ msg: 'Movie deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.indexAll = async function (req, res, next) {
	let movies = await MovieService.indexAll(req);
	res.status(200).send(movies);
};

exports.popular = async function (req, res, next) {
	let movies = await MovieService.popular(req);
	res.status(200).send(movies);
};
exports.recommended = async function (req, res, next) {
	let movies = await MovieService.recommended(req);
	res.status(200).send(movies);
};

exports.byGenre = async function (req, res, next) {
	let genreSlug = req.params.genreSlug;
	let movies = await MovieService.byGenre(genreSlug);
	res.status(200).send(movies);
};
exports.latest = async function (req, res, next) {
	let movies = await MovieService.latest(req);
	res.status(200).send(movies);
};
exports.bySlug = async function (req, res, next) {
	let slug = req.params.slug;
	let movie = await MovieService.bySlug(slug);
	res.status(200).send(movie);
};

exports.views = async function (req, res, next) {
	let movieId = req.params.id;
	let movie = await MovieService.views(movieId);
	res.status(200).send(movie);
};
