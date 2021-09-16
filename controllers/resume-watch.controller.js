const ResumeWatchService = require('../services/resume-watch.service');

exports.index = async function (req, res, next) {
	let resumeWatches = await ResumeWatchService.index();
	res.status(200).send(resumeWatches);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let resumeWatch = await ResumeWatchService.store(dto);
		res.status(201).send({ data: resumeWatch, msg: 'New resume-watch created successfully' });
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
	let resumeWatch = await ResumeWatchService.show(id);
	if (resumeWatch) {
		res.status(200).send(resumeWatch);
	} else {
		res.status(404).send({ msg: 'ResumeWatch not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let resumeWatch = await ResumeWatchService.update(id, dto);
		return res.status(201).send({ data: resumeWatch, msg: 'ResumeWatch updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'ResumeWatch not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let resumeWatch = await ResumeWatchService.destroy(id);
	if (resumeWatch) {
		res.status(200).send({ msg: 'ResumeWatch deleted successfully' });
	} else {
		res.status(404).send({ msg: 'ResumeWatch not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let resumeWatch = await ResumeWatchService.hardDestroy(id);
	if (resumeWatch) {
		res.status(200).send({ msg: 'ResumeWatch deleted successfully' });
	} else {
		res.status(404).send({ msg: 'ResumeWatch not found' });
	}
};

exports.getAll = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};
