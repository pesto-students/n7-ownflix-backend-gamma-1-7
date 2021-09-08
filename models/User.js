/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const soft_delete = require('mongoose-softdelete');

const schema = mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		mobile: { type: String, unique: true },
		password: String,
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
schema.plugin(soft_delete);

module.exports = mongoose.model('User', schema);
