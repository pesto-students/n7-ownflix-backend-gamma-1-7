// const User = require('../models/User');
const UserService = require('../services/user.service');
const { mailSender } = require('../utils/mail-config');

exports.index = async function (req, res, next) {
	let users = await UserService.index();
	res.status(200).send(users);
};

exports.store = async function (req, res, next) {
	let dto = req.body;
	dto.otp = parseInt(Math.random() * 1000000);
	// console.log(dto);
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
};

exports.show = async function (req, res, next) {
	let id = req.params.id;
	let user = await UserService.show(id);
	if (user) {
		res.status(200).send(user);
	} else res.status(404).send({ msg: 'User not found' });
};

exports.update = async function (req, res, next) {
	let id = req.params.id;
	let dto = req.body;
	// console.log(id, dto);
	let user = await UserService.update(id, dto);
	if (user) {
		res.status(201).send({ data: user, msg: 'User updated successfully' });
	} else res.status(404).send({ msg: 'User not found' });
};

exports.destroy = async function (req, res, next) {
	let id = req.params.id;
	let user = await UserService.destroy(id);
	if (user) {
		res.status(200).send({ msg: 'User deleted successfully' });
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
	};
	let user = await UserService.update(id, dto);
	if (user) {
		res.status(200).send({ data: user, msg: 'User updated successfully' });
	} else {
		res.status(404).send({ msg: 'User not found' });
	}
};
