// const User = require('../models/User');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
const { mailSender } = require('../utils/mail-config');

var salt = parseInt(process.env.BCRYPT_SALT);

exports.index = async function (req, res, next) {
	let users = await UserService.index();
	res.status(200).send(users);
};

exports.create = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};

exports.store = async function (req, res, next) {
	let dto = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		mobile: req.body.mobile,
		role: req.body.role,
		otp: parseInt(Math.random() * 1000000),
	};
	bcrypt.hash(dto.password, salt, async function (err, hash) {
		if (err) {
			res.status(500).send({ msg: 'Something went wrong' });
		} else {
			dto.password = hash;
			let user = await UserService.store(dto);
			if (user) {
				await mailSender(
					dto.name,
					dto.email,
					'Welcome',
					`<hr>Welcome to our platform your otp : ${dto.otp}<hr>`
				);
				res.status(201).send({ data: user, msg: 'New user created successfully' });
			} else {
				res.status(200).send({ msg: 'Email already exists' });
			}
		}
	});
};

exports.show = async function (req, res, next) {
	let id = req.params.id;
	let user = await UserService.show(id);
	if (user) {
		res.status(200).send({ msg: 'User found', data: user });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};
// exports.edit = async function (req, res, next) {
// 	let id = req.params.id;
// 	return res.status(404).send('NOT_DEFINED' + id);
// };

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = {
		name: req.body.name,
	};
	let user = await UserService.update(id, dto);
	if (user) {
		return res.status(201).send({ msg: 'User updated successfully' });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let user = await UserService.destroy(id);
	if (user) {
		res.status(200).send({ msg: 'User soft-deleted successfully' });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};

exports.hardDestroy = async function (req, res, next) {
	let id = req.params.id;
	let user = await UserService.hardDestroy(id);
	if (user) {
		res.status(200).send({ msg: 'User deleted successfully' });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};

exports.getAll = async function (req, res, next) {
	return res.status(404).send('NOT_DEFINED');
};

exports.updateStatus = async function (req, res, next) {
	let id = req.params.id;
	let dto = {
		active: req.body.active,
		isVerified: req.bosy.isVerified,
	};
	let user = await UserService.update(id, dto);
	if (user) {
		res.status(200).send({ data: user, msg: 'User updated successfully' });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};
// exports.hardDestroy = async function (req, res, next) {
// 	return true;
// };
