const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')

const User = require('../models/User')

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).send('ERROR: Server error!')
    }
})

// @route     POST api/auth
// @desc      Auth user & get/set token (LOGIN)
// @access    Public
router.post(
    '/',
    [
        check('username', 'Error/Invalid: Please enter a valid username!').not().isEmpty(),
        check('username', 'Error/Invalid: Please enter a username with at least 4 characters!').isLength({min: 4}),
        // check('email', 'Error/Invalid: Please enter a valid email address!').isEmail(),
        check('password', 'Error/Invalid: Please enter a valid password!').not().isEmpty(),
        check('password', 'Error/Invalid: Please enter a valid password!').exists(),
        check('password', 'Error/Invalid: Please enter a password with at least 6 characters!').isLength({min: 6}),
    ],
    async (req, res) => {
        // Check for error
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

        const {username, password} = req.body

        try {
            // Check for existing user with form username
            let user = await User.findOne({username})
            if (!user) return res.status(400).json({msg: 'Error/Invalid: A user with that username does not exist!'})

            // Compare password with DB hashed password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: 'Error/Invalid: Invalid credentials!'})

            const isAdmin = (!!user.isAdmin) // if DB user isAdmin (true), else if DB user !isAdmin (false)

            const payload = {
                user: {
                    id: user.id,
                    isAdmin, // user privilege default = false (not an admin)
                },
            }

            const oneHour = 3600000 // 3,600,000 milliseconds = 1 hour

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: oneHour,
                },
                (err, token) => {
                    // Handle error
                    if (err) throw err

                    // Send token response
                    res.json({token})
                },
            )
        } catch (err) {
            console.error(err)
            res.status(500).send('ERROR: Server Error!')
        }
    },
)

module.exports = router
