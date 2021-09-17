var Genre = require('../models/Genre');

exports.index = async function () {
	try {
		return await Genre.find({ deleted: false });
	} catch (e) {
		throw Error('Error while paginating genres');
	}
};

exports.store = async function (dto) {
	try {
		let genre = await new Genre(dto);
		return genre.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let genre = await Genre.findById(id);
		return genre;
	} catch (e) {
		throw Error('Error while find genre by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let genre = await Genre.findByIdAndUpdate(id, dto, { new: true });
		return genre;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let genre = await Genre.findById(id);
		genre.delete();
		return genre;
	} catch (e) {
		throw Error('Error while deleting genre');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let genre = await Genre.findByIdAndDelete(id);
		return genre;
	} catch (e) {
		throw Error('Error while deleting genre');
	}
};

exports.indexAll = async function () {
	try {
		return await Genre.find();
	} catch (e) {
		throw Error('Error while paginating genres');
	}
};

exports.findBySlug = async function (genreSlug) {
	try {
		let genre = await Genre.findOne({ slug: genreSlug });
		return genre;
	} catch (e) {
		console.log(e);
		throw Error('Error while getting genre');
	}
};
