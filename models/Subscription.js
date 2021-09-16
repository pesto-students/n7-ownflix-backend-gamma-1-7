/* GET home page. */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		transactionMode: { type: String, required: true },
		gateway: { type: String, required: true },
		amount: { type: Number, required: true },
		subsStartDate: { type: Date, required: true },
		subsEndDate: { type: Date, required: true },
		status: { type: String, enum: ['Pending', 'Completed', 'Rejected'], default: 'Pending' },
	},
	{
		timestamps: true,
	}
);

schema.plugin(mongoosePaginate);
schema.plugin(mongoose_delete);

module.exports = mongoose.model('Subscription', schema);
