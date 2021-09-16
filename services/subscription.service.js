var Subscription = require('../models/Subscription');

exports.index = async function () {
	try {
		return await Subscription.find();
	} catch (e) {
		throw Error('Error while paginating subscriptions');
	}
};

exports.store = async function (dto) {
	try {
		let subscription = await new Subscription(dto);
		return subscription.save();
	} catch (e) {
		// console.log('ss', e);
		throw Error(e);
	}
};
exports.show = async function (id) {
	try {
		let subscription = await Subscription.findById(id);
		return subscription;
	} catch (e) {
		// console.log(e);
		throw Error('Error while find subscription by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let subscription = await Subscription.findByIdAndUpdate(id, dto, { new: true });
		return subscription;
	} catch (e) {
		throw Error(e);
	}
};

exports.destroy = async function (id) {
	try {
		let subscription = await Subscription.findById(id);
		subscription.delete();
		return subscription;
	} catch (e) {
		throw Error('Error while deleting subscription');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let subscription = await Subscription.findByIdAndDelete(id);
		return subscription;
	} catch (e) {
		throw Error('Error while deleting subscription');
	}
};
