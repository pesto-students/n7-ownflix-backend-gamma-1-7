const GenreService = require('../services/genre.service');

exports.index = async function (req, res, next) {
	let genres = await GenreService.index();
	res.status(200).send(genres);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let genre = await GenreService.store(dto);
		res.status(201).send({ data: genre, msg: 'New genre created successfully' });
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
	let genre = await GenreService.show(id);
	if (genre) {
		res.status(200).send(genre);
	} else {
		res.status(404).send({ msg: 'Genre not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let genre = await GenreService.update(id, dto);
		return res.status(201).send({ data: genre, msg: 'Genre updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Genre not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let genre = await GenreService.destroy(id);
	if (genre) {
		res.status(200).send({ msg: 'Genre deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Genre not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let genre = await GenreService.hardDestroy(id);
	if (genre) {
		res.status(200).send({ msg: 'Genre deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Genre not found' });
	}
};

exports.indexAll = async function (req, res, next) {
	let genres = await GenreService.indexAll();
	res.status(200).send(genres);
};

exports.bySlug = async function (req, res, next) {
	let slug = req.params.slug;
	let genre = await GenreService.findBySlug(slug);
	res.status(200).send(genre);
};
