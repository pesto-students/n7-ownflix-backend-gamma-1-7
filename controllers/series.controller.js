const SeriesService = require('../services/series.service');

exports.index = async function (req, res, next) {
	let series = await SeriesService.index();
	res.status(200).send(series);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let series = await SeriesService.store(dto);
		res.status(201).send({ data: series, msg: 'New series created successfully' });
	} catch (error) {
		// console.log(error);
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
	let series = await SeriesService.show(id);
	if (series) {
		res.status(200).send(series);
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let series = await SeriesService.update(id, dto);
		return res.status(201).send({ data: series, msg: 'Movie updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let series = await SeriesService.destroy(id);
	if (series) {
		res.status(200).send({ msg: 'Movie deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let series = await SeriesService.hardDestroy(id);
	if (series) {
		res.status(200).send({ msg: 'Movie deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Movie not found' });
	}
};

exports.getAll = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};
