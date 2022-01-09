const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionAnswerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    reply: {
        type: Array,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('QuestionAnswer', questionAnswerSchema);
