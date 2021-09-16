var User = require('../models/User');

exports.index = async function () {
	try {
		return await User.find();
	} catch (e) {
		throw Error('Error while paginating users');
	}
};
exports.store = async function (dto) {
	try {
		let user = await new User(dto);
		return user.save();
	} catch (e) {
		throw Error('Error while creating user');
	}
};

exports.show = async function (id) {
	try {
		let user = await User.findById(id);
		return user;
	} catch (e) {
		throw Error('Error while creating user');
	}
};

exports.update = async function (id, dto) {
	// console.log(id, dto);
	try {
		let user = await User.findByIdAndUpdate(id, dto, { new: true });
		return user;
	} catch (e) {
		throw Error('Error while updating user');
	}
};
exports.destroy = async function (id) {
	try {
		let user = await User.findById(id);
		user.delete();
		return user;
	} catch (e) {
		throw Error('Error while deleting user');
	}
};
exports.hardDestroy = async function (id) {
	try {
		let user = await User.findByIdAndDelete(id);
		return user;
	} catch (e) {
		throw Error('Error while deleting movie');
	}
};
