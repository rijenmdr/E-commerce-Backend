const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogCommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('BlogComment', blogCommentSchema);
