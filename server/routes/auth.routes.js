require('dotenv').config()
const { check, validationResult } = require('express-validator')
const { Router } = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/default')
const { db } = require('../models/User')

const router = Router()

router.post(
  '/register',
  [
    check('email', 'The email is not correct').isEmail(),
    check('password', 'Min length of password is 6 sybmols').isLength({
      min: 6,
    }),
  ],
  async (request, response) => {
		try {
			const errors = validationResult(request)

			if (!errors.isEmpty()) {
				return response.status(400).json({
					errors: errors.array(),
					message: 'The data is not correct'
				})
			}

			const { email, password } = request.body

			const candidate = await User.findOne({ email })

			if (candidate) {
				return response.status(400).json({
					message: 'There is already user like this'
				})
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email, password: hashedPassword })

			await user.save()

			response.status(200).json({
				message: 'The user has been created'
			})
		} catch (e) {
			response.status(500).json({ message: 'Something went wrong' })
		}
	},
)

router.post(
	'/login',
	[
		check('email', 'Enter a correct email').normalizeEmail().isEmail(),
		check('password', 'Enter your password').exists()
	],
	async (request, response) => {
		try {
			const errors = validationResult(request)

			if (!errors.isEmpty()) {
				return response.status(400).json({
					errors: errors.array(),
					message: 'The data is not correct'
				})
			}

			const { email, password } = request.body

			const user = await User.findOne({ email })

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return response.status(400).json({
					message: 'The password is not correct'
				})
			}

			const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
				expiresIn: '1h'
			})

			response.json({ token, userId: user.id })
		} catch (e) {
			response.status(500).json({
				message: 'The user is not founded'
			})
		}
	}
)

module.exports = router
