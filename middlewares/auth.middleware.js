const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const accessTokenSecret = process.env.JWT_SECRET;
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, accessTokenSecret);
		req.authUser = decodedToken;
		next();
	} catch {
		res.status(401).send({ msg: 'Unauthorized access' });
	}
};
