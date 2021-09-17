const SubscriptionService = require('../services/subscription.service');

exports.index = async function (req, res, next) {
	let subscriptions = await SubscriptionService.index();
	res.status(200).send(subscriptions);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	try {
		let subscription = await SubscriptionService.store(dto);
		res.status(201).send({ data: subscription, msg: 'New subscription created successfully' });
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
	let subscription = await SubscriptionService.show(id);
	if (subscription) {
		res.status(200).send(subscription);
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	delete dto.user;
	try {
		let subscription = await SubscriptionService.update(id, dto);
		return res.status(201).send({ data: subscription, msg: 'Watchlist updated successfully' });
	} catch (error) {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let subscription = await SubscriptionService.destroy(id);
	if (subscription) {
		res.status(200).send({ msg: 'Watchlist deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let subscription = await SubscriptionService.hardDestroy(id);
	if (subscription) {
		res.status(200).send({ msg: 'Watchlist deleted successfully' });
	} else {
		res.status(404).send({ msg: 'Watchlist not found' });
	}
};

exports.getAll = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};
