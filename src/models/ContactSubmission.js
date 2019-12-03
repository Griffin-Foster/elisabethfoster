const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const ContactSubmissionSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Error/Invalid: Please provide your first and last name!'],
            index: true,
        },
        email: {
            type: String,
            required: [true, 'Error/Invalid: Please provide your email address!'],
            index: true,
        },
        subject: {
            type: String,
            required: [true, 'Error/Invalid: Please provide the subject of your message!'],
        },
        message: {
            type: String,
            require: [true, 'Error/Invalid: Please include your message in the form below!'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            default: 'open',
        },
    }, {timestamps: true},
)

ContactSubmissionSchema.index({dateCreated: 1})

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema)
