const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    merchantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productImages: {
        type: Array,
        required: true
    },
    previewImg: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    averageRating: {
        type: String,
        required: true,
        default: 0
    },
    actualPrice: {
        type: Number,
        required: true,
    },
    onStock: {
        type: Number,
        required: true,
    },
    soldIn: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    extraInformation: {
        type: Array
    },
    deliveryIn: {
        numberForDelivery: {
            type: Number,
            required: true
        },
        timeForDelivery: {
            type: String,
            required: true
        }
    },
    previousPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    questionAnswer: [
        {
            type: Schema.Types.ObjectId,
            ref: "QuestionAnswer"
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProductReview'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)