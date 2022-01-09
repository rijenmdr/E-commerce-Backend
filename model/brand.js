const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
