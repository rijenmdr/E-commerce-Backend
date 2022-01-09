const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default:'o'
    },
    role: {
        type: Number,
        required: true
    },
    profileImage: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductReview'
        }
    ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionAnswer'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)