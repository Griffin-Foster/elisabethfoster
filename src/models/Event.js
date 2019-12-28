const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        },
        startDate: {
            type: Date,
            required: true,
        },
        finishDate: {
            type: Date,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        meta: {
            usersViewed: [{ // Track when people view the event
                type: Schema.Types.ObjectId,
                ref: 'User',
            }],
            links: [{ // Array of links (buyLink)
                name: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            }],
        },
    },
    {timestamps: true},
)

EventSchema.index({startDate: 1})
const Event = mongoose.model('Event', EventSchema)

module.exports = Event
