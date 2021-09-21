// const User = require('../models/User');
const DashboardService = require('../services/dashboard.service');

exports.index = async function (req, res, next) {
	let users = await DashboardService.index();
	res.status(200).send(users);
};
