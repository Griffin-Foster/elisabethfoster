const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const EventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Error/Invalid: A name is required for this event!'],
            index: true,
        },
        description: {
            type: String,
            required: true,
            index: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        finishDate: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
        },
        image: {
            type: Buffer,
            contentType: String,
        },
        meta: {
            usersViewed: [{ // Track when people view the event
                type: Schema.Types.ObjectId,
                ref: 'User',
            }],
        },
    }, {timestamps: true},
)

EventSchema.index({dateCreated: 1})

module.exports = mongoose.model('Event', EventSchema)
