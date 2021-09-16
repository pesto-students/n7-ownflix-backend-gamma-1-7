/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const randomstring = require('randomstring');
const slugify = require('slugify');

const schema = mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: String,
		genre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Genre',
			required: true,
		},
		noOfEpisodes: { type: Number, required: true },
		images: { type: Array, required: true },
		imagesVertical: { type: Array, required: true },
		videoTrailer: { type: String, required: true },
		yearOfRelease: { type: String, required: true },
		dateOfRealease: { type: String, required: true },
		director: String,
		productionHouse: String,
		imdbRating: Number,
		actors: String,
		plot: String,
		rated: { type: String, required: true },
		isPublished: { type: Boolean, default: false },
		subscriptionRequired: { type: Boolean, default: false, required: true },
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(mongoose_delete);
schema.pre('save', function (next) {
	let series = this;
	series.slug = slugify(series.title) + '-' + series.yearOfRelease + '-' + randomstring.generate(10);
	next();
});

module.exports = mongoose.model('Series', schema);
