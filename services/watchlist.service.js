var WatchList = require('../models/WatchList');
const UserServices = require('../services/user.service');

const MovieService = require('../services/movie.service');
const SeriesService = require('../services/series.service');

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

exports.userWatchList = async function (req, userId) {
	let limit = req.query.limit;
	let page = req.query.page;
	try {
		let user = await UserServices.show(userId);
		// 	// console.log(user);
		let modWatchlist = {};
		if (user) {
			let query = {
				deleted: false,
				user: userId,
			};

			let options = {
				limit: parseInt(limit) || 20,
				page: parseInt(page) || 1,
				sort: { createdAt: -1 },
			};
			let watchlist = await WatchList.paginate(query, options);
			let moviesIds = [];
			watchlist.docs
				.filter(item => item.entity === 'movies')
				.map((item, index) => {
					moviesIds.push(item.entityId);
				});

			let seriesIds = [];
			watchlist.docs
				.filter(item => item.entity === 'series')
				.map((item, index) => {
					seriesIds.push(item.entityId);
				});
			let movies = await MovieService.findMany(moviesIds);
			let series = await SeriesService.findMany(seriesIds);
			// console.log(movies, series);
			// console.log({ moviesIds, seriesIds });
			// watchlist.docs.filter(item=>item.entity==="movies")
			return { movies, series };
		} else {
			return [];
		}
	} catch (e) {
		console.log(e);
		throw Error('Error while find watchlist by user id');
	}
};
