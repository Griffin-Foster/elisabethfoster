const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/User.js')

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    check('username', 'Error/Invalid: Please enter a valid username!').not().isEmpty(),
    check('username', 'Error/Invalid: Please enter a username with at least 4 characters!').isLength({ min: 4 }),
    check('password', 'Error/Invalid: Please enter a valid password!').not().isEmpty(),
    check('password', 'Error/Invalid: Please enter a valid password!').exists(),
    check('password', 'Error/Invalid: Please enter a password with at least 6 characters!').isLength({ min: 6 }),
    check('email', 'Error/Invalid: Please enter a valid email address!').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { username, password, email } = req.body

    try {
      // Check if username is taken
      let user = await User.find({ username }).limit(1)
      if (user) return res.status(400).json({ msg: 'Error/Invalid: An account with that username already exists!' })
      // Check if email is taken
      user = await User.find({ email }).limit(1)
      if (user) return res.status(400).json({ msg: 'Error/Invalid: An account with that email already exists!' })

      user = new User({
        username,
        password,
        email
      })

      // Generate SALT
      const salt = await bcrypt.genSalt(10)
      // HASH Password
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id,
          isAdmin: false
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000 // 360,000 milliseconds
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).send('ERROR: Server Error!')
    }
  }
)

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) return res.status(400).json({ msg: 'Error/Invalid: No users found in the database!'})

    res.status(200).json(users.sort({ 'meta.createdAt': -1 }))
  } catch (err) {
    console.error(err)
    res.status(500).send('ERROR: Server error!')
  }
})

// @route   GET api/users/:id
// @desc    Get user by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(400).json({ msg: 'Error/Invalid: No user found in the database with that ID!'})

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('ERROR: Server error!')
  }
})

// TODO: make router.put method to update user profile

module.exports = router
