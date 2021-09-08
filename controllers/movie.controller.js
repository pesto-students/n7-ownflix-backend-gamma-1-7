const MovieService = require('../services/movie.service');

var salt = parseInt(process.env.BCRYPT_SALT);

exports.index = async function (req, res, next) {
	let movies = await MovieService.index();
	res.status(200).send(movies);
};

exports.create = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let movie = await MovieService.store(dto);
		res.status(201).send({ data: movie, msg: 'New movie created successfully' });
	} catch (error) {
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
		res.status(200).send({ msg: 'Movie found', data: movie });
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

exports.getAll = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};

exports.updateStatus = async function (req, res, next) {
	let id = req.params.id;
	let dto = {
		active: req.body.active,
		isVerified: req.bosy.isVerified,
	};
	let movie = await MovieService.update(id, dto);
	if (movie) {
		res.status(200).send({ data: movie, msg: 'Movie updated successfully' });
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};
// exports.hardDestroy = async function (req, res, next) {
// 	return true;
// };
