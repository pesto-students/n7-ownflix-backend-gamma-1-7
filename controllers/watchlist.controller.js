const WatchListService = require('../services/watchlist.service');

exports.index = async function (req, res, next) {
	let watchlists = await WatchListService.index();
	res.status(200).send(watchlists);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let watchlist = await WatchListService.store(dto);
		res.status(201).send({ data: watchlist, msg: 'New watchlist created successfully' });
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
	let watchlist = await WatchListService.show(id);
	if (watchlist) {
		res.status(200).send(watchlist);
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let watchlist = await WatchListService.update(id, dto);
		return res.status(201).send({ data: watchlist, msg: 'Watchlist updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let watchlist = await WatchListService.destroy(id);
	if (watchlist) {
		res.status(200).send({ msg: 'Watchlist deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let watchlist = await WatchListService.hardDestroy(id);
	if (watchlist) {
		res.status(200).send({ msg: 'Watchlist deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.indexAll = async function (req, res, next) {
	let watchlists = await WatchListService.index();
	res.status(200).send(watchlists);
};

exports.userWatchList = async function (req, res, next) {
	let userId = req.params.userId;
	let watchlists = await WatchListService.userWatchList(req, userId);
	res.status(200).send(watchlists);
};
