var Series = require('../models/Series');

exports.index = async function () {
	try {
		return await Series.find();
	} catch (e) {
		throw Error('Error while paginating series');
	}
};

exports.store = async function (dto) {
	try {
		let series = await new Series(dto);
		return series.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let series = await Series.findById(id);
		return series;
	} catch (e) {
		throw Error('Error while find series by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let series = await Series.findByIdAndUpdate(id, dto, { new: true });
		return series;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let series = await Series.findById(id);
		series.delete();
		return series;
	} catch (e) {
		throw Error('Error while deleting series');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let series = await Series.findByIdAndDelete(id);
		return series;
	} catch (e) {
		throw Error('Error while deleting series');
	}
};
