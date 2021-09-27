/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const randomstring = require('randomstring');
const slugify = require('slugify');

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		entity: {
			type: String,
			enum: ['movies', 'series'],
		},
		entityId: { type: String, required: true },
		watchTime: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(mongoose_delete);

module.exports = mongoose.model('ResumeWatch', schema);
