/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const slugify = require('slugify');

const schema = mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		slug: String,
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(mongoose_delete);
schema.pre('save', function (next) {
	let genre = this;
	genre.slug = slugify(genre.title, { lower: true });
	next();
});
schema.pre('findOneAndUpdate', function (next) {
	let genre = this;
	genre._update.slug = slugify(genre._update.title, { lower: true });
	next();
});

module.exports = mongoose.model('Genre', schema);
