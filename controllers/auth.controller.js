var express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var router = express.Router();
const bcrypt = require('bcrypt');

var accessTokenSecret = process.env.JWT_SECRET;
var expTime = process.env.JWT_EXPIRE_TIME;

exports.login = async function (req, res, next) {
	let email = req.body.email;
	let password = req.body.password;
	let user = await User.findOne({ email: email }).exec();

	if (user) {
		// verifypassword
		bcrypt.compare(password, user.password, function (err, result) {
			if (!err) {
				if (!result) {
					res.status(401).send({ msg: 'Username or password incorrect' });
				} else {
					let payload = { email: user.email, password: user.password, role: user.role };
					const accessToken = jwt.sign(payload, accessTokenSecret, {
						expiresIn: expTime,
					});
					res.status(200).send({
						data: {
							accessToken: accessToken,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
								role: user.role,
								active: user.active,
								isVerified: user.isVerified,
							},
						},
						msg: 'User logged in successfully',
					});
				}
			} else {
				res.status(401).send({ msg: 'Username or password incorrect' });
			}
		});
		// Generate an access token
	} else {
		res.status(401).send({ msg: 'Username or password incorrect' });
	}
};

exports.check = async function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, accessTokenSecret, (err, decoded) => {
		if (err) {
			res.status(200).send({ msg: 'Expired' });
		} else {
			res.status(200).send({ data: decoded, msg: 'Active' });
		}
	});
};
