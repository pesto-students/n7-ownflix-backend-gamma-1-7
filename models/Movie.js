/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const soft_delete = require('mongoose-softdelete');
const randomstring = require('randomstring');
const slugify = require('slugify');

const schema = mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: String,
		genre: { type: String, required: true },
		images: { type: Array, required: true },
		imagesVertical: { type: String, required: true },
		videoTrailer: { type: String, required: true },
		videoMain: { type: String, required: true },
		yearOfRelease: { type: String, required: true },
		dateOfRealease: { type: String, required: true },
		director: String,
		productionHouse: String,
		imdbRating: Number,
		runnningTime: { type: String, required: true },
		actors: String,
		plot: String,
		rated: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(soft_delete);
schema.pre('save', function (next) {
	let movie = this;
	movie.slug = slugify(movie.title) + '-' + movie.yearOfRelease + '-' + randomstring.generate(10);
	next();
});

module.exports = mongoose.model('Movie', schema);
