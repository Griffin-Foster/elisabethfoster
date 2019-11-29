const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Error/Invalid: Username is required!'],
            unique: true,
            trim: true,
            minlength: 4,
            index: true,
            validate: [
                (input) => {
                    return input.length >= 4
                },
                'Error/Invalid: Username must be at least 4 characters!',
            ],
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, 'Error/Invalid: Please enter a valid email address!'],
            index: true,
        },
        altLinks: {
            googleLink: String,
            facebookLink: String,
            instagramLink: String,
        },
        meta: {
            firstName: {
                type: String,
                trim: true,
            },
            lastName: {
                type: String,
                trim: true,
            },
            friends: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
            }],
            posts: [{
                type: Schema.Types.ObjectId,
                ref: 'Post',
            }],
            likedPosts: [{
                type: Schema.Types.ObjectId,
                ref: 'Post',
            }],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

UserSchema.index({dateCreated: 1, dateModified: 1})

module.exports = mongoose.model('User', UserSchema)
