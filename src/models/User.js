const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
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
        privileges: {
            member: {
                type: Boolean,
                default: true,
                required: true,
            },
            events: {
                type: Boolean,
                default: true,
                required: true,
            },
            eventsAdmin: {
                type: Boolean,
                default: false,
                required: true,
            },
            blog: {
                type: Boolean,
                default: false,
                required: true,
            },
            blogAdmin: {
                type: Boolean,
                default: false,
                required: true,
            },
            admin: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
    },
    {timestamps: true},
)

UserSchema.index({createdAt: 1, updatedAt: 1})
const User = mongoose.model('User', UserSchema, 'users')

module.exports = User
