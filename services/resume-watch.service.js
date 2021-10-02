var ResumeWatch = require('../models/ResumeWatch');
const MovieService = require('../services/movie.service');
const SeriesService = require('../services/series.service');

exports.index = async function () {
	try {
		return await ResumeWatch.find();
	} catch (e) {
		throw Error('Error while paginating resumeWatches');
	}
};

exports.store = async function (dto) {
	try {
		let resumeWatch = await new ResumeWatch(dto);
		return resumeWatch.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let resumeWatch = await ResumeWatch.findById(id);
		return resumeWatch;
	} catch (e) {
		throw Error('Error while find resumeWatch by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let resumeWatch = await ResumeWatch.findByIdAndUpdate(id, dto, { new: true });
		return resumeWatch;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let resumeWatch = await ResumeWatch.findById(id);
		resumeWatch.delete();
		return resumeWatch;
	} catch (e) {
		throw Error('Error while deleting resumeWatch');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let resumeWatch = await ResumeWatch.findByIdAndDelete(id);
		return resumeWatch;
	} catch (e) {
		throw Error('Error while deleting resumeWatch');
	}
};

exports.getDetails = async function (userId, entity, entityId) {
	try {
		let resumeWatch = await ResumeWatch.findOne({ user: userId, entity: entity, entityId: entityId });
		return resumeWatch;
	} catch (e) {
		throw Error('Error while find resumeWatch by id');
	}
};
exports.checkOrUpdate = async function (userId, entity, entityId, runningTime) {
	let rwatch = await ResumeWatch.findOne({ user: userId, entity: entity, entityId: entityId });
	// console.log(rwatch);
	if (rwatch) {
		// console.log('update');
		let gg = await ResumeWatch.findOneAndUpdate(
			{
				user: userId,
				entity: entity,
				entityId: entityId,
			},
			{ runningTime: runningTime }
		);

		return gg;
	} else {
		// console.log('new', { user: userId });
		let r = await new ResumeWatch({
			user: userId,
			entity: entity,
			entityId: entityId,
			runningTime: runningTime,
		});
		r.save();
		return r;
	}

	// try {
	// 	let resumeWatch = await ResumeWatch.findOne({ user: userId, entity: entity, entityId: entityId });
	// 	return resumeWatch;
	// } catch (e) {
	// 	throw Error('Error while find resumeWatch by id');
	// }
};

exports.usersResumeWatch = async function (req, userId) {
	let limit = req.query.limit;
	let page = req.query.page;
	try {
		let user = 'sss';
		// // 	// console.log(user);
		// let modWatchlist = {};
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

			let watchlist = await ResumeWatch.paginate(query, options);
			let moviesIds = [];
			watchlist.docs
				.filter(item => item.entity === 'movies')
				.map((item, index) => {
					moviesIds.push({
						resumeWatchId: item.id,
						movieId: item.entityId,
						runningTime: item.runningTime,
					});
				});
			let moviesArray = [];
			for (let index = 0; index < moviesIds.length; index++) {
				const movieId = moviesIds[index]['movieId'];
				const resumeWatchId = moviesIds[index]['resumeWatchId'];
				const runningTime = moviesIds[index]['runningTime'];
				// console.log({ movieId, resumeWatchId });
				let movie = await MovieService.finded(movieId);
				if (movie !== '') {
					moviesArray.push({
						resumeWatchId: resumeWatchId,
						runningTime: runningTime,
						movie: movie,
					});
				}
			}

			let seriesIds = [];
			watchlist.docs
				.filter(item => item.entity === 'series')
				.map((item, index) => {
					seriesIds.push({
						resumeWatchId: item.id,
						seriesId: item.entityId,
						runningTime: item.runningTime,
					});
				});
			let seriesArray = [];
			for (let index = 0; index < seriesIds.length; index++) {
				const seriesId = seriesIds[index]['seriesId'];
				const resumeWatchId = seriesIds[index]['resumeWatchId'];
				const runningTime = moviesIds[index]['runningTime'];
				// console.log({ seriesId, resumeWatchId });
				let series = await SeriesService.finded(seriesId);
				if (series !== '') {
					seriesArray.push({
						resumeWatchId: resumeWatchId,
						runningTime: runningTime,
						series: series,
					});
				}
			}

			return { movies: moviesArray, series: seriesArray };
		} else {
			return [];
		}
	} catch (e) {
		console.log(e);
		throw Error('Error while find watchlist by user id');
	}
};
