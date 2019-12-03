const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {check, validationResult} = require('express-validator')

const ContactSubmission = require('../models/ContactSubmission')

// @route     GET api/submissions
// @desc      Get all submissions
// @access    ADMIN
router.get('/', adminAuth, async (req, res) => {
    try {
        const submissions = await ContactSubmission.find({}).sort({
            createdAt: -1,
        })

        // Send submissions in response
        res.json(submissions)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     POST api/submissions
// @desc      Make new submission
// @access    Public
router.post(
    '/',
    [
        [
            check('firstName', 'Error/Invalid: Please provide your first name!').not().isEmpty(),
            check('lastName', 'Error/Invalid: Please provide your last name!').not().isEmpty(),
            check('email', 'Error/Invalid: Please provide an email address!').not().isEmpty(),
            check('email', 'Error/Invalid: Please provide a valid email address!').not().isEmail(),
            check('subject', 'Error/Invalid: Please provide a subject!').not().isEmpty(),
            check('message', 'Error/Invalid: Please type your message in the field provided!').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const {firstName, lastName, email, subject, message} = req.body
        const name = firstName + ' ' + lastName

        const submissionFields = {}
        if (name) submissionFields.name = name
        if (email) submissionFields.email = email
        if (subject) submissionFields.subject = subject
        if (message) submissionFields.message = message
        if (req.user) submissionFields.owner = req.user.id

        try {
            const newContactSubmission = new ContactSubmission(submissionFields)
            const submission = await newContactSubmission.save()
            await res.json(submission)
        } catch (err) {
            console.error(err)
            res.status(500).send('ERROR: Server Error!')
        }
    },
)

// @route     PUT api/submissions/:id
// @desc      Update post
// @access    ADMIN
router.put('/:id', adminAuth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(500).json({errors: errors.array()})

    const {firstName, lastName, email, subject, message} = req.body
    const name = firstName + ' ' + lastName

    const submissionFields = {}
    if (name) submissionFields.name = name
    if (email) submissionFields.email = email
    if (subject) submissionFields.subject = subject
    if (message) submissionFields.message = message
    if (req.user) submissionFields.owner = req.user.id

    try {
        let submission = await ContactSubmission.findById(req.params.id)

        if (!submission) return res.status(404).json({msg: 'No submissions could be found with that ID!'})

        // Check if user owns submission
        if (submission.author.toString() !== req.user.id) return res.status(401).json({msg: 'Error: You are not authorized to edit this submission!'})

        submission = await ContactSubmission.findByIdAndUpdate(req.params.id,
            {$set: submissionFields},
            {new: true},
        )

        res.json(submission)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     DELETE api/submissions/:id
// @desc      Delete submission
// @access    ADMIN
router.delete('/:id', adminAuth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(500).json({errors: errors.array()})

    try {
        let submission = await ContactSubmission.findById(req.params.id)
        if (!submission) return res.status(404).json({msg: 'ERROR! Failed to delete submission because it could not be found.'})

        // Check if user owns submission
        if (submission.author.toString() !== req.user.id) return res.status(401).json({msg: 'ERROR! Only a site administrator can delete submissions.'})

        await ContactSubmission.findByIdAndRemove(req.params.id)
        res.json({msg: `${submission.name}'s submission was successfully removed from the database!)`})
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

module.exports = router
