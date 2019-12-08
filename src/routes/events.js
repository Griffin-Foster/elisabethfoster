const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {check, validationResult} = require('express-validator')

const Event = require('../models/Event')

// @route     GET api/events
// @desc      Get all events
// @access    Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}).sort({startDate: -1})

        // Send events in response
        res.status(200).json(events)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     POST api/events
// @desc      Make new event
// @access    ADMIN
router.post(
    '/',
    [
        // adminAuth,
        [
            check('name', 'Error/Invalid: Please enter an event name!').not().isEmpty(),
            check('description', 'Error/Invalid: Please enter an event description!').not().isEmpty(),
            check('startDate', 'Error/Invalid: Please enter an event start date!').not().isEmpty(),
            check('location', 'Error/Invalid: Please enter an event location!').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(500).json({errors: errors.array()})

        const {name, description, startDate, finishDate, location, link, linkText, imageURL, image} = req.body

        const eventFields = {}
        if (name) eventFields.name = name
        if (description) eventFields.description = description
        if (startDate) eventFields.startDate = startDate
        if (finishDate) eventFields.finishDate = finishDate
        if (location) eventFields.location = location
        if (imageURL) eventFields.imageURL = imageURL
        if (image) eventFields.image = image
        if (link) eventFields.link = link
        if (linkText) eventFields.linkText = linkText

        // TODO: Check if image is null/empty and if true, set to default image

        try {
            const newEvent = new Event(eventFields)

            const event = await newEvent.save()

            res.json(event)
        } catch (err) {
            console.error(err)
            res.status(500).send('ERROR: Server Error!')
        }
    },
)

// @route     PUT api/events/:id
// @desc      Update post
// @access    ADMIN
router.put('/:id', adminAuth, async (req, res) => {
    const {name, description, startDate, finishDate, location, image} = req.body

    const eventFields = {}
    if (name) eventFields.name = name
    if (description) eventFields.description = description
    if (startDate) eventFields.startDate = startDate
    if (finishDate) eventFields.finishDate = finishDate
    if (location) eventFields.location = location
    if (image) eventFields.image = image

    try {
        let event = await Event.findById(req.params.id)

        if (!event) return res.status(404).json({msg: 'No events could be found with that ID!'})

        // Check if user owns event
        if (event.author.toString() !== req.user.id) return res.status(401).json({msg: 'Error: You are not authorized to edit this event!'})

        event = await Event.findByIdAndUpdate(req.params.id,
            {$set: eventFields},
            {new: true},
        )

        res.json(event)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

// @route     DELETE api/events/:id
// @desc      Delete event
// @access    ADMIN
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({msg: 'ERROR! Failed to delete event because event could not be found'})

        // Check if user owns event
        if (event.author.toString() !== req.user.id) return res.status(401).json({msg: 'Error: Only the author of the event may delete it.'})

        await Event.findByIdAndRemove(req.params.id)
        res.json({msg: `The event titled '${event.title}' was successfully removed!)`})
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server Error!')
    }
})

module.exports = router
