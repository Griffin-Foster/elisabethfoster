const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')
// const csp = require('helmet-csp')

const app = express()
// dotenv.config()
app.use(cors())

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/users', require('./src/routes/users'))
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/posts', require('./src/routes/posts'))
app.use('/api/events', require('./src/routes/events'))
app.use('/api/submissions', require('./src/routes/submissions'))
// app.use('/content', require('./routes/content'))

// Serve static assets in production (Basically serve react)
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
