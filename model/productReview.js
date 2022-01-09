const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('ProductReview', productReviewSchema);
