var WatchList = require('../models/WatchList');

exports.index = async function () {
	try {
		return await WatchList.find();
	} catch (e) {
		throw Error('Error while paginating watchlists');
	}
};

exports.store = async function (dto) {
	try {
		let watchlist = await new WatchList(dto);
		return watchlist.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let watchlist = await WatchList.findById(id);
		return watchlist;
	} catch (e) {
		// console.log(e);
		throw Error('Error while find watchlist by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let watchlist = await WatchList.findByIdAndUpdate(id, dto, { new: true });
		return watchlist;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let watchlist = await WatchList.findById(id);
		watchlist.delete();
		return watchlist;
	} catch (e) {
		throw Error('Error while deleting watchlist');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let watchlist = await WatchList.findByIdAndDelete(id);
		return watchlist;
	} catch (e) {
		throw Error('Error while deleting watchlist');
	}
};
