var Episode = require('../models/SeriesEpisode');

exports.index = async function () {
	try {
		return await Episode.find();
	} catch (e) {
		throw Error('Error while paginating episode');
	}
};

exports.store = async function (dto) {
	try {
		let episode = await new Episode(dto);
		return episode.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let episode = await Episode.findById(id);
		return episode;
	} catch (e) {
		throw Error('Error while find episode by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let episode = await Episode.findByIdAndUpdate(id, dto, { new: true });
		return episode;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let episode = await Episode.findById(id);
		episode.delete();
		return episode;
	} catch (e) {
		throw Error('Error while deleting episode');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let episode = await Episode.findByIdAndDelete(id);
		return episode;
	} catch (e) {
		throw Error('Error while deleting episode');
	}
};
