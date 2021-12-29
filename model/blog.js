const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    previewImg: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BlogComment'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)