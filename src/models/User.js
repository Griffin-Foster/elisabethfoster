const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, 'Error/Invalid: Please enter a valid email address!'],
            index: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
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
    { timestamps: true },
)

UserSchema.index({createdAt: 1, updatedAt: 1})

module.exports = mongoose.model('User', UserSchema, 'users')
