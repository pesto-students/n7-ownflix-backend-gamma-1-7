const EpisodeService = require('../services/episode.service');

exports.index = async function (req, res, next) {
	let episodes = await EpisodeService.index();
	res.status(200).send(episodes);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let episode = await EpisodeService.store(dto);
		res.status(201).send({ data: episode, msg: 'New episode created successfully' });
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
	let episode = await EpisodeService.show(id);
	if (episode) {
		res.status(200).send(episode);
	} else {
		res.status(404).send({ msg: 'Episode not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let episode = await EpisodeService.update(id, dto);
		return res.status(201).send({ data: episode, msg: 'Episode updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Episode not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let episode = await EpisodeService.destroy(id);
	if (episode) {
		res.status(200).send({ msg: 'Episode deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Episode not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let episode = await EpisodeService.hardDestroy(id);
	if (episode) {
		res.status(200).send({ msg: 'Episode deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Episode not found' });
	}
};

exports.bySlug = async function (req, res, next) {
	let slug = req.params.slug;
	let episode = await EpisodeService.bySlug(slug).populate({ path: 'series' });
	res.status(200).send(episode);
};
exports.indexAll = async function (req, res, next) {
	let episodes = await EpisodeService.indexAll();
	res.status(200).send(episodes);
};
