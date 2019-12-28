const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Error/Invalid: An author is required for this post!'],
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
        categories: [{
            type: String,
            index: true,
        }],
        body: {
            type: String,
            required: true,
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        meta: {
            likes: Number,
            likedBy: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
            }],
            comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            }],
        },
    }, {timestamps: true},
)

PostSchema.index({createdAt: 1})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post
