const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const merchantSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema)