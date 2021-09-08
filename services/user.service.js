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
		let user = await User.findById(id).select({ password: 0 });
		return user;
	} catch (e) {
		throw Error('Error while find user by id');
	}
};

exports.update = async function (id, dto) {
	try {
		let user = await User.findByIdAndUpdate(id, dto, { new: true }).select({ password: 0 });
		return user;
	} catch (e) {
		throw Error('Error while updating user');
	}
};

exports.destroy = async function (id) {
	try {
		let user = await User.findById(id);
		user.softdelete();
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
		throw Error('Error while deleting user');
	}
};
