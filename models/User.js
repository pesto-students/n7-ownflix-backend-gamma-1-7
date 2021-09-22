/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');
var salt = parseInt(process.env.BCRYPT_SALT);

const schema = mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		password: String,
		mobile: String,
		role: {
			type: String,
			enum: ['Admin', 'User'],
			default: 'User',
		},
		active: { type: Boolean, default: true },
		isVerified: { type: Boolean, default: false },
		otp: { type: String, length: 6 },
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(mongoose_delete);

schema.pre('save', function (next) {
	let user = this;
	user.email = user.email.toLowerCase();
	bcrypt.hash(user.password, salt, async function (err, hash) {
		if (err) {
			return false;
		} else {
			user.password = hash;
			next();
		}
	});
});
schema.pre('findOneAndUpdate', function (next) {
	let user = this;
	if (user._update.password) {
		bcrypt.hash(user._update.password, salt, async function (err, hash) {
			if (err) {
				return false;
			} else {
				user._update.password = hash;
				next();
			}
		});
	} else {
		delete user._update.password;
		next();
	}
});
module.exports = mongoose.model('User', schema);
