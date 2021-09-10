var Movie = require('../models/Movie');

exports.index = async function () {
	try {
		return await Movie.find();
	} catch (e) {
		throw Error('Error while paginating movies');
	}
};
exports.store = async function (dto) {
	try {
		let movie = await new Movie(dto);
		return movie.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let movie = await Movie.findById(id);
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
		movie.softdelete();
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
