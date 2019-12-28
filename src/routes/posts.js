const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')
const fs = require('fs')

const User = require('../models/User')
const Post = require('../models/Post')
// import Comment from '../models/Comment'

// @route     GET api/posts
// @desc      Get all posts (feed)
// @access    Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})

        // Send posts in response
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     GET api/posts/feed
// @desc      Get posts of user (feed)
// @access    Private
router.get('/feed', auth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(500).json({errors: errors.array()})

    try {
        const posts = await Post.find({author: req.user.id}).sort({
            createdAt: -1,
        })

        if (!posts.isEmpty()) return res.status(400).json({message: 'User has no posts...'})

        res.json(posts)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     POST api/posts
// @desc      Make new post
// @access    Private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Error/Invalid: Please enter a valid post title!').not().isEmpty(),
            check('body', 'Error/Invalid: Please enter a valid post body!').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(500).json({errors: errors.array()})

        const {author, title, body} = req.body

        try {
            const newPost = new Post({
                author,
                title,
                body,
            })

            const post = await newPost.save()

            res.json(post)
        } catch (err) {
            console.error(err)
            res.status(500).send('ERROR: Server Error!')
        }
    },
)

// @route     PUT api/posts/:id
// @desc      Update post
// @access    Private
router.put('/:id', auth, async (req, res) => {
    const {author, title, categories, body} = req.body

    const postFields = {}
    if (author) postFields.author = author
    if (title) postFields.title = title
    if (categories) postFields.categories = categories
    if (body) postFields.body = body

    try {
        let post = await Post.findById(req.params.id)

        if (!post)
            return res.status(404).json({msg: 'No posts could be found with that ID!'})

        // Check if user owns post
        if (post.author.toString() !== req.user.id)
            return res.status(401).json({msg: 'Error: You are not authorized to edit this post!'})

        post = await Post.findByIdAndUpdate(req.params.id,
            {$set: postFields},
            {new: true},
        )

        res.json(post)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     DELETE api/posts/:id
// @desc      Delete post
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({msg: 'ERROR! Failed to delete post because post could not be found'})

        // Check if user owns post
        if (post.author.toString() !== req.user.id) return res.status(401).json({msg: 'Error: Only the author of the post may delete it.'})

        await Post.findByIdAndRemove(req.params.id)
        res.json({msg: `The post titled '${post.title}' was successfully removed!)`})
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

module.exports = router
